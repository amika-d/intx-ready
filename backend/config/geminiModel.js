const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

// Initialize with API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model configuration
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
  generationConfig: {
    temperature: 0,
    topP: 1,
    topK: 40,
    maxOutputTokens: 520,
    responseMimeType: "text/plain",
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ],
});

// Initialize chat session
const chatSession = model.startChat();

// Message handling function
async function sendMessage(message) {
  try {
    const result = await chatSession.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
}

module.exports = {
  sendMessage
};
