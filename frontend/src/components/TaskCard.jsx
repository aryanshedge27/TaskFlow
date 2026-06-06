import { motion } from "framer-motion";
import {
  FiCheck,
  FiTrash2,
  FiCalendar,
} from "react-icons/fi";

export default function TaskCard({
  task,
  onComplete,
  onDelete,
}) {

  const getPriorityColor = () => {

    switch (task.priority) {

      case "High":
        return "bg-red-500/20 text-red-400 border border-red-500/20";

      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20";

      case "Low":
        return "bg-green-500/20 text-green-400 border border-green-500/20";

      default:
        return "bg-gray-500/20 text-gray-400";

    }

  };

  const getDueDateStatus = () => {

    if (!task.dueDate)
      return null;

    const today = new Date();
    const due = new Date(task.dueDate);

    // Remove time portion
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diff = Math.floor(
      (due - today) /
      (1000 * 60 * 60 * 24)
    );

    if (diff < 0) {
      return {
        text: "🔴 Overdue",
        color: "text-red-400",
      };
    }

    if (diff === 0) {
      return {
        text: "⏰ Due Today",
        color: "text-orange-400",
      };
    }

    if (diff === 1) {
      return {
        text: "🟡 Due Tomorrow",
        color: "text-yellow-400",
      };
    }

    return {
      text: `🟢 Due in ${diff} days`,
      color: "text-green-400",
    };

  };

  const dueStatus = getDueDateStatus();

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
        hover:border-cyan-400/30
      "
    >

      <div className="flex justify-between items-start gap-4">

        <div className="flex-1">

          <h3 className="text-2xl font-bold">
            {task.title}
          </h3>

          <p className="text-gray-400 mt-3 leading-relaxed">
            {task.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-5">

            <span
              className={`
                px-4
                py-2
                rounded-full
                text-sm
                font-medium
                ${getPriorityColor()}
              `}
            >
              {task.priority || "Medium"} Priority
            </span>

            {task.dueDate && (

              <span
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-cyan-500/10
                  text-cyan-400
                  border
                  border-cyan-500/20
                  text-sm
                "
              >
                <FiCalendar />

                {new Date(
                  task.dueDate
                ).toLocaleDateString()}

              </span>

            )}

            {dueStatus && (

              <span
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                  bg-white/5
                  ${dueStatus.color}
                `}
              >
                {dueStatus.text}
              </span>

            )}

          </div>

        </div>

        <span
          className={`
            px-5
            py-2
            rounded-full
            text-sm
            font-semibold
            whitespace-nowrap
            ${
              task.status === "Completed"
                ? "bg-green-500/20 text-green-400 border border-green-500/20"
                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20"
            }
          `}
        >
          {task.status}
        </span>

      </div>

      <div className="flex gap-3 mt-7">

        {task.status !== "Completed" && (

          <button
            onClick={() =>
              onComplete(task._id)
            }
            className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              bg-green-500
              hover:bg-green-600
              transition
              font-medium
            "
          >
            <FiCheck />
            Complete
          </button>

        )}

        <button
          onClick={() =>
            onDelete(task._id)
          }
          className="
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-2xl
            bg-red-500
            hover:bg-red-600
            transition
            font-medium
          "
        >
          <FiTrash2 />
          Delete
        </button>

      </div>

    </motion.div>

  );
}