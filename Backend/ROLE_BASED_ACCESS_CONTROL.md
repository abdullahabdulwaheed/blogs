# Role-Based Access Control (RBAC) System

## Overview
This document describes the role-based access control system implemented in the MKR-BLOGS platform.

## User Roles

### 1. **Super Admin**
- **Email**: abdullah35@gmail.com
- **Password**: Abdullah35
- **Permissions**:
  - Full access to all features
  - Can create, edit, and delete ANY post (including posts by other admins)
  - Can view, approve, and delete ALL comments
  - Can create new Admin users (Bloggers)
  - Can view all users and manage them
  - Can view all dashboard statistics

### 2. **Admin (Blogger)**
- **Permissions**:
  - Can create, edit, and delete ONLY their own posts
  - Can view, approve, and delete ONLY comments on their own posts
  - Can view ratings on their own posts
  - Cannot access other admins' posts or comments
  - Cannot create new users
  - Dashboard shows only their own statistics

### 3. **User (Blog Viewer)**
- **Permissions**:
  - Can view published posts
  - Can comment on posts (comments require approval)
  - Can rate posts (1-5 stars)
  - Cannot access admin dashboard
  - Cannot create or edit posts

## API Endpoints & Access Control

### Posts

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/posts` | GET | Public | Get all published posts |
| `/api/posts` | POST | Admin/Super Admin | Create a new post |
| `/api/posts/featured` | GET | Public | Get featured posts |
| `/api/posts/admin/stats` | GET | Admin/Super Admin | Get dashboard stats (filtered by role) |
| `/api/posts/admin/my-posts` | GET | Admin/Super Admin | Get admin's own posts |
| `/api/posts/:slug` | GET | Public | Get single post by slug |
| `/api/posts/:id` | PUT | Admin/Super Admin | Update post (ownership check) |
| `/api/posts/:id` | DELETE | Admin/Super Admin | Delete post (ownership check) |
| `/api/posts/:id/rate` | POST | Public | Rate a post |

### Comments

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/comments` | GET | Super Admin | Get all comments |
| `/api/comments` | POST | Public | Create a comment |
| `/api/comments/admin/my-comments` | GET | Admin/Super Admin | Get comments on admin's posts |
| `/api/comments/post/:postId` | GET | Public | Get approved comments for a post |
| `/api/comments/:id/approve` | PUT | Admin/Super Admin | Approve/unapprove comment (ownership check) |
| `/api/comments/:id` | DELETE | Admin/Super Admin | Delete comment (ownership check) |

### Users

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/users/create` | POST | Super Admin | Create new admin user |
| `/api/users` | GET | Super Admin | Get all users |
| `/api/users/login` | POST | Public | Login |
| `/api/users/profile` | GET | Protected | Get user profile |
| `/api/users/:id` | PUT | Super Admin | Update user |
| `/api/users/:id` | DELETE | Super Admin | Delete user |

## Middleware Functions

### `protect`
- Verifies JWT token
- Attaches user to request object
- Required for all authenticated routes

### `admin`
- Checks if user has `isAdmin: true`
- Used for routes that require admin access

### `superAdmin`
- Checks if user has `isSuperAdmin: true`
- Used for routes that require super admin access

### `adminOrSuperAdmin`
- Checks if user has `isAdmin: true` OR `isSuperAdmin: true`
- Used for routes accessible by both admins and super admins
- Additional ownership checks are performed in controllers

## Ownership Checks

### Posts
- **Super Admin**: Can edit/delete any post
- **Admin**: Can only edit/delete their own posts
- Ownership is verified by comparing `post.author` with `req.user._id`

### Comments
- **Super Admin**: Can approve/delete any comment
- **Admin**: Can only approve/delete comments on their own posts
- Ownership is verified by comparing `comment.post.author` with `req.user._id`

## Rating System

### Features
- Users can rate posts from 1 to 5 stars
- Each user (identified by email) can only rate a post once
- Average rating is automatically calculated
- Ratings are stored with user information (name, email)

### Post Model Updates
```javascript
ratings: [
    {
        user: {
            name: { type: String, required: true },
            email: { type: String, required: true },
        },
        rating: { type: Number, required: true, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
    },
],
averageRating: {
    type: Number,
    default: 0,
}
```

## Default Users (Seeder Data)

1. **Super Admin**
   - Name: Abdullah Super Admin
   - Email: abdullah35@gmail.com
   - Password: Abdullah35
   - Role: Super Admin

2. **Admin User**
   - Name: Admin User
   - Email: admin@example.com
   - Password: password123
   - Role: Admin (Blogger)

3. **Regular User**
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Role: User

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt before storage
2. **JWT Authentication**: Secure token-based authentication
3. **Role Verification**: Middleware checks user roles before granting access
4. **Ownership Validation**: Controllers verify ownership before allowing modifications
5. **Input Validation**: All inputs are validated before processing

## Usage Examples

### Creating a New Admin (Super Admin Only)
```javascript
POST /api/users/create
Headers: { Authorization: "Bearer <super_admin_token>" }
Body: {
  "name": "New Blogger",
  "email": "blogger@example.com",
  "password": "SecurePass123",
  "isAdmin": true,
  "isSuperAdmin": false
}
```

### Admin Creating a Post
```javascript
POST /api/posts
Headers: { Authorization: "Bearer <admin_token>" }
Body: {
  "title": "My Blog Post",
  "excerpt": "Short description",
  "content": "Full content here",
  "category": "category_id",
  "featuredImage": "image_url",
  "tags": ["tag1", "tag2"]
}
```

### User Rating a Post
```javascript
POST /api/posts/:id/rate
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5
}
```

### Admin Viewing Their Comments
```javascript
GET /api/comments/admin/my-comments
Headers: { Authorization: "Bearer <admin_token>" }
```

## Testing the System

1. **Seed the database** with default users:
   ```bash
   npm run seed
   ```

2. **Login as Super Admin**:
   - Email: abdullah35@gmail.com
   - Password: Abdullah35

3. **Login as Admin**:
   - Email: admin@example.com
   - Password: password123

4. **Test permissions** by attempting to access different endpoints with different user roles

## Notes

- Super Admin has unrestricted access to all features
- Admins can only manage their own content
- Users can interact with content through comments and ratings
- All admin actions are logged with author information
- Comments require approval before being visible to public users
