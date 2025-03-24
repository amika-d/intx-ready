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
    text-transform: capitalize;
    font-family: "Akaya Telivigala";
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


const ServiceText = () => {
  return (
    <>
      <Title>
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString("<span class='text-1'>Hi there, </span>")
              .pauseFor(2000)
              .deleteAll()
              .start();
          }}
        />
        What service would you like to have
      </Title>
    </>
  );
};

export default ServiceText;
