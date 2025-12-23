const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <>
      <div className="hidden lg:flex items-center justify-center pt-20 pb-4 px-4">
        <div className="max-w-md text-center">
          {/* Grid Pattern */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[...Array(9)].map((_, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-2xl bg-gray-700/30 ${
                  idx % 2 === 0 ? "animate-pulse" : ""
                }`}
              ></div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
          <p className="text-gray-700">{subtitle}</p>
        </div>
      </div>
    </>
  );
};

export default AuthImagePattern;
