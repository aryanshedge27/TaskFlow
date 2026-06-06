import { motion } from "framer-motion";

export default function StatsCard({
  title,
  value,
  color = "text-white",
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.03,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-7
        shadow-xl
      "
    >
      <h3 className="text-gray-400 text-lg">
        {title}
      </h3>

      <h1
        className={`text-6xl font-bold mt-4 ${color}`}
      >
        {value}
      </h1>
    </motion.div>
  );
}