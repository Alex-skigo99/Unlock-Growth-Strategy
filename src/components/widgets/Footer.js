import logo from "../../assets/images/insight-genie-logo-w.svg";

const Footer = ({ children }) => {
  return (
    <div className="w-full flex flex-col gap-4 px-16 py-20 mt-6 rounded-t-[60px] bg-black text-white font-dunbar-text mobile:px-4 mobile:py-10">
      <div className="flex justify-between items-center w-full">
        <div>
          <img src={logo} alt="Insight genie" />
        </div>
        <div className="flex flex-col gap-4 items-end mobile:text-[13px]">
          {children}
          <div className="text-end">
            Have question? Write us{" "}
            <a href="mailto:nsightgenie@gmail.com" className="text-[#FFBBF5]">
              insightgenie@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="flex gap-8 justify-center items-center mt-12 text-[14px] mobile:flex-col mobile:gap-4 mobile:text-[12px]">
        <div>© 2025 Insight Genie. All rights reserved.</div>
        <button className="hover:text-[#FEF371]">Privacy Policy</button>
        <button className="hover:text-[#FEF371]">Terms of Service</button>
        <button className="hover:text-[#FEF371]">Cookie Policy</button>
      </div>
    </div>
  );
};

export default Footer;
