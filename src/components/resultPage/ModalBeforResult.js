import { Modal } from "antd";
import { CustomButton } from "../widgets/Buttons";

const ModalBeforResult = ({ isModalOpen, setIsModalOpen }) => {
  const handleContinue = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal width="720px" closable={false} footer={null} centered open={isModalOpen} onCancel={handleContinue} className="custom-modal">
      <div className=" flex flex-col items-center gap-2 p-8 mobile:p-4">
        <div className="text-[40px] font-bold">🎉</div>
        <div className="text-[40px] font-bold leading-tight text-center">Your YouTuber Personality Profile</div>
        <div className="text-[18px] font-dunbar-text font-medium text-center">
          Congrats! You did it! Now, let’s reveal your YouTuber Personality Profile!
        </div>
        <div className="text-[18px] font-dunbar-text font-medium text-center">
          Inside: Your creative strengths, audience insights, and strategies to skyrocket your content!
        </div>
        <CustomButton title="See my results" onClick={handleContinue} extraClass="w-[160px] bg-primaryColor mt-4" />
      </div>
    </Modal>
  );
};

export default ModalBeforResult;
