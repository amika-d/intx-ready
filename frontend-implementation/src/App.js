import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadCVPage from "./UploadCVPage";
import MakeYourChoicePage from "./MakeYourChoicePage";
import Success from "./Success";
import Cancel from "./Cancel";
import MainPage from "./MainPage";
import MainLayout from "./MainLayout";
import Navigation from "./components/Navigation";
import TrainerSelection from "./TrainerSelection";
import Feedback from "./components/sections/Feedback";
import MeetingPage from "./meeting";
import "./meeting.css"


function App() {
  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/upload-cv" element={<MainPage />} /> {/* Add this line */}
        < Route path="/trainer-selection" element={<TrainerSelection/>}/>
        <Route path="/make-your-choice" element={<MakeYourChoicePage />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-cancel" element={<Cancel />} />
        {/* feedback route */}
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/meeting" element={< MeetingPage/>} />
      <Route path="/feedback" element={<Feedback/>}/>


      </Routes>
    </Router>
  );
}

export default App;