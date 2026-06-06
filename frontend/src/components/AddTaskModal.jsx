import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

export default function AddTaskModal({
  isOpen,
  onClose,
  onTaskAdded,
}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/tasks",
        {
          title,
          description,
          priority,
          dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task Created Successfully");

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");

      onTaskAdded();
      onClose();

    } catch (error) {

      toast.error("Failed To Create Task");

    }

  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          w-full
          max-w-xl
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
        "
      >

        <h2 className="text-3xl font-bold mb-6">
          Create New Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
              w-full
              bg-[#0f172a]
              border
              border-gray-700
              rounded-xl
              p-4
              outline-none
            "
            required
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows="4"
            className="
              w-full
              bg-[#0f172a]
              border
              border-gray-700
              rounded-xl
              p-4
              outline-none
            "
            required
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className="
              w-full
              bg-[#0f172a]
              border
              border-gray-700
              rounded-xl
              p-4
              outline-none
            "
          >
            <option value="High">
              🔴 High Priority
            </option>

            <option value="Medium">
              🟡 Medium Priority
            </option>

            <option value="Low">
              🟢 Low Priority
            </option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="
              w-full
              bg-[#0f172a]
              border
              border-gray-700
              rounded-xl
              p-4
              outline-none
            "
          />

          <div className="flex gap-4">

            <button
              type="submit"
              className="
                flex-1
                bg-cyan-500
                hover:bg-cyan-600
                py-3
                rounded-xl
                font-semibold
              "
            >
              Create Task
            </button>

            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                bg-red-500/20
                text-red-400
                py-3
                rounded-xl
              "
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}