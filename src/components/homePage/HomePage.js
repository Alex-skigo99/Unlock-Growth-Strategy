import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import womanPlaying from "../../assets/images/Woman_playing.png";
import hearts from "../../assets/images/hearts.svg";
import manWithPhone from "../../assets/images/man-with-a-phone.png";
import greenRectangle from "../../assets/images/green-rectangle.png";
import orangeRectangle from "../../assets/images/orange-rectangle.png";
import blackRectangle from "../../assets/images/black-rectangle.png";
import unlockYourYoutube from "../../assets/images/Unlock-your-youtube.png";
import howItWorks from "../../assets/images/how-it-works.svg";
import whatYouWillDiscover from "../../assets/images/What-you-will-discover.png";
import fourPic from "../../assets/images/4-pictures.png";
import whoWeAre from "../../assets/images/who-we-are.svg";
import Header from "../widgets/Header";
import Footer from "../widgets/Footer";
import { SampleResultButton, SurveyButton } from "../widgets/Buttons";
import { surveyService } from "../../services/surveyService";
import { useQuery } from "@tanstack/react-query";

/**
 * Landing page — marketing sections (Why / How / What / Who) + survey CTA.
 *
 * On first visit the URL carries ?email=...&link=... query params from the
 * invitation email. The component creates a new survey instance via the API
 * and stores the returned surveyId in localStorage for the rest of the flow.
 */
const HomePage = ({ setYoutubeChannelLink }) => {
  const sectionWhyRef = useRef(null);
  const sectionHowRef = useRef(null);
  const sectionWhatRef = useRef(null);
  const sectionWhoRef = useRef(null);
  const navigate = useNavigate();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const email = queryParams.get("email") || "";
  const link = queryParams.get("link") || "";
  const surveyId = localStorage.getItem("surveyId");

  useQuery({
    queryKey: ["surveyId"],
    queryFn: () => {
      return surveyService.createSurvey(email, link);
    },
    enabled: (!surveyId || surveyId === "undefined") && !!email && !!link,
    onSuccess: (surveyStatus) => {
      localStorage.setItem("surveyId", surveyStatus.data._id);
      setYoutubeChannelLink(link);
    }
  });

  const scrollToSection = (section) => {
    section.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSurveyButtonClick = () => {
    navigate("/survey");
  };

  return (
    <div className="bg-bgColor-light">
      <Header>
        <div className="flex gap-4 items-center">
          <div className="text-[16px] font-bold italic">Start here 👉🏼</div>
          <SurveyButton onClick={handleSurveyButtonClick} />
        </div>
      </Header>

      <div className="w-full px-16 py-12 mobile:p-6">
        <div className="flex w-full justify-between items-center bg-bgColor-dark text-bgColor-light rounded-[30px] p-16 mobile:p-4">
          <div className="flex flex-col gap-8 justify-center w-[55%]">
            <img src={unlockYourYoutube} alt="text" className="" />
            <div className="flex gap-4 mobile:flex-col mobile:gap-2 w-fit">
              <SurveyButton onClick={handleSurveyButtonClick} />
              <SampleResultButton extraClass="border-White text-white" />
            </div>
          </div>
          <div className="relative w-[45%]">
            <img src={womanPlaying} alt="woman" className="z-0" />
            <img src={hearts} alt="hearts" className="absolute bottom-[77%] left-[82%] mobile:w-[40%] z-10" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full px-16 mobile:p-2">
        <div ref={sectionWhyRef} className="text-[12px] w-fit font-dunbar-text font-bold bg-[#FEF371] rounded-full py-1 px-2">
          WHY YOU NEED IT
        </div>
        <div className="text-[56px] font-bold mobile:text-[36px]">Why take this test?</div>
      </div>

      <div className="flex px-16 py-12 justify-between mobile:flex-col mobile:gap-4 mobile:p-6">
        <img src={blackRectangle} alt="green-box" className="w-[43%] mobile:w-full" />
        <div className="flex flex-col justify-between w-[53%] gap-10 mobile:w-full mobile:gap-4">
          <div className="flex justify-between">
            <img src={greenRectangle} alt="green-box" className="w-[47%]" />
            <img src={manWithPhone} alt="man" className="w-[47%]" />
          </div>
          <img src={orangeRectangle} alt="green-box" />
        </div>
      </div>

      <img ref={sectionHowRef} src={howItWorks} alt="How it works" className="w-full my-4" />

      <div className="w-full py-16 px-16 mobile:p-6">
        <img ref={sectionWhatRef} src={whatYouWillDiscover} alt="How it works" className="w-full" />
      </div>

      <div className="w-full pb-12 px-16 mobile:p-6">
        <div className="relative flex flex-col items-center bg-bgColor-dark w-full rounded-[30px] p-16 gap-4 mobile:p-4">
          <div className="yelow-stars absolute left-[15%] top-[20%] mobile:opacity-70"></div>
          <div className="text-[12px] w-fit font-dunbar-text font-bold bg-[#BBC4FF] rounded-full py-1 px-2">FULL OF SCIENCE</div>
          <div className="text-[56px] font-bold text-bgColor-light text-center mobile:text-[28px] leading-tight">The science behind it</div>
          <div className="text-[18px] font-light text-center text-bgColor-light mobile:text-[14px] leading-relaxed">
            Our test is based on the Big 5 Personality Model, a widely recognized psychological framework for understanding human behavior.
          </div>
          <div className="flex gap-4 mobile:flex-col mobile:gap-2 w-fit">
            <SurveyButton onClick={handleSurveyButtonClick} />
            <SampleResultButton extraClass="border-White text-white" />
          </div>
        </div>
      </div>

      <div ref={sectionWhoRef} className="w-full flex gap-4 my-6 py-[5%] px-16 bg-[#F0E7DC] mobile:flex-col mobile:p-6">
        <div className="p-[5%] pl-0 w-[40%] mobile:w-full">
          <img src={fourPic} alt="people" className="" />
        </div>
        <img src={whoWeAre} alt="text" className="w-[60%] mobile:w-full" />
      </div>

      <div className="w-full py-12 px-16 mobile:p-6">
        <div className="text-[64px] font-bold pt-12 text-center bg-[#FFBBF5] rounded-full mobile:text-[36px] mobile:pt-4 mobile:rounded-full">
          Start Growing Today!
        </div>
        <div className="flex flex-col gap-4 items-center pb-16 bg-[#FFBBF5] rounded-full mobile:p-4 mobile:rounded-full">
          <div className="w-[80%] text-[16px] font-dunbar-text font-medium text-center mobile:text-[12px]">
            Ready to understand your content creation personality and improve your reach?
          </div>
          <div className="flex gap-4 mobile:flex-col mobile:gap-2 w-fit">
            <SurveyButton extraClass="bg-bgColor-dark" onClick={handleSurveyButtonClick} />
            <SampleResultButton extraClass="border-black text-black" />
          </div>
        </div>
      </div>
      <Footer>
        <div className="flex gap-8 mobile:flex-wrap mobile:gap-4 mobile:justify-end">
          <button className="text-[#FFBBF5] hover:text-[#FEF371]" onClick={handleSurveyButtonClick}>
            Take free test
          </button>
          <button className="hover:text-[#FEF371]" onClick={() => scrollToSection(sectionWhyRef)}>
            Why
          </button>
          <button className="hover:text-[#FEF371]" onClick={() => scrollToSection(sectionHowRef)}>
            How it works
          </button>
          <button className="hover:text-[#FEF371]" onClick={() => scrollToSection(sectionWhatRef)}>
            What you get
          </button>
          <button className="hover:text-[#FEF371]" onClick={() => scrollToSection(sectionWhoRef)}>
            Who we are
          </button>
        </div>
      </Footer>
    </div>
  );
};

export default HomePage;
