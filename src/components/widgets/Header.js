import logoBlack from "../../assets/images/insight-genie-logo-bw.svg";
import logoWhite from "../../assets/images/insight-genie-logo-w.svg";

const Header = ({ theme = "light", children }) => {
  const logo = theme === "light" ? logoBlack : logoWhite;
  return (
    <div className="w-full flex justify-between items-center py-4 px-16 mobile:px-4">
      <div>
        <img src={logo} alt="Insight genie" />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Header;
