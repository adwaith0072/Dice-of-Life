# Dice Roll Inspiration Site

A beautiful React application that generates random inspirational content using Google's Gemini AI. Roll the dice to get unique activities, quotes, jokes, number facts, and life advice!

## Features

- 🎲 Animated 3D dice roll with Framer Motion
- 🤖 AI-generated content using Google Gemini
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Fully responsive design
- ✨ Smooth animations and micro-interactions

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Get your Gemini API key:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy and paste it into your `.env` file

5. Start the development server:
   ```bash
   npm run dev
   ```

## How it works

Each time you roll the dice, the app sends a request to Google's Gemini AI to generate:
- A fun activity to try
- An inspiring quote with author
- A clean joke
- An interesting number fact
- A piece of life advice

The content is completely unique each time, making every roll a new experience!

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Generative AI (Gemini)
- Vite
- Supabase
  
## License

MIT License
