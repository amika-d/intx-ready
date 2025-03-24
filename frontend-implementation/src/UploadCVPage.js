import React, { useState } from 'react';
/*import { useNavigate } from 'react-router-dom';*/
import './UploadCVPage.css';
import styled from 'styled-components';

const UploadCVPage = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [cvFile, setCvFile] = useState(null);
    const [projectProposalFile, setProjectProposalFile] = useState(null);
    const [choiceFile] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [isExiting, setIsExiting] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showSkillsWindow, setShowSkillsWindow] = useState(false);

    const handleJobTitleChange = (event) => {
        setJobTitle(event.target.value);
    };

    const handleCVChange = (event) => {
        setCvFile(event.target.files[0]);
    };

    const handleProjectProposalChange = (event) => {
        setProjectProposalFile(event.target.files[0]);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleNextClick = () => {
        if (currentStep === 1) {
            if (!jobTitle || !selectedOption) return;
            if (selectedOption === 'value-2') {
                setShowSkillsWindow(true);
                return;
            }
        }
        if (currentStep === 2 && !cvFile) return;

        setIsExiting(true);
        setTimeout(() => {
            setCurrentStep(currentStep + 1);
            setIsExiting(false);
        }, 500);
    };

    const handleBackClick = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleBackFromSkills = () => {
        setShowSkillsWindow(false);
        setCurrentStep(1);
    };

    const handleContinueClick = () => {
        if (currentStep === 4) {
            setCurrentStep(5);
        } else {
            console.log('Job Title:', jobTitle);
            console.log('CV File:', cvFile);
            console.log('Project Proposal File:', projectProposalFile);
            console.log('Choose File:', choiceFile);
            // navigate('/make-your-choice'); // Remove or adjust this line if needed
        }
    };

    const StyledWrapper = styled.div`
        .radio-input input {
            display: none;
        }

        .info {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .question {
            color: rgb(49, 49, 49);
            font-size: 1rem;
            line-height: 1rem;
            font-weight: 800;
        }

        .radio-input label {
            display: flex;
            background-color: #fff;
            padding: 14px;
            margin: 8px 0 0 0;
            font-size: 13px;
            font-weight: 600;
            border-radius: 10px;
            cursor: pointer;
            border: 1px solid rgba(187, 187, 187, 0.164);
            color: #000;
            transition: 0.3s ease;
        }

        .radio-input label:hover {
            background-color: rgba(24, 24, 24, 0.13);
            border: 1px solid #bbb;
        }

        .result {
            margin-top: 10px;
            font-weight: 600;
            font-size: 12px;
            display: none;
            transition: display 0.4s ease;
        }

        .result.success {
            color: green;
        }

        .result.error {
            color: red;
        }

        .radio-input input:checked + label {
            border-color: red;
            color: red;
        }

        .radio-input input[value='value-2']:checked + label {
            border-color: rgb(22, 245, 22);
            color: rgb(16, 184, 16);
        }

        .animated-button {
            position: relative;
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 16px 36px;
            border: 2px solid;
            border-color: rgb(0, 0, 0);
            font-size: 16px;
            background-color: inherit;
            border-radius: 100px;
            font-weight: 600;
            color: black;
            box-shadow: 0 0 0 2px white;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
            margin-bottom: 20px;
            width: 550px;
        }

        .animated-button svg {
            position: absolute;
            width: 24px;
            fill: white;
            z-index: 9;
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .arr-1 {
            right: 16px;
        }

        .animated-button .arr-2 {
            left: -25%;
        }

        .animated-button .circle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 220px;
            height: 220px;
            background-color: white;
            border-radius: 50%;
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .text {
            position: relative;
            z-index: 1;
            transform: translateX(-12px);
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button:hover {
            box-shadow: 0 0 0 12px transparent;
            color: black;
            border-radius: 12px;
        }

        .animated-button:hover .arr-1 {
            right: -25%;
        }

        .animated-button:hover .arr-2 {
            left: 16px;
        }

        .animated-button:hover .text {
            transform: translateX(12px);
        }

        .animated-button:hover svg {
            fill: #212121;
        }

        .animated-button:active {
            scale: 0.95;
            box-shadow: 0 0 0 4px white;
        }

        .animated-button:hover .circle {
            width: 220px;
            height: 220px;
            opacity: 1;
        }
    `;

    const SkillsEntryWindow = ({ onBack }) => {
        const [newSkill, setNewSkill] = useState('');
        const [skills, setSkills] = useState([]);

        const handleAddSkill = () => {
            if (newSkill) {
                setSkills([...skills, newSkill]);
                setNewSkill('');
            }
        };

        const handleRemoveSkill = (skillToRemove) => {
            setSkills(skills.filter(skill => skill !== skillToRemove));
        };

        return (
            <div className="skills-window">
                <h2>Enter Your Skills</h2>
                <div className="skill-input-container">
                    <input
                        type="text"
                        id="skill"
                        value={newSkill}
                        placeholder="Java,Web Development,Python,SQL,..."
                        onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <button type="button" onClick={handleAddSkill} className="plus">
                        +
                    </button>
                </div>
                <div className="skills-list">
                    {skills.map((skill, index) => (
                        <button key={index} className="skill-button">
                            {skill} <span onClick={() => handleRemoveSkill(skill)}>x</span>
                        </button>
                    ))}
                </div>
                <button type="button" className="back-button" onClick={handleBackFromSkills}>
                    Back
                </button>
                <button type="button" className="next-button" onClick={handleNextClick} disabled={!cvFile}>
                    Next
                </button>
            </div>
        );
    };

    const renderStep = () => {
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1' }}>
                    {showSkillsWindow ? (
                        <SkillsEntryWindow onBack={handleBackFromSkills} />
                    ) : (
                        (() => {
                            switch (currentStep) {
                                case 1:
                                    return (
                                        <div className={`step ${isExiting ? 'step-exit' : ''}`}>
                                            <label htmlFor="jobTitle">Job Title</label>
                                            <input type="text" id="jobTitle" value={jobTitle} onChange={handleJobTitleChange} />
                                            <StyledWrapper>
                                                <div className="radio-input">
                                                    <div className="info">
                                                        <span className="question">Enhance with Documents?</span>
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        id="value-1"
                                                        name="value-radio"
                                                        value="value-1"
                                                        checked={selectedOption === 'value-1'}
                                                        onChange={handleOptionChange}
                                                    />
                                                    <label htmlFor="value-1">Continue With CV & Project Proposal</label>
                                                    <input
                                                        type="radio"
                                                        id="value-2"
                                                        name="value-radio"
                                                        value="value-2"
                                                        checked={selectedOption === 'value-2'}
                                                        onChange={handleOptionChange}
                                                    />
                                                    <label htmlFor="value-2">Continue Without CV & Project Proposal</label>
                                                </div>
                                            </StyledWrapper>
                                            <button
                                                type="button"
                                                className="next-button1"
                                                onClick={handleNextClick}
                                                disabled={!jobTitle || !selectedOption}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    );
                                case 2:
                                    return (
                                        <div className={`step ${isExiting ? 'step-exit' : ''}`}>
                                            <label htmlFor="uploadCV">Upload Your CV here</label>
                                            <div className="header">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path
                                                            d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M12 12V21M12 12L15 15M12 12L9 15"
                                                            stroke="#000000"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                </svg>
                                                <p>Browse File to upload!</p>
                                            </div>
                                            <label htmlFor="file" className="footer">
                                                <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path d="M15.331 6H8.5v20h15V14.154h-8.169z" />
                                                        <path d="M18.153 6h-.009v5.342H23.5v-.002z" />
                                                    </g>
                                                </svg>
                                                <span className="file-name">{cvFile ? cvFile.name : 'Not selected file'}</span>
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path
                                                            d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                                                            stroke="#000000"
                                                            strokeWidth={2}
                                                        />
                                                        <path d="M19.5 5H4.5" stroke="#000000" strokeWidth={2} strokeLinecap="round" />
                                                        <path
                                                            d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                                                            stroke="#000000"
                                                            strokeWidth={2}
                                                        />
                                                    </g>
                                                </svg>
                                            </label>
                                            <input id="file" type="file" onChange={handleCVChange} />
                                            <button type="button" className="back-button" onClick={handleBackClick}>
                                                Back
                                            </button>
                                            <button type="button" className="next-button" onClick={handleNextClick} disabled={!cvFile}>
                                                Next
                                            </button>
                                        </div>
                                    );
                                case 3:
                                    return (
                                        <div className={`step ${isExiting ? 'step-exit' : ''}`}>
                                            <label htmlFor="uploadProposal">Upload Your Project Proposal(Optional)</label>
                                            <div className="header">
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path
                                                            d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 2111.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M12 12V21M12 12L15 15M12 12L9 15"
                                                            stroke="#000000"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                </svg>
                                                <p>Browse File to upload!</p>
                                            </div>
                                            <label htmlFor="file" className="footer">
                                                <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path d="M15.331 6H8.5v20h15V14.154h-8.169z" />
                                                        <path d="M18.153 6h-.009v5.342H23.5v-.002z" />
                                                    </g>
                                                </svg>
                                                <span className="file-name">{projectProposalFile ? projectProposalFile.name : 'Not selected file'}</span>
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path
                                                            d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                                                            stroke="#000000"
                                                            strokeWidth={2}
                                                        />
                                                        <path d="M19.5 5H4.5" stroke="#000000" strokeWidth={2} strokeLinecap="round" />
                                                        <path
                                                            d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                                                            stroke="#000000"
                                                            strokeWidth={2}
                                                        />
                                                    </g>
                                                </svg>
                                            </label>
                                            <input id="file" type="file" onChange={handleProjectProposalChange} />
                                            <button type="button" className="back-button" onClick={handleBackClick}>
                                                Back
                                            </button>
                                            <button type="button" className="next-button" onClick={handleNextClick} disabled={!cvFile}>
                                                Next
                                            </button>
                                        </div>
                                    );
                                case 4:
                                    return (
                                        <div className={`step ${isExiting ? 'step-exit' : ''}`}>
                                            <h2>Review Information</h2>
                                            <p>
                                                <strong>Job Title:</strong> {jobTitle}
                                            </p>
                                            <p>
                                                <strong>CV:</strong> {cvFile ? cvFile.name : 'No file selected'}
                                            </p>
                                            <p>
                                                <strong>Project Proposal:</strong> {projectProposalFile ? projectProposalFile.name : 'No file selected'}
                                            </p>

                                            <button type="button" className="back-button" onClick={handleBackClick}>
                                                Back
                                            </button>
                                            <button type="button" className="continue-button" onClick={handleContinueClick}>
                                                Continue
                                            </button>
                                        </div>
                                    );
                                case 5:
                                    return (
                                        <div className="name">
                                            <h3 className='choice1'>To Get The Best Questions, Tell Us What To Focus On </h3>
                                            <StyledWrapper>
                                                <button className="animated-button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                                                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                                    </svg>
                                                    <span className="text">Based On The CV</span>
                                                    <span className="circle" />
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                                                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                                    </svg>
                                                </button>
                                                <button className="animated-button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                                                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                                                    </svg>
                                                    <span className="text">Based On The Project Proposal</span>
                                                    <span className="circle" />
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                                                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.22168 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.116Z" />
                                                    </svg>
                                                </button>
                                            </StyledWrapper>
                                            <button type="button" className="back-button" onClick={handleBackClick}>
                                                Back
                                            </button>
                                            <button type="button" className="continue-button" onClick={handleContinueClick}>
                                                Continue
                                            </button>
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })()
                    )}
                </div>
            </div>
        );
    };
    return (
        <div className="upload-container">

            <div className="form-wrapper" style={{ flex: '1' }}>{renderStep()}</div>
        </div>
    );
};

export default UploadCVPage;