
import { AddCountries } from "./containers/AddCountry";
import { AddLocations } from "./containers/AddLocations";
import { AddAmenities } from "./containers/AddAmenities";
import { useState } from "react";
import AddProperties from "./containers/AddProperties";
import AdminMyProperty from "./containers/AdminMyProperty";
import { Helmet } from "react-helmet";
import MyProperties from "./containers/MyProperties";


export default function AddProperty() {
   
 const [activeTab, setActiveTab] = useState("add");
 return(

   <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-3 border-b">
        <button
          onClick={() => setActiveTab("add")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === "add"
              ? "border-black text-black"
              : "border-transparent text-gray-500"
          }`}
        >
          Add Property
        </button>

        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === "list"
              ? "border-black text-black"
              : "border-transparent text-gray-500"
          }`}
        >
          My Properties
        </button>
      </div>

      <div>
        {activeTab === "add" && <AddProperties />}
        {activeTab === "list" && <MyProperties />}
      </div>
    </div>
    )
}
