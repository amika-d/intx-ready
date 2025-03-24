import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrainerSelection.css";
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import ScrollToTop from "./components/ScrollToTop";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const TrainerCard = ({ trainer, onViewClick }) => {
    return (
        <fieldset id="fieldset1">
            <div className="trainer-card-content">
                <img src={trainer.imgSrc} alt={trainer.name} className="trainer-images" />
                <h3>{trainer.name}</h3>
                <p>{trainer.title}</p>
                <p>Price: ${trainer.price}</p>
                <StyledWrapper>
                    <button className="learn-more" onClick={() => onViewClick(trainer)}>
                        <span aria-hidden="true" className="circle">
                            <span className="icon arrow" />
                        </span>
                        <span className="button-text">Learn More</span>
                    </button>
                </StyledWrapper>
            </div>
        </fieldset>
    );
};

const TrainerModal = ({ trainerDetails, isOpen, onClose, proceedToCheckout }) => {
    if (!isOpen) return null;

    return (
        <div className="trainer-overlay active" onClick={onClose}>
            <div className="trainer-modal active" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <span id="trainer-name">
                        {trainerDetails.name}{" "}
                    </span>
                    <button className="close-button" onClick={onClose}>
                        ✖
                    </button>
                </div>
                <div className="modal-body">
                    <img
                        src={trainerDetails.imgSrc}
                        alt={trainerDetails.name}
                        className="trainer-modal-image"
                    />
                    <div className="details-container">
                        <p>{trainerDetails.description}</p>
                        <p id="info"><strong>Title:</strong> {trainerDetails.title}</p>
                        <p id="info"><strong>Company:</strong> {trainerDetails.company}</p>
                        <p id="info"><strong>Experience:</strong> {trainerDetails.experience}</p>
                        <p id="info"><strong>Price:</strong> ${trainerDetails.price}</p>
                    </div>
                </div>
                <StyledWrapper>
                    <button className="pay-btn" onClick={proceedToCheckout}>
                        <span className="btn-text">Pay Now</span>
                        <div className="icon-container">
                            <svg viewBox="0 0 24 24" className="icon card-icon">
                                <path d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18C2,19.11 2.89,20 4,20H20C21.11,20 22,19.11 22,18V6C22,4.89 21.11,4 20,4Z" fill="currentColor" />
                            </svg>
                            <svg viewBox="0 0 24 24" className="icon payment-icon">
                                <path d="M2,17H22V21H2V17M6.25,7H9V6H6V3H18V6H15V7H17.75L19,17H5L6.25,7M9,10H15V8H9V10M9,13H15V11H9V13Z" fill="currentColor" />
                            </svg>
                            <svg viewBox="0 0 24 24" className="icon dollar-icon">
                                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="currentColor" />
                            </svg>
                            <svg viewBox="0 0 24 24" className="icon wallet-icon default-icon">
                                <path d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z" fill="currentColor" />
                            </svg>
                            <svg viewBox="0 0 24 24" className="icon check-icon">
                                <path d="M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z" fill="currentColor" />
                            </svg>
                        </div>
                    </button>
                </StyledWrapper>
            </div>
        </div>
    );
};

const TrainerSelection = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const navigate = useNavigate();

    const trainers = [
        {
            name: "James Carter",
            title: "Senior Hiring Manager",
            company: "ABC Corp",
            experience: "10 years",
            rating: 4.8,
            price: 150,
            priceId: 'price_1QyxHrHF5bVoDpsH7AQRy3KH',
            imgSrc: process.env.PUBLIC_URL + "/Images/Trainer1.png",
            description: "James Carter is an experienced hiring manager with expertise in identifying talent and coaching candidates to excel in interviews. He has a proven track record of helping professionals secure their dream jobs."
        },
        {
            name: "Michael Reed",
            title: "Leadership Coach",
            company: "XYZ Ltd",
            experience: "8 years",
            rating: 4.7,
            price: 120,
            priceId: 'price_1QyxInHF5bVoDpsHQXBhkwbB',
            imgSrc: process.env.PUBLIC_URL + "/Images/Trainer2.png",
            description: "Michael Reed specializes in leadership development and career growth. With years of experience coaching executives, he brings insights that are invaluable to career progression."
        },
        {
            name: "Sophia Taylor",
            title: "Interview Strategist",
            company: "NextStep Careers",
            experience: "13 years",
            rating: 4.9,
            price: 200,
            priceId: 'price_1QyxJWHF5bVoDpsH1lunQTdo',
            imgSrc: process.env.PUBLIC_URL + "/Images/Trainer5.jpeg",
            description: "Sophia Taylor specializes in creating effective interview strategies tailored to individual strengths. With over a decade of experience, she has helped numerous candidates secure their dream roles."
        },
        {
            name: "Emily Davis",
            title: "Behavioral Interview Coach",
            company: "CareerAscend",
            experience: "10 years",
            rating: 4.8,
            price: 180,
            priceId: 'price_1QyxKEHF5bVoDpsHjVr6DIQy',
            imgSrc: process.env.PUBLIC_URL + "/Images/Trainer6.jpeg",
            description: "Emily Davis is an expert in behavioral interview techniques. She helps candidates master the STAR method and other frameworks to excel in competency-based interviews."
        },
        {
            name: "William Harris",
            title: "Recruitment Expert",
            company: "Elite Recruiters",
            experience: "9 years",
            rating: 4.9,
            price: 160,
            priceId: 'price_1QyxKoHF5bVoDpsH6xoimyep',
            imgSrc: process.env.PUBLIC_URL + "/Images/Trainer3.png",
            description: "William Harris is a recruitment expert who has worked with top-tier companies to scout and develop talent. His sessions provide a comprehensive understanding of the hiring process."
        },
        {
            name: "Ethan Blake",
            title: "Soft Skills Trainer",
            company: "SkillsPro",
            experience: "7 years",
            rating: 4.5,
            price: 140,
            priceId: 'price_1QyxLPHF5bVoDpsH1MHWs4G2',
            imgSrc: process.env.PUBLIC_URL + "/Images/Trainer4.png",
            description: "Ethan Blake focuses on enhancing interpersonal and communication skills, ensuring candidates present themselves effectively during interviews and in the workplace."
        },
        {
            name: "Olivia Brown",
            title: "Team Management Coach",
            company: "TeamWorks",
            experience: "11 years",
            rating: 4.7,
            price: 170,
            priceId: 'price_1QyxLuHF5bVoDpsH0OB3nLv4',
            imgSrc: process.env.PUBLIC_URL + "/Images/Trainer7.jpeg",
            description: "Olivia Brown brings years of experience in team management and organizational leadership. She helps candidates master collaborative and leadership skills to stand out"
        },
        {
            name: "Isabella Clark",
            title: "Public Speaking Coach",
            company: "SpeakEasy",
            experience: "15 years",
            rating: 4.8,
            price: 190,
            priceId: 'price_1QyxMWHF5bVoDpsHvRLXtQj1',
            imgSrc: process.env.PUBLIC_URL + "/Images/Trainer8.jpeg",
            description: "Isabella Clark is an accomplished public speaking coach who empowers candidates to communicate with confidence and clarity in interviews and presentations."
        },
    ];

    const openModal = (trainer) => {
        setSelectedTrainer(trainer);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedTrainer(null);
    };

    const proceedToCheckout = async () => {
        if (selectedTrainer) {
            try {
                const stripe = await stripePromise;
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/create-checkout-session`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        priceId: selectedTrainer.priceId,
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }

                const session = await response.json();

                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });

                if (result.error) {
                    console.error(result.error.message);
                }
            } catch (error) {
                console.error('Error during checkout:', error);
            }
        }
    };

    return (
        <div className="tariner-page">
            <h1>
                Select <span id="style1">Your</span> Trainer ...
            </h1>
            <div className="trainer-container1">
                {trainers.map((trainer, index) => (
                    <TrainerCard key={index} trainer={trainer} onViewClick={openModal} />
                ))}
            </div>
            <TrainerModal
                trainerDetails={selectedTrainer}
                isOpen={modalOpen}
                onClose={closeModal}
                proceedToCheckout={proceedToCheckout}
            />
            <ScrollToTop/>
        </div>
    );
};

const StyledWrapper = styled.div`
  button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    background: transparent;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
  }

  button.learn-more {
    width: 12rem;
    height: auto;
  }

  button.learn-more .circle {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    box-shadow: 0 0 5px 1px white;
    position: relative;
    display: block;
    margin: 0;
    width: 3rem;
    height: 3rem;
    background: #282936;
    border-radius: 1.625rem;
  }

  button.learn-more .circle .icon {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
  }

  button.learn-more .circle .icon.arrow {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    left: 0.625rem;
    width: 1.125rem;
    height: 0.125rem;
    background: none;
  }

  button.learn-more .circle .icon.arrow::before {
    position: absolute;
    content: "";
    top: -0.29rem;
    right: 0.0625rem;
    width: 0.625rem;
    height: 0.625rem;
    border-top: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    transform: rotate(45deg);
  }

  button.learn-more .button-text {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.75rem 0;
    margin: 0 0 0 1.85rem;
    color: rgba(0, 0, 0, 0.49);
    font-weight: 700;
    line-height: 1.6;
    text-align: center;
    text-transform: uppercase;
  }

  button:hover .circle {
    width: 100%;
    box-shadow: 0 0 10px 2px white;
  }

  button:hover .button-text {
    transform: translate(-1.7rem, 0);
  }

  button:hover .circle .icon.arrow {
    background: #fff;
    transform: translate(8.7rem, 0);
  }

  button:active .circle .icon.arrow {
    transform: translate(9.5rem, 0);
    transition: all 0.3s;
  }

  button:active .circle {
    transform: scale(0.9);
    transition: all 0.3s;
    box-shadow: 0 0 5px 0.5px white;
  }

  button:hover .button-text {
    color: #fff;
  }

  button:active .button-text {
    color: rgba(255, 255, 255, 0.459);
  }

  .pay-btn {
    position: relative;
    padding: 12px 24px;
    font-size: 16px;
    background: #1a1a1a;
    color: white;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    margin-left: 30px;
    margin-top: 20px;
    width: 650px;
  }

  .pay-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }

  .icon-container {
    position: relative;
    width: 24px;
    height: 24px;
    display: flex; /* make icon-container a flex container */
    justify-content: center; /* center horizontally */
    align-items: center; /* center vertically */
  }

  .pay-btn .icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    color: #22c55e;
    opacity: 0;
    visibility: hidden;
    align-items: center;
  }

  .default-icon {
    opacity: 1;
    visibility: visible;
    align-items: center;
  }

  /* Hover animations */
  .pay-btn:hover .icon {
    animation: none;
  }

  .pay-btn:hover .wallet-icon {
    opacity: 0;
    visibility: hidden;
  }

  .pay-btn:hover .card-icon {
    animation: iconRotate 2.5s infinite;
    animation-delay: 0s;
  }

  .pay-btn:hover .payment-icon {
    animation: iconRotate 2.5s infinite;
    animation-delay: 0.5s;
  }

  .pay-btn:hover .dollar-icon {
    animation: iconRotate 2.5s infinite;
    animation-delay: 1s;
  }

  .pay-btn:hover .check-icon {
    animation: iconRotate 2.5s infinite;
    animation-delay: 1.5s;
  }

  /* Active state - show only checkmark */
  .pay-btn:active .icon {
    animation: none;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .pay-btn:active .check-icon {
    animation: checkmarkAppear 0.6s ease forwards;
    visibility: visible;
  }

  .btn-text {
    text-align: center;
    font-weight: 600;
    font-family: system-ui, -apple-system, sans-serif;
  }

  @keyframes iconRotate {
    0% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px) scale(0.5);
    }
    5% {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    15% {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    20% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px) scale(0.5);
    }
    100% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px) scale(0.5);
    }
  }

  @keyframes checkmarkAppear {
    0% {
      opacity: 0;
      transform: scale(0.5) rotate(-45deg);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2) rotate(0deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
}`

export default TrainerSelection;