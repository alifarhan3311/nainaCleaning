# Cleaning Service

A production-level full-stack cleaning service application with React + Tailwind CSS frontend and Node.js + Express backend. Features include dynamic service management, contact form with admin panel, and role-based access control.

## Features

- **Public Pages**: Home, Services, Contact
- **Admin Panel**: Dashboard, Services Management, Messages Management
- **Authentication**: JWT-based auth with role-based access (admin/superadmin)
- **Dynamic Content**: Services managed via admin panel
- **Contact Form**: Stores messages in database with status tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Project Structure

```
cleaningService/
├── frontend/              # React + Tailwind CSS frontend
│   ├── components/       # Reusable components
│   │   ├── common/      # Navbar, Footer, Button, Input, etc.
│   │   ├── layout/      # Hero, Section
│   │   ├── services/    # ServiceCard, ServiceGrid
│   │   ├── contact/     # ContactForm
│   │   └── admin/       # AdminLayout, Sidebar, AdminHeader
│   ├── context/         # AuthContext, ToastContext
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   └── admin/       # Dashboard, ServicesManagement, MessagesManagement
│   ├── services/        # API service layer
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── serviceService.js
│   │   └── messageService.js
│   ├── App.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── backend/               # Node.js + Express backend
    ├── config/           # Configuration files
    │   └── db.js         # MongoDB connection
    ├── controllers/      # Route controllers
    │   ├── authController.js
    │   ├── serviceController.js
    │   └── messageController.js
    ├── middleware/       # Express middleware
    │   ├── auth.js
    │   ├── role.js
    │   ├── errorHandler.js
    │   ├── asyncHandler.js
    │   └── rateLimit.js
    ├── models/           # Mongoose models
    │   ├── Admin.js
    │   ├── Service.js
    │   └── Message.js
    ├── routes/           # API routes
    │   ├── auth.js
    │   ├── services.js
    │   └── messages.js
    ├── server.js         # Entry point
    ├── package.json
    ├── .env.example      # Environment variables template
    └── seed.js           # Seed script for initial admin
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```bash
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/cleaning-service
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

4. Create the initial superadmin user:
```bash
node seed.js
```
This will create a superadmin user with:
- Username: `admin`
- Email: `admin@example.com`
- Password: `Admin123!`
- Role: `superadmin`

**Important**: Change these credentials after first login!

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5001`

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```bash
VITE_API_URL=http://localhost:5001/api
VITE_API_TIMEOUT=30000
VITE_APP_NAME=Cleaning Service
VITE_APP_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

### Public Access
- Visit `http://localhost:3000` to view the public website
- Navigate to Home, Services, and Contact pages
- Submit contact form messages

### Admin Access
1. Navigate to `http://localhost:3000/login`
2. Login with the superadmin credentials (from seed script)
3. Access the admin panel at `http://localhost:3000/admin`
4. Manage services and view messages

### Admin Features
- **Dashboard**: View statistics and recent messages
- **Services Management**: Add, edit, delete, and toggle service visibility
- **Messages Management**: View all messages, update status, reply via email, delete

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login admin
- `POST /api/auth/register` - Register new admin (superadmin only)
- `POST /api/auth/verify` - Verify JWT token
- `POST /api/auth/logout` - Logout

### Services
- `GET /api/services` - Get all services (public)
- `GET /api/services/:id` - Get single service (public)
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)
- `PATCH /api/services/:id/toggle` - Toggle service status (admin)

### Messages
- `GET /api/messages` - Get all messages (admin)
- `GET /api/messages/:id` - Get single message (admin)
- `POST /api/messages` - Submit contact form (public)
- `PATCH /api/messages/:id/status` - Update message status (admin)
- `DELETE /api/messages/:id` - Delete message (admin)

### Health Check
- `GET /api/health` - API health status

## Development

- **Backend**: Uses Express.js with MongoDB (Mongoose)
- **Frontend**: Uses React with Vite and Tailwind CSS
- **Authentication**: JWT tokens with 7-day expiration
- **Rate Limiting**: Configured for API endpoints
- **CORS**: Configured for frontend origin

## Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `node seed.js` - Create initial superadmin user

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Security Features

- Password hashing with bcryptjs (12 salt rounds)
- JWT authentication with expiration
- Role-based access control (admin/superadmin)
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Environment variables for sensitive data

## Deployment

### Frontend (Vercel)
1. Connect frontend repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Backend (Render)
1. Connect backend repository to Render
2. Add environment variables in Render dashboard
3. Deploy automatically on push

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Create database user
3. Whitelist IP addresses
4. Update `MONGODB_URI` in environment variables

## Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Ensure MongoDB is running
- Check port 5000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Check CORS configuration in backend

### Login not working
- Verify admin user exists (run `node seed.js`)
- Check JWT_SECRET in backend `.env`
- Clear browser localStorage

## License

ISC
