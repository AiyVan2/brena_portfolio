const GameWindow = ({ children, title }) => (
  <div className="border-4 border-yellow-400 rounded-lg p-6 bg-gray-900 shadow-lg mb-8 relative">
    <div className="absolute -top-4 left-6 bg-gray-900 px-3 border-2 border-yellow-400 text-yellow-400 font-bold">
      {title || "QUEST LOG"}
    </div>
    {children}
  </div>
);

export default GameWindow;