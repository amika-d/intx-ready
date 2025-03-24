const Interview = require('../models/interview');



const saveInterview = async (aiPrompt, UserResponse, aiFeedback) => {

    try{
        if (!aiPrompt || aiPrompt.trim() === "") {
            throw new Error("aiPrompt is required but received empty value.");
        }
        let interview = await Interview.findOne(); 
        
        if(!interview){
            interview = new Interview({
                
                aiPrompt: [aiPrompt],   // Convert to array
                UserResponses: [UserResponse],  // Convert to array
                aiFeedbacks: [aiFeedback] 
            });
            
        }else{
            interview.aiPrompt.push(aiPrompt);
            interview.UserResponses.push(UserResponse);
            interview.aiFeedbacks.push(aiFeedback);
            
        }
        await interview.save();
        console.log("Interview saved");
    } catch (error) {
        console.error("Error saving feedback to DB:", error);
      }
    };
    
    module.exports = { saveInterview };