# MKR-BLOGS Platform

A premium, full-stack MERN blog platform with a high-end digital magazine aesthetic.

## Features
- **MVC Architecture**: Structured backend for scalability.
- **Forest Theme**: Charcoal, Ivory, and Emerald Green design system.
- **Glassmorphism**: Modern UI with beautiful depth and animations.
- **Admin Dashboard**: Comprehensive analytics and CRUD management.
- **Reading Experience**: Table of contents, progress bar, and focused reading mode.
- **SEO Optimized**: Dynamic meta tags and clean URL slugs.

## Project Structure
- `/Backend`: Node/Express API with MongoDB/Mongoose.
- `/UserView`: Frontend for readers (React + Vite).
- `/AdminDashboard`: Frontend for administrators (React + Vite).

## Getting Started

### 1. Prerequisites
- Node.js installed.
- MongoDB running locally or a MongoDB Atlas URI.
- Cloudinary account for image uploads.

### 2. Backend Setup
1. `cd Backend`
2. Update `.env` with your `MONGO_URI` and `CLOUDINARY` credentials.
3. `npm install`
4. `npm run seed` (to populate initial data)
5. `npm run dev`

### 3. Frontend Setup (UserView & AdminDashboard)
1. `cd UserView` or `cd AdminDashboard`
2. `npm install`
3. `npm run dev`

## Default Admin Credentials
- **Email**: `admin@example.com`
- **Password**: `password123`

## Technology Stack
- **Frontend**: React, Vite, Framer Motion, Lucide Icons, Axios, Tailwind CSS (optional additions).
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Multer, Cloudinary.
- **Styling**: Vanilla CSS with custom variables.

---
Built with pride for MKR-BLOGS.
