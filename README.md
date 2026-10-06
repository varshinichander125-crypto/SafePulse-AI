# SafePulse AI

## AI-Powered Local Risk Evolution & Early-Warning Intelligence

> Don't Just Detect Risk. Understand How It's Developing.

SafePulse AI is an AI-powered local risk intelligence prototype that identifies how risk is developing by combining multiple local signals such as rainfall, traffic, waterlogging, road blockage, infrastructure conditions, and citizen observations.

Instead of waiting for a disaster to happen, SafePulse AI focuses on understanding the evolution of local risk and providing an explainable risk signal for human monitoring.

---

## Problem Statement

Many safety and disaster-response systems focus mainly on detecting incidents after they occur.

However, local risk often develops gradually through multiple weak signals.

For example:

- Increasing rainfall
- Traffic congestion
- Waterlogging
- Road blockage
- Multiple citizen observations

Individually, these signals may not indicate a major problem.

When they occur together in the same area and time, they can indicate a developing risk pattern.

---

## Our Solution

SafePulse AI combines multiple local signals and analyzes their combined pattern to estimate a local risk level.

### Core Flow

Signals → Signal Analysis → Correlation → Risk Evolution → Risk Level → Explanation → Human Monitoring

The system helps users understand:

- What signals are being observed
- How the risk is changing
- Which factors contribute to the risk
- Why the risk level is increasing

---

## Key Features

### 1. Local Risk Dashboard

Displays:

- Current local risk score
- Risk status
- Risk trend
- Risk evolution chart
- Active signals
- AI insight

### 2. Local Signal Reporting

Users can report observations such as:

- Rainfall
- Waterlogging
- Traffic
- Road blockage
- Infrastructure issues
- Other local observations

### 3. Risk Evolution Analysis

The system combines multiple signals to calculate a developing risk score.

Prototype risk levels:

| Score | Status |
|---|---|
| 0–25 | NORMAL |
| 26–50 | WATCH |
| 51–75 | DEVELOPING |
| 76–100 | HIGH ATTENTION |

These thresholds are prototype values and are not official emergency thresholds.

### 4. AI Insight

SafePulse AI provides an understandable explanation of the observed signal pattern and highlights when multiple signals indicate increasing local risk.

### 5. Risk Map

A visual map displays different local risk zones and their current risk levels.

### 6. Risk History

The history page helps monitor:

- Previous signals
- Risk evolution
- Peak risk
- Current risk
- Developing patterns

---

## How SafePulse AI Works

1. Local signals are collected.
2. Each signal contributes to the risk score.
3. Multiple signal categories are correlated.
4. The combined pattern is analyzed.
5. A local risk level is generated.
6. The system explains the contributing signals.
7. Human monitoring remains essential for decisions.

---

## Risk Intelligence Model

The prototype uses a rule-based risk engine for consistent scoring.

Example signal weights:

| Signal | Weight |
|---|---:|
| Rainfall | 20 |
| Waterlogging | 20 |
| Traffic | 15 |
| Road Blockage | 15 |
| Infrastructure | 10 |
| Other | 5 |

A correlation bonus is added when multiple different signal categories are observed.

The final score is normalized to a maximum of 100.

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts

### Maps

- Leaflet
- React Leaflet
- OpenStreetMap

### Backend

- Python
- FastAPI
- SQLite

### Development

- VS Code
- Git
- GitHub

---

## Project Structure

```text
SafePulse-AI/
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── report/
│   │   ├── analysis/
│   │   ├── map/
│   │   └── history/
│   │
│   ├── components/
│   │   └── Navbar.tsx
│   │
│   └── package.json
│
├── backend/
│   ├── main.py
│   └── database/
│
├── .gitignore
└── README.md