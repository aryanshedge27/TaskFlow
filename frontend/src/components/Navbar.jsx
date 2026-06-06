export default function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div
      className="
        flex
        items-center
        justify-between
        mb-8
      "
    >
      <div>
        <h1 className="text-4xl font-bold">
          Welcome, {user?.name} 👋
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your tasks efficiently
        </p>
      </div>

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
        "
      >
        {user?.name?.charAt(0)}
      </div>
    </div>
  );
}