# ⚽ PressureLab AI

### AI-Powered Football Intelligence Platform

PressureLab AI transforms historical football event data into tactical intelligence using advanced possession-value analytics, pressure metrics, interactive dashboards, and AI-generated scouting reports.

Unlike traditional statistics dashboards that focus only on goals, possession, or shots, PressureLab AI helps explain **why teams succeed under pressure** through advanced analytics and natural-language insights.

---

## 🌐 Live Demo

**Frontend:** https://pressurelab-ai.vercel.app

**Backend API:** https://pressurelab-ai.onrender.com

---

# ✨ Features

## 🤖 AI Analyst (New)

Generate professional AI-powered analytical reports for every national team.

Each report automatically includes:

* Executive Summary
* Tactical Strengths
* Pressure Performance Analysis
* Knockout Stage Analysis
* Risk Assessment
* Expert Verdict

The AI Analyst converts complex football metrics into readable tactical insights.

---

## 📊 Pressure Intelligence Dashboard

Explore advanced tournament analytics through:

* Pressure Resilience Score (PRS)
* Adjusted PRS
* Possession Performance Index (PPI)
* Tournament Rankings
* Pressure Quadrants
* Historical Comparisons

---

## 🏟 Interactive Match Browser

Analyze every World Cup match with:

* Match-level VAEP comparison
* Team dominance metrics
* Tournament filtering
* Match intelligence views

---

## 📈 Team Intelligence

Each team page provides:

* Pressure Resilience Score
* Pressure Curve
* Group vs Knockout Performance
* Tournament Timeline
* AI-generated Tactical Report
* Data-driven Insights

---

## 🌍 Live Tournament Tracker

Monitor the current World Cup through a live proxy leaderboard built using football-data.org.

---

## 🎨 Modern User Experience

PressureLab AI introduces a refreshed sports-tech interface featuring:

* Premium dark theme
* Glassmorphism design
* Responsive layouts
* Animated metric cards
* Smooth transitions
* Enhanced dashboard hierarchy
* Improved readability

---

# 🧠 Key Research Insight

Using historical World Cup event data, the project evaluates team performance through **VAEP (Valuing Actions by Estimating Probabilities)** rather than traditional statistics.

The platform also computes **Pressure Resilience Score (PRS)** to measure how effectively teams maintain possession value while trailing.

Rather than replacing tactical expertise, these metrics help users explore and interpret football performance from a different analytical perspective.

---

# ⚙️ How It Works

```
Historical Event Data
          │
          ▼
 Data Processing Pipeline
          │
          ▼
   VAEP & PRS Analytics
          │
          ▼
 FastAPI REST Backend
          │
          ▼
 React + Vite Frontend
          │
          ▼
 AI Analyst Engine
          │
          ▼
 Interactive Intelligence Reports
```

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* JavaScript
* Plotly
* Recharts
* CSS3

## Backend

* FastAPI
* Python

## Data Processing

* Pandas
* Parquet
* StatsBomb Open Data
* socceraction (VAEP)

## Deployment

* Vercel
* Render

---

# 📡 API Endpoints

| Endpoint              | Description                  |
| --------------------- | ---------------------------- |
| `/health`             | Service health               |
| `/api/teams`          | Historical team analytics    |
| `/api/team/{team_id}` | Team intelligence            |
| `/api/matches`        | Historical World Cup matches |
| `/api/regression`     | Statistical findings         |
| `/api/methodology`    | Research methodology         |
| `/api/live/teams`     | Live tournament standings    |
| `/api/live/refresh`   | Refresh live data            |

---

# 🚀 Running Locally

## Backend

```bash
cd backend

python -m venv venv

source venv/Scripts/activate

pip install -r requirements.txt

ENVIRONMENT=development uvicorn main:app --reload --port 8000
```

Create:

```
backend/.env
```

```env
FOOTBALL_DATA_API_KEY=YOUR_API_KEY
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Rebuild Analytics Pipeline

```bash
cd backend/pipeline

pip install -r requirements.txt

python 01_load_statsbomb.py
python 02_compute_vaep.py
python 03_engineer_features.py
python 04_run_regression.py
python 05_build_parquets.py
```

---

# 📚 Project Structure

```
backend/
    pipeline/
    data/
    docs/
    api/

frontend/
    components/
    pages/
    hooks/
    lib/
```

---

# 🎯 Future Improvements

* Player-level pressure analytics
* Match summary generation
* Expanded tournament support
* Enhanced AI Analyst capabilities
* Additional tactical comparison tools

---

# 📖 Data Attribution

Football event data is provided by **StatsBomb Open Data** under its open-data terms.

Live tournament results are sourced from **football-data.org**.

Possession-value analytics are powered by the **socceraction VAEP** framework.

---

# 👨‍💻 Built With

* Python
* FastAPI
* React
* Vite
* JavaScript
* Plotly
* Recharts
* Pandas
* HTML5
* CSS3
* StatsBomb Open Data
* socceraction
* Vercel
* Render

---

## ⭐ If you found this project interesting, consider giving it a star on GitHub!
