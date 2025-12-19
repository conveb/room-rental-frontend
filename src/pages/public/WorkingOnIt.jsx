export default function WorkingOnIt() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">    
        <h1 className="text-4xl font-bold mb-4 text-gray-800">We're Working On It!</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
            This Page is currently under development. Stay tuned for updates!
        </p>
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        <button className="my-10 border bg-black px-4 py-3 text-white">Go to Home page</button>
        <style jsx>{`
            .loader {
                border-top-color: #3498db;
                animation: spin 1s infinite linear;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
    </div>
  );
}