// src/pages/AIChatAssistantDetails.js
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

const AIChatAssistantDetails = () => {
  const [prompt, setPrompt] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  if (!API_KEY) {
    console.error('❌ Gemini API Key is missing! Set REACT_APP_GEMINI_API_KEY in your .env file');
    return <div>Missing Gemini API Key. Please check your .env configuration.</div>;
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userMessage = { sender: 'user', text: prompt };
    setChatLog((prev) => [...prev, userMessage]);
    setPrompt('');
    setLoading(true);

    try {
      const chat = model.startChat({
        history: chatLog.map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        })),
        generationConfig: { maxOutputTokens: 500 },
      });

      const result = await chat.sendMessage(userMessage.text);
      const response = await result.response;
      const text = response.text(); // already string

      const botMessage = {
        sender: 'bot',
        text: text || 'Sorry, I could not generate a response. Please try again.',
      };

      setChatLog((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
      setChatLog((prev) => [
        ...prev,
        { sender: 'bot', text: `❌ Error: ${error.message || 'Failed to get a response.'}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && prompt.trim()) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">AI Chat Assistant</h1>
      <p className="text-gray-600 mb-6 text-center">
        Ask anything about fitness, nutrition, or health!
      </p>

      <div className="flex flex-col h-[60vh] border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatLog.length === 0 && (
            <p className="text-gray-500 text-center mt-20">Start the conversation!</p>
          )}
          {chatLog.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`prose prose-sm max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap break-words ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {msg.sender === 'bot' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-500 italic px-4 py-2 rounded-lg">
                AI is typing...
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-grow border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !prompt.trim()}
              className={`px-6 py-2 rounded bg-purple-600 text-white font-semibold ${
                loading || !prompt.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-purple-700 transition-colors'
              }`}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistantDetails;
