# Spotify Backend API

A RESTful backend for a Spotify-style music streaming application built with Node.js, Express, and MongoDB. It includes authentication, role-based authorization, music and album management, and media uploads.

## Features

- User registration and login
- JWT authentication with HTTP cookies
- Role-based access (User & Artist)
- Artist-only music uploads
- Artist-only album management
- Public music and album endpoints
- ImageKit integration
- MongoDB with Mongoose

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- Multer
- ImageKit

## Project Structure

```text
backend/
└── src/
    ├── controllers/
    ├── db/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── services/
    └── app.js
```

## Installation

### Clone the repository

```bash
git clone <your-repository-url>
cd <repository-name>
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

### Run the project

```bash
npm run dev
```

or

```bash
npm start
```

## API Features

### Authentication

- Register
- Login
- Logout
- JWT authentication

### Music

- Upload music (Artist only)
- Get all songs
- Get a single song
- Stream music

### Albums

- Create album (Artist only)
- Get all albums
- Get album details

## Security

- Password hashing with bcryptjs
- JWT-protected routes
- Role-based authorization
- Cookie-based authentication

## License

This project is for learning purposes.
