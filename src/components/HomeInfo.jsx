import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const InfoBox = ({ text, link, btnText }) => (
  <div className="info-box neo-brutalism-blue">
    <p className="font-medium sm:text-xl text-center">{text}</p>
    <Link to={link} className="neo-brutalism-white neo-btn">
      {btnText}
      <img src={arrow} className="w-4 h-4 object-contain" />
    </Link>
  </div>
);
const renderContent = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      Hi, I am <span className="font-semibold">Sanchita</span>👋 <br />A
      Fullstack Developer
    </h1>
  ),
  2: (
    <InfoBox
      text="Every company I worked with taught me something new and sharpened my skills"
      link="/about"
      btnText="Learn more about me"
    />
  ),
  3: (
    <InfoBox
      text="Led multiple projects to success over the years. Curious to know more?"
      link="/projects"
      btnText="Visit my Portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Need a project done? Let's collaborate and create something amazing together!"
      link="/contact"
      btnText="Let's talk"
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
