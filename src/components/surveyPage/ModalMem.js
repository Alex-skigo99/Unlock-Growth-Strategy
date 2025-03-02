// import { useState } from "react";
import { Modal } from "antd";

const ModalMem = ({ isModalOpen, setIsModalOpen }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal width={740} footer={null} centered open={isModalOpen} onCancel={handleCancel} className="custom-modal">
      <div className="p-12 mobile:p-4">
        <img
          src="https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/LD7WEPSAP7XPVEERGVIKMYX24Q.JPG&w=1200"
          alt="mem"
        />
      </div>
    </Modal>
  );
};

export default ModalMem;
