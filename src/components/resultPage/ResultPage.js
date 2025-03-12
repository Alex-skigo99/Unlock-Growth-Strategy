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

const initData = [
  {
    key: "creator_type",
    smallTitle: "📷 Creator type",
    title: "Storyteller 📖",
    text: "Malesuada dignissim netus pharetra in sit condimentum id massa phasellus. Gravida lectus libero at vitae."
  },
  {
    key: "superpower",
    smallTitle: "🦸🏼 Superpower",
    title: "Hooking Viewers Instantly ⚡",
    text: "Malesuada dignissim netus pharetra in sit condimentum id massa phasellus. Gravida lectus libero at vitae."
  },
  {
    key: "your_weakness",
    smallTitle: "💔 Your Weakness",
    title: "Struggles with pacing & retention",
    text: "Malesuada dignissim netus pharetra in sit condimentum id massa phasellus. Gravida lectus libero at vitae."
  },
  {
    key: "growth_tip",
    smallTitle: "🚀 Growth Tip",
    title: "Try adding mid-video ‘cliffhangers’ to boost watch time.”",
    text: "Malesuada dignissim netus pharetra in sit condimentum id massa phasellus. Gravida lectus libero at vitae."
  },
  {
    key: "personality",
    title: "Your personality",
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
    text: `Malesuada dignissim netus pharetra in sit condimentum id massa phasellus. Gravida lectus libero at vitae. Tristique aliquet in sed faucibus egestas bibendum lacinia. Risus lectus lacus faucibus est facilisis nulla potenti vel. Rhoncus venenatis id sollicitudin odio ac pellentesque. Fusce aenean duis nam orci.

Non lorem arcu commodo a eu tincidunt tincidunt. Sed velit elementum sagittis quis vehicula ultricies hendrerit egestas. Semper justo lorem sem arcu suspendisse nam pellentesque sed. Vel pulvinar maecenas nec ac amet vitae non facilisi.`
  },
  {
    key: "strategy",
    title: "Your growth strategy",
    image: (
      <div className="relative bg-[#FEF371] w-[400px] h-[400px] rounded-[30px] mobile:w-[300px] mobile:h-[300px]">
        <img src={curveArrowUp} alt="arrow" />
      </div>
    ),
    text: "Malesuada dignissim netus pharetra in sit condimentum id massa phasellus. Gravida lectus libero at vitae. Tristique aliquet in sed faucibus egestas bibendum lacinia. Risus lectus lacus faucibus est facilisis nulla potenti vel. "
    //     textTwo: `Malesuada dignissim netus pharetra in sit condimentum id massa phasellus.
    // Gravida lectus libero at vitae. Tristique aliquet in sed faucibus egestas bibendum lacinia.
    // Risus lectus lacus faucibus est facilisis nulla potenti vel. `
  }
];

const ResultPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [resultData, setResultData] = useState(initData);
  const [name, setName] = useState("John");
  const [email, setEmail] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const surveyId = localStorage.getItem("surveyId");

  useQuery({
    queryKey: ["surveyId"],
    queryFn: () => surveyService.getSurveyResult(surveyId),
    enabled: !!surveyId,
    onSuccess: (result) => {
      console.log(result.data);
      localStorage.removeItem("surveyId");
      const name = result.data.youtubersEmail.split("@")[0];
      setName(name.charAt(0).toUpperCase() + name.slice(1));
      if (result.data.result) {
        setResultData((prevState) => {
          return prevState.map((data) => {
            if (data.key === "personality") {
              return { ...data, text: result.data.result?.YourPersonalityType };
            }
            if (data.key === "strategy") {
              return { ...data, text: result.data.result?.YourGrowthStrategy };
            }
            return data;
          });
        });
      }
    }
  });

  const handleShare = async () => {
    const result = await surveyService.saveShareEmail(localStorage.getItem("surveyId"), email);
    console.log(result.data.message);
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
      <Header />
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
              <div className="text-[32px] font-bold">{data.title}</div>
              <div className="text-[18px] font-light">{data.text || ""}</div>
              <div className="text-[18px] font-light">{data.textTwo || ""}</div>
              <div className="text-[18px] font-light">{data.textThree || ""}</div>
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
