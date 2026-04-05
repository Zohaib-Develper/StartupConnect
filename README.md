# Startup Connect

A web application that connects startup founders with investors. Built with React, Redux Toolkit, and Bootstrap 5.

## Features

- **Landing Page** – Hero section, stats, how it works, featured startups, and CTA
- **User Authentication** – Login & Register with role selection (Founder / Investor)
- **Browse Projects** – Search, filter by category and status
- **Project Detail** – Full info, funding progress, investment history
- **Founder Dashboard** – Manage projects, create/edit/delete, view activity
- **Investor Dashboard** – Portfolio overview, investment history
- **Investment Page** – Mock Stripe checkout with success flow
- **Protected Routes** – Role-based access control

## Tech Stack

- **React** (Vite)
- **Redux Toolkit** (state management)
- **React Router DOM** (routing)
- **Bootstrap 5** (CDN – styling)
- **Bootstrap Icons** (CDN)
- **Google Fonts** (Inter)

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Project Structure

```
frontend/src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Projects.jsx
│   ├── ProjectDetail.jsx
│   ├── founder/
│   │   ├── Dashboard.jsx
│   │   ├── CreateProject.jsx
│   │   └── EditProject.jsx
│   └── investor/
│       ├── Dashboard.jsx
│       └── InvestPage.jsx
├── store/
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       ├── projectSlice.js
│       └── investmentSlice.js
├── App.jsx
├── main.jsx
└── index.css
```
