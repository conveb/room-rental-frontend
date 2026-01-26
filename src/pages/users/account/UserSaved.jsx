import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiMapPin } from "react-icons/fi"; // Optional icons
import { useFavorites } from "../../../hooks/users/useFavorites";
import { FaArrowLeft } from "react-icons/fa";

export default function UserSaved() {
  const { favorites, loading, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-5 my-0 md:my-5">

          <button
            onClick={() => navigate(-1)}
            className="h-9 w-9 rounded-full flex items-center justify-center
                    hover:bg-neutral-200 transition text-2xl "
          >
            <FaArrowLeft />
          </button>
          <div>

            <h2 className="text-xl md:text-3xl font-semibold">Saved Rooms</h2>
            <p className="text-sm text-gray-500 ">
              You have {favorites.length} saved properties
            </p>
          </div>
        </div>
        {/* <Link
          to="/accommodation"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
        >
          Browse More Rooms
        </Link> */}
      </div>

      {/* Saved Rooms Grid */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 md:gap-6">
          {favorites.map((fav) => {
            // Adjust property access based on your API response structure
            const room = fav.property || fav;

            return (
              <Link
                to={`/auth/user/accommodation-details/${room.id}`}
              >
                <div
                  key={fav.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={room.cover_image || "/placeholder.jpg"}
                      alt={room.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => removeFromFavorites(fav.id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                        title="Remove from saved"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {room.title}
                      </h3>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 gap-1">
                      <FiMapPin size={14} />
                      <span>{room.city} · {room.property_type?.replace('_', ' ')}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                      <div>
                        <span className="text-lg font-bold text-gray-900">€{room.rent_per_month}</span>
                        <span className="text-xs text-gray-500">/month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
            <FiTrash2 className="text-gray-300" size={32} />
          </div>
          <div className="max-w-xs mx-auto space-y-2">
            <p className="text-gray-900 font-semibold text-lg">No saved rooms yet</p>
            <p className="text-sm text-gray-500">
              Explore our properties and save your favorites to view them later.
            </p>
          </div>
          <Link
            to="/auth/user/accommodation"
            className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all"
          >
            Start Browsing
          </Link>
        </div>
      )}
    </div>
  );
}