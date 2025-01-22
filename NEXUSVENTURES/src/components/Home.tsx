
const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Welcome to <span className="text-yellow-300">Our Platform</span>
        </h1>
        <p className="text-lg md:text-xl font-light mb-6">
          Your one-stop destination for exceptional solutions and experiences.
        </p>
        <button className="bg-yellow-400 text-indigo-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
