"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
const template = ({ children }: { children: ReactNode }) => {
  const path = useParams();
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
      animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
};

export default template;
