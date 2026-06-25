const REPORT_TYPES = {
  team: 'Explain This Team',
  match: 'Explain This Match',
  elite: 'Why Is This Team Elite?',
  fragile: 'What Makes This Team Fragile?',
}

const fmt = (value, digits = 1, fallback = 'not available') =>
  value == null || Number.isNaN(value) ? fallback : Number(value).toFixed(digits)

const fmtVaep = (value) => fmt(value, 4)

const pctChange = (current, baseline) => {
  if (current == null || baseline == null || baseline === 0) return null
  return ((current - baseline) / Math.abs(baseline)) * 100
}

const byState = (team, state) => team.pressure_curve?.find((item) => item.state === state)

const describeQuadrant = (quadrant) => {
  switch (quadrant) {
    case 'elite':
      return 'elite profile: high base possession value with resilience when the game state turns against them'
    case 'pretenders':
      return 'pretender profile: strong possession value, but less convincing under negative game states'
    case 'grinders':
      return 'grinder profile: limited baseline control, but a real capacity to fight back under pressure'
    case 'fragile':
      return 'fragile profile: weaker base possession value and reduced output when chasing'
    default:
      return 'unclassified profile because the available samples are not strong enough for a quadrant label'
  }
}

const strongestMatch = (team) => {
  const timeline = team.match_timeline || []
  if (!timeline.length) return null
  return timeline
    .slice()
    .sort((a, b) => (b.team_vaep_avg ?? -Infinity) - (a.team_vaep_avg ?? -Infinity))[0]
}

const pressureMatch = (team) => {
  const timeline = team.match_timeline || []
  if (!timeline.length) return null
  return timeline
    .slice()
    .sort((a, b) => (b.tournament_pressure ?? -Infinity) - (a.tournament_pressure ?? -Infinity))[0]
}

const resultSummary = (team) => {
  const wins = (team.match_timeline || []).filter((match) => match.result === 'W').length
  const losses = (team.match_timeline || []).filter((match) => match.result === 'L').length
  const draws = (team.match_timeline || []).filter((match) => match.result === 'D').length
  return `${wins}W-${draws}D-${losses}L`
}

function buildContext(team) {
  const level = byState(team, 'level')
  const losingClose = byState(team, 'losing_close')
  const losingBig = byState(team, 'losing_big')
  const winningClose = byState(team, 'winning_close')
  const pressureDelta = pctChange(losingClose?.vaep_rate, level?.vaep_rate)
  const stageDelta = pctChange(team.knockout_vaep_avg, team.group_vaep_avg)
  const bestMatch = strongestMatch(team)
  const hardestMatch = pressureMatch(team)

  return {
    level,
    losingClose,
    losingBig,
    winningClose,
    pressureDelta,
    stageDelta,
    bestMatch,
    hardestMatch,
    record: resultSummary(team),
  }
}

function finalVerdict(team, context, reportType) {
  if (reportType === 'elite') {
    if (team.quadrant === 'elite') {
      return `${team.team_name} earns the elite label because the numbers show both control and survival value: PRS ${fmt(
        team.prs
      )}, adjusted PRS ${fmt(team.adj_prs)}, and a tournament finish of ${team.tournament_result}.`
    }
    return `${team.team_name} is not a clean elite case. The profile has useful traits, but the quadrant and stage data stop short of a complete tournament-control argument.`
  }

  if (reportType === 'fragile') {
    if (team.quadrant === 'fragile') {
      return `${team.team_name} looks fragile because the pressure score, base possession value, and knockout retention do not create enough evidence of recovery power.`
    }
    return `${team.team_name} is not primarily fragile. The risk signals are worth tracking, but the broader tournament profile is stronger than that label implies.`
  }

  if (reportType === 'match') {
    const match = context.hardestMatch || context.bestMatch
    if (!match) return `There is not enough match timeline data to isolate a defining match for ${team.team_name}.`
    return `The defining match lens is ${match.stage} vs ${match.opponent}: a ${match.result} result under tournament pressure ${fmt(
      match.tournament_pressure,
      0
    )}. It is the best single-game window into how the team translated value into outcome.`
  }

  return `${team.team_name} profiles as a ${describeQuadrant(team.quadrant)}. The verdict is grounded in PRS, adjusted PRS, stage retention, and the match timeline rather than reputation.`
}

export function generateAnalystReport(team, reportType = 'team') {
  const context = buildContext(team)
  const reportLabel = REPORT_TYPES[reportType] || REPORT_TYPES.team
  const pressureDirection =
    context.pressureDelta == null
      ? 'cannot be measured cleanly from the available losing-state sample'
      : context.pressureDelta >= 0
        ? `improves by ${fmt(context.pressureDelta, 0)}% when losing close versus level states`
        : `drops by ${fmt(Math.abs(context.pressureDelta), 0)}% when losing close versus level states`

  const stageDirection =
    context.stageDelta == null
      ? 'does not have a complete group-to-knockout comparison'
      : context.stageDelta >= 0
        ? `rose by ${fmt(context.stageDelta, 0)}% from group play to knockouts`
        : `fell by ${fmt(Math.abs(context.stageDelta), 0)}% from group play to knockouts`

  const bestMatchText = context.bestMatch
    ? `${context.bestMatch.stage} vs ${context.bestMatch.opponent}, where the team produced ${fmtVaep(
        context.bestMatch.team_vaep_avg
      )} VAEP per action`
    : 'no single strongest match is available'

  return {
    title: reportLabel,
    kicker: `${team.team_name} ${team.tournament} | ${team.tournament_result} | ${context.record}`,
    sections: [
      {
        heading: 'Executive Summary',
        body: `${team.team_name} finished as ${team.tournament_result} with a PRS of ${fmt(
          team.prs
        )} and an opponent-adjusted PRS of ${fmt(team.adj_prs)}. The side carries a ${describeQuadrant(
          team.quadrant
        )}, with PPI at ${fmt(team.ppi, 4)} and ${team.matches_played} matches in the sample.`,
      },
      {
        heading: 'Key Strengths',
        bullets: [
          `Pressure resilience rank: ${team.combined_prs_rank ? `#${team.combined_prs_rank}` : 'unranked'} in the combined tournament table.`,
          `Best match signal: ${bestMatchText}.`,
          context.winningClose?.vaep_rate != null
            ? `When winning close, the VAEP rate was ${fmtVaep(context.winningClose.vaep_rate)}, showing how well the team protected value while ahead.`
            : 'Winning-state value is limited or unavailable in the pressure curve.',
        ],
      },
      {
        heading: 'Pressure Performance Analysis',
        body: `The pressure curve says the team ${pressureDirection}. Level-state VAEP is ${fmtVaep(
          context.level?.vaep_rate
        )}; losing-close VAEP is ${fmtVaep(context.losingClose?.vaep_rate)}; losing-big VAEP is ${fmtVaep(
          context.losingBig?.vaep_rate
        )}. ${team.low_sample_warning ? `Because the losing sample is only ${team.losing_sample_size} actions, this signal should be read with caution.` : 'The losing-state sample is large enough to treat the signal as meaningful.'}`,
      },
      {
        heading: 'Knockout Stage Analysis',
        body: `Group-stage VAEP averaged ${fmtVaep(team.group_vaep_avg)} and knockout VAEP averaged ${fmtVaep(
          team.knockout_vaep_avg
        )}; the team ${stageDirection}. This is the clearest read on whether tournament pressure sharpened or diluted the possession model output.`,
      },
      {
        heading: 'Risk Factors',
        bullets: [
          team.low_sample_warning
            ? `Small losing-state sample: ${team.losing_sample_size} actions can inflate or distort PRS.`
            : 'No small-sample pressure warning is attached to this team.',
          team.surprising_result_note || 'No major result anomaly is flagged by the model.',
          context.stageDelta != null && context.stageDelta < 0
            ? 'Knockout retention is a risk: output declined after the group stage.'
            : 'Knockout retention is not the primary concern in this profile.',
        ],
      },
      {
        heading: 'Final Verdict',
        body: finalVerdict(team, context, reportType),
      },
    ],
  }
}
