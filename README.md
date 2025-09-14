# ⛅ Weather Dashboard

A full-stack **Weather Dashboard** that allows users to check real-time and hourly weather details for any location, save them for future reference, and personalize their experience with themes and settings.  
The app integrates **Google OAuth** for authentication and serves frontend and backend from a different server.

---

## ✨ Features

- 🔑 **Google OAuth Authentication** – Sign in securely with Google  
- 🌍 **Weather Search** – Search for any location and view weather details  
- ⏳ **Hourly Forecast** – Get accurate hourly weather updates  
- 📌 **Save Locations** – Bookmark favorite locations for quick access  
- ⚙️ **User Settings** *(login required)*  
  - Change units (°C / °F, km/h / mph)  
  - Manage/remove saved locations  
- 🌙 **Dark Mode / Light Mode** toggle  
- 🔍 **Search Bar** for entering locations  
- 📱 Responsive design for desktop & mobile  

---

## 🛠️ Tech Stack

- **Frontend:** React,TailwindCSS,Typescript  
- **Backend:** Node.js / Express (serving frontend + API handling)  
- **Authentication:** Google OAuth  
- **API Integration:** Weather API (e.g., OpenWeatherMap)  
- **Deployment:** Render / GitHub  

---


## 🔗 Live Demo

👉 [Check it here](https://parthrawat1302.github.io/Weather-Dashboard/)

---

## 📦 Setup & Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd MAUSAM
2.**Install dependencies**
   cd backend
      npm install
   cd frontend 
      npm install
3.**Add Environment Variables**
    # Server Configuration
    PORT=5000
    NODE_ENV=development
    CLIENT_ORIGIN=http://localhost:5173
    # JWT Configuration
    JWT_ACCESS_SECRET=32_bit_random_Secret
    JWT_REFRESH_SECRET=32_bit_random_Secret
    JWT_ACCESS_EXPIRES=15m
    JWT_REFRESH_EXPIRES=7d
    # Google OAuth Configuration
    GOOGLE_CLIENT_ID=Enter_Your_Client_ID
    GOOGLE_CLIENT_SECRET=Enter_Your_Client_Secret
    GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
    # Weather API Configuration
    OPENWEATHER_API_KEY=Enter_Your_Key
    # Geocoding Configuration
    GEOCODING_PROVIDER=opencage
    GEOCODING_API_KEY= Enter_Your_Key
    # Database
    DATABASE_URL="mysql://Username:password@localhost:3306/Mausam"

4.**Run the server**
    cd backend
      npx prisma generate
      npm run dev
    cd frontend 
      npm run dev
5.**Open http://localhost:5000 in your browser**

---

## 📬 Connect With Me

1.LinkedIn(https://www.linkedin.com/in/parth-rawat-398a95291/)
2.GitHub(https://github.com/ParthRawat1302)
3.Email(parthrawat0987654321@gmail.com)

