import { useScroll, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

const ScrollTop = () => {
  const { scrollYProgress } = useScroll();
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const circumference = 24 * 2 * Math.PI;

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const percentage = Math.floor(latest * 100);
      setScrollPercentage(percentage);
      setShowButton(percentage > 12);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      onClick={handleScrollToTop}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: showButton ? 0 : 100, opacity: showButton ? 1 : 0 }}
      className="fixed bottom-8 right-8 z-20 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#FFBD0C]"
    >
      <svg className="h-14 w-14">
        {/* Define the linear gradient */}
      
        {/* Background circle */}
        <circle
          className="text-yellow-900"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r="24"
          cx="28"
          cy="28"
        />
        {/* Progress circle with gradient */}
        <circle
          className="text-[#FFBD0C]"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={
            circumference - (scrollPercentage / 100) * circumference
          }
          strokeLinecap="round"
          stroke="url(#scrollGradient)"
          fill="transparent"
          r="24"
          cx="28"
          cy="28"
        />
      </svg>
      {/* Scroll-to-top icon */}
      <span className="absolute text-2xl text-gray-700">
        <FaArrowUpLong />
      </span>
    </motion.div>
  );
};

export default ScrollTop;
