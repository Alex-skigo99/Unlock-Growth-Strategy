import { useState } from "react";
import logo from "../../assets/images/insight-genie-logo-w.svg";
import { useNavigate } from "react-router-dom";
import ModalShareEmail from "./ModalShareEmail";

const Footer = ({ children }) => {
  const [isModalShareEmailOpen, setIsModalShareEmailOpen] = useState(false);
  const navigate = useNavigate();

  const goHomePage = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col gap-2 px-16 py-16 mt-6 rounded-t-[60px] bg-black text-white font-dunbar-text mobile:px-4 mobile:py-10">
      <div className="flex gap-4 w-full justify-between items-center">
        <div className="flex flex-col h-[190px] justify-between w-full">
          <div>
            <img src={logo} alt="Insight genie" className="cursor-pointer" onClick={goHomePage} />
          </div>
          <div className="flex flex-col justify-between gap-4 mobile:text-[13px]">
            {children}
            <div>
              Have question? Write us{" "}
              <a href="mailto:nsightgenie@gmail.com" className="text-[#FFBBF5]">
                insightgenie@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-[450px] gap-4 p-6 rounded-2xl bg-[#BBC4FF26]">
          <div className="text-[20px] mobile:text-[16px]">📢 Share with Your YouTube Creator Friends!</div>
          <div className="text-[14px] mobile:text-[12px]">
            🚀 Level up together! The best way to grow on YouTube is by learning from each other. Share this test with your fellow creators
            and compare your results!
          </div>
          <button
            className="text-[18px] font-bold underline text-start hover:text-[#FEF371] mobile:text-[16px]"
            onClick={() => setIsModalShareEmailOpen(true)}
          >
            Share with a friend
          </button>
        </div>
      </div>
      <div className="flex gap-8 justify-center items-center mt-12 text-[14px] mobile:flex-col mobile:gap-4 mobile:text-[12px]">
        <div>© 2025 Insight Genie. All rights reserved.</div>
        <button className="hover:text-[#FEF371]">
          <a href="https://insightgenie.ai/privacy/" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>
        </button>
        <button className="hover:text-[#FEF371]">
          <a href="https://insightgenie.ai/terms-of-service/" target="_blank" rel="noreferrer">
            Terms of Service
          </a>
        </button>
      </div>
      <ModalShareEmail isModalOpen={isModalShareEmailOpen} setIsModalOpen={setIsModalShareEmailOpen} />
    </div>
  );
};

export default Footer;
