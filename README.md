Song App Frontend
Overview
The Song App Frontend is a React-based web application that provides a user-friendly interface for the Song App, a music streaming platform. It allows users to register, log in, browse songs, save favorites, and listen to music via Spotify embeds. The frontend communicates with the Song App Backend (Node.js/Express) and is deployed on Vercel (https://song-app-client.vercel.app).
Features

User Authentication: Register and login with email/password, featuring "Remember Me" with customizable session durations (30 days, 6 months, forever).
Song Browsing: Displays songs from MongoDB Atlas with Spotify embeds.
Favorites: Save and manage favorite songs.
Responsive Design: Tailwind CSS for mobile-friendly UI.
Voice Search: Experimental voice search for songs.
Deployment: Hosted on Vercel for fast, scalable access.

Prerequisites

Node.js: Version 22.15.0 or higher.
Song App Backend: A running instance (https://song-app-server.onrender.com or local http://localhost:5000).
Vercel Account: For deployment.
Spotify Account: Required to listen to music via Spotify embeds.
GitHub Account: For repository management.

Setup Instructions

Clone the Repository:
git clone https://github.com/Nishucode/song-app-client.git
cd song-app-client


Install Dependencies:
npm install

Dependencies include react, react-router-dom, axios, and tailwindcss.

Configure Backend URL:

Open src/components files (Register.js, Login.js, SongList.js, Favorites.js).
Ensure API calls use the deployed backend:axios.post('https://song-app-server.onrender.com/api/auth/register', { ... });


For local testing, use http://localhost:5000.


Run Locally:
npm start


Opens http://localhost:3000 in your browser.
Requires the backend to be running.


Deploy to Vercel:

Create a Vercel account and link your GitHub repository.
Set up a new project:
Repository: Nishucode/song-app-client.
Framework: React.
Build Command: npm run build.
Output Directory: build.


Deploy and verify at https://song-app-client.vercel.app.



Security Precautions

API Calls: Use HTTPS for backend requests (https://song-app-server.onrender.com).
Sensitive Data: Avoid hardcoding backend URLs or tokens in source code. Use environment variables for production (e.g., Vercel environment variables).
Git Ignore: Ensure .gitignore includes:node_modules/
.env
build/


Token Storage: JWTs are stored in localStorage. For production, consider secure alternatives like HTTP-only cookies.
Input Validation: Relies on backend validation (express-validator). Do not bypass frontend checks.

Troubleshooting

"Registration Failed":
Verify backend URL in src/components.
Check Render logs for MongoDB connection errors.
Increase axios timeout (e.g., { timeout: 60000 }) for Render cold starts.


Slow Loading: Render’s free tier may cause delays. Ensure UptimeRobot pings the backend’s /health endpoint.
Spotify Embeds: Ensure a valid Spotify account is logged in. Check Spotify’s Terms of Service.

Disclaimer

Study Purpose Only: This project is intended for educational and learning purposes only. It is not designed or licensed for commercial use.
Spotify Account Required: A valid Spotify account is required to listen to music, as the app uses Spotify embeds for streaming. Ensure compliance with Spotify’s Terms of Service.
No Warranty: The software is provided "as is" without any warranties, express or implied. Use at your own risk.
Data Privacy: Do not store sensitive personal data in the app. Ensure compliance with data protection laws (e.g., GDPR, CCPA) if applicable.
Third-Party Services: The app relies on Vercel, Render, MongoDB Atlas, and Spotify. Review their respective terms and privacy policies.

Contributing
Contributions are welcome for educational purposes. Please:

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit changes (git commit -m 'Add YourFeature').
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.

License
MIT License - Free to use, modify, and distribute for non-commercial educational purposes.
