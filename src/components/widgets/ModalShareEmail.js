import { useState } from "react";
import { Input, Modal } from "antd";
import { CustomButton } from "../widgets/Buttons";
import { surveyService } from "../../services/surveyService";

const ModalShareEmail = ({ isModalOpen, setIsModalOpen }) => {
  const [email, setEmail] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  const handleShare = async () => {
    const result = await surveyService.saveShareEmail(localStorage.getItem("surveyId"), email);
    console.log(result.data.message);
    setIsModalOpen(false);
  };

  const inputValidate = (email) => {
    setEmail(email);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValidated(isValid);
  };

  return (
    <Modal width={740} footer={null} centered open={isModalOpen} onCancel={() => setIsModalOpen(false)} className="custom-modal">
      <div className="flex flex-col gap-4 items-center p-8 mobile:p-0">
        <div className="text-[42px]">📢</div>
        <div className="text-[42px] font-bold leading-tight font-dunbar-tall text-center mobile:text-[28px]">
          Share with Your YouTube Creator Friends!
        </div>
        <div className="text-[18px] font-dunbar-text text-center mobile:text-[14px]">
          🚀 Level up together! The best way to grow on YouTube is by learning from each other. Share this test with your fellow creators
          and compare your results!
        </div>
        <div className="w-full flex flex-col gap-2 items-center p-8 my-2 bg-[#F0E7DC] rounded-[30px] mobile:p-4">
          <div className="text-[20px] font-bold mobile:text-[18px]">Please enter the email</div>
          <Input
            placeholder="myfriend@gmail.com"
            value={email}
            onChange={(e) => inputValidate(e.target.value)}
            style={{ color: isValidated ? "black" : "red" }}
          />
        </div>
        <div className="flex justify-center">
          {isValidated ? (
            <CustomButton title="Share with a friend" onClick={handleShare} />
          ) : (
            <CustomButton title="Share with a friend" extraClass="bg-primaryColor bg-opacity-30 cursor-default" />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalShareEmail;
