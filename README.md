# 🎬 Filmix

**Filmix** is a modern, full-stack movie discovery web app built with Next.js, React, and Tailwind CSS. It offers a beautiful, animated UI with glassmorphism, advanced search, authentication, movie details, and more.

---

## ✨ Features

- **Modern UI**: Glassmorphism, animated backgrounds, floating icons, and responsive design.
- **Authentication**: Signup, login, OTP email verification, and protected routes.
- **Movie Search**: Search movies, actors, genres with instant results.
- **Infinite Scroll**: Browse movies with smooth infinite scrolling.
- **Movie Details**: View detailed movie pages with cast, plot, ratings, and more.
- **Related Movies**: Discover similar movies with a slick carousel.
- **User Context**: Auth state managed globally.
- **Error Handling**: Friendly error and loading states.
- **Dark/Light Mode**: Fully responsive and theme-aware.
- **TypeScript**: Full type safety across the stack.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ShahwaizZahid/filmix.git
cd filmix
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file and add your API keys and config:

```
NEXT_PUBLIC_API_URL=your_api_url
# Add other required env variables here
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, TypeScript
- **State Management**: React Context, React Query
- **UI Icons**: Lucide React
- **API**: RESTful endpoints (custom or third-party movie API)
- **Authentication**: JWT, cookies, OTP email verification
- **Other**: react-simple-typewriter, react-hot-toast, slick-carousel

---

## 📁 Project Structure

```
src/
  components/
    ui/           # All UI components (Navbar, Footer, MovieCard, etc.)
  hooks/          # Custom React hooks
  pages/          # Next.js pages & API routes
  app/            # App directory (Next.js 13+)
  context/        # Auth and other context providers
  schemas/        # Zod schemas for validation
  styles/         # Global and custom styles
```

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for improvements and bug fixes.

---

## 📄 License

MIT License

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [OMDb API](https://www.omdbapi.com/) (or your movie data source)

---

> **Filmix** — Discover, explore, and enjoy movies like never before!
