# AI-Based Rural Electricity Fault Localization

An AI-powered electricity grid monitoring and fault localization platform designed to help electricity distribution control rooms detect, predict, and respond to rural power-grid faults more efficiently.

The system combines **Machine Learning, Network Analysis, Geospatial Visualization, and Real-Time Monitoring** to identify probable fault locations, estimate affected villages, determine probable causes, and assist field engineers with optimized inspection and restoration decisions.

---

## Problem Statement

Rural electricity networks often cover large geographical areas with long distribution lines, multiple transformers, feeders, and villages.

When a fault occurs, control-room operators may have limited information about its exact location and cause. This can result in:

* Longer fault localization time
* Delayed restoration
* Large numbers of affected consumers
* Difficult field inspection
* Inefficient crew deployment
* Increased operational costs

Our solution aims to reduce these challenges by providing an intelligent platform for **fault prediction, localization, prioritization, and response management**.

---

## Proposed Solution

The proposed system continuously analyzes electricity-grid data and network topology to identify abnormal patterns and predict potential faults.

When a fault is detected, the platform provides:

* Probable fault location
* Probable fault cause
* Confidence score
* Affected villages
* Critical feeders/transformers
* Recommended inspection points
* Nearest available field crew
* Fault severity and priority
* Restoration progress

The information is displayed through a centralized control-room dashboard and a field-engineer interface.

---

## Key Features

### 1. Control Room Dashboard

Provides electricity-board operators with a centralized view of the distribution network.

* Interactive map of feeders, transformers, and villages
* Live network status
* Fault alerts
* Fault severity indicators
* AI-predicted fault locations
* Probable fault causes
* Affected villages
* Confidence scores
* Recommended inspection locations
* Crew assignment and tracking
* Restoration progress

### 2. AI-Based Fault Detection

Machine learning models analyze electrical and operational parameters to identify abnormal conditions.

Potential input parameters include:

* Voltage
* Current
* Power
* Frequency
* Load
* Transformer parameters
* Historical fault records
* Weather/environmental conditions
* Network topology

### 3. Fault Localization

The system uses electrical measurements together with the distribution-network topology to narrow down the probable fault location.

Network relationships between:

`Substation → Feeder → Transformer → Village`

are represented digitally to support intelligent fault localization.

### 4. Fault Cause Prediction

The system estimates the probable cause of a detected fault, such as:

* Overloading
* Transformer failure
* Line fault
* Voltage abnormality
* Equipment failure
* Environmental conditions

### 5. Field Engineer Interface

Field engineers can access assigned faults from a mobile-friendly interface.

They can:

* View assigned faults
* Navigate to the predicted location
* View AI-generated fault information
* Upload field photographs
* Update fault status
* Report inspection results
* Mark faults as resolved

### 6. Consumer Portal

Consumers can interact with the system to:

* Report power outages
* View outage status
* Check affected-area information
* View estimated restoration time

---

## System Architecture

```text
                    ┌─────────────────────────┐
                    │     Electricity Grid    │
                    │                         │
                    │ Feeders / Transformers  │
                    │ Villages / Sensors      │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     Data Collection     │
                    │                         │
                    │ Electrical Parameters   │
                    │ Historical Fault Data   │
                    │ Network Topology        │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     Data Processing     │
                    │                         │
                    │ Cleaning / Validation   │
                    │ Feature Engineering     │
                    └────────────┬────────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   ▼                           ▼
        ┌─────────────────────┐     ┌─────────────────────┐
        │  Anomaly Detection  │     │  Fault Prediction   │
        │                     │     │                     │
        │ Isolation Forest    │     │ XGBoost             │
        └──────────┬──────────┘     └──────────┬──────────┘
                   │                           │
                   └─────────────┬─────────────┘
                                 ▼
                    ┌─────────────────────────┐
                    │   Network Analysis      │
                    │                         │
                    │ NetworkX + GIS          │
                    │ Fault Localization      │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    Backend / APIs       │
                    │                         │
                    │ FastAPI                 │
                    │ PostgreSQL + PostGIS    │
                    │ WebSockets               │
                    └────────────┬────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             ▼                   ▼                   ▼
    ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
    │ Control Room   │  │ Field Engineer │  │    Consumer    │
    │   Dashboard    │  │    Interface   │  │     Portal     │
    └────────────────┘  └────────────────┘  └────────────────┘
```

---

## AI/ML Pipeline

```text
Grid Data
    │
    ▼
Data Preprocessing
    │
    ▼
Feature Engineering
    │
    ├───────────────► Isolation Forest
    │                  Anomaly Detection
    │
    ▼
XGBoost
    │
    ▼
Fault Classification / Prediction
    │
    ▼
NetworkX
    │
    ▼
Fault Localization
    │
    ▼
Affected Area Analysis
    │
    ▼
Recommended Inspection Points
```

---

## Machine Learning Models

### Isolation Forest

Isolation Forest is used for **anomaly detection**.

It identifies unusual patterns in electrical parameters that may indicate abnormal grid conditions or potential faults.

### XGBoost

XGBoost is used for **supervised fault prediction/classification**.

It can learn relationships between historical electrical conditions and known fault events to predict the probable fault type or severity.

### NetworkX

NetworkX is used to represent the electricity distribution system as a graph.

For example:

```text
Substation
    │
    ├── Feeder 1
    │      ├── Transformer 1
    │      │      ├── Village A
    │      │      └── Village B
    │      │
    │      └── Transformer 2
    │             └── Village C
    │
    └── Feeder 2
```

This allows the system to analyze connectivity and determine potentially affected downstream areas.

---

## Technology Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Leaflet
* OpenStreetMap
* Recharts

### Backend

* Python
* FastAPI
* WebSockets

### AI/ML

* Python
* Scikit-learn
* XGBoost
* Pandas
* NumPy
* NetworkX

### Database

* PostgreSQL
* PostGIS

### Infrastructure / Supporting Technologies

* Redis
* REST APIs
* WebSockets
* Git & GitHub

---

## User Interfaces

### Control Room

The control-room dashboard provides:

* Network visualization
* Live fault alerts
* Fault prediction
* Affected-area analysis
* AI confidence score
* Crew management
* Restoration tracking

### Field Engineer

The field interface provides:

* Assigned fault list
* Fault location
* AI-predicted cause
* Recommended inspection point
* Navigation support
* Image upload
* Status updates

### Consumer

The consumer portal provides:

* Outage reporting
* Outage status
* Estimated restoration time
* Service updates

---

## Example Workflow

```text
1. Electrical data is received
            ↓
2. Data is validated and processed
            ↓
3. Isolation Forest detects abnormal behavior
            ↓
4. XGBoost predicts fault type/severity
            ↓
5. NetworkX analyzes grid topology
            ↓
6. Probable fault location is identified
            ↓
7. Affected villages are calculated
            ↓
8. Recommended inspection points are generated
            ↓
9. Nearest field crew is identified
            ↓
10. Field engineer receives the assignment
            ↓
11. Engineer inspects and updates the fault
            ↓
12. Control room tracks restoration progress
```

---

## Target Users

* Electricity Distribution Companies
* Rural Electricity Boards
* Control Room Operators
* Field Engineers
* Maintenance Teams
* Rural Electricity Consumers
* Grid Monitoring Authorities

---

## Social Impact

The system is designed to improve the reliability and efficiency of electricity distribution in rural areas.

Expected benefits include:

* Faster fault localization
* Reduced restoration time
* Improved field-team coordination
* Better visibility of affected areas
* Reduced unnecessary field inspections
* Improved electricity service reliability
* Better decision-making for distribution operators

---

## Future Scope

* Real-time IoT sensor integration
* Integration with SCADA systems
* Predictive maintenance
* Advanced load forecasting
* Weather-aware fault prediction
* Computer vision for equipment inspection
* Automatic crew dispatch optimization
* Digital twin of the electricity distribution network
* Reinforcement learning for restoration optimization
* Integration with existing electricity-board systems

---

## Project Structure

```text
ai-rural-electricity-fault-localization/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── ...
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── ml/
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── ml/
│   ├── datasets/
│   ├── notebooks/
│   ├── preprocessing/
│   ├── models/
│   └── training/
│
├── database/
│   ├── schema/
│   └── seeds/
│
├── docs/
│   ├── architecture/
│   └── screenshots/
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

* Python 3.10+
* Node.js 18+
* npm
* PostgreSQL
* Git

### Clone the Repository

```bash
git clone https://github.com/<your-username>/ai-rural-electricity-fault-localization.git

cd ai-rural-electricity-fault-localization
```

### Backend Setup

```bash
cd backend

python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

The frontend will run locally at:

```text
http://localhost:3000
```

---

## API

The backend exposes REST APIs for:

* Fault detection
* Fault prediction
* Fault localization
* Network information
* Village/transformer data
* Crew management
* Fault status updates
* Consumer outage reports

API documentation is available through FastAPI's interactive documentation when the backend is running.

---

## Project Status

**Status: In Development**

Current development focuses on:

* AI-based fault detection
* Fault localization
* Electricity network modeling
* Control-room dashboard
* Field engineer workflow
* Consumer outage reporting
* Real-time fault monitoring

---

## Team

Developed as an **Innovate / Hackathon Project** focused on applying AI to improve rural electricity distribution and fault management.

---

## License

This project is intended for educational, research, and hackathon purposes.
