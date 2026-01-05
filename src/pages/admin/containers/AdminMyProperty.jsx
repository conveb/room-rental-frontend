import { useState } from "react";
import AddProperties from "./AddProperties";
import MyProperties from "./MyProperties";

export default function AdminMyProperty(){

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