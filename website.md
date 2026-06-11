# Naina Cleaning Services Website Overview

**Naina Cleaning Services** Mississauga, Ontario mein ek professional cleaning company hai jo residential aur commercial dono services provide karti hai. Website ka main theme dark red (#c0392b) aur dark navy (#1a1a2e) hai jo isko professional aur trustworthy look deta hai.

## Public Pages

**Home Page** - Hero section with animated stats counter (25+ years, 500+ clients, 50+ team members, 98% satisfaction), features grid, before/after slider, service categories, service areas by location, testimonials, gallery preview, CTA buttons, aur contact info ke saath ek comprehensive landing page hai.

**About Page** - Company story, animated statistics, core values (Trust, Excellence, Customer Focus, Punctuality), "Why Choose Us" list, aur team introduction ke saath business background highlight karta hai.

**Services Page** - Residential (Standard Home Cleaning, Deep Home Cleaning, Move-In/Move-Out, Recurring Maid Service) aur Commercial (Office Cleaning, Janitorial Services, Post-Construction, Carpet Steam Cleaning, Floor Maintenance, Window Cleaning) categories mein divided hai. Har service ka apna icon, color, badge, description, includes list, ideal for, aur frequency options hain.

**Gallery Page** - Residential aur Commercial categories mein filtered image gallery with lightbox modal aur Unsplash images ka use kiya gaya hai.

**Contact Page** - Contact form (name, email, phone, service dropdown, message) with validation, contact info cards (phone: 647-973-6745, email: ZUNAIRAZ@GMAIL.COM, address: 1386 Mississauga Rd), aur business hours display karta hai.

**Login Page** - Admin login page with email/password fields, show/hide password toggle, validation, default credentials hint (admin@example.com / Admin@123), aur branded dark gradient design.

## Admin Panel

Admin panel mein authentication required hai (JWT token based). SuperAdminRoute se protect kiya gaya hai.

**Dashboard** - Total services, total messages, new messages, admin users stats cards with recent messages list.

**Services Management** - CRUD operations for services - create, read, update, delete, toggle active/inactive status with modal form.

**Messages Management** - Contact form submissions ko view, filter (all/new/read/replied), update status, reply via email, delete kar sakte hain.

**Admins Management** - SuperAdminRoute se protect - admin accounts create, edit, delete kar sakte hain. Username, email, password, role (admin/superadmin) fields hain.

## Backend API

Express.js server port 5001 pe run karti hai. Routes: /api/auth (login), /api/services (CRUD), /api/messages (CRUD), /api/admins (CRUD). Security features: Helmet, CORS, rate limiting, JWT authentication, bcrypt password hashing. MongoDB database use karti hai.

## Tech Stack

Frontend: React + Vite + React Router, Tailwind CSS, lucide-react icons. Backend: Node.js + Express, MongoDB + Mongoose, JWT auth, bcryptjs. Both have separate package.json with proper dependencies installed.