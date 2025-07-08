# Multi-Blockchain Portfolio Tracker

A full-stack MERN application that allows users to track their cryptocurrency portfolio across multiple blockchains using the Blockchair API.

## Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Multi-Blockchain Support**: Track addresses from Bitcoin, Ethereum, Dogecoin, Litecoin, and Bitcoin Cash
- **Real-time Portfolio Data**: Fetch live balance and value data from Blockchair API
- **Modern UI**: Clean, responsive design built with React and Tailwind CSS
- **Portfolio Management**: Add and remove wallet addresses with ease
- **Total Portfolio Value**: View consolidated portfolio value in USD

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Axios** - HTTP client for API requests

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Context API** - State management

## Project Structure

```
mern-portfolio-tracker/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── portfolioController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── portfolioRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Auth/
    │   │   │   ├── Login.js
    │   │   │   └── Register.js
    │   │   └── Portfolio/
    │   │       ├── Dashboard.js
    │   │       ├── AddressForm.js
    │   │       └── PortfolioCard.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── package.json
    └── tailwind.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Blockchair API key (optional, but recommended for production)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/portfolio-tracker
   JWT_SECRET=your_jwt_secret_key_here
   BLOCKCHAIR_API_KEY=your_blockchair_api_key_here
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Portfolio
- `GET /api/portfolio` - Get user's portfolio data
- `POST /api/portfolio/address` - Add a new address
- `DELETE /api/portfolio/address/:id` - Remove an address

## Usage

1. **Register/Login**: Create an account or sign in to access your portfolio
2. **Add Addresses**: Use the form to add wallet addresses from supported blockchains
3. **View Portfolio**: See your total portfolio value and individual address balances
4. **Manage Addresses**: Remove addresses you no longer want to track
5. **Refresh Data**: Click the refresh button to get the latest balance information

## Supported Blockchains

- Bitcoin (BTC)
- Ethereum (ETH)
- Dogecoin (DOGE)
- Litecoin (LTC)
- Bitcoin Cash (BCH)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Disclaimer

This application is for educational purposes. Always verify cryptocurrency balances through official sources before making financial decisions.
