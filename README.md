# Dardasha - Real-time Chat Application

A modern real-time chat application built with the MERN stack that enables users to connect, chat, and practice language learning with friends around the world.

## 🚀 Features

- **Real-time Messaging**: Instant chat functionality with WebSocket support
- **User Authentication**: Secure signup, login, and JWT-based authentication
- **Friend System**: Send, accept, and manage friend requests
- **User Profiles**: Customizable profiles with bio, profile picture, and language preferences
- **Language Learning**: Set native and learning languages to connect with language exchange partners
- **Location-based**: Share your location to find nearby language partners
- **Onboarding Process**: Guided setup for new users
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.io** - Real-time communication
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Stream Chat** - Chat infrastructure

### Frontend (Expected)
- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/a-basuony/Dardasha_real_time_chat_backend.git
   cd Dardasha_real_time_chat_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5001
   MONGO_URI=mongodb://127.0.0.1:27017/dardasha
   STEAM_API_KEY=your_stream_api_key
   STEAM_API_SECRET=your_stream_api_secret
   JWT_SECRET_KEY=your_long_random_jwt_secret
   NODE_ENV=development
   ```

**Security note:** Use your own credentials in the ignored `.env` file only. A MongoDB Atlas URI with credentials was previously committed to `.env.example`; **rotate/revoke that database user's password in Atlas immediately**, assess access logs and deployed environments, and never treat deleting the file from the latest commit as a way to erase its Git history. The current code uses `STEAM_API_KEY`/`STEAM_API_SECRET` names (a legacy spelling) for Stream Chat credentials.

4. **Start the development server**
   ```bash
   npm run dev
   ```

   For production:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── lib/            # Utility functions and database connection
│   ├── middleware/     # Custom middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   └── server.js       # Main server file
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/search` - Search for users
- `POST /api/users/friend-request` - Send friend request
- `PUT /api/users/friend-request/:requestId` - Accept/reject friend request

### Chat
- `GET /api/chats` - Get user's chat conversations
- `POST /api/chats` - Create new chat
- `GET /api/chats/:chatId/messages` - Get chat messages

## 🗄️ Database Schema

### User Model
```javascript
{
  fullName: String,
  email: String (unique),
  password: String (hashed),
  bio: String,
  profilePic: String,
  nativeLanguage: String,
  learningLanguage: String,
  location: String,
  isOnboarded: Boolean,
  friends: [ObjectId],
  timestamps: true
}
```

### FriendRequest Model
```javascript
{
  sender: ObjectId (ref: User),
  recipient: ObjectId (ref: User),
  status: String (pending/accepted),
  timestamps: true
}
```

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- CORS configuration
- Input validation and sanitization
- Secure cookie handling

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET_KEY` | JWT signing secret | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |

## 📝 Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify network connectivity

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill the process using the port

3. **JWT Token Issues**
   - Ensure JWT_SECRET_KEY is set in `.env`
   - Check token expiration

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Happy Chatting! 🎉**
