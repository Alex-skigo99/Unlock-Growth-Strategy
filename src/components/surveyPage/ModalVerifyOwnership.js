import { useState } from "react";
import { Checkbox, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../widgets/Buttons";
import { surveyService } from "../../services/surveyService";

const ModalVerifyOwnership = ({ isModalOpen, setIsModalOpen, youtubeChannelLink, setYoutubeChannelLink }) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [newChannelLink, setNewChannelLink] = useState(youtubeChannelLink);
  const [isLinkValidated, setIsLinkValidated] = useState(false);
  const [isLinkEditable, setIsLinkEditable] = useState(false);
  const navigate = useNavigate();

  const handleSetConfirmed = () => {
    const newChannelLinkToSave = newChannelLink !== youtubeChannelLink ? newChannelLink : "";
    surveyService.saveAsConfirmedToDB(localStorage.getItem("surveyId"), newChannelLinkToSave);
    setIsModalOpen(false);
    navigate("/result");
  };

  const handleClose = () => {
    navigate("/");
  };

  const linkValidate = (link) => {
    setNewChannelLink(link);
    const isValidated = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(link);
    setIsLinkValidated(isValidated);
    if (isConfirm && !isValidated) setIsConfirm(false);
  };

  const handleConfirm = (e) => {
    setIsConfirm(e.target.checked);
  };

  return (
    <Modal
      width={740}
      footer={null}
      centered
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      afterClose={handleClose}
      className="custom-modal"
    >
      <div className="flex flex-col gap-4 items-center p-8 mobile:p-0">
        <div className="text-[42px]">🔍 </div>
        <div className="text-[42px] font-bold leading-tight font-dunbar-tall text-center mobile:text-[28px]">
          Verify Your YouTube Channel Ownership
        </div>
        <div className="text-[18px] font-dunbar-text text-center mobile:text-[14px]">
          To ensure accurate results, this survey must be completed by the owner of a YouTube channel. Since we analyze your personality and
          content, it’s crucial that you answer personally rather than having someone else fill it out for you.
        </div>
        <div className="w-full flex flex-col gap-2 items-center p-8 pb-4 my-2 bg-[#F0E7DC] rounded-[30px] mobile:p-4">
          <div className="text-[20px] font-bold mobile:text-[18px]">Please confirm the link to your YouTube channel</div>
          {isLinkEditable ? (
            <>
              <Input
                // placeholder="Enter your YouTube channel link"
                value={newChannelLink}
                onChange={(e) => linkValidate(e.target.value)}
                style={{ color: isLinkValidated ? "black" : "red" }}
              />
              <button
                className="underline"
                onClick={() => {
                  setIsLinkEditable(false);
                  setNewChannelLink(youtubeChannelLink);
                }}
              >
                Cancel changes
              </button>
            </>
          ) : (
            <>
              <Input value={newChannelLink} disabled={true} />
              <button
                className="underline"
                onClick={() => {
                  setIsLinkEditable(true);
                  setIsConfirm(false);
                }}
              >
                Edit link
              </button>
            </>
          )}
        </div>
        <div className="flex px-6 gap-2 items-start">
          {isLinkEditable ? (
            <Checkbox disabled={!isLinkValidated} checked={isConfirm} onChange={handleConfirm} className="custom-checkbox" />
          ) : (
            <Checkbox checked={isConfirm} onChange={handleConfirm} className="custom-checkbox" />
          )}
          <div className="text-[16px] font-dunbar-text font-medium mobile:text-[14px] mobile:leading-tight">
            I confirm that I am the owner of a YouTube channel and will answer this survey myself.
          </div>
        </div>
        <div className="flex justify-center">
          {isConfirm ? (
            <CustomButton title="Continue" onClick={handleSetConfirmed} />
          ) : (
            <CustomButton title="Continue" extraClass="bg-primaryColor bg-opacity-30 cursor-default" />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalVerifyOwnership;
