import React from "react";
import { TbBath, TbCalendar, TbDoor, TbHome, TbRuler, TbUsers, TbBuildingCommunity } from "react-icons/tb";
import { RiHandCoinLine, RiGovernmentLine } from "react-icons/ri";
import { FaBed, FaFileContract } from "react-icons/fa";
import { MdEuro, MdOutlineVerified } from "react-icons/md";
import { BsCalendarCheck } from "react-icons/bs";

const statItems = (property) => [
  { icon: <MdEuro size={20} />,               label: "Charges",        value: property.charges ? `€ ${property.charges}` : "—" },
  { icon: <RiHandCoinLine size={20} />,       label: "Deposit",        value: property.security_deposit ? `€ ${property.security_deposit}` : "—" },
  { icon: <TbDoor size={20} />,               label: "Rooms",          value: property.rooms },
  { icon: <TbBath size={20} />,               label: "Bathrooms",      value: property.bathrooms },
  { icon: <FaBed size={20} />,                label: "BHK",            value: property.bhk },
  { icon: <TbUsers size={20} />,              label: "Max People",     value: property.max_people },
  { icon: <TbRuler size={20} />,              label: "Size",           value: `${property.size_m2} m²` },
  { icon: <TbHome size={20} />,               label: "Furnished",      value: property.furnished ? "Yes" : "No" },
  { icon: <TbBuildingCommunity size={20} />,  label: "Type",           value: property.property_type?.replace("_", " ") },
  { icon: <TbCalendar size={20} />,           label: "Min Stay",       value: `${property.minimum_stay_months} months` },
  { icon: <BsCalendarCheck size={20} />,      label: "Available From", value: property.available_from },
  { icon: <MdOutlineVerified size={20} />,    label: "CAF Eligible",   value: property.is_caf_eligible ? "Yes" : "No" },
  { icon: <RiGovernmentLine size={20} />,     label: "Domicile",       value: property.is_domicile_allowed ? "Yes" : "No" },
  { icon: <FaFileContract  size={20} />,       label: "Contract",       value: property.contract ? "Yes" : "No" },
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