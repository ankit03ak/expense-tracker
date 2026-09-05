# Expense Tracker - Welth

A comprehensive personal finance management application built with modern web technologies. Track expenses, manage multiple accounts, set budgets, and gain insights into your spending habits with an intuitive and beautiful interface.

## 🎯 Features

- **Multi-Account Management**: Create and manage multiple accounts (Savings, Current) with individual balances
- **Transaction Tracking**: Log income and expense transactions with detailed information
- **Receipt Scanning**: Capture and store receipts for your transactions using OCR technology
- **Recurring Transactions**: Set up daily, weekly, monthly, or yearly recurring transactions
- **Budget Tracking**: Set budget limits and receive alerts when spending approaches limits
- **Dashboard Analytics**: Visual overview of your financial status with charts and progress indicators
- **Transaction History**: Comprehensive transaction table with filtering and sorting capabilities
- **Dark Mode Support**: Full dark/light theme support for comfortable use anytime
- **User Authentication**: Secure authentication via Clerk
- **Email Notifications**: Get alerts and updates via email using Resend
- **AI-Powered Features**: Google Generative AI integration for smart insights
- **Responsive Design**: Mobile-first design that works on all devices

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15.5+](https://nextjs.org) with Turbopack
- **UI Library**: React 19.1.0
- **Styling**: 
  - Tailwind CSS 4
  - Radix UI components (accessible primitives)
  - Lucide React icons
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Theme**: next-themes for dark mode support
- **Notifications**: Sonner (toast notifications)
- **Date Handling**: date-fns

### Backend & Database
- **ORM**: [Prisma](https://www.prisma.io) 6.15.0 with PostgreSQL
- **Database**: PostgreSQL
- **Authentication**: [Clerk](https://clerk.com)

### Services & Integrations
- **Email**: [Resend](https://resend.com)
- **Email Templates**: React Email
- **AI/ML**: Google Generative AI
- **Task Queue**: Inngest (for background jobs)
- **Security**: Arcjet for rate limiting and protection

### Developer Tools
- **Language**: TypeScript 5.9.2
- **Build**: Next.js with Turbopack
- **Package Manager**: npm

## 📦 Prerequisites

- Node.js 18+ or higher
- PostgreSQL database
- npm or yarn package manager
- Clerk account (for authentication)
- Resend account (for email service)
- Google AI API key (for AI features)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd expense-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/expense_tracker"
DIRECT_URL="postgresql://user:password@localhost:5432/expense_tracker"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Resend (Email Service)
RESEND_API_KEY=your_resend_api_key

# Google Generative AI
NEXT_PUBLIC_GOOGLE_AI_KEY=your_google_ai_key

# Inngest (Task Queue)
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Arcjet (Security)
ARCJET_KEY=your_arcjet_key
```

### 4. Set Up Database

Generate Prisma client and run migrations:

```bash
npm run postinstall
npx prisma migrate dev
```

Seed the database (optional):
```bash
curl http://localhost:3000/api/seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run email` - Start email development server
- `npm run postinstall` - Generate Prisma client (runs automatically after install)

## 📊 Database Schema

### Users
- Stores user profile information and Clerk authentication mapping

### Accounts
- Multiple financial accounts per user (Savings, Current)
- Tracks account balance and default account

### Transactions
- Income and expense transactions
- Supports recurring transactions with customizable intervals
- Transaction status tracking (Pending, Completed, Failed)
- Receipt URL storage for documentation

### Budgets
- Per-user budget limits
- Tracks when alerts were last sent to avoid spam

## 🏗️ Project Structure

```
expense-tracker/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application
│   │   ├── dashboard/     # Dashboard page
│   │   ├── account/       # Account details
│   │   └── transaction/   # Transaction management
│   ├── api/               # API routes
│   └── layout.js          # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── [Feature]/        # Feature-specific components
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── data/                 # Constants and static data
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── actions/              # Server actions
├── emails/               # Email templates
├── middleware.js         # Next.js middleware
└── package.json          # Dependencies and scripts
```

## 🔐 Authentication

This application uses [Clerk](https://clerk.com) for secure authentication. Users can sign up, sign in, and manage their profiles through Clerk's managed authentication system.

## 💳 Account Management

Users can create multiple accounts with different types:
- **Savings**: For savings goals
- **Current**: For everyday spending

Each account tracks its balance independently and can have transactions associated with it.

## 📱 Transaction Types

### Income Transactions
- Salary
- Bonus
- Investment returns
- Other income sources

### Expense Transactions
- Food & Dining
- Transportation
- Entertainment
- Utilities
- Shopping
- And more...

## 🔄 Recurring Transactions

Set up automatic recurring transactions with intervals:
- Daily
- Weekly
- Monthly
- Yearly

The system automatically creates new transaction entries on schedule.

## 📸 Receipt Management

Capture receipts directly in the app. Receipts are stored and linked to transactions for:
- Expense documentation
- Tax purposes
- Receipt history and reference

## 💰 Budget Management

Set monthly or yearly budget limits and get alerts when:
- Spending reaches 75% of budget
- Spending reaches 90% of budget
- Budget limit is exceeded

Alerts are sent via email to keep you informed.

## 📈 Dashboard Analytics

The dashboard provides:
- Quick account overview with balances
- Recent transaction summary
- Budget progress visualization
- Monthly spending charts
- Income vs Expense comparison

## 🌙 Theme Support

Full dark mode support with:
- System preference detection
- Manual toggle
- Persistent user preference

## 🚀 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy this Next.js app is to use [Vercel Platform](https://vercel.com):

1. Push your code to GitHub
2. Import the repository on Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy

See [Vercel deployment documentation](https://nextjs.org/docs/deployment) for details.

### Other Deployment Options

- **Docker**: Create a Dockerfile and deploy to any container service
- **Self-hosted**: Use `npm run build` and `npm run start`
- **Other platforms**: Railway, Render, etc.

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Radix UI](https://www.radix-ui.com)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


