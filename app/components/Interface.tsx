"use client";

import React, { useState } from "react";

type Message = {
  type: "user" | "bot";
  content: string;
};

const Interface = () => {
  const [query, setQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState("ChatGPT");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const models = ["ChatGPT", "GPT-4", "Claude", "Gemini"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage: Message = { type: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setQuery("");

    // Simulate API response
    setTimeout(() => {
      const botMessage: Message = {
        type: "bot",
        content: `This is a simulated response from ${selectedModel}. You asked: "${userMessage.content}"`,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>

          {/* Model Switcher */}
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Plus size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>
        </div> */}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages Display */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-purple-600 font-bold text-xl">AI</span>
              </div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                What's on your mind today?
              </h1>
              <p className="text-gray-500 max-w-md">
                Ask me anything and I'll help you with information in your
                documents.
              </p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-3xl rounded-2xl px-6 py-4 ${
                      message.type === "user"
                        ? "bg-purple-600 text-white ml-12"
                        : "bg-gray-100 text-gray-800 mr-12"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-3xl rounded-2xl px-6 py-4 bg-gray-100 text-gray-800 mr-12">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all">
              {/* <button
                type="button"
                className="p-3 text-gray-400 hover:text-purple-600 transition-colors"
              >
                <Plus size={20} />
              </button> */}

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent px-4 py-4 text-gray-800 placeholder-gray-400 focus:outline-none text-lg"
                disabled={isLoading}
              />

              <div className="flex items-center space-x-2 pr-3">
                {/* <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-purple-600 transition-colors rounded-lg hover:bg-white"
                >
                  <Mic size={18} />
                </button> */}

                {query.trim() && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-purple-600 text-white rounded-xl px-4 py-2 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Send
                  </button>
                )}
              </div>
            </div>
          </form>

          <p className="text-xs text-gray-400 text-center mt-3">
            AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Interface;
