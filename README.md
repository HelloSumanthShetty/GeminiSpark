#  AI + MERN Stack App

A full-stack **AI-powered web app** built using the **MERN stack**, **Gemini API** for intelligent responses, and **ImageKit** for image generation and optimization.  
Includes a **modern responsive UI**, **dark/light mode**, and **secure authentication system**.

---

##  Features

 **Modern Full-Stack Setup**
- Frontend: React + Tailwind CSS (with Dark/Light mode)
- Backend: Node.js + Express + MongoDB (Mongoose)
- Authentication: JWT + bcrypt + protected routes
- AI Integration: Google Gemini API (via REST)
- Image Handling: ImageKit for generation & optimization
- Fully responsive and accessible UI

 **Core Functionalities**
- User authentication (Signup/Login/Logout)
- Image generation from text using ImageKit
- AI-based responses from Gemini API
- Dark and Light themes with persistent state
- Dashboard for managing generated images and AI prompts
- Saved prompt history for each user

---

# Setup Environment Variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id


##  Setup & Installation

git clone https://github.com/HelloSumanthShetty/GeminiSpark.git
cd GeminiSpark

cd backend && npm install
cd ../client && npm install

---

Backend:

npm run dev

Client:

npm run dev

Access the app at http://localhost:5173
