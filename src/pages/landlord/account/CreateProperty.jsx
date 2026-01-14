

import { useState } from "react";

import { Helmet } from "react-helmet";
import AddProperties from "../../admin/containers/AddProperties";
import MyProperties from "../../admin/containers/MyProperties";


export default function CreateProperty() {
   
 const [activeTab, setActiveTab] = useState("add");
 return(

   <div className="space-y-3">
      {/* Tabs */}
      <div className="flex bg-white rounded-3xl p-2 gap-2">
        <button
          onClick={() => setActiveTab("add")}
          className={`flex-1 py-3 rounded-2xl text-sm md:text-md  ${
            activeTab === "add"
              ? "bg-black text-white" : "bg-gray-100"
          }`}
        >
          Add Property
        </button>

        <button
          onClick={() => setActiveTab("list")}
          className={`flex-1 py-3 rounded-2xl text-sm md:text-md  ${
            activeTab === "list"
              ? "bg-black text-white" : "bg-gray-100"
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
