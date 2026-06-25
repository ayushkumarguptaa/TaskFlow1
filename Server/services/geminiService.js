const axios = require("axios");

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

const generateTaskFromPrompt = async (prompt) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is missing from .env");
    }

    const { data } = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You create concise task-management output. Return useful, structured task details from the user's request.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data?.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error(
      "GROQ ERROR =>",
      error.response?.data || error.message || error
    );
    throw error;
  }
};

module.exports = {
  generateTaskFromPrompt,
};

// Gemini implementation kept for reference, as requested.
// const {
//   GoogleGenerativeAI,
// } = require("@google/generative-ai");
//
// const genAI = new GoogleGenerativeAI(
//   process.env.GEMINI_API_KEY
// );
//
// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",
// });
//
// const generateTaskFromPrompt = async (prompt) => {
//   try {
//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (error) {
//     console.error(
//       "GEMINI ERROR =>",
//       error.response?.data || error.message || error
//     );
//     throw error;
//   }
// };
