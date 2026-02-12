
import { AddCountries } from "./containers/AddCountry";
import { AddLocations } from "./containers/AddLocations";
import { AddAmenities } from "./containers/AddAmenities";
import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import GroupsManagement from "./containers/GroupsManagement";
import PermissionManagement from "./containers/PermissionManagement";

export default function AdminGroupsAndPermissions() {
    const [activeTab, setActiveTab] = useState("groups");
     const navigate = useNavigate();

    return (
        <>
            <HelmetProvider>
                <title>Admin Console | Manage</title>
                <meta name="description" content="This is the home page" />
                <meta name="keywords" content="react, seo, helmet" />
            </HelmetProvider>
            <div className="min-h-screen md:p-6 ">
           <button onClick={() => navigate(-1)}>
                <p className="flex items-center gap-3 my-2"><FaArrowLeft/>back</p>
           </button>
           

                {/* ===== TABS ===== */}
                <div className="flex bg-white rounded-3xl overflow-hidden w-full p-2 gap-2 shadow">
                    {[
                        { key: "groups", label: "Groups" },
                        { key: "permissions", label: "Permissions" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 py-3 md:py-4 text-xs md:text-sm font-medium transition rounded-2xl shadow ${activeTab === tab.key
                                ? "bg-black text-white"
                                : "bg-white text-gray-500 hover:bg-gray-200"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ===== CONTENT ===== */}
                <div className="mt-4">
                    {activeTab === "groups" && <GroupsManagement />}
                    {activeTab === "permissions" && <PermissionManagement />}
                </div>
            </div>
        </>
    );
}
