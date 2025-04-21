
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
          <p className="text-xl text-gray-600">Start building your amazing project here!</p>
        </div>
      </div>

      <footer className="py-6 bg-gray-300 text-center text-base text-gray-800 w-full border-t-2 border-gray-400">
        <div className="container mx-auto">
          Got ideas or feedback about this app?{" "}
          <a
            href="mailto:debora.gallo78@gmail.com"
            className="text-blue-600 font-semibold hover:underline"
          >
            Drop me a line
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
