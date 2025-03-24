
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import intXLogo from "../assets/Thasara.png"

// Styled Components
const Section = styled.section`
  width: 100vw;
  background-color: #ffffff;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
`

const NavContainer = styled.nav`
  width: 85%;
  background-color: #fff8e6;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const LogoImage = styled.img`
  height: 25px;
`

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;

  @media (max-width: 768px) {
    display: none;
  }
`

const MenuItem = styled.li`
  margin: 0 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  cursor: pointer;

  &:hover {
    color: #f0c300;
  }
`

const LoginButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`

// Navigation Component
const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Function to handle navigation and scrolling
  const navigateToSection = (id) => {
    const isHomePage = location.pathname === "/" || location.pathname === ""

    if (isHomePage) {
      // If already on home page, just scroll to the section
      scrollToSection(id)
    } else {
      // If on another page, navigate to home page with hash
      navigate(`/#${id}`)
    }
  }

  // Function to scroll to a section on the current page
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Check for hash in URL when component mounts or updates
  useEffect(() => {
    // If there's a hash in the URL, scroll to that section
    if (location.hash) {
      const id = location.hash.substring(1) // Remove the # character
      setTimeout(() => {
        scrollToSection(id)
      }, 100) // Small delay to ensure the DOM is ready
    }
  }, [location]) // Removed scrollToSection from dependencies

  const handleLoginClick = () => {
    navigate("/sign-up")
  }

  const handleFeedbackClick = () => {
    navigate("/feedback")
  }

  const handleLogoClick = () => {
    navigate("/")
  }

  return (
    <Section id="navigation">
      <NavContainer>
        {/* Logo - clicking it navigates to home */}
        <Logo onClick={handleLogoClick}>
          <LogoImage src={intXLogo} alt="intX Logo" />
        </Logo>

        {/* Menu Items */}
        <Menu>
          <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
          <MenuItem onClick={() => navigateToSection("about")}>About Us</MenuItem>
          <MenuItem onClick={() => navigateToSection("Roadmap")}>Services</MenuItem>
          <MenuItem onClick={() => navigateToSection("faq")}>FAQ</MenuItem>
          <MenuItem onClick={handleFeedbackClick}>Feedback</MenuItem>
        </Menu>

        {/* Login Button */}
        <LoginButton onClick={handleLoginClick}>Log In</LoginButton>
      </NavContainer>
    </Section>
  )
}

export default Navigation;

