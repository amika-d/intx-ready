import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./MakeYourChoicePage.css";

const MakeYourChoicePage = () => {
  const navigate = useNavigate();

  const handleCVClick = () => {
    navigate('/video');
  };

  const handleProposalClick = () => {
    navigate('/video');
  };

  return (
    <div className='container'>
      <h1>SELECT YOUR PREFERED QUESTION SOURCE</h1>
    <div className='button-wrapper'>
        <div className="button-container">
            <button className="continue-application" onClick={handleCVClick}>
                <img src="./Images/Resume.jpg" alt="CV Based Questions" /> {/* Replace "cv_icon.png" with your image path */}
                <p className='label'>CV</p><br/>
                <p className='label2'>Based On</p>
            </button>
            
        </div>
        <div className="button-container">
            <button className="continue-application1" onClick={handleProposalClick}>
                <img src="./Images/ProjectProposal.jpg" alt="Project Proposal Based Questions" /> {/* Replace "proposal_icon.png" with your image path */}
                <p className='label1'>PROJECT <br/>PROPOSAL</p><br/>
                <p className='label21'>Based On</p>
            </button>
            
        </div>
    </div>
</div>
  );
}

export default MakeYourChoicePage;