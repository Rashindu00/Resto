# RestoApp - Restaurant Management System

A modern, full-stack restaurant management system built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: Secure login/register with JWT tokens
- **Role-Based Access**: Different permissions for customers, staff, and admins
- **Menu Management**: Browse and manage restaurant menu items
- **Order Processing**: Complete order workflow from cart to delivery
- **Admin Dashboard**: Comprehensive management tools for restaurant owners
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Beautiful, customizable icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd resto-upgrade
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Environment Variables

Create a `.env` file in the backend directory:
```bash
cd backend
```

Add the following variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

### 5. Frontend Environment Variables

Make sure the frontend `.env` file exists:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**
```bash
cd backend
npm run dev
```
The backend server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the Frontend**
```bash
npm run build
```

2. **Start the Backend**
```bash
cd backend
npm start
```

## 📁 Project Structure

```
resto-upgrade/
├── public/                 # Static files
├── src/                   # Frontend source code
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── context/          # React context providers
│   ├── utils/            # Utility functions
│   └── assets/           # Images, icons, etc.
├── backend/              # Backend source code
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API route handlers
│   └── server.js         # Express server setup
├── .github/              # GitHub specific files
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get menu item by ID
- `POST /api/menu` - Create new menu item (Admin)
- `PUT /api/menu/:id` - Update menu item (Admin)
- `DELETE /api/menu/:id` - Delete menu item (Admin)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status
- `PATCH /api/orders/:id/payment` - Update payment status

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)

## 👥 User Roles

### Customer
- Browse menu
- Place orders
- View order history
- Manage profile

### Staff
- View and manage orders
- Update order status
- Access basic analytics

### Admin
- Full access to all features
- Manage menu items
- Manage users
- View comprehensive analytics
- System configuration

## 🧪 Demo Accounts

For testing purposes, you can create demo accounts:

**Admin Account:**
- Email: admin@demo.com
- Password: password123

**Customer Account:**
- Email: customer@demo.com
- Password: password123

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

If you encounter any issues or need support, please open an issue on the GitHub repository.

## 🚧 Roadmap

- [ ] Payment gateway integration
- [ ] Real-time order tracking
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-restaurant support
- [ ] Inventory management

---

Made with ❤️ by the RestoApp Team+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
