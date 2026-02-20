# Bukhari Rent A Car - Booking Application

A premium, high-performance car booking web application built with Next.js and Firebase.

## 🚀 Features
- **Premium UI/UX**: Dark-themed luxury interface with smooth animations and glassmorphism.
- **Dynamic Fleet**: Easily manage and display your vehicle collection.
- **Real-time Bookings**: Instant booking requests saved to Firestore.
- **Price Calculation**: Automatic price calculation based on rental duration.
- **Mobile Responsive**: Fully optimized for phones and tablets.

## 🛠️ Technology Stack
- **Frontend**: Next.js (App Router), Framer Motion, Lucide React.
- **Backend/Database**: Firebase (Firestore).
- **Styling**: Pure CSS Modules for maximum performance and customization.

## 📦 Setup Instructions

### 1. Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project named "Bukhari Rent A Car".
3. Add a Web App to the project.
4. Enable **Cloud Firestore** and **Authentication** (Email/Password).
5. Copy your Firebase Configuration and paste it into a `.env.local` file (use `.env.example` as a template).

### 2. Local Development
```bash
npm install
npm run dev
```

### 3. Deployment
The project is optimized for deployment on **Vercel**. 
1. Push this repository to your GitHub.
2. Connect the repository to Vercel.
3. Add the environment variables from your `.env.local` to the Vercel project settings.

## 📂 Project Structure
- `src/app`: Main pages and global styles.
- `src/components`: Reusable UI components (Navbar, Hero, BookingModal).
- `src/data`: Fleet data and constant configurations.
- `src/lib`: Firebase and other utility configurations.

## 🎨 Branding
- **Primary Color**: `#d4af37` (Premium Gold)
- **Background**: `#050505` (Deep Black)
- **Typography**: Outfit (Modern & Sleek)
