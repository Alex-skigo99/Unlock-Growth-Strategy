import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import { surveyService } from "../../services/surveyService";
import manWithMic from "../../assets/images/man-with-mic.png";
import portraitAdult from "../../assets/images/portrait-adult-male-recording-himself-home.png";
import ellipseThree from "../../assets/images/Ellipse-3.svg";
import ellipseFour from "../../assets/images/Ellipse-4.svg";
import curveArrowUp from "../../assets/images/curve-arrow-up.svg";
import Header from "../widgets/Header";
import Footer from "../widgets/Footer";
import ModalBeforResult from "./ModalBeforResult";

const sampleData = [
  {
    key: "creator_type",
    smallTitle: "📷 Creator type",
    title: "Storyteller 📖",
    text: "You have a down-to-earth and approachable personality, which makes you relatable to your audience. Your content likely focuses on everyday life, experiences, and conversations."
  },
  {
    key: "superpower",
    smallTitle: "🦸🏼 Superpower",
    title: "Building Rapport with Viewers ⚡",
    text: "Your ability to be yourself and not try to stand out too much helps you build a strong connection with your audience. You're able to create a sense of familiarity and comfort, making viewers feel like they're talking to a friend."
  },
  {
    key: "your_weakness",
    smallTitle: "💔 Your Weakness",
    title: "Struggles with Standing Out",
    text: "While being relatable is a strength, it can also make it challenging for you to stand out in a crowded online space. You may struggle to differentiate yourself from other creators and make your content truly memorable."
  },
  {
    key: "growth_tip",
    smallTitle: "🚀 Growth Tip",
    title: "Experiment with New Formats and Topics",
    text: "Try shaking things up by exploring new formats, such as challenges, interviews, or educational content. This can help you attract new viewers and keep your existing audience engaged."
  },
  {
    key: "personality",
    smallTitle: "Your personality",
    title: "The Down-to-Earth Charmer",
    image: (
      <div className="relative bg-[#BBC4FF] w-[400px] h-[400px] min-w-[400px] rounded-[30px] mobile:w-[300px] mobile:h-[300px] mobile:min-w-[300px]">
        <img src={ellipseFour} alt="ellipse" className="absolute z-0 mobile:h-[300px]" />
        <img
          src={portraitAdult}
          alt="your personality"
          className="absolute h-[400px] left-[80px] z-10 mobile:h-[300px] mobile:left-[60px]"
        />
        <img src={ellipseThree} alt="ellipse" className="absolute rounded-[30px] bottom-0 right-0 z-20 mobile:w-[140px]" />
      </div>
    ),
    text: "You're a confident and empowered individual who values comfort and authenticity. You're not afraid to be yourself, even if that means not standing out in a crowd. Your personality is warm and inviting, making you a joy to watch and interact with. You're also reflective and willing to learn from your experiences, which helps you grow both personally and professionally. While you may not be the most flashy or attention-grabbing creator, your relatability and charm make you a beloved figure in your audience's eyes."
  },
  {
    key: "strategy",
    smallTitle: "Your growth strategy",
    title: "Authenticity and Experimentation",
    image: (
      <div className="relative bg-[#FEF371] w-[400px] h-[400px] rounded-[30px] mobile:w-[300px] mobile:h-[300px]">
        <img src={curveArrowUp} alt="arrow" />
      </div>
    ),
    text: "To grow your channel, focus on remaining true to yourself and your values while experimenting with new content formats and topics. This will help you attract new viewers who appreciate your authenticity and unique perspective. Don't be afraid to try new things and take calculated risks – it's okay to step out of your comfort zone and challenge yourself. By doing so, you'll not only grow your audience but also continue to develop as a creator and a person. Remember to stay reflective and open to feedback, using it as an opportunity to learn and improve."
  }
];

/**
 * Fills the sample/result template with real data returned by the AI backend.
 * Each key in `resultObtained` maps to a card section on the page.
 */
const fillResultData = (resultData, resultObtained) => {
  const updatedData = resultData.map((data) => {
    if (data.key === "creator_type") {
      return { ...data, title: resultObtained?.creator_type_headline || "", text: resultObtained?.creator_type_text || "" };
    }
    if (data.key === "superpower") {
      return { ...data, title: resultObtained?.superpower_headline || "", text: resultObtained?.superpower_text || "" };
    }
    if (data.key === "your_weakness") {
      return { ...data, title: resultObtained?.weakness_headline || "", text: resultObtained?.weakness_text || "" };
    }
    if (data.key === "growth_tip") {
      return { ...data, title: resultObtained?.growth_tip_headline || "", text: resultObtained?.growth_tip_text || "" };
    }
    if (data.key === "personality") {
      return { ...data, title: resultObtained?.personality_headline || "", text: resultObtained?.personality_text || "" };
    }
    if (data.key === "strategy") {
      return { ...data, title: resultObtained?.growth_strategy_title || "", text: resultObtained?.growth_strategy_text || "" };
    }
    return data;
  });
  return updatedData;
};

const ResultPage = ({ isSamplePage }) => {
  const [isModalOpen, setIsModalOpen] = useState(!isSamplePage);
  const [resultData, setResultData] = useState(sampleData);
  const [name, setName] = useState("John");
  const [email, setEmail] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const surveyId = localStorage.getItem("surveyId");

  useQuery({
    queryKey: ["surveyId"],
    queryFn: () => surveyService.getSurveyResult(surveyId),
    enabled: !!surveyId && !isSamplePage,
    onSuccess: (result) => {
      localStorage.removeItem("surveyId");
      const name = result.data.youtubersEmail.split("@")[0];
      setName(name.charAt(0).toUpperCase() + name.slice(1));
      if (result.data.result) {
        setResultData((prevState) => fillResultData(prevState, result.data.result));
      }
    }
  });

  const handleShare = async () => {
    await surveyService.saveShareEmail(localStorage.getItem("surveyId"), email);
    setEmail("");
    setIsValidated(false);
  };

  const inputValidate = (email) => {
    setEmail(email);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValidated(isValid);
  };

  return (
    <div className="bg-bgColor-light">
      <Header>{isSamplePage && <div className="rounded-xl p-2 text-red-600 border-[1px] border-red-600">Sample result page</div>}</Header>
      <div className="w-full flex flex-col gap-8 px-16 py-8 mobile:p-4 tablet:p-6">
        <div className="text-[32px] font-medium mobile:text-[24px]">{name}, here is your personal Youtube growth strategy 🥳</div>
        <div className="flex gap-6 mobile:flex-col mobile:gap-4">
          <img src={manWithMic} alt="man" className="w-1/4 object-cover rounded-[30px] mobile:w-full" />
          <div className="flex flex-col gap-4 w-3/4 bg-white p-8 rounded-[30px] mobile:w-full">
            <div className="text-[16px] italic">{resultData[0].smallTitle}</div>
            <div className="text-[28px] font-bold">{resultData[0].title}</div>
            <div className="text-[18px]">{resultData[0].text}</div>
          </div>
        </div>
        <div className="flex gap-6 mobile:flex-col mobile:gap-4">
          {resultData.slice(1, 4).map((data) => (
            <div key={data.key} className="flex flex-col gap-4 w-1/3 bg-white p-8 rounded-[30px] mobile:w-full">
              <div className="text-[16px] italic">{data.smallTitle}</div>
              <div className="text-[28px] font-bold">{data.title}</div>
              <div className="text-[18px]">{data.text}</div>
            </div>
          ))}
        </div>
      </div>
      {resultData.slice(4, 6).map((data) => (
        <div key={data.key} className="w-full px-16 py-8 tablet:p-6 mobile:p-4">
          <div className="flex gap-16 bg-white p-16 rounded-[30px] w-full mobile:items-center mobile:flex-col mobile:gap-4 mobile:p-4 tablet:flex-col tablet:gap-8 tablet:p-8">
            {data.image && data.image}
            <div className="flex flex-col gap-4 w-3/5 justify-center tablet:w-full mobile:w-full">
              <div className="text-[16px] italic">{data.smallTitle}</div>
              <div className="text-[32px] font-bold">{data.title}</div>
              <div className="text-[18px] font-light">{data.text || ""}</div>
              <div className="text-[18px] font-light">{data.textTwo || ""}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-col w-full py-12 px-16 mobile:p-4">
        <div className="text-[52px] font-bold h-[200px] pt-12 px-24 text-center bg-[#F0E7DC] rounded-full tablet:text-[36px] mobile:text-[28px] mobile:pt-6 mobile:px-8 mobile:h-[150px]">
          Your YouTube Growth Analysis is in Progress!
        </div>
        <div className="flex flex-col gap-4 items-center pt-8 pb-16 bg-[#F0E7DC] rounded-full mobile:p-4 mobile:rounded-full">
          <div className="w-[80%] text-[18px] font-dunbar-text font-medium text-center mobile:text-[12px]">
            Our system is analyzing your answers to understand your content style, engagement patterns, and growth potential.
          </div>
          <div className="w-[80%] text-[18px] font-dunbar-text font-medium text-center mobile:text-[12px]">
            📩 Stay tuned – your report will be ready soon! 🚀
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center py-20 px-40 mb-10 bg-[#B09AE0] mobile:p-4 mobile:mb-0">
        <div className="text-[42px]">📢</div>
        <div className="text-[42px] font-bold leading-tight font-dunbar-tall text-center mobile:text-[28px]">
          Share with Your YouTube Creator Friends!
        </div>
        <div className="text-[18px] font-dunbar-text text-center mobile:text-[14px]">
          🚀 Level up together! The best way to grow on YouTube is by learning from each other. Share this test with your fellow creators
          and compare your results!
        </div>
        <div className="flex flex-col w-[600px] gap-4 items-center p-8 my-2 bg-[#846ABE] rounded-[30px] mobile:p-4 mobile:w-full">
          <div className="text-[20px] font-bold mobile:text-[18px] text-white">Please enter the email</div>
          <Input
            placeholder="myfriend@gmail.com"
            value={email}
            onChange={(e) => inputValidate(e.target.value)}
            style={{ color: isValidated ? "black" : "red" }}
          />
          {isValidated ? (
            <button onClick={handleShare} className="bg-[#FEF371] text-black font-medium py-2 px-5 rounded-xl mobile:text-[12px]">
              Share with a friend
            </button>
          ) : (
            <button
              onClick={handleShare}
              className="bg-[#FEF371] bg-opacity-70 cursor-default text-gray-500 font-medium py-2 px-5 rounded-xl mobile:text-[12px]"
            >
              Share with a friend
            </button>
          )}
        </div>
      </div>
      <Footer />
      <ModalBeforResult isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default ResultPage;
