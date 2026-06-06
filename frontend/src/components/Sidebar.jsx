import {
  FiGrid,
  FiCheckSquare,
  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <motion.div
      initial={{
        x: -50,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        w-72
        min-h-screen
        bg-white/5
        backdrop-blur-xl
        border-r
        border-white/10
        p-6
        flex
        flex-col
        shadow-2xl
      "
    >

      {/* Logo */}

      <div className="mb-14">

        <h1
          className="
            text-5xl
            font-extrabold
            bg-gradient-to-r
            from-cyan-400
            via-blue-500
            to-purple-500
            bg-clip-text
            text-transparent
          "
        >
          TaskFlow
        </h1>

        <p className="text-gray-400 mt-3">
          Premium Productivity Suite
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex flex-col gap-4">

        {/* Dashboard */}

        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="
            flex
            items-center
            gap-4
            p-4
            rounded-2xl
            bg-cyan-500/10
            border
            border-cyan-500/20
            text-cyan-400
            font-medium
          "
        >
          <FiGrid size={22} />
          Dashboard
        </motion.button>

        {/* Tasks */}

        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={() =>
            document
              .getElementById("tasks")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
          className="
            flex
            items-center
            gap-4
            p-4
            rounded-2xl
            hover:bg-white/5
            transition
          "
        >
          <FiCheckSquare size={22} />
          Tasks
        </motion.button>

        {/* Analytics */}

        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={() =>
            document
              .getElementById("analytics")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
          className="
            flex
            items-center
            gap-4
            p-4
            rounded-2xl
            hover:bg-white/5
            transition
          "
        >
          <FiBarChart2 size={22} />
          Analytics
        </motion.button>

      </nav>

      <div className="flex-1" />

      {/* User Card */}

      <div
        className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-5
          mb-4
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              flex
              items-center
              justify-center
              font-bold
              text-white
            "
          >
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>

            <h3 className="font-semibold">
              {user?.name || "User"}
            </h3>

            <p className="text-sm text-gray-400">
              Productivity Master 🚀
            </p>

          </div>

        </div>

      </div>

      {/* Logout */}

      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        onClick={handleLogout}
        className="
          w-full
          flex
          items-center
          justify-center
          gap-3
          p-4
          rounded-2xl
          bg-red-500/10
          border
          border-red-500/20
          text-red-400
          hover:bg-red-500/20
          transition
        "
      >
        <FiLogOut size={20} />
        Logout
      </motion.button>

    </motion.div>

  );
}