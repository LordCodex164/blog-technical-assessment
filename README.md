# Blog REST API

A simple Blog REST API built with Node.js, Express.js, MongoDB, Mongoose, and TypeScript. This API demonstrates backend skills including authentication, authorization, relationships, and clean API design.

## Features

- **User Authentication**: JWT-based authentication with register and login endpoints
- **Post Management**: Full CRUD operations for blog posts
- **Authorization**: Role-based access control (users can only modify their own posts)
- **Filtering & Pagination**: Advanced filtering by search, tags, author, and status
- **Soft Delete**: Posts are soft-deleted (marked as deleted, not removed from database)
- **Input Validation**: Comprehensive validation using express-validator
- **Error Handling**: Centralized error handling middleware
- **Security**: Helmet, CORS, and rate limiting

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **TypeScript**: Type-safe JavaScript
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation

## Project Structure

```
blog-technical-assessment/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.ts    # Authentication logic
│   │   └── postController.ts    # Post CRUD logic
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication middleware
│   │   ├── authorize.ts         # Authorization middleware
│   │   └── errorHandler.ts     # Error handling middleware
│   ├── models/
│   │   ├── User.ts              # User model
│   │   └── Post.ts              # Post model
│   ├── routes/
│   │   ├── authRoutes.ts        # Auth routes
│   │   └── postRoutes.ts        # Post routes
│   ├── utils/
│   │   └── jwt.ts               # JWT utilities
│   └── validators/
│       ├── authValidator.ts     # Auth validation rules
│       └── postValidator.ts     # Post validation rules
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-technical-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update the following variables:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=3000
   ```

4. **Start MongoDB**
   - If using MongoDB Atlas, update `MONGODB_URI` with your connection string

5. **Build the project**
   ```bash
   npm run build
   ```

6. **Run the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Base URL

**Production**: `https://blog-technical-assessment.onrender.com`

**Local Development**: `http://localhost:3000`

## API Documentation

📚 **Postman Documentation**: [View API Documentation](https://documenter.getpostman.com/view/21411890/2sBXc8q4Zu)

The Postman documentation includes detailed request/response examples, authentication setup, and all available endpoints.

## API Endpoints

### Authentication

#### Register User
```http
POST https://blog-technical-assessment.onrender.com/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-02-07T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST https://blog-technical-assessment.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-02-07T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Posts

#### Create Post (Authenticated)
```http
POST https://blog-technical-assessment.onrender.com/api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "How Redis Caches HTTP Requests for Better Performance",
  "content": "Redis is an in-memory data structure store that can be used as a caching layer to significantly improve the performance of web applications.",
  "tags": ["redis", "caching", "performance", "backend", "api", "http", "optimization"],
  "status": "published"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "post": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "How Redis Caches HTTP Requests for Better Performance",
      "slug": "how-redis-caches-http-requests-for-better-performance-1707300000000",
      "content": "Redis is an in-memory data structure store that can be used as a caching layer to significantly improve the performance of web applications.",
      "author": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "status": "published",
      "tags": ["redis", "caching", "performance", "backend", "api", "http", "optimization"],
      "createdAt": "2026-02-07T10:00:00.000Z",
      "updatedAt": "2026-02-07T10:00:00.000Z"
    }
  }
}
```

#### Get All Posts (Public/Filtered)
```http
GET https://blog-technical-assessment.onrender.com/api/posts?page=1&limit=10&search=redis&tag=caching&status=published
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search in title or content
- `tag` (optional): Filter by tag
- `author` (optional): Filter by author ID
- `status` (optional): Filter by status (authenticated users only, can see their own drafts)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": {
    "posts": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "title": "How Redis Caches HTTP Requests for Better Performance",
        "slug": "how-redis-caches-http-requests-for-better-performance-1707300000000",
        "content": "Redis is an in-memory data structure store...",
        "author": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "status": "published",
        "tags": ["redis", "caching", "performance", "backend", "api", "http", "optimization"],
        "createdAt": "2026-02-07T10:00:00.000Z",
        "updatedAt": "2026-02-07T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

#### Get Single Post by Slug (Public)
```http
GET https://blog-technical-assessment.onrender.com/api/posts/how-redis-caches-http-requests-for-better-performance-1707300000000
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Post retrieved successfully",
  "data": {
    "post": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "How Redis Caches HTTP Requests for Better Performance",
      "slug": "how-redis-caches-http-requests-for-better-performance-1707300000000",
      "content": "Redis is an in-memory data structure store that can be used as a caching layer...",
      "author": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "status": "published",
      "tags": ["redis", "caching", "performance", "backend", "api", "http", "optimization"],
      "createdAt": "2026-02-07T10:00:00.000Z",
      "updatedAt": "2026-02-07T10:00:00.000Z"
    }
  }
}
```

#### Update Post (Author Only)
```http
PUT https://blog-technical-assessment.onrender.com/api/posts/507f1f77bcf86cd799439012
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "How Redis Caches HTTP Requests for Better Performance - Updated",
  "content": "Redis is an in-memory data structure store that can be used as a caching layer to significantly improve the performance of web applications. [Updated content with additional examples and best practices]...",
  "tags": ["redis", "caching", "performance", "backend", "api", "http", "optimization", "best-practices"],
  "status": "published"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "post": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "How Redis Caches HTTP Requests for Better Performance - Updated",
      "slug": "how-redis-caches-http-requests-for-better-performance-updated-1707300100000",
      "content": "Redis is an in-memory data structure store that can be used as a caching layer to significantly improve the performance of web applications."
      "author": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "status": "published",
      "tags": ["redis", "caching", "performance", "backend", "api", "http", "optimization", "best-practices"],
      "createdAt": "2026-02-07T10:00:00.000Z",
      "updatedAt": "2026-02-07T10:01:00.000Z"
    }
  }
}
```

#### Delete Post (Author Only - Soft Delete)
```http
DELETE https://blog-technical-assessment.onrender.com/api/posts/507f1f77bcf86cd799439012
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

## Authorization Rules

1. **Public Users**:
   - Can view published posts only
   - Cannot create, update, or delete posts

2. **Authenticated Users**:
   - Can create posts
   - Can view published posts + their own draft posts
   - Can filter by status, but will only see their own drafts when filtering by `status=draft`
   - Can only update/delete their own posts

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Common HTTP Status Codes:**
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (not authorized to perform action)
- `404`: Not Found (resource doesn't exist)
- `409`: Conflict (duplicate resource)
- `500`: Internal Server Error

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment (development/production) | No | development |
| `PORT` | Server port | No | 3000 |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT signing | Yes | - |
| `JWT_EXPIRES_IN` | JWT expiration time | No | 7d |

## Scripts

- `npm run dev`: Start development server with auto-reload
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Start production server
- `npm test`: Run tests
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Testing the API

You can test the API using:

1. **cURL**:
   ```bash
   # Register
   curl -X POST https://blog-technical-assessment.onrender.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
   
   # Login
   curl -X POST https://blog-technical-assessment.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"john@example.com","password":"password123"}'
   
   # Create Post (replace TOKEN with actual token)
   curl -X POST https://blog-technical-assessment.onrender.com/api/posts \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer TOKEN" \
     -d '{"title":"How Redis Caches HTTP Requests for Better Performance","content":"Redis is an in-memory data structure store that can be used as a caching layer to significantly improve the performance of web applications...","tags":["redis","caching","performance","backend","api"],"status":"published"}'
   
   # Get All Posts
   curl -X GET https://blog-technical-assessment.onrender.com/api/posts
   
   # Get Single Post by Slug
   curl -X GET https://blog-technical-assessment.onrender.com/api/posts/how-redis-caches-http-requests-for-better-performance-1707300000000
   ```

2. **Postman**: 
   - 📚 [View Interactive API Documentation](https://documenter.getpostman.com/view/21411890/2sBXc8q4Zu)
   - Import the endpoints and test with the Postman collection

3. **Thunder Client** (VS Code extension)

## Notes

- Passwords are hashed using bcryptjs before storage
- JWT tokens expire after 7 days (configurable via `JWT_EXPIRES_IN`)
- Posts use soft delete (deletedAt field) instead of hard delete
- Slug is auto-generated from title and made unique with timestamp
- Rate limiting is applied to all API routes (100 requests per 15 minutes per IP)

## License

MIT
