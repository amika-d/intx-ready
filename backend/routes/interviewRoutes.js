const express = require("express");
const { sendMessage } = require("../config/geminiModel");
const { saveInterview } = require("../controllers/interviewController");

const Interview = require('../models/interview');


const router = express.Router();
let f_response
router.post("/process_cv", async (req, res) => {
  try {
    const cvData = req.body;
    // constructing the initial prompt
    const prompt = `
    You are an AI interviewer named Nadia. Your task is to conduct a professional and friendly interview with a candidate based on their CV. Here is the candidate's CV data:

- Name: ${cvData.name}
- Technical Skills: ${cvData.technical_skills}
- Soft Skills: ${cvData.soft_skills}
- Projects: ${cvData.projects}
- Career Objective: ${cvData.career_objective}

Follow these steps:

1. **Greet the Candidate:**  
   Start by greeting the candidate with their name and welcoming them to the interview. Ask them to introduce themselves briefly.

2. **Ask One Randomized Question at a Time:**  
   After the introduction, ask **one question at a time** about the candidate's skills, projects, or career objective. Randomize the order of the questions, but ensure you cover all areas (technical skills, soft skills, projects, and career objective). Use the following question templates:  
   - **Technical Skills:**  
     - "Can you tell me about a project where you used ${cvData.technical_skills} effectively?"  
     - "How do you stay updated with the latest trends in ${cvData.technical_skills}?"  
     - "What challenges have you faced while working with ${cvData.technical_skills}, and how did you overcome them?"  
   - **Soft Skills:**  
     - "Can you share an example of how you’ve demonstrated ${cvData.soft_skills} in a team setting?"  
     - "How do you handle conflicts or disagreements in a team using your ${cvData.soft_skills}?"  
     - "Tell me about a time when your ${cvData.soft_skills} helped you achieve a goal."  
   - **Projects:**  
     - "Can you walk me through one of your projects, specifically ${cvData.projects}, and explain your role and contributions?"  
     - "What was the most challenging part of working on ${cvData.projects}, and how did you address it?"  
     - "What did you learn from working on ${cvData.projects}?"  
   - **Career Objective:**  
     - "Your career objective is ${cvData.career_objective}. How do you see this role helping you achieve that goal?"  
     - "What steps are you currently taking to achieve your career objective of ${cvData.career_objective}?"  
     - "How does your career objective align with the responsibilities of this role?"

3. **End the Interview:**  
   After asking all the questions, thank the candidate for their time and let them know the next steps (e.g., "Thank you for your time, ${cvData.name}! We’ll be in touch soon regarding the next steps.")

Maintain a professional and friendly tone throughout the interview. Randomize the order of the questions and ask one question at a time. And wait for the candidate's response before asking the next question.

    `;

    const response = await sendMessage(prompt);
    console.log(response);
    res.json({ response });
    f_response = response;
  } catch (error) {
    console.error("Error in /process_cv:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/first_resp", async (req, res) => {
  try {
    if (!f_response) {
      return res.status(404).json({ response: "No response yet" });
    }
    res.json(f_response);
    console.log("passed")
  } catch (error) {
    console.error("Error in /first_resp:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/chat", async (req, res) => {
  try {
    const { userMessage } = req.body;
    const response = await sendMessage(userMessage);
    res.json({ response });
  } catch (error) {
    console.error("Error in /chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/feedback", async (req, res) => {
  try {
    const { aiResponse, userInput } = req.body;
    const feedbackPrompt = `
     You are an AI interviewer analyzing a candidate's response. Given the following:
      **Interview Question:**  
    ${aiResponse}

    **Candidate's Response:**  
    ${userInput}
      Provide structured feedback in the format:
      - **Strengths:** Highlight positive aspects.
      - **Areas for Improvement:** Constructive feedback.


    `;
    const response = await sendMessage(feedbackPrompt);
    await saveInterview(aiResponse, userInput, response);
    res.json({ response });

  } catch (error) {
    console.error("Error in /feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/interview", async (req, res) => {
  try {
    // Sample response (remove if database is working fine)
    const sampleInterviews = [
      {
        _id: "12345",
        candidateName: "John Doe",
        overallScore: 85,
        skills: [
          { name: "Communication", value: 90 },
          { name: "Problem-Solving", value: 80 },
          { name: "Technical Knowledge", value: 85 },
        ],
        questions: [
          {
            id: 1,
            question: "Tell me about yourself.",
            answer: "I am a software engineer with experience in full-stack development.",
            feedback: "Good introduction. Try to highlight key achievements.",
          },
          {
            id: 2,
            question: "What are your strengths?",
            answer: "I am highly analytical and detail-oriented.",
            feedback: "Great, but provide a real-world example.",
          },
        ],
      },
      {
        _id: "67890",
        candidateName: "Jane Smith",
        overallScore: 78,
        skills: [
          { name: "Leadership", value: 85 },
          { name: "Adaptability", value: 80 },
        ],
        questions: [
          {
            id: 1,
            question: "Describe a challenging project you worked on.",
            answer: "I led a team to migrate a legacy system to the cloud.",
            feedback: "Good answer, but add technical details on migration challenges.",
          },
        ],
      },
    ];

    res.json(sampleInterviews);
  } catch (error) {
    console.error("Error fetching interview:", error);
    res.status(500).json({ message: "Server error", error });
  }
});






module.exports = router;
