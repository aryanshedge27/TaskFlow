import { motion } from "framer-motion";

export default function AnalyticsCard({
  total,
  completed,
  pending,
}) {

  const completionRate =
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
        scale: 1.01,
      }}
      className="
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-8
        shadow-xl
      "
    >

      <h2 className="text-2xl font-bold mb-8">
        Task Analytics
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/5 rounded-2xl p-5">
          <p className="text-gray-400">
            Completion Rate
          </p>

          <h1 className="text-5xl font-bold text-cyan-400 mt-2">
            {completionRate}%
          </h1>
        </div>

        <div className="bg-white/5 rounded-2xl p-5">
          <p className="text-gray-400">
            Completed
          </p>

          <h1 className="text-5xl font-bold text-green-400 mt-2">
            {completed}
          </h1>
        </div>

        <div className="bg-white/5 rounded-2xl p-5">
          <p className="text-gray-400">
            Pending
          </p>

          <h1 className="text-5xl font-bold text-yellow-400 mt-2">
            {pending}
          </h1>
        </div>

      </div>

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span className="text-gray-400">
            Overall Progress
          </span>

          <span>
            {completionRate}%
          </span>

        </div>

        <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${completionRate}%`,
            }}
            transition={{
              duration: 1,
            }}
            className="
              h-full
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
            "
          />

        </div>

      </div>

    </motion.div>
  );
}