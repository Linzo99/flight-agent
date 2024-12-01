import { motion } from "framer-motion";
import Image from "next/image";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-md mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-3 leading-relaxed text-center max-w-xl">
        <Image
          src="/logo.jpg"
          width={50}
          height={50}
          alt=""
          className="rounded-md mx-auto shadow shadow-blue-400"
        />
        <h3 className="font-semibold text-2xl">Find your Flight</h3>
        <p>
          Describe your next flight. No more complicated searches, just natural
          conversations that help you plan your perfect trip.
        </p>
      </div>
    </motion.div>
  );
};
