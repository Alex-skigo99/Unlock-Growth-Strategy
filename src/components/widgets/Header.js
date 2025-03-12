import logoBlack from "../../assets/images/insight-genie-logo-bw.svg";
import logoWhite from "../../assets/images/insight-genie-logo-w.svg";
import { useNavigate } from "react-router-dom";

const Header = ({ theme = "light", children }) => {
  const logo = theme === "light" ? logoBlack : logoWhite;
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center py-4 px-16 mobile:px-4">
      <div>
        <img
          src={logo}
          alt="Insight genie"
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Header;
