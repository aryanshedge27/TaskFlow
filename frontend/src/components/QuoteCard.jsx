export default function QuoteCard() {

  const quotes = [
    "Discipline beats motivation.",
    "Success comes from consistency.",
    "Focus on progress, not perfection.",
    "Make today count.",
    "One task at a time.",
    "Small progress is still progress.",
    "Your future is created by what you do today.",
    "Stay focused and never give up.",
    "Great things take time.",
    "Every task completed is a step forward."
  ];

  const today =
    new Date().toDateString();

  const savedDate =
    localStorage.getItem("quoteDate");

  let quoteIndex =
    localStorage.getItem("quoteIndex");

  if (savedDate !== today) {

    quoteIndex = Math.floor(
      Math.random() * quotes.length
    );

    localStorage.setItem(
      "quoteDate",
      today
    );

    localStorage.setItem(
      "quoteIndex",
      quoteIndex
    );

  }

  const quote =
    quotes[quoteIndex] ||
    quotes[0];

  return (

    <div
      className="
        mb-8
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-6
      "
    >

      <h3
        className="
          text-cyan-400
          font-semibold
          text-lg
        "
      >
        ✨ Quote of the Day
      </h3>

      <p
        className="
          mt-3
          text-xl
          italic
          text-gray-200
        "
      >
        "{quote}"
      </p>

    </div>

  );

}