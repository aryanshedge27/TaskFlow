import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import ProgressCard from "../components/ProgressCard";
import AnalyticsCard from "../components/AnalyticsCard";
import QuoteCard from "../components/QuoteCard";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await API.get(
        "/tasks",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

    } catch (error) {

      toast.error(
        "Failed to fetch tasks"
      );

    }

  };

  const completeTask = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.put(
        `/tasks/${id}`,
        {
          status: "Completed",
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Task Completed"
      );

      fetchTasks();

    } catch (error) {

      toast.error(
        "Failed To Update Task"
      );

    }

  };

  const deleteTask = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this task?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("token");

      await API.delete(
        `/tasks/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Task Deleted"
      );

      fetchTasks();

    } catch (error) {

      toast.error(
        "Failed To Delete Task"
      );

    }

  };

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
      task =>
        task.status ===
        "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      task =>
        task.status ===
        "Pending"
    ).length;

  const filteredTasks =
    tasks.filter(task => {

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        task.description
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesFilter =
        filter === "All"
          ? true
          : task.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );

    });

  return (

    <div className="flex min-h-screen bg-[#0b1220] text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <Navbar />

        {/* HERO */}

        <div
          className="
            mb-8
            rounded-3xl
            p-8
            bg-gradient-to-r
            from-cyan-500/20
            via-blue-500/20
            to-purple-500/20
            border
            border-cyan-500/20
          "
        >

          <div className="flex flex-col md:flex-row md:justify-between md:items-center">

            <div>

              <h1 className="text-4xl font-bold">
                Welcome Back,
                {" "}
                {user?.name}
                {" "}
                👋
              </h1>

              <p className="text-gray-300 mt-3">
                Stay productive and finish your goals.
              </p>

            </div>

            <button
              onClick={() =>
                setIsModalOpen(true)
              }
              className="
                mt-6
                md:mt-0
                bg-cyan-500
                hover:bg-cyan-600
                px-8
                py-4
                rounded-2xl
                font-semibold
              "
            >
              + New Task
            </button>

          </div>

        </div>
        <QuoteCard />

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <StatsCard
            title="Total Tasks"
            value={totalTasks}
          />

          <StatsCard
            title="Completed"
            value={completedTasks}
            color="text-green-400"
          />

          <StatsCard
            title="Pending"
            value={pendingTasks}
            color="text-yellow-400"
          />

          <ProgressCard
            total={totalTasks}
            completed={completedTasks}
          />

        </div>

        {/* ANALYTICS */}

        <div
  id="analytics"
  className="mb-8"
>

  <AnalyticsCard
    total={totalTasks}
    completed={completedTasks}
    pending={pendingTasks}
  />

</div>

        {/* TASKS */}

        <div id="tasks">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">

            <h2 className="text-3xl font-bold">
              Your Tasks
            </h2>

            <span className="text-gray-400">
              Showing
              {" "}
              {filteredTasks.length}
              {" "}
              Tasks
            </span>

          </div>

          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="
              w-full
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-2xl
              p-4
              mb-5
              outline-none
            "
          />

          <div className="flex gap-3 mb-8">

            <button
              onClick={() =>
                setFilter("All")
              }
              className={`
                px-5 py-2 rounded-xl
                ${
                  filter === "All"
                    ? "bg-cyan-500"
                    : "bg-white/5"
                }
              `}
            >
              All
            </button>

            <button
              onClick={() =>
                setFilter(
                  "Pending"
                )
              }
              className={`
                px-5 py-2 rounded-xl
                ${
                  filter ===
                  "Pending"
                    ? "bg-yellow-500"
                    : "bg-white/5"
                }
              `}
            >
              Pending
            </button>

            <button
              onClick={() =>
                setFilter(
                  "Completed"
                )
              }
              className={`
                px-5 py-2 rounded-xl
                ${
                  filter ===
                  "Completed"
                    ? "bg-green-500"
                    : "bg-white/5"
                }
              `}
            >
              Completed
            </button>

          </div>

          {filteredTasks.length === 0 ? (

            <div
              className="
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-12
                text-center
              "
            >
              <h3 className="text-3xl mb-4">
                ✨ No matching tasks
              </h3>

              <p className="text-gray-400">
                Try another search or filter.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {filteredTasks.map(
                task => (

                  <TaskCard
                    key={task._id}
                    task={task}
                    onComplete={
                      completeTask
                    }
                    onDelete={
                      deleteTask
                    }
                  />

                )
              )}

            </div>

          )}

        </div>

      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onTaskAdded={
          fetchTasks
        }
      />

    </div>

  );
}