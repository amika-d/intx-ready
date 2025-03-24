import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import Accordion from "../Accordion";

const Section = styled.section`
  min-height: 100vh;
  height: auto;
  width: 100vw;
  background-color: ${(props) => props.theme.text};
  position: relative;
  color: ${(props) => props.theme.body};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  font-family: "Sora", sans-serif;
  text-transformation: uppercase;
  color: ${(props) => props.theme.body};

  margin: 1rem auto;
  border-bottom: 2px solid ${(props) => props.theme.cauroselColor};
  width: fit-content;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Container = styled.div`
  width: 75%;
  margin: 2rem auto;
  

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 64em) {
    width: 100%;
  }

  @media (max-width: 48em) {
    width: 100%;
    flex-direction: column;
  }

  & > *::last-child {
    & > *::first-child {
      margin-top: 0;
    }
  }
`;

const Box = styled.div`
  width: 45%;

  @media (max-width: 64em) {
    width: 90%;
    align-self: center;
  }
`;

const Faq = () => {
  const ref = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    let element = ref.current;
    let scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: true,
      // markers: true, 
    });

    return () => {
      scrollTrigger.kill(); // Kill the specific ScrollTrigger instance
    };
  }, []);

  return (
    <Section ref={ref} id="faq">
      <Title>FAQ</Title>
      <Container>
        <Box>
          <Accordion title="WHAT IS intX?">
            intX is an AI-powered platform designed to help job seekers prepare for interviews by
            simulating real-world scenarios with AI avatars. It offers real-time feedback,
            analytics, and access to personal trainers to boost confidence and refine skills.
          </Accordion>
          <Accordion title="WHO CAN USE intX?">
            The platform is ideal for undergraduates, fresh graduates, and professionals
            seeking to improve their interview skills, particularly in the field of
            computer science.
          </Accordion>
          <Accordion title="WHAT TYPE OF FEEDBACK DOES intX PROVIDE?">
            The platform offers insights on tone, diction, confidence, content relevance,
            and delivery. After each session, users receive a score and improvement recommendations.
          </Accordion>
        </Box>
        <Box>
          <Accordion title="CAN I PRACTICE TECHNICAL INTERVIEWS ON intX?">
            Yes, the platform supports technical interview preparation by analyzing responses
            to coding and problem-solving questions, with feedback to enhance your skills.
          </Accordion>
          <Accordion title="HOW CAN I ACCESS intX">
            You can access intX through its web application. Sign up, upload your documents,
            and start your interview practice.
          </Accordion>
          <Accordion title="HOW DOES intX ENSURE USER PRIVACY?">
            intX follows strict data security protocols and complies with privacy
            regulations to protect user information.
          </Accordion>
        </Box>
      </Container>
    </Section>
  );
};

export default Faq;