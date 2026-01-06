
import { AddCountries } from "./containers/AddCountry";
import { AddLocations } from "./containers/AddLocations";
import { AddAmenities } from "./containers/AddAmenities";
import { useState } from "react";
import AddProperties from "./containers/AddProperties";
import AdminMyProperty from "./containers/AdminMyProperty";
import { Helmet } from "react-helmet";


export default function AddProperty() {
    const [activeTab, setActiveTab] = useState("properties");

    return (
        <>
            <Helmet>
                <title>Admin Console | Add</title>
                <meta name="description" content="This is the home page" />
                <meta name="keywords" content="react, seo, helmet" />
            </Helmet>
            <div className="min-h-screen md:p-6 ">

                {/* ===== TABS ===== */}
                <div className="flex bg-white rounded-3xl overflow-hidden w-full p-2 gap-2 shadow">
                    {[
                        { key: "properties", label: "Properties" },
                        { key: "countries", label: "Countries" },
                        { key: "locations", label: "Locations" },
                        { key: "amenities", label: "Amenities" },
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
                    {activeTab === "properties" && <AdminMyProperty />}
                    {activeTab === "countries" && <AddCountries />}
                    {activeTab === "locations" && <AddLocations />}
                    {activeTab === "amenities" && <AddAmenities />}
                </div>
            </div>
        </>
    );
}
