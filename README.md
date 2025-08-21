# 🥾 WalkRoute

A full-stack web app that generates a walking loop of a user-defined distance, starting and ending at a specific address. It visualizes the route on an interactive map using React and Leaflet, with backend routing powered by OpenRouteService and FastAPI.

---

## 🚀 Features

- 🔎 Search by **address**
- 📏 Specify a **distance** in kilometers
- 🗺️ Generates a looped **walking route** that starts and ends at the same location
- 🌍 Visualized on an interactive **OpenStreetMap**
- ⚙️ Backend uses **FastAPI**, **Nominatim**, and **OpenRouteService**

---

## 🧱 Tech Stack

| Layer      | Tech                     |
|------------|--------------------------|
| Frontend   | React + TypeScript       |
| Mapping    | Leaflet.js + OpenStreetMap |
| Backend    | FastAPI (Python)         |
| Geocoding  | Nominatim API            |
| Routing    | OpenRouteService         |

---

## 📂 Folder Structure


```plaintext
walk-route-webapp/
├── backend/
│   ├── __pycache__/
│   ├── .env
│   ├── .gitignore
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.tsx
│   │   ├── declarations.d.ts
│   │   ├── index.css
│   │   └── index.tsx
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## ⚙️ Getting Started

### 🔧 Prerequisites

- Node.js + npm
- Python 3.10+
- [OpenRouteService API key](https://openrouteservice.org/dev/#/signup)

---

### ▶️ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs the frontend at: http://localhost:3000

---

### ▶️ Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs the backend at: http://localhost:8000

---

### 🌍 Environment Setup

Create a .env file in the backend/ folder:

```bash
ORS_API_KEY=your_openrouteservice_api_key
```

✅ Do not commit .env to version control. Make sure .gitignore excludes it.

---

### 🧪 Example API

```bash
POST /route
```

Request:

```json
{
  "address": "London",
  "distance": 2.5
}
```

Response:

```json
{
  "route": [[51.51, -0.12], [51.52, -0.13], ...]
}
```

---

# 🙌 Acknowledgements

- OpenRouteService

- OpenStreetMap

- React Leaflet

- FastAPI

---

# 📌 To Do

There is much to be added, a concrete list will be added soon.

---