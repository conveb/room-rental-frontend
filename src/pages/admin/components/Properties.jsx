// src/pages/admin/components/Properties.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ImgSkeleton from '../../../Assets/pngs/img_skeleton.png';

const Properties = ({
  properties,
  loading,
  search,
  setSearch,
  onDelete,
  listProperties
}) => {
  const propertiesToShow = listProperties || properties;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Properties</h2>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search properties..."
        className="border p-2 rounded-md w-full"
      />

      {loading ? (
        <p>Loading properties...</p>
      ) : propertiesToShow.length === 0 ? (
        <p>No properties found</p>
      ) : (
        propertiesToShow.map(p => (
          <div
            key={p.id}
            className="border p-2 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-3"
          >
            {/* Left Section */}
            <div className="flex gap-3 items-center">
              <img
                src={p.cover_image}
                alt={p.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ImgSkeleton;
                }}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div>
                <p className="font-medium">{p.title || "Unnamed property"}</p>
                <p className="text-sm text-gray-500">
                  {p.location?.location_name || p.city || "No location"}
                </p>
                <p className="mt-2 font-medium">
                  €{p.rent_per_month} / month
                </p>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Link
                to={`/auth/admin/accommodation-details/${p.id}`}
                className="w-full md:w-auto"
              >
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-full md:w-auto">
                  View
                </button>
              </Link>
              
              <button
                onClick={() => onDelete(p.id)}
                className="bg-red-500 text-white px-4 py-1 md:py-2 rounded-lg w-full md:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Properties;