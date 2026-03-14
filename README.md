# Multi-Tenant Express Application

A robust multi-tenant SaaS application built with Node.js, Express, TypeScript, and PostgreSQL(typeorm). This application provides tenant isolation, user management, and project management capabilities.

## 🚀 Features

### Core Features
- **Multi-Tenant Architecture**: Complete tenant isolation with separate data management
- **User Authentication**: Secure JWT-based authentication with role-based access control
- **User Management**: Admin and user roles with OTP verification
- **Project Management**: Create and manage projects within tenant boundaries
- **Database Transactions**: ACID compliance with TypeORM
- **TypeScript**: Full type safety and better development experience
- **Docker Support**: Containerized deployment with multi-stage builds

### Security Features
- JWT-based authentication
- Role-based access control (Admin/User)
- Password hashing with bcryptjs
- OTP verification for admin users
- CORS configuration
- Input validation

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- Docker & Docker Compose (optional)
- npm or yarn

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd multi-tenant-express
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Configure your `.env` file:
   ```env
   PORT=3001
   NODE_ENV=development
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRES_IN=1h
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database
   ```

4. **Build the application**
   ```bash
   npm run build
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🐳 Docker Deployment

### Using Dockerfile

1. **Build the Docker image**
   ```bash
   docker build -t multi-tenant-express .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 \
    

## 🏗️ Architecture

### Database Schema

#### Tenants Table
- `id` (Primary Key)
- `name` (Unique, Company Name)
- Relationships: One-to-Many with Users and Projects

#### Users Table
- `id` (Primary Key)
- `name`, `email` (Unique), `password`
- `role` (ADMIN, USER)
- `isVerified`, `otp`, `otpExpires`
- `tenantId` (Foreign Key)
- Relationships: Many-to-One with Tenant, One-to-Many with Projects

#### Projects Table
- `id` (Primary Key)
- `name`, `description`, `status`
- `createdAt`, `updatedAt`
- `tenantId` (Foreign Key)
- `createdById` (Foreign Key)
- Relationships: Many-to-One with Tenant and User


## 📚 API Documentation

### Base URL
- Development: `http://localhost:3001`
- Production: `http://localhost:3000` (Docker)

### Health Check
```http
GET /health
```
**Response**: `I'm healthy`

---

## 🔐 Tenant Management

### Register New Tenant with Admin
```http
POST /tenant/v1/register
```

**Request Body**:
```json
{
  "companyName": "Acme Corp",
  "name": "John Doe",
  "email": "john@acme.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "message": "Tenant created",
  "result": {
    "tenant": { "id": 1, "name": "Acme Corp" },
    "user": { "id": 1, "name": "John Doe", "email": "john@acme.com", "role": "admin" }
  }
}
```

### Verify Admin with OTP
```http
POST /tenant/v1/verify-otp
```

**Request Body**:
```json
{
  "tenantId": 1,
  "otp": 123456
}
```

**Response**:
```json
{
  "message": "OTP verified successfully"
}
```

---

## 👤 User Management

### User Login
```http
POST /user/v1/login
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "userPassword123"
}
```

**Response**:
```json
{
  "message": "User logged in successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "token": "jwt_token_here"
  }
}
```

### Add New User (Admin Only)
```http
POST /user/v1/user
```
**Headers**: `Authorization: Bearer <jwt_token>`

**Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com"
}
```

**Response**:
```json
{
  "message": "User added successfully",
  "user": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "user",
    "tenantId": 1
  }
}
```

---

## 📊 Project Management

### Create New Project
```http
POST /project/v1/new
```
**Headers**: `Authorization: Bearer <jwt_token>`

**Request Body**:
```json
{
  "name": "New Website",
  "description": "Building a responsive website for client"
}
```

**Response**:
```json
{
  "message": "Project created successfully",
  "project": {
    "id": 1,
    "name": "New Website",
    "description": "Building a responsive website for client",
    "status": "not_started",
    "tenantId": 1,
    "createdById": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Edit Project
```http
PUT /project/v1/edit/:id
```
**Headers**: `Authorization: Bearer <jwt_token>`

**Request Body**:
```json
{
  "name": "Updated Website Name",
  "description": "Updated project description",
  "status": "in_progress"
}
```

**Response**:
```json
{
  "message": "Project edited successfully",
  "project": {
    "id": 1,
    "name": "Updated Website Name",
    "description": "Updated project description",
    "status": "in_progress",
    "tenantId": 1,
    "createdById": 1,
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

---



### Project Structure
```
src/
├── config/          # Database and configuration
├── controllers/     # Request handlers
├── interfaces/      # TypeScript interfaces
├── middleware/      # Authentication and authorization
├── models/          # Database entities
├── routes/          # API routes
└── services/        # Business logic
```

---

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (not implemented yet)



---



---






---







---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 License

This project is licensed under the ISC License.

---

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation above
- Review the error logs for debugging

---

**Built with ❤️ using Node.js, Express, TypeScript, and PostgreSQL**
