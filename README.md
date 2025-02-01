# FyF - AI-Powered Flight Search

A modern, AI-powered flight search application built with Next.js that allows users to find flights using natural language conversations.

## Features

- 🤖 Natural Language Flight Search
- ✈️ Real-time Flight Information
- 📱 Responsive Design

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **LLM Framework**: LlamaIndex (TS)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Animations**: Framer Motion

## Getting Started

1. Clone the repository:

```bash
git clone https://github.comLinzo99/flight_bot.git
cd [folder]
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp env_template .env.local
```

4. Start the development server:

```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
├── actions/          # Server actions
├── app/             # Next.js app directory
├── components/      # React components
│   ├── ui/         # Reusable UI components
│   └── providers/  # Context providers
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and types
└── public/         # Static assets
```

## Key Features Explained

### Natural Language Search

Users can search for flights using natural language queries like "Find me the cheapest flight from New York to London next week" instead of filling out traditional form fields.

### Real-time Flight Information

The application provides comprehensive flight details including:

- Departure and arrival times
- Flight duration
- Baggage allowance
- Price breakdown
- Airline information

### Responsive Design

The application is fully responsive and works seamlessly across:

- Desktop computers
- Tablets
- Mobile devices

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [LlamaIndex](https://ts.llamaindex.ai/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
