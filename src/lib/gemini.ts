import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Missing Gemini API key. Please add VITE_GEMINI_API_KEY to your .env file');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface GeneratedContent {
  activity: string;
  quote: string;
  author: string;
  joke: string;
  number_fact: string;
  advice: string;
}

export async function generateInspirationalContent(): Promise<GeneratedContent> {
  // Add randomization elements to ensure unique content each time
  const randomSeed = Math.floor(Math.random() * 10000);
  const randomThemes = ['adventure', 'creativity', 'wellness', 'learning', 'connection', 'mindfulness', 'productivity', 'joy'];
  const randomTheme = randomThemes[Math.floor(Math.random() * randomThemes.length)];
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  
  const prompt = `Generate completely unique and fresh inspirational content for a dice roll app. Use this random seed for uniqueness: ${randomSeed}. Focus on the theme of "${randomTheme}". Please provide exactly one of each in JSON format:

1. A fun, simple activity someone can do today - make it creative and unique, avoid common suggestions
2. An inspiring quote with its author - use lesser-known but meaningful quotes, avoid overused ones
3. A clean, family-friendly joke - be creative with wordplay or unexpected punchlines
4. An interesting number fact about the number ${randomNumber} or any fascinating number trivia
5. A piece of life advice - provide specific, actionable wisdom that's not generic

IMPORTANT: Generate completely different content each time. Avoid repeating previous suggestions. Be creative, specific, and unique.

Format your response as valid JSON with these exact keys:
{
  "activity": "...",
  "quote": "...",
  "author": "...",
  "joke": "...",
  "number_fact": "...",
  "advice": "..."
}

Make sure the content is positive, uplifting, and suitable for all ages.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response (in case there's extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    const content = JSON.parse(jsonMatch[0]);
    
    // Validate that all required fields are present
    const requiredFields = ['activity', 'quote', 'author', 'joke', 'number_fact', 'advice'];
    for (const field of requiredFields) {
      if (!content[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    return content;
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    
    // Fallback content in case of API failure
    return {
      activity: "Take a 5-minute walk outside",
      quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb",
      joke: "Why don't scientists trust atoms? Because they make up everything!",
      number_fact: "The number 7 is considered lucky in many cultures around the world.",
      advice: "Take things one step at a time."
    };
  }
}