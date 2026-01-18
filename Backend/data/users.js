import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Abdullah Super Admin',
        email: 'abdullah35@gmail.com',
        password: 'Abdullah35',
        isAdmin: true,
        isSuperAdmin: true,
        bio: 'The Owner and Super Admin.',
    },
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        isAdmin: true,
        isSuperAdmin: false,
        bio: 'Professional tech writer and digital enthusiast.',
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
        isSuperAdmin: false,
        bio: 'Lifestyle blogger and world traveler.',
    },
];

export default users;
