const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const InterviewSchema = new mongoose.Schema({
  cvId: { type: String, default: uuidv4, unique: true, required: true }, // Unique session ID
  aiPrompt: [{ type: String, required: true }],
  UserResponses: [{ type: String }], // List of user responses
  aiFeedbacks: [{ type: String }], // List of AI responses
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Interview", InterviewSchema);
