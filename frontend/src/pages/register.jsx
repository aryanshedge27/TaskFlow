import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success(
        "Account Created Successfully"
      );

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl top-10 left-10"></div>

      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          glass
          card-shadow
          w-full
          max-w-md
          rounded-3xl
          p-8
        "
      >

        <h1 className="text-4xl font-bold gradient-text text-center">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
              w-full
              bg-white/5
              border
              border-white/10
              rounded-xl
              p-4
              outline-none
            "
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              bg-white/5
              border
              border-white/10
              rounded-xl
              p-4
              outline-none
            "
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              bg-white/5
              border
              border-white/10
              rounded-xl
              p-4
              outline-none
            "
            required
          />

          <button
            type="submit"
            className="
              w-full
              bg-indigo-600
              hover:bg-indigo-500
              transition
              rounded-xl
              p-4
              font-semibold
            "
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-6 text-gray-400">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-cyan-400"
          >
            Login
          </Link>

        </p>

      </motion.div>

    </div>

  );
}