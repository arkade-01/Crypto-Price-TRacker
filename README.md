# Crypto Price Tracker

A simple, real-time crypto price tracker built with Next.js, React Query, and the CoinGecko API.

![Crypto Price Tracker Screenshot](![APP IMAGE](image.png))

## Features

- Real-time tracking of 5 major cryptocurrencies (Bitcoin, Ethereum, Solana, Polygon, Dogecoin)
- Automatic data refresh every 30 seconds
- Visual indicators for price changes (green for positive, red for negative)
- Responsive design for all device sizes

## Setup Instructions

### Prerequisites

- Node.js 16.x or higher
- npm 

### Installation

1. **Clone the repository**

```bash
git clone <repositary_link>
cd crypto-tracker
```

2. **Install dependencies**

```bash
npm i
```

3. **Environment Variables Setup**

Create a `.env.local` file in the root directory with the following:

```
NEXT_PUBLIC_COINGECKO_API_URL=https://api.coingecko.com/api/v3
NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here  # Optional, only if you have one
```


4. **Start the development server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app running.

## Project Structure

```
app/
├── components/
│   └── coins.tsx            # Main crypto tracker component (client component)
├── types/
│   └── coin.ts              # TypeScript interfaces
├── providers.tsx            # React Query provider setup (client component)
├── layout.tsx               # Root layout with font setup
└── page.tsx                 # Main page component
```

## Key Implementation Decisions

1. **Next.js App Router**
   - Used the modern App Router for improved performance and features
   - Properly separated client and server components

2. **Client Components & "use client" Directive**
   - Marked components using React hooks with "use client" directive
   - Created a dedicated client Providers component for React Query

3. **React Query**
   - Implemented auto-refreshing data every 30 seconds with `refetchInterval`
   - Properly typed query results with TypeScript interfaces
   - Set up the query client with proper caching settings

4. **TypeScript Integration**
   - Used TypeScript interfaces for type-safe development
   - Properly typed API responses and component props

5. **Environment Variables**
   - Used Next.js environment variables with NEXT_PUBLIC_ prefix for client access
   - Provided fallbacks for better error handling

6. **Error Handling**
   - Implemented comprehensive error states
   - Added debug information for troubleshooting


## Customization

- Modify the `coins` array in `components/coins.tsx` to track different cryptocurrencies
- Adjust the `refetchInterval` value to change the refresh rate
- Update the styling as needed with Tailwind CSS or your preferred styling method