# Gyana.AI - Advanced AI Communication Platform

![Gyana.AI Banner](https://github.com/sakshamagarwalm2/Gyana.AI/blob/main/Public/home.png)

Deployed on [Vercel](https://gyana-ai.vercel.app/)

## 🤖 Overview

Gyana.AI is a sophisticated AI communication platform built on the LLaMA 70B model using the Groq API. This project combines cutting-edge AI technology with a cyberpunk-inspired user interface to create an engaging and powerful conversational AI experience.

## ✨ Features

- **Advanced AI Model**: Powered by LLaMA 70B model through Groq API
- **Cyberpunk UI**: Stunning sci-fi inspired interface with neon aesthetics
- **Real-time Communication**: Instant responses with WebSocket integration
- **Secure Authentication**: JWT-based user authentication system
- **Responsive Design**: Seamless experience across all devices
- **3D Animations**: Interactive background effects using Three.js and Vanta.js

## 🛠️ Tech Stack

### Frontend
- React.js with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Three.js & Vanta.js for 3D effects

### Backend
- Node.js with Express
- TypeScript for type safety
- MongoDB with Mongoose
- JWT for authentication
- Groq SDK for AI integration
- Express Validator for input validation
- Morgan for logging
- CORS for cross-origin support

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Groq API key
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/gyana-ai.git
cd gyana-ai
```

2. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env # Configure your environment variables
npm run dev
```

3. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env # Configure your environment variables
npm run dev
```

### Environment Variables

#### Frontend (.env)
```
VITE_REACT_APP_BACKEND_URL=
```

#### Backend (.env)
```
GROQ_API_KEY_SECRET=
GROQ_ORG_ID_SECRET=
MONGODB_URL=
MONGODB_ASTRALLINK_PASSWORD=
JWT_SECRET=
COOKIE_SECRET=
PORT=

FRONTEND_URL=
```

## 📁 Project Structure

```
gyana-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── styles/
│   │   └── utils/
│   └── public/
└── backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   └── utils/
    └── dist/
```

## 🖼️ Screenshots

![LoginSignup Page](https://github.com/sakshamagarwalm2/Gyana.AI/blob/main/Public/login.png)
*Landing page with cyberpunk theme*

![Chat Interface](https://github.com/sakshamagarwalm2/Gyana.AI/blob/main/Public/chat.png)
*AI chat interface with 3D background*

## 🔐 Security

- Implements JWT for secure authentication
- Password hashing using bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Saksham Agarwal**
- Software Developer passionate about AI, Machine Learning, and Web Development
- Focused on creating innovative solutions with meaningful impact
- "True wealth lies in knowledge—it holds the power to transform the world."

## Acknowledgments

- LLaMA model by Meta AI
- Groq API for AI processing
- Three.js community
- React and Node.js communities

## 📞 Contact

For questions and support, please email at [sakshamagarwalm2@gmail.com](sakshamagarwalm2@gmail.com)

---
Made with ❤️ by Saksham Agarwal | HKRM
