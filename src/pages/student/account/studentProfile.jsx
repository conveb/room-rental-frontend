import { useNavigate, useLocation, useParams } from "react-router-dom";

const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const fromTab = location.state?.fromTab || "overview";

  return (
    <div className="p-4">
      <button
        onClick={() =>
          navigate("/admin", {
            state: { activeTab: fromTab },
          })
        }
        className="mb-4 flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
      >
        ← Back
      </button>

      <h1 className="text-xl font-semibold">
        Student Profile
      </h1>
      <p className="text-gray-600 text-sm">ID: {id}</p>
    </div>
  );
};

export default StudentProfile;
