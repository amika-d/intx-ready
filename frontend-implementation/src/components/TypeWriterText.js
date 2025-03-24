import React from "react";
import Typewriter from "typewriter-effect";
import styled from "styled-components";
import Button from "./Button";

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxxl};
  text-align: left;
  text-transformation: capitalize;
  width: 80%;
  color: ${(props) => props.theme.text};
  align-self: flex-start;

  span {
    text-transform: uppercase;
    font-family: "Akaya Telivigala", cursive;
  }

  .text-1 {
    color: #EAC42D;
  }

  @media (max-width: 70em) {
    font-size: ${(props) => props.theme.fontxl};
  }

  @media (max-width: 48em) {
    align-self: center;
    text-align: center;
    font-size: ${(props) => props.theme.fontxl};
  }

  @media (max-width: 40em) {
    width: 90%;
  }
`;

const SubTitle = styled.h3`
  font-size: ${(props) => props.theme.fontlg};
  text-transform: capitalize;
  color: ${(props) => `rgba(${props.theme.textRgba}, 0.6)`};
  font-weight: 600;
  margin-bottom: 1rem;
  width: 80%;
  align-self: flex-start;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontmd};
  }

  @media (max-width: 48em) {
    align-self: center;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  align-self: flex-start;

  @media (max-width: 48em) {
    align-self: center;
    text-align: center;

    button {
      margin: 0 auto;
    }
  }
`;

const scrollToAbout = () => {
  const element = document.getElementById("about");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const TypeWriterText = () => {
  return (
    <>
      <Title>
        Discover a new era of
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("<span class='text-1'>Interview Preparation.</span>")
              .pauseFor(2000)
              .deleteAll()
              .start();
          }}
        />
      </Title>
      <ButtonContainer>
      <Button text="Explore" onClick={scrollToAbout} />
      </ButtonContainer>
    </>
  );
};

export default TypeWriterText;
