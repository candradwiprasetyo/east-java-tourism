# 🌄 East Java Tourism

**East Java Tourism** is a web-based travel planning application built with **Next.js** and designed to help users explore and plan their trips across **East Java, Indonesia**.

The system allows users to generate AI assisted itineraries quickly, with or without creating an account. It combines seamless usability with personalized features for registered users. The website provides geographical and interest-based tourism data, weather forecasts, local events, and public holidays to help users plan better and travel smarter.

---

## 🚀 Tech Stack

- **Frontend**: Next.js, React 19, Tailwind CSS
- **Backend**: API routes in Next.js
- **Database**: PostgreSQL (via [Neon.tech](https://neon.tech/))
- **Authentication**: Google OAuth, JWT, Bcrypt
- **APIs & Libraries**:
  - `OpenAI` (AI)
  - `Open-Meteo API` (Weather)
  - `Tanggalan API` (Indonesian Holiday Calendar)
  - `Cloudinary` (Media Hosting)
  - `js-cookie`, `jsonwebtoken`

---

## 🧭 Main Features

### 🧠 AI-Based Itinerary Generator
- Generate trip plans based on:
  - Travel dates (start & end)
  - Destination city
  - User interests (nature, culinary, religious, history, etc.)
- Outputs optimized travel routes, visit durations, and tourist spot recommendations.
- Logged-in users can save and retrieve itineraries.

### 🗺️ City/District-Based Tourism Details
- Explore tourist destinations grouped by East Java cities or districts.
- Includes images, descriptions, and categorized highlights.

### ❤️ Interest-Based Recommendations
- Filter destinations by personal interests
- Great for users looking for inspiration without a specific destination in mind.

### 🌤️ Real-Time Weather Forecasts
- Daily forecasts per city/district.
- Includes temperature and condition (sunny, cloudy, rainy) via **Open-Meteo API**.

### 📅 Indonesian Public Holidays
- Interactive calendar displaying national holidays and joint leave days.
- Fetched from **Tanggalan API**.

### 🎉 Event Listings
- Upcoming events and festivals across East Java.
- Allows users to plan visits that coincide with cultural/local happenings.

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/candradwiprasetyo/east-java-tourism.git
cd east-java-tourism
```

## 👤 About the Developer

Candra Dwi Prasetyo
Frontend Developer
🌐 candradwiprasetyo.com
📧 candradwiprasetyo@gmail.com

## 📃 License

This project is licensed under the MIT License – feel free to use, modify, and distribute for educational or non-commercial purposes.
