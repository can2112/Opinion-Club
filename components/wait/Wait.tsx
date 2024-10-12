const Wait = ({ progress, statusMessage }: any) => {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-20  text-white">
      <div className="relative">
        <div className="h-24 w-24 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          {progress}%
        </div>
      </div>

      <div className="w-full max-w-md mt-6 bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-400 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="mt-4 text-lg font-semibold">{statusMessage}</p>
    </div>
  );
};

export default Wait;
