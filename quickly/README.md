<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->

<!--  -->
Quickly - A Multi-Language News Platform
Overview
Quickly is a full-stack web application that allows users to read and publish news articles in multiple languages. It features a responsive React frontend, a Node.js/Express backend, and MongoDB for data storage. Users can switch languages, toggle dark mode, filter news by category, and add news via a modal.
Features

Multi-Language Support: Supports English, Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi, and Odia.
Dynamic News Feed: Fetches and displays news from a backend API.
Tabs: View news in Feed, Trending, and Daily Digest modes.
Dark Mode: Toggle between light and dark themes.
Sidebar: Filter news by categories (e.g., Tech, Sports, World).
Modal: Add new news articles with title, summary, category, and optional media.
Search: Search news by title, summary, or category.

Project Structure
quickly/
├── backend/
│   ├── server.js          # Node.js/Express backend with MongoDB
│   ├── node_modules/      # Backend dependencies
│   └── package.json       # Backend dependencies and scripts
├── public/
│   └── quickly.png        # Placeholder for logo (to be added later)
├── src/
│   ├── assets/
│   │   └── styles.css     # Global styles
│   ├── components/
│   │   ├── Navbar.jsx     # Navbar component
│   │   ├── Sidebar.jsx    # Sidebar for category filtering
│   │   ├── Tabs.jsx       # Tabs for Feed/Trending/Digest
│   │   ├── NewsCard.jsx   # Component to display individual news items
│   │   └── Modal.jsx      # Modal for adding news
│   ├── App.jsx            # Main React component
│   └── index.js           # React entry point
├── package.json           # Frontend dependencies and scripts
└── README.md              # Project documentation

Prerequisites

Node.js: v22.7.0 or later
MongoDB: Local instance or MongoDB Atlas
npm: For package management

Setup Instructions
1. Clone the Repository
git clone <repository-url>
cd quickly

2. Backend Setup

Navigate to the backend folder:cd backend


Install dependencies:npm install


Start MongoDB (if using a local instance):mongod

Or update server.js with your MongoDB Atlas connection string.
Run the backend:node server.js

You should see "Server running on port 5000" and "Connected to MongoDB".

3. Frontend Setup

Navigate to the project root:cd ..


Install dependencies:npm install


Run the frontend:npm run dev

Open http://localhost:3000 in your browser.

4. Test the App

View News: News fetched from the API will appear in the Feed tab.
Add News: Click the "+" button to open the modal and add a new article.
Switch Languages: Use the dropdown to change the UI language.
Filter Categories: Use the sidebar to filter news by category.
Toggle Dark Mode: Click the moon icon in the navbar.

API Endpoints

GET /api/news: Fetch all news articles.
POST /api/news: Add a new news article.
Example body:{
  "title": { "en": "Test News" },
  "summary": { "en": "Test summary" },
  "category": "tech",
  "language": "en"
}





Dependencies
Backend

express: Web framework
mongoose: MongoDB ORM
cors: Enable cross-origin requests

Frontend

react: Frontend library
axios: HTTP client for API calls
@fortawesome/react-fontawesome: Icons for UI

Future Improvements

Add pagination for the news feed.
Implement user authentication for posting news.
Add sorting options (e.g., by date or category).
Integrate the logo (currently deferred).

Contributing
Feel free to fork this repository, submit issues, or create pull requests to improve the app.
License
This project is licensed under the MIT License.
