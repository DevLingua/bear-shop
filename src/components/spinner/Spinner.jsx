function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="w-20 h-20 border-4 border-t-4 border-purple-500 border-t-transparent rounded-full"
        style={{ animation: "spin 2s linear infinite" }}
      ></div>
    </div>
  );
}

export default Spinner
