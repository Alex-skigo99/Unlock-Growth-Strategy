import { useState } from "react";
import { Checkbox, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../widgets/Buttons";

const ModalVerifyOwnership = ({ isModalOpen, setIsModalOpen, youtubeChannelLink, setYoutubeChannelLink }) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [isLinkValidated, setIsLinkValidated] = useState(false);
  const navigate = useNavigate();

  const handleOk = () => {
    setIsModalOpen(false);
    console.log("youtubeChannelLink", youtubeChannelLink);
    navigate("/survey");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const linkValidate = (link) => {
    setYoutubeChannelLink(link);
    const isValideted = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(link);
    setIsLinkValidated(isValideted);
    if (isConfirm && !isValideted) setIsConfirm(false);
  };

  const handleConfirm = (e) => {
    setIsConfirm(e.target.checked);
  };

  return (
    <Modal width={740} footer={null} centered open={isModalOpen} onCancel={handleCancel} className="custom-modal">
      <div className="flex flex-col gap-4 items-center p-8 mobile:p-0">
        <div className="text-[42px]">🔍 </div>
        <div className="text-[42px] font-bold leading-tight font-dunbar-tall text-center mobile:text-[28px]">
          Verify Your YouTube Channel Ownership
        </div>
        <div className="text-[18px] font-dunbar-text text-center mobile:text-[14px]">
          To ensure accurate results, this survey must be completed by the owner of a YouTube channel. Since we analyze your personality and
          content, it’s crucial that you answer personally rather than having someone else fill it out for you.
        </div>
        <div className="w-full flex flex-col gap-2 items-center p-8 my-4 bg-[#F0E7DC] rounded-[30px] mobile:p-4">
          <div className="text-[20px] font-bold mobile:text-[18px]">Please enter the link to your YouTube channel</div>
          <Input placeholder="Enter your YouTube channel link" value={youtubeChannelLink} onChange={(e) => linkValidate(e.target.value)} />
        </div>
        <div className="flex px-6 gap-2 items-start">
          <Checkbox disabled={!isLinkValidated} checked={isConfirm} onChange={handleConfirm} className="custom-checkbox" />
          <div className="text-[16px] font-dunbar-text font-medium mobile:text-[14px] mobile:leading-tight">
            I confirm that I am the owner of a YouTube channel and will answer this survey myself.
          </div>
        </div>
        <div className="flex justify-center">
          {isConfirm && isLinkValidated ? (
            <CustomButton title="Continue" onClick={handleOk} />
          ) : (
            <CustomButton title="Continue" onClick={handleOk} extraClass="bg-primaryColor bg-opacity-30 cursor-default" />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalVerifyOwnership;
