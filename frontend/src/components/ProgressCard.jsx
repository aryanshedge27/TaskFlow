import { motion } from "framer-motion";

export default function ProgressCard({
  total,
  completed,
}) {

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );

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
      <h3 className="text-gray-400">
        Productivity
      </h3>

      <h1 className="text-5xl font-bold mt-3">
        {percentage}%
      </h1>

      <div
        className="
          w-full
          h-3
          bg-gray-800
          rounded-full
          mt-6
          overflow-hidden
        "
      >
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${percentage}%`,
          }}
          transition={{
            duration: 1,
          }}
          className="
            h-full
            bg-gradient-to-r
            from-cyan-400
            to-blue-500
          "
        />
      </div>

      <p className="text-gray-400 mt-4">
        {completed} of {total} tasks completed
      </p>
    </motion.div>
  );
}