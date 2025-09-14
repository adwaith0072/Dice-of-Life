import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DiceRoll from './components/DiceRoll';
import ContentCard from './components/ContentCard';
import { generateInspirationalContent, GeneratedContent } from './lib/gemini';
import { Sparkles } from 'lucide-react';

function App() {
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rollDice = async () => {
    setIsRolling(true);
    setIsLoading(true);
    setShowContent(false);
    setError(null);

    try {
      // Generate content with Gemini AI
      const generatedContent = await generateInspirationalContent();
      
      // Simulate dice roll animation
      setTimeout(() => {
        setContent(generatedContent);
        setIsRolling(false);
        setIsLoading(false);
        setShowContent(true);
      }, 2000);
    } catch (error) {
      console.error('Error generating content:', error);
      setError('Failed to generate content. Please check your API key and try again.');
      setIsRolling(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Life Dice
            </h1>
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Roll the dice of inspiration! Get AI-generated activities, quotes, jokes, facts, and advice to brighten your day.
          </p>
        </motion.header>

        {/* Main Content */}
        <div className="flex flex-col items-center space-y-12">
          {/* Dice Roll Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <DiceRoll
              isRolling={isRolling}
              onRoll={rollDice}
              disabled={isLoading}
            />
          </motion.div>

          {/* Content Cards */}
          <ContentCard content={content} isVisible={showContent} />

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto"
            >
              <p className="text-red-700 text-center">{error}</p>
              <p className="text-red-600 text-sm text-center mt-2">
                Make sure you've added your Gemini API key to the .env file
              </p>
            </motion.div>
          )}

          {/* Welcome Message */}
          {!content && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-4"
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-6xl">
                🎲
              </div>
              <h2 className="text-2xl font-semibold text-gray-700">
                Ready for some inspiration?
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Click the dice above to get AI-generated activities, quotes, jokes, facts, and advice!
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-gray-500"
        >
          <p>✨ Every roll brings unique AI-generated inspiration ✨</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;