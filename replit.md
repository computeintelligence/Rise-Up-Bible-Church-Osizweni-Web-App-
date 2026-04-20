# Rubcosizweni Church Web Application

## Project Overview
A full-stack web application for a church/religious organization. Features include:
- Event ticket registration (Gala Dinner) with proof-of-payment file upload
- Blog posts about religious topics
- About Us page and general church information

## Tech Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS 4, React Router DOM v7, Motion (animations), Lucide React
- **Backend:** Node.js, Express, Multer (file uploads), Nodemailer (email)
- **Database/Storage:** Supabase (tickets table + file storage bucket)
- **Build Tool:** Vite 6
- **Package Manager:** npm

## Project Structure
```
src/
  components/     # Reusable UI components (Header, Footer)
  pages/          # Page components (Home, About, Blog, TicketForm, etc.)
  lib/            # Library configs (supabase.ts)
  App.tsx         # Main routing and layout
  main.tsx        # React entry point
  server.ts       # Express backend API
  data.ts         # Hardcoded content (blog posts)
  index.css       # Global styles + Tailwind directives
public/           # Static assets (images, logo)
```

## Development
- `npm run dev:all` — runs both frontend (port 5000) and backend (port 3001) concurrently
- `npm run dev` — frontend only
- `npm run server` — backend only
- `npm run build` — production build

## Environment Variables Required
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key
- `SUPABASE_BUCKET` — Storage bucket name (default: `ticket-uploads`)
- `EMAIL_USER` — Gmail address for sending notifications
- `EMAIL_PASSWORD` — Gmail app password
- `GEMINI_API_KEY` — Google Gemini AI key (used in frontend)

## Key Flows
1. **Ticket Submission:** Form → POST /api/submit-ticket → Upload to Supabase Storage → Insert into `tickets` table → Send email via Gmail
2. **Blog:** Static content from `src/data.ts`

## Deployment
Configured as autoscale deployment. Build: `npm run build`, Run: `npm run server` (Express serves the API; static files from `dist/` should be served too).
