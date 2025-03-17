# Chat Room Application

A real-time chat room application where users can join with their name, send messages, and see messages in real time. The backend is built with Express and MongoDB, while the frontend is developed using React and Tailwind CSS. Real-time messaging is handled via **Socket.io**.

## Features
- User can join the chat room with a name.
- Users can send and receive messages in real-time.
- Messages are stored in MongoDB.
- Responsive design using Tailwind CSS.

---

## Project Setup

### Prerequisites

- **Node.js** and **npm** (or **Yarn**) installed on your system.
- **MongoDB** running locally or remotely (e.g., MongoDB Atlas).

---

### Backend Setup

1. **Clone the repository**

   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/RESTfulAyush/Chat-room.git
   cd Chat-Room
   ```

2. **Install Dependencies**

   Navigate to the backend folder and install the required dependencies:

   ```bash
   cd chat-backend
   npm install
   ```

3. **MongoDB Setup**

   - Make sure MongoDB is running locally or sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud database.
   - Cretae a .env file and Replace the MongoDB connection string with your own MongoDB URI:

  ```javascript
  const mongoose = require("mongoose");
  require("dotenv").config();

  const connectDb = async () => {
    try {
      const connect = await mongoose.connect(process.env.CONNECTION_STRING);
      console.log(
        "Connected :",
        connect.connection.host,
        connect.connection.name
      );
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };

  module.exports = connectDb;
```

4. **Run the Backend Server**

   Start the backend server:

   ```bash
   node server.js
   ```

   The server will run on `http://localhost:4000`.

---

### Frontend Setup

1. **Install Dependencies**

   Navigate to the frontend folder and install the required dependencies:

   ```bash
   cd chat-frontend
   npm install
   ```

2. **Update Socket Connection URL**

   In `ChatRoom.js`, ensure that the frontend is pointing to the correct backend server URL for Socket.io and API requests:

   ```javascript
   const socket = io("http://localhost:4000");  // Backend socket URL
   ```

3. **Run the Frontend Server**

   Start the frontend server:

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

---

### Notes

- The backend uses **Socket.io** to handle real-time communication.
- **MongoDB** stores messages and is queried when the app is loaded or when new messages are sent.
- The frontend uses **React** for the UI and **Tailwind CSS** for styling.
- CORS has been configured to allow communication between the frontend (running on `http://localhost:3000`) and the backend (running on `http://localhost:4000`).

---

### Usage

1. Start the backend server (`node server.js`).
2. Start the frontend server (`npm start`).
3. Open the app in a web browser (`http://localhost:3000`).
4. Join the chat room by entering a name and sending messages.
5. See messages update in real time as other users send messages.

---

## Project Structure

### Backend

- **`server.js`**: Express server handling REST API routes and Socket.io integration.
- **`dbConnection.js`**: MongoDB connection setup.
- **`models/ChatMessage.js`**: Mongoose schema for chat messages.

### Frontend

- **`src/App.js`**: Main entry point for React application.
- **`src/ChatRoom.js`**: Contains the chat room logic, including message sending, receiving, and real-time updates using Socket.io.
