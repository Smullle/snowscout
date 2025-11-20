# ❄️ SnowScout

A modern web application for searching used ski and snowboard gear on Japanese marketplaces, with intelligent gear recommendations and price comparisons.

## 🎯 Features

- **🔍 Smart Gear Search**: Search for used ski and snowboard equipment across Japanese marketplaces (Mercari, 2ndstreet)
- **💡 Personalized Recommendations**: Get gear recommendations based on your skill level, activity type, and budget
- **💰 Price Comparison**: Compare used gear prices with retail prices and see USD conversions
- **🌏 Dual Data Sources**: Choose between global and Japan-specific gear recommendations
- **⚡ Real-time Search**: Fast, responsive search with live results

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Vanilla CSS** - Custom styling with modern design patterns

### Backend
- **FastAPI** - High-performance Python web framework
- **Uvicorn** - ASGI server
- **Mercapi** - Mercari marketplace integration
- **DuckDuckGo Search** - Web scraping for gear information

## 📁 Project Structure

```
snowscout/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── data/         # Gear recommendation data
│   │   └── App.jsx       # Main application component
│   └── public/           # Static assets
├── backend/              # FastAPI backend
│   ├── main.py          # API endpoints
│   ├── models.py        # Data models
│   └── services/        # Business logic
│       ├── mercari.py   # Mercari search integration
│       └── recommendations.py  # Gear recommendation engine
├── scripts/             # Utility scripts
└── ski-snowboard-gear-guide*.md  # Gear data sources
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+
- **pip** for Python package management

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd snowscout
   ```

2. **Set up the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   The API will be available at `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 📖 API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation.

### Key Endpoints

- `GET /` - Health check
- `POST /recommendations` - Get personalized gear recommendations
- `GET /search?query={query}` - Search for used gear

## 🎨 Features in Detail

### Gear Search
Search for used ski and snowboard equipment with:
- Real-time results from Japanese marketplaces
- Price display in both JPY and USD
- Direct links to product listings
- Image previews

### Gear Recommendations
Get personalized recommendations based on:
- **Activity Type**: Skiing, Snowboarding, or Both
- **Skill Level**: Beginner, Intermediate, Advanced, Expert
- **Price Range**: Budget, Mid-Range, High-End
- **Gear Category**: All essential equipment categories

### Data Sources
- **Global Recommendations 2025**: Comprehensive international gear guide
- **Japan Recommendations 2025**: Japan-specific gear recommendations

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Development
```bash
cd backend
uvicorn main:app --reload  # Start with auto-reload
```

## 📦 Deployment

The application is configured for deployment on Railway:

1. Connect your GitHub repository to Railway
2. Railway will automatically detect the frontend and backend
3. Set environment variables as needed
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Gear data sourced from comprehensive 2025 ski and snowboard equipment guides
- Japanese marketplace integration via Mercapi
- Built with modern web technologies for optimal performance

---

**Made with ❄️ for snow sports enthusiasts**
