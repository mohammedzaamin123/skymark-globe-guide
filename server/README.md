
# Skymark Backend

This is the backend server for the Skymark Study Abroad Assistant application. It provides APIs for chat functionality, connecting OpenAI with MongoDB for persistence.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the server directory (use `.env.example` as a template)
   ```
   cp .env.example .env
   ```

3. Fill in your MongoDB connection string and OpenAI API key in the `.env` file

4. Start the server:
   ```
   npm start
   ```
   
   For development with auto-reload:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /api/chat/history/:userId` - Get chat history for a specific user
- `GET /api/chat/messages/:userId` - Get individual messages for a specific user
- `POST /api/chat/message` - Send a message and get AI response
- `DELETE /api/chat/history/:userId` - Delete chat history for a specific user
- `GET /api/health` - Health check endpoint

## Technologies Used

- Node.js/Express - Server framework
- MongoDB - Database
- OpenAI - AI completion API
