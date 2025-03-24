import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ServiceText from "../ServiceText";
import Image1 from "../../assets/Person 1.png";
import Image2 from "../../assets/Person 2.png";

const Section = styled.section`
  margin-left: -20px;
  min-height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
  width: 100vw;
  position: relative;
  background-color: ${(props) => props.theme.body};
`;

const Container = styled.div`
  width: 75%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 64em) {
    width: 85%;
  }

  @media (max-width: 48em) {
    flex-direction: column-reverse;
    width: 100%;

    & > *:first-child {
      width: 100%;
      margin-top: 2rem;
    }
  }
`;

const Box = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 48em) {
    gap: 1rem;
  }
`;

const OptionBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #eac42d;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  &:hover {
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
`;

const OptionImage = styled.img`
  width: 160px;
  height: 160px;
  margin-left: -10px;
  margin-top: -10px;
`;

const OptionText = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: ${(props) => props.theme.text};
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${(props) => props.theme.text};
  }
`;

const Roadmap = () => {
  const navigate = useNavigate();

  const handleTrainerSelection = () => {
    navigate("/trainer-selection");
  };

  const handleVirtualInterview = () => {
    navigate("/upload-cv");
  };

  return (
    <Section id="Roadmap">
      <Container>
        <Box>
          <ServiceText />
        </Box>
        <Box>
          <OptionContainer>
            <OptionBox onClick={handleTrainerSelection}>
              <OptionImage src={Image1} alt="Personal Trainer" />
              <OptionText>
                <h3>Hire</h3>
                <p>a Personal Trainer</p>
              </OptionText>
            </OptionBox>
            <OptionBox onClick={handleVirtualInterview}>
              <OptionImage src={Image2} alt="Virtual Interview" />
              <OptionText>
                <h3>Continue</h3>
                <p>a Virtual Interview with an Avatar</p>
              </OptionText>
            </OptionBox>
          </OptionContainer>
        </Box>
      </Container>
    </Section>
  );
};

export default Roadmap;