const express = require("express");
const axios = require("axios");
const cors = require("cors");
const router = express.Router();

const GOOGLE_TTS_API_KEY = process.env.GOOGLE_TTS_API_KEY;

router.post("/voice", async (req, res) => {
  try {
    const { text } = req.body; // Fixed destructuring (no need for `.text` again)

    const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`;

    const payload = {
      audioConfig: {
        audioEncoding: "MP3",
        effectsProfileId: ["small-bluetooth-speaker-class-device"],
        pitch: 0,
        speakingRate: 1,
      },
      input: { text },
      voice: {
        languageCode: "en-US",
        name: "en-US-Chirp3-HD-Aoede",
      },
    };

    // 🔹 Using Axios instead of fetch
    const response = await axios.post(endpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Google TTS response:", response.data);
    if (!response.data.audioContent) {
      return res.status(500).json({ error: "No audio content received from API" });
    }


    res.json(response.data); // Send Google TTS response back to client
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error processing audio" });
  }
});

module.exports = router;
