import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./MainPage.css";
import image from "./Avatar.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typewriter from "typewriter-effect"

const StyledWrapper = styled.div`
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 13rem;
    overflow: hidden;
    height: 3rem;
    background-size: 300% 300%;
    cursor: pointer;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
    transition: 0.5s;
    animation: gradient_301 5s ease infinite;
    border: double 4px transparent;
    background-image: linear-gradient(#212121, #212121),
      linear-gradient(
        137.48deg,
        rgba(0, 14, 72, 0.68) 10%,
        rgb(0, 0, 68) 45%,
        rgb(3, 16, 75) 67%,
        rgb(0, 9, 34) 87%
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
  }

  #container-stars {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
  }

  strong {
    z-index: 2;
    font-family: "Avalors Personal Use";
    font-size: 12px;
    letter-spacing: 5px;
    color: #ffffff;
    text-shadow: 0 0 4px white;
  }

  #glow {
    position: absolute;
    display: flex;
    width: 12rem;
  }

  .circle {
    width: 100%;
    height: 30px;
    filter: blur(2rem);
    animation: pulse_3011 4s infinite;
    z-index: -1;
  }

  .circle:nth-of-type(1) {
    background: rgb(10, 0, 65);
  }

  .circle:nth-of-type(2) {
    background: rgb(7, 0, 80);
  }

  .btn:hover #container-stars {
    z-index: 1;
    background-color: #212121;
  }

  .btn:hover {
    transform: scale(1.1);
  }

  .btn:active {
    border: double 4px #000f35;
    background-origin: border-box;
    background-clip: content-box, border-box;
    animation: none;
  }

  .btn:active .circle {
    background: #000f35;
  }

  #stars {
    position: relative;
    background: transparent;
    width: 200rem;
    height: 200rem;
  }

  #stars::after {
    content: "";
    position: absolute;
    top: -10rem;
    left: -100rem;
    width: 100%;
    height: 100%;
    animation: animStarRotate 90s linear infinite;
  }

  #stars::after {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
  }

  #stars::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50%;
    width: 170%;
    height: 500%;
    animation: animStar 60s linear infinite;
  }

  #stars::before {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
    opacity: 0.5;
  }

  @keyframes animStar {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(-135rem);
    }
  }

  @keyframes animStarRotate {
    from {
      transform: rotate(360deg);
    }

    to {
      transform: rotate(0);
    }
  }

  @keyframes gradient_301 {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes pulse_3011 {
    0% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`;

const MainPage = () => {
  const titleText =
    "LET'S BEGIN YOUR AI INTERVIEW SIMULATION: PRACTICE MAKES PERFECT!";
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const titleIndex = useRef(0);

  const [showModal, setShowModal] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [proposalFile, setProposalFile] = useState(null);
  const [sourceOption, setSourceOption] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [isUploading, setIsUploading] = useState(false); // Flag to track upload state
  const [cvFileName, setCvFileName] = useState("");
  const [proposalFileName, setProposalFileName] = useState("");
  const Navigate = useNavigate();
  const [cvSent, setCvSent] = useState(false);
  
  


  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (titleIndex.current < titleText.length) {
        setDisplayedTitle(
          (prev) => prev + titleText.charAt(titleIndex.current)
        );
        titleIndex.current++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);


    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [titleText]);

  const handleGetStarted = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setJobTitle("");
    setStep(1);
    setSelection(null);
    setCvFile(null);
    setProposalFile(null);
    setSourceOption("");
    setSkills([]);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleCloseModal2 = async () => {
    if (sourceOption === "cv" && cvFile) {
      // Send CV to backend
      const formData = new FormData();
      formData.append("cv", cvFile);
      setCvSent(true);
      try {
        await fetch("http://127.0.0.1:8000/upload_cv", {
          method: "POST",
          body: formData,
        });
        alert("CV sent successfully!");
      } catch (error) {
        console.error("Error sending CV:", error);
      }
    } else if (sourceOption === "proposal" && proposalFile) {
      // Send Project Proposal to backend
      const formData = new FormData();
      formData.append("proposal", proposalFile);
      try {
        await fetch("http://127.0.0.1:8000/upload_project", {
          method: "POST",
          body: formData,
        });
        alert("Project Proposal sent successfully!");
      } catch (error) {
        console.error("Error sending Proposal:", error);
      }
    }
    Navigate("/meeting", {
      state: {
        cvSent
      }
    } );
  };

  const handleNextClick = () => {
    setStep((prev) => prev + 1);
    // Navigate('/meeting');
  };

  const handleBackClick = () => setStep((prev) => prev - 1);

  const handleSkillAdd = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };
  const handleCloseModal3 = async () => {
    try {
      console.log("Sending skills:", skills);
      // const response = await axios.post("http://localhost:5000/api/skills", {
      //   skills: skills.join(", "),
      // });
      // alert("Skills sent successfully!");
    } catch (error) {
      console.error("Error sending Proposal:", error);
    }
    
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "cv") {
        setCvFile(file);
        setCvFileName(file.name);
      } else if (type === "proposal") {
        setProposalFile(file);
        setProposalFileName(file.name);
      }

      // Simulate file upload progress
      setIsUploading(true);
      let progress = 0;
      const uploadInterval = setInterval(() => {
        if (progress < 100) {
          progress += 10;
          setUploadProgress(progress);
        } else {
          clearInterval(uploadInterval);
          setIsUploading(false);
        }
      }, 500);
    }
  };

  return (
    <div className="main-page">
      <div className="container">
        <div className="text-section">
          <h1 className="title">
            LET'S BEGIN YOUR AI INTERVIEW SIMULATION:
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("<span class='text-1'>PRACTICE MAKES PERFECT!</span>")
                  .pauseFor(2000)
                  .deleteAll()
                  .start()
              }}
            />
          </h1>
          <p className="description">
            <b>Are You Ready to Ace Your Interview?</b> Before you begin, make
            sure your CV is up-to-date. Find a quiet space, dress
            professionally, and prepare to engage in a realistic interview
            experience tailored to your background with your AI avatar!
          </p>
          <div className="buttons">
            <StyledWrapper>
              <button type="button" className="btn" onClick={handleGetStarted}>
                <strong>GET STARTED</strong>
                <div id="container-stars">
                  <div id="stars" />
                </div>
                <div id="glow">
                  <div className="circle" />
                  <div className="circle" />
                </div>
              </button>
            </StyledWrapper>
          </div>
        </div>
        <div className="image-section">
          <img alt="An Interviewer" height="300" src={image} width="400" />
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>

            {/* Step 1 */}
            {step === 1 && (
              <>
                <label className="text1">Enter Your Chosen Career Role :</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
                <label className="text1">
                  Choose How You Want To Continue :
                </label>
                <div className="option-select">
                  <div
                    onClick={() => setSelection("cv")}
                    className={`option ${selection === "cv" ? "selected" : ""}`}
                  >
                    Continue with CV & Project Proposal
                  </div>
                </div>
                <div className="option-select">
                  <div
                    onClick={() => setSelection("no-cv")}
                    className={`option ${
                      selection === "no-cv" ? "selected" : ""
                    }`}
                  >
                    Continue Without Project Proposal
                  </div>
                </div>
                <button
                  className="next-btn1"
                  onClick={handleNextClick}
                  disabled={!jobTitle || !selection} // Disable if jobTitle or selection is missing
                >
                  Next
                </button>
              </>
            )}
            {/* Step 2 (Upload CV) */}
            {step === 2 && selection === "cv" && (
              <>
                <div>
                  <label className="title1">Upload your CV</label>
                  <div
                    className="upload-box"
                    onClick={() => document.getElementById("cv-upload").click()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      fill="#000000"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 342.219 342.219"
                      xmlSpace="preserve"
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "10px",
                      }}
                    >
                      <g>
                        <path d="M328.914,0.002H13.305C5.957,0.002,0,5.959,0,13.307V328.91c0,7.35,5.958,13.307,13.305,13.307h315.609 c7.348,0,13.305-5.957,13.305-13.307V13.306C342.219,5.959,336.262,0.002,328.914,0.002z M315.609,315.605h-289V26.611h289 V315.605z"></path>
                        <path d="M180.52,107.507c-4.988-4.99-13.825-4.99-18.813,0L110.815,158.4c-5.197,5.197-5.197,13.618,0,18.814 c5.197,5.196,13.623,5.196,18.814,0l28.179-28.182v111.273c0,7.348,5.958,13.305,13.305,13.305 c7.348,0,13.305-5.957,13.305-13.305V149.033l28.184,28.182c2.596,2.6,6.002,3.898,9.406,3.898c3.402,0,6.812-1.299,9.406-3.898 c5.197-5.197,5.197-13.617,0-18.814L180.52,107.507z"></path>
                        <path d="M65.629,81.195h210.963c7.348,0,13.305-5.957,13.305-13.305c0-7.348-5.957-13.305-13.305-13.305H65.629 c-7.348,0-13.305,5.957-13.305,13.305C52.324,75.238,58.281,81.195,65.629,81.195z"></path>
                      </g>
                    </svg>
                    <p className="upload-text" style={{ margin: 0 }}>
                      {cvFileName
                        ? `File Selected: ${cvFileName}`
                        : "Drag and drop or browse your files"}
                    </p>
                    <input
                      type="file"
                      id="cv-upload"
                      onChange={(e) => handleFileChange(e, "cv")}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                {/* Upload progress */}
                {isUploading && (
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="progress-text">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}
                <button className="back-btn" onClick={handleBackClick}>
                  Back
                </button>
                <button
                  className="next-btn"
                  onClick={handleNextClick}
                  disabled={!cvFile}
                >
                  Next
                </button>
              </>
            )}

            {/* Step 3 (Upload Project Proposal) */}
            {step === 3 && selection === "cv" && (
              <>
                <label className="title1">
                  Upload your Project Proposal (Optional)
                </label>
                <div
                  className="upload-box"
                  onClick={() =>
                    document.getElementById("proposal-upload").click()
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 342.219 342.219"
                    xmlSpace="preserve"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "10px",
                    }}
                  >
                    <g>
                      <path d="M328.914,0.002H13.305C5.957,0.002,0,5.959,0,13.307V328.91c0,7.35,5.958,13.307,13.305,13.307h315.609 c7.348,0,13.305-5.957,13.305-13.307V13.306C342.219,5.959,336.262,0.002,328.914,0.002z M315.609,315.605h-289V26.611h289 V315.605z"></path>
                      <path d="M180.52,107.507c-4.988-4.99-13.825-4.99-18.813,0L110.815,158.4c-5.197,5.197-5.197,13.618,0,18.814 c5.197,5.196,13.623,5.196,18.814,0l28.179-28.182v111.273c0,7.348,5.958,13.305,13.305,13.305 c7.348,0,13.305-5.957,13.305-13.305V149.033l28.184,28.182c2.596,2.6,6.002,3.898,9.406,3.898c3.402,0,6.812-1.299,9.406-3.898 c5.197-5.197,5.197-13.617,0-18.814L180.52,107.507z"></path>
                      <path d="M65.629,81.195h210.963c7.348,0,13.305-5.957,13.305-13.305c0-7.348-5.957-13.305-13.305-13.305H65.629 c-7.348,0-13.305,5.957-13.305,13.305C52.324,75.238,58.281,81.195,65.629,81.195z"></path>
                    </g>
                  </svg>
                  <p className="upload-text" style={{ margin: 0 }}>
                    {proposalFileName
                      ? `File Selected: ${proposalFileName}`
                      : "Drag and drop or browse your files"}
                  </p>
                  <input
                    type="file"
                    id="proposal-upload"
                    onChange={(e) => handleFileChange(e, "proposal")}
                    style={{ display: "none" }}
                  />
                </div>
                {/* Upload progress */}
                {isUploading && (
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="progress-text">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}
                <button className="back-btn" onClick={handleBackClick}>
                  Back
                </button>
                <button className="next-btn" onClick={handleNextClick}>
                  Next
                </button>
              </>
            )}

            {/* Step 4 (Source Option) */}
            {step === 4 && selection === "cv" && (
              <>
                <label className="title1">
                  What source do you want to be based on?
                </label>
                <div className="option-select">
                  <div
                    onClick={() => setSourceOption("cv")}
                    className={`option ${
                      sourceOption === "cv" ? "selected" : ""
                    }`}
                  >
                    CV Based
                  </div>
                </div>
                <div className="option-select">
                  <div
                    onClick={() => setSourceOption("proposal")}
                    className={`option ${
                      sourceOption === "proposal" ? "selected" : ""
                    }`}
                  >
                    Project Proposal Based
                  </div>
                </div>
                <button className="back-btn" onClick={handleBackClick}>
                  Back
                </button>
                <button
                  className="finish-btn"
                  onClick={() => {
                    handleCloseModal();
                    handleCloseModal2();
                  }}
                  disabled={!sourceOption}
                >
                  Finish
                </button>
              </>
            )}

            {/* Step 2 (No CV) */}
            {step === 2 && selection === "no-cv" && (
              <>
                <label>What are the skills you are confident at?</label>
                <div className="skill">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <button onClick={handleSkillAdd} className="addskill">
                    +
                  </button>
                </div>

                <div className="skills-list">
                  {skills.map((skill) => (
                    <div key={skill} className="skill-tag">
                      {skill}{" "}
                      <span onClick={() => handleSkillRemove(skill)}>x</span>
                    </div>
                  ))}
                </div>
                <button className="back-btn" onClick={handleBackClick}>
                  Back
                </button>
                <button
                  className="finish-btn"
                  onClick={() => {
                    handleCloseModal();
                    handleCloseModal3();
                    Navigate("/meeting", {
                      state: { cvSent, skills},
                    });
                  }}
                >
                  Finish
                </button>
              </>
            )}

            {/* Back button (except step 1) */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;