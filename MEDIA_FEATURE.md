# Favorite Movies & TV Shows Feature

This feature allows users to manage a list of their favorite movies and TV shows with full CRUD operations and infinite scrolling.

## Features

### Core Functionality
- **Add New Entry**: Create new movie or TV show entries with detailed information
- **View All Entries**: Display all records in a table format with infinite scroll
- **Edit Entry**: Update any detail of existing entries
- **Delete Entry**: Remove entries with confirmation prompt
- **Infinite Scroll**: Automatically load more entries as you scroll down

### Data Fields
Each entry captures the following information:
- Title
- Type (Movie or TV Show)
- Director
- Budget
- Location (filming location)
- Duration
- Year/Time (release year or time period)

## Technical Stack

### Backend
- **Framework**: Node.js with Express
- **Database**: SQLite (can be changed to MySQL/PostgreSQL)
- **ORM**: Prisma
- **Validation**: Zod
- **Language**: TypeScript

### Frontend
- **Framework**: React with Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## API Endpoints

All endpoints are prefixed with `/api/media`

### GET `/api/media`
Retrieve all media entries with pagination

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Number of items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Inception",
      "type": "Movie",
      "director": "Christopher Nolan",
      "budget": "$160M",
      "location": "Los Angeles, Paris, Tokyo",
      "duration": "148 min",
      "yearTime": "2010",
      "createdAt": "2025-10-27T22:01:09.965Z",
      "updatedAt": "2025-10-27T22:01:09.965Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalCount": 5,
    "totalPages": 1,
    "hasMore": false
  }
}
```

### POST `/api/media`
Create a new media entry

**Request Body:**
```json
{
  "title": "The Matrix",
  "type": "Movie",
  "director": "The Wachowskis",
  "budget": "$63M",
  "location": "Sydney, Australia",
  "duration": "136 min",
  "yearTime": "1999"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 6,
    "title": "The Matrix",
    "type": "Movie",
    "director": "The Wachowskis",
    "budget": "$63M",
    "location": "Sydney, Australia",
    "duration": "136 min",
    "yearTime": "1999",
    "createdAt": "2025-10-27T22:10:00.000Z",
    "updatedAt": "2025-10-27T22:10:00.000Z"
  }
}
```

### GET `/api/media/:id`
Get a single media entry by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Inception",
    ...
  }
}
```

### PUT `/api/media/:id`
Update a media entry

**Request Body:** (all fields optional)
```json
{
  "title": "Inception (Updated)",
  "budget": "$160M (updated)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Inception (Updated)",
    ...
  }
}
```

### DELETE `/api/media/:id`
Delete a media entry

**Response:**
```json
{
  "success": true,
  "message": "Media entry deleted successfully"
}
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env`:
```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3000
MONGO_URL=your_mongodb_url  # for existing features
```

4. Run Prisma migrations:
```bash
npx prisma migrate dev
```

5. Generate Prisma Client:
```bash
npx prisma generate
```

6. (Optional) Seed the database with sample data:
```bash
npm run seed
```

7. Build and start the server:
```bash
npm run build
npm start
```

For development with hot reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env`:
```env
VITE_SERVER_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Database Schema

The Media table schema:

```prisma
model Media {
  id        Int      @id @default(autoincrement())
  title     String
  type      String   // "Movie" or "TV Show"
  director  String
  budget    String
  location  String
  duration  String
  yearTime  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("media")
}
```

## Validation Rules

Using Zod for schema validation:

- **title**: Required, 1-255 characters
- **type**: Required, must be "Movie" or "TV Show"
- **director**: Required, 1-255 characters
- **budget**: Required, string
- **location**: Required, string
- **duration**: Required, string
- **yearTime**: Required, string

## Usage

1. **Access the Feature**: Navigate to the "Movies & TV Shows" section from the sidebar
2. **Add Entry**: Click "Add New Entry" button and fill in the form
3. **View Entries**: Scroll through the table to see all entries
4. **Edit Entry**: Click "Edit" button on any row to modify the entry
5. **Delete Entry**: Click "Delete" button and confirm to remove an entry
6. **Infinite Scroll**: Scroll to the bottom of the table to load more entries automatically

## Sample Data

The seed file includes the following sample entries:
- Inception (2010)
- Breaking Bad (2008-2013)
- The Dark Knight (2008)
- Stranger Things (2016-Present)
- The Godfather (1972)

## Notes

- SQLite is used for development. For production with MySQL:
  1. Update `prisma/schema.prisma` datasource provider to `mysql`
  2. Update `DATABASE_URL` to MySQL connection string
  3. Run `npx prisma migrate dev` to create tables

- The infinite scroll loads 20 items per page by default
- All API requests include proper error handling and validation
- The frontend includes loading states and error notifications
