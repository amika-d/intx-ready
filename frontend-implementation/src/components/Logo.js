import { Link } from "react-router-dom"
import styled from "styled-components"
import intXLogo from "../assets/Thasara.png"

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const LogoImage = styled.img`
  width: 150px; 
  height: auto; /* Changed to auto to maintain aspect ratio */
  object-fit: contain; /* Ensures the image isn't stretched */
  margin-left: 0; /* Removed negative margin that was causing positioning issues */
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`

const Logo = () => {
  return (
    <LogoContainer>
      <Link to="/">
        <LogoImage src={intXLogo} alt="intX Logo" />
      </Link>
    </LogoContainer>
  )
}

export default Logo;

