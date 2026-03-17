import React from "react";
import { TbBath, TbCalendar, TbDoor, TbHome, TbRuler, TbUsers } from "react-icons/tb";
import { FaEnvira } from "react-icons/fa6";
import { RiHandCoinLine } from "react-icons/ri";

const statItems = (property) => [
  { icon: <TbDoor size={20} />, label: "Rooms", value: property.rooms },
  { icon: <TbBath size={20} />, label: "Bathrooms", value: property.bathrooms },
  { icon: <TbUsers size={20} />, label: "Max people", value: property.max_people },
  { icon: <TbRuler size={20} />, label: "Size", value: `${property.size_m2} m²` },
  { icon: <TbHome size={20} />, label: "Furnished", value: property.furnished ? "Yes" : "No" },
  { icon: <TbCalendar size={20} />, label: "Min Stay", value: `${property.minimum_stay_months} months` },
  { icon: <RiHandCoinLine size={20} />, label: "DPE Class", value: property.dpe_class },
  { icon: <FaEnvira size={20} />, label: "GES Class", value: property.ges_class },
];

const PropertyStats = ({ property }) => {
  return (
    <div className="grid grid-cols-2 gap-3 text-xs">
      {statItems(property).map(({ icon, label, value }) => (
        <div key={label} className="flex gap-2 items-center bg-stone-50 p-2 rounded-xl">
          <span>{icon}</span>
          <div>
            <p className="text-gray-500">{label}</p>
            <p className="font-medium">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyStats;