import React, { ReactNode, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

const BottomModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 transition-opacity duration-400 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full bg-white rounded-t-2xl shadow-lg py-4 max-h-[80vh] overflow-y-auto transform transition-transform duration-400 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end">
          <IoIosClose
            size={32}
            className="hover:bg-gray-100 rounded-sm cursor-pointer"
            onClick={onClose}
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default BottomModal;
