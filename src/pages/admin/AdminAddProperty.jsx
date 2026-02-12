
import { AddCountries } from "./containers/AddCountry";
import { AddLocations } from "./containers/AddLocations";
import { AddAmenities } from "./containers/AddAmenities";
import { useState } from "react";
import AddProperties from "./containers/AddProperties";
import AdminMyProperty from "./containers/AdminMyProperty";

import MyProperties from "./containers/MyProperties";


export default function AddProperty({roleUrl}) {
   
 const [activeTab, setActiveTab] = useState("list");
 return(

   <div className="space-y-3">
      {/* Tabs */}
      <div className="flex bg-white rounded-3xl p-2 gap-2">
        <button
          onClick={() => setActiveTab("list")}
          className={`flex-1 py-3 rounded-2xl text-sm md:text-md  ${
            activeTab === "list"
              ? "bg-black text-white" : "bg-gray-100"
          }`}
        >
          My Properties
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className={`flex-1 py-3 rounded-2xl text-sm md:text-md  ${
            activeTab === "add"
              ? "bg-black text-white" : "bg-gray-100"
          }`}
        >
          Add Property
        </button>

      </div>

      <div>
        {activeTab === "add" && <AddProperties />}
        {activeTab === "list" && <MyProperties role={roleUrl}/>}
      </div>
    </div>
    )
}
