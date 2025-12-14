# Effort

A modern, AI-powered business intelligence dashboard designed for sales and technical teams at Yuno. Effort transforms scattered data into actionable business decisions through intelligent analytics, dynamic visualizations, and role-based insights.

![Effort Dashboard](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)
![AI Powered](https://img.shields.io/badge/Powered%20by-OpenAI-blue?style=for-the-badge&logo=openai)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌟 Features

### 🤖 AI-Powered Analytics
- **Context Core AI**: Intelligent assistant that generates dynamic dashboards and visualizations based on natural language queries
- **GPT-4 Integration**: Advanced AI models for business intelligence and data analysis
- **Real-time Insights**: Instant generation of charts, KPIs, and business recommendations

### 👥 Role-Based Access
- **Sales Dashboard**: Client management, opportunity tracking, meeting summaries, and revenue analytics
- **Technical Dashboard**: Documentation access, change history, and technical analysis
- **Unified Experience**: Seamless switching between sales and technical perspectives

### 📊 Comprehensive Dashboards
- **KPI Cards**: Key metrics with trend indicators
- **Interactive Charts**: Line charts, bar charts, and data visualizations using Recharts
- **Meeting Summaries**: AI-generated summaries with tags and key points
- **Client Insights**: Automated identification of sales opportunities and priorities

### 📁 Document Management
- **Centralized Repository**: Access all client documentation in one place
- **File Upload**: Support for various document formats
- **Context Integration**: Documents automatically fed into AI analysis

### 🔍 Advanced Search & Filtering
- **Client Search**: Powerful search functionality across all client data
- **Payment Providers**: Integration with payment processing systems
- **Dynamic Filtering**: Real-time data filtering and sorting

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Charts**: Recharts for data visualization
- **AI**: OpenAI GPT-4 for intelligent analysis
- **Deployment**: Vercel
- **State Management**: React Hooks
- **Icons**: Lucide React

## 🚀 Installation

### Prerequisites
- Node.js 18+
- npm, pnpm, or yarn
- OpenAI API Key (for AI features)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/effort.git
   cd effort
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Getting Started
1. **Login**: Select your role (Sales or Technical) on the login page
2. **Home Dashboard**: Access main features from the home screen
3. **Navigate**: Use the header navigation to switch between views

### Using Context Core AI
1. **Select Merchant**: Choose a merchant from the dropdown
2. **Ask Questions**: Type natural language queries like:
   - "Show me the revenue trends for the last 6 months"
   - "Generate KPIs for client satisfaction"
   - "Create a dashboard for sales opportunities"
3. **View Results**: AI generates visualizations and business insights in real-time

### Dashboard Features
- **Sales Metrics**: Track meetings, opportunities, revenue, and priorities
- **Client Management**: View detailed client information and interactions
- **Document Access**: Browse and search through client documentation
- **Technical Analysis**: Access change logs and technical documentation

## 🏗️ Project Structure

```
effort/
├── app/
│   ├── actions/
│   │   └── ai-dashboard.ts      # AI integration logic
│   ├── api/
│   │   └── chat/
│   │       └── route.ts         # Chat API endpoints
│   ├── data/
│   │   └── context-zoop.ts      # Sample data context
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main application page
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── dynamic-dashboard/       # AI dashboard components
│   ├── *-dashboard.tsx          # Role-specific dashboards
│   └── *-panel.tsx              # Feature panels
├── lib/
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
└── styles/                      # Additional styles
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing component structure
- Ensure responsive design with Tailwind CSS
- Test AI features thoroughly
- Maintain role-based access patterns

## 📄 License

This project is proprietary software developed for Yuno. All rights reserved.

## 📞 Support

For support or questions:
- Create an issue in this repository
- Contact the development team

## 🔄 Deployment

The application is configured for deployment on Vercel:

```bash
npm run build
npm run start
```

Make sure to set the `OPENAI_API_KEY` environment variable in your deployment platform.

---

**Built with ❤️ for Yuno's sales and technical teams**