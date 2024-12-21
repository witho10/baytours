# Tour Club Analytics Dashboard

A modern analytics dashboard built with Next.js, Tailwind CSS, and Supabase.

## Features

- 📊 Real-time analytics dashboard
- 🔍 Advanced filtering and search
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔐 Data persistence with Supabase

## Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

## Getting Started

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd tour-club-dashboard
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up your environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update `.env.local` with your Supabase credentials:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

5. Set up the database:
   - Go to your Supabase project's SQL editor
   - Copy the contents of `supabase/migrations/20240224000000_initial_schema.sql`
   - Run the SQL commands to create the tables and sample data

6. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

## Deployment

1. Push your code to GitHub

2. Deploy to Vercel:
   - Connect your GitHub repository
   - Add environment variables
   - Deploy

## Project Structure

\`\`\`
src/
├── app/                    # Next.js app router pages
├── components/            # React components
│   ├── layout/           # Layout components
│   └── shared/           # Shared components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
└── types/                # TypeScript type definitions
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Lucide Icons](https://lucide.dev/)
</rewritten_file> 