import styled, { keyframes } from "styled-components";
import Navigation from "../Navigation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

// Animation keyframes
const fillCircle = keyframes`
  from { stroke-dashoffset: 251.2; }
  to { stroke-dashoffset: 70.336; } /* 251.2 - (251.2 * 72 / 100) */
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const growWidth = (width) => keyframes`
  from { width: 0; }
  to { width: ${width}%; }
`;

const growHeight = (height) => keyframes`
  from { height: 0; }
  to { height: ${height}%; }
`;

const PageWrapper = styled.div`
  width: 100vw;
  min-height: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const ContentSection = styled.section`
  width: 85%;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 2rem;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FeedbackSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
`;

const FeedbackTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
`;

const QuestionsContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
  padding-right: 0.5rem;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
`;

const QuestionCard = styled.div`
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const QuestionHeader = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
`;

const AnswerSection = styled.div`
  margin-bottom: 0.75rem;
`;

const SectionLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 0.5rem;
`;

const SectionContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.5;
  color: #333;
`;

const FeedbackContent = styled(SectionContent)`
  padding: 0.75rem;
  background-color: #f9f9f9;
  border-radius: 6px;
  border-left: 3px solid #ff9500;
`;

const CircleProgressContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: #f0f0f0;
  stroke-width: 10;
`;

const CircleProgress = styled.circle`
  fill: none;
  stroke: #ff9500;
  stroke-width: 10;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: center;
  stroke-dasharray: 251.2;
  stroke-dashoffset: 70.336; /* 251.2 - (251.2 * 72 / 100) */
  animation: ${fillCircle} 1.5s ease-in-out forwards;
`;

const CircleText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: 700;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  animation-delay: 0.5s;
  opacity: 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const MetricTitle = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const LineGraph = styled.div`
  height: 30px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const SkillsContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
`;

const SkillItem = styled.div`
  margin-bottom: 1.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.span`
  font-size: 0.875rem;
`;

const SkillValue = styled.span`
  font-size: 0.875rem;
  color: #666;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.value}%;
  background: #ff9500;
  border-radius: 4px;
  animation: ${(props) => growWidth(props.value)} 1s ease-out forwards;
  animation-delay: ${(props) => props.delay}s;
  width: 0;
`;

const BarChart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 240px;
  padding: 2rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
`;

const BarContainer = styled.div`
  position: relative;
`;

const Bar = styled.div`
  width: 40px;
  height: ${(props) => props.height}%;
  background: ${(props) => props.color};
  border-radius: 20px;
  position: relative;

  &::after {
    content: "D${(props) => props.day}";
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.875rem;
    color: #666;
  }
`;

const BarValue = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.875rem;
  font-weight: 500;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  animation-delay: ${(props) => props.delay + 0.8}s;
  opacity: 0;
`;

function Feedback() {
  const location = useLocation();
  const feedbackData = location.state?.feedback || [];
  const userAnswers = location.state?.userAnswers || [];
  console.log("Feedback Data from feedback page: ", feedbackData);
  console.log("User Answers from feedback page:", userAnswers);
  const stats = {
    overallScore: 72,
    metrics: [
      { title: "Starting Knowledge", value: 64 },
      { title: "Current Knowledge", value: 86 },
      { title: "Knowledge Gain", value: 34, prefix: "+" },
    ],
    skills: [
      { name: "Communication Skills", value: 74 },
      { name: "Content", value: 52 },
      { name: "Confidence", value: 36 },
    ],
    dailyProgress: [60, 75, 40, 55, 70, 80, 65],
  };

  return (
    <PageWrapper>
      <ContentSection>
        <Header>
          <Title>
            Thank you for using intX <br />
            to practice your interview skills!
          </Title>
          <Description>
            Here's a detailed analysis of your today's performance:
          </Description>
        </Header>
        {/* <FeedbackSection>
              <FeedbackTitle>AI Feedback</FeedbackTitle>
              <QuestionsContainer>
                {feedbackData.map((feedback, index) => {
                  // More robust regex patterns that handle various formats
                  const strengthsMatch = feedback.match(
                    /- Strengths:\s*([\s\S]*?)(?=- Areas for Improvement:|$)/i
                  );
                  
                  const areasMatch = feedback.match(
                    /- Areas for Improvement:\s*([\s\S]*?)(?=$)/i
                  );
                  
                  const strengths = strengthsMatch ? strengthsMatch[1].trim() : "No strengths found.";
                  const areas = areasMatch ? areasMatch[1].trim() : "No areas for improvement found.";
                  

                  return (
                    <QuestionCard key={index}>
                      <QuestionHeader>Question {index + 1}</QuestionHeader>
                      <AnswerSection>
                        <SectionLabel>Your Answer</SectionLabel>
                        <SectionContent>
                          {userAnswers[index] || "No response recorded"}
                        </SectionContent>
                      </AnswerSection>
                      <div>
                        <SectionLabel>Feedback</SectionLabel>
                        <FeedbackContent>
                          <strong>Strengths:</strong> {strengths}
                          <br />
                          <br />
                          <strong>Areas for improvement:</strong> {areas}
                        </FeedbackContent>
                      </div>
                    </QuestionCard>
                  );
                })}

                {feedbackData.length === 0 && (
                  <QuestionCard>
                    <QuestionHeader>No feedback available</QuestionHeader>
                    <SectionContent>
                      No feedback data was found for this session. Please make
                      sure you've completed an interview.
                    </SectionContent>
                  </QuestionCard>
                )}
              </QuestionsContainer>
            </FeedbackSection> */}
        <MainContent>
          <LeftColumn>
            <CircleProgressContainer>
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <CircleBackground cx="50" cy="50" r="40" />
                <CircleProgress cx="50" cy="50" r="40" />
              </svg>
              <CircleText>{stats.overallScore}%</CircleText>
            </CircleProgressContainer>

            <SkillsContainer>
              {stats.skills.map((skill, index) => (
                <SkillItem key={index}>
                  <SkillHeader>
                    <SkillName>{skill.name}</SkillName>
                    <SkillValue>{skill.value}%</SkillValue>
                  </SkillHeader>
                  <ProgressBar>
                    <Progress value={skill.value} delay={0.2 * index} />
                  </ProgressBar>
                </SkillItem>
              ))}
            </SkillsContainer>
          </LeftColumn>

          <RightColumn>
          <FeedbackSection>
              <FeedbackTitle>AI Feedback</FeedbackTitle>
              <QuestionsContainer>
                {feedbackData.map((feedback, index) => {
                  // More robust regex patterns that handle various formats
                  const strengthsMatch = feedback.match(
                    /- Strengths:\s*([\s\S]*?)(?=- Areas for Improvement:|$)/i
                  );
                  
                  const areasMatch = feedback.match(
                    /- Areas for Improvement:\s*([\s\S]*?)(?=$)/i
                  );
                  
                  const strengths = strengthsMatch ? strengthsMatch[1].trim() : "No strengths found.";
                  const areas = areasMatch ? areasMatch[1].trim() : "No areas for improvement found.";
                  

                  return (
                    <QuestionCard key={index}>
                      <QuestionHeader>Question {index + 1}</QuestionHeader>
                      <AnswerSection>
                        <SectionLabel>Your Answer</SectionLabel>
                        <SectionContent>
                          {userAnswers[index] || "No response recorded"}
                        </SectionContent>
                      </AnswerSection>
                      <div>
                        <SectionLabel>Feedback</SectionLabel>
                        <FeedbackContent>
                          <strong>Strengths:</strong> {strengths}
                          <br />
                          <br />
                          <strong>Areas for improvement:</strong> {areas}
                        </FeedbackContent>
                      </div>
                    </QuestionCard>
                  );
                })}

                {feedbackData.length === 0 && (
                  <QuestionCard>
                    <QuestionHeader>No feedback available</QuestionHeader>
                    <SectionContent>
                      No feedback data was found for this session. Please make
                      sure you've completed an interview.
                    </SectionContent>
                  </QuestionCard>
                )}
              </QuestionsContainer>
            </FeedbackSection>
          </RightColumn>
        </MainContent>
      </ContentSection>
    </PageWrapper>
  );
}

export default Feedback;
