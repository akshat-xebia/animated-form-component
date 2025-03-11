import React from "react";
import { motion } from "framer-motion";

interface AnimatedSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onAnimationComplete?: () => void;
}

const AnimatedSheet: React.FC<AnimatedSheetProps> = ({
  isOpen,
  onClose,
  children,
  onAnimationComplete,
}) => {
  return (
    <>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      <motion.div
        className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50 p-4 flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onAnimationComplete={() => {
          if (isOpen && onAnimationComplete) {
            onAnimationComplete();
          }
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 text-xl"
        >
          &times;
        </button>

        <div className="mt-2 flex-1 overflow-y-auto noscrollbar p-2">
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default AnimatedSheet;
