#  AI + MERN Stack App

A full-stack **AI-powered web app** built using the **MERN stack**, **Gemini API** for intelligent responses, and **ImageKit** for image generation and optimization.  
Includes a **modern responsive UI**, **dark/light mode**, **secure authentication system**, and a **Movies & TV Shows management feature**.

---

##  Features

 **Modern Full-Stack Setup**
- Frontend: React + Vite + TypeScript + Tailwind CSS (with Dark/Light mode)
- Backend: Node.js + Express + MongoDB (Mongoose) + SQLite (Prisma)
- Authentication: JWT + bcrypt + protected routes
- AI Integration: Google Gemini API (via REST)
- Image Handling: ImageKit for generation & optimization
- Data Validation: Zod schema validation
- Fully responsive and accessible UI

 **Core Functionalities**
- User authentication (Signup/Login/Logout)
- Image generation from text using ImageKit
- AI-based responses from Gemini API
- Dark and Light themes with persistent state
- Dashboard for managing generated images and AI prompts
- Saved prompt history for each user
- **NEW**: Movies & TV Shows management with CRUD operations and infinite scroll

 **Movies & TV Shows Feature**
- Add, view, edit, and delete favorite movies and TV shows
- Infinite scroll table for browsing entries
- Detailed information tracking (title, type, director, budget, location, duration, year/time)
- RESTful API with pagination support
- Form validation and error handling
- Responsive modal-based forms
- See [MEDIA_FEATURE.md](./MEDIA_FEATURE.md) for detailed documentation

---

# Setup Environment Variables

## Backend (.env)
```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Gemini API (optional - for AI chat features)
GEMINI_API_KEY=your_gemini_api_key

# ImageKit Configuration (optional - for image generation features)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Database for Media feature
DATABASE_URL="file:./prisma/dev.db"
```

## Client (.env)
```env
VITE_SERVER_URL=http://localhost:3000
```

##  Setup & Installation

```bash
git clone https://github.com/HelloSumanthShetty/GeminiSpark.git
cd GeminiSpark

# Backend setup
cd backend && npm install
npx prisma generate
npx prisma migrate dev
npm run seed  # Optional: Add sample media data
npm run build

# Client setup
cd ../client && npm install
npm run build
```

---

## Running the Application

**Backend:**
```bash
cd backend
npm run dev  # Development mode with hot reload
# OR
npm start    # Production mode
```

**Client:**
```bash
cd client
npm run dev     # Development mode
# OR
npm run preview # Preview production build
```

Access the app at http://localhost:5173

---

## Project Structure

```
GeminiSpark/
├── backend/
│   ├── src/
│   │   ├── config/        # Configuration files (GenAI, ImageKit)
│   │   ├── controller/    # Request handlers
│   │   ├── model/         # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Authentication middleware
│   │   └── utils/         # Validation schemas
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema for Media
│   │   ├── migrations/    # Database migrations
│   │   └── seed.ts        # Sample data
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components (Login, Community, Media)
│   │   ├── context/       # React context providers
│   │   └── hooks/         # Custom React hooks
│   └── package.json
└── MEDIA_FEATURE.md       # Detailed Media feature documentation
```

## API Documentation

### Media Management Endpoints

- `GET /api/media` - Get all media entries (with pagination)
- `POST /api/media` - Create a new media entry
- `GET /api/media/:id` - Get a specific media entry
- `PUT /api/media/:id` - Update a media entry
- `DELETE /api/media/:id` - Delete a media entry

See [MEDIA_FEATURE.md](./MEDIA_FEATURE.md) for complete API documentation with examples.

---

## Technologies Used

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- Axios for HTTP requests
- React Hot Toast for notifications

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose (user data, chats)
- SQLite with Prisma (media entries)
- Zod for validation
- JWT for authentication
- bcrypt for password hashing

### External APIs
- Google Gemini API (AI responses)
- ImageKit (image generation/optimization)

---

## License

MIT
