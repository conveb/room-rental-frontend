import { useState } from "react";
import { useCreateProperty } from "../../../hooks/property/useCreateProperty";
import { Chips } from "primereact/chips";
export default function CreateProperty() {
    const { createProperty, loading, error, success } = useCreateProperty();
    const [value, setValue] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        property_type: "ENTIRE_HOME",
        size_m2: "",
        max_people: "",
        rooms: "",
        bathrooms: "",
        rent_per_month: "",
        charges: "",
        booking_fee: "",
        security_deposit: "",
        available_from: "",
        minimum_stay_months: "",
        furnished: false,
        address: "",
        city: "",
        region: "",
        country: "",
        latitude: "",
        longitude: "",
        dpe_class: "A",
        ges_class: "A",
        amenities: [],
        cover_image: null,
        images: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleAmenities = (id) => {
        setForm((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(id)
                ? prev.amenities.filter((a) => a !== id)
                : [...prev.amenities, id],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProperty(form);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className=" mx-auto">

                {/* PAGE HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">Create Property</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Add detailed information to attract quality tenants
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-10"
                >

                    {/* BASIC INFO */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Basic Information
                        </h2>
                        <div className="grid gris-cols-1 md:grid-cols-2 gap-5">

                            <div className="flex flex-col gap-3">
                                <input name="title" placeholder="Property Title" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl " />
                                <input name="property_type" placeholder="Property Type" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                            </div>

                            <textarea
                                name="description"
                                placeholder="Describe the property in detail..."
                                onChange={handleChange}
                                className="input bg-gray-100 p-3 rounded-xl h-28 "
                            />
                        </div>
                    </section>

                    {/* PROPERTY DETAILS */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Property Details
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            <input name="size_m2" placeholder="Size (m²)" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                            <input name="rooms" placeholder="Rooms" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                            <input name="bathrooms" placeholder="Bathrooms" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                            <input name="max_people" placeholder="Max Occupancy" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                        </div>
                    </section>

                    {/* PRICING */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Pricing
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            <input name="rent_per_month" placeholder="Monthly Rent (€)" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                            <input name="charges" placeholder="Charges (€)" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                            <input name="booking_fee" placeholder="Booking Fee (€)" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                            <input name="security_deposit" placeholder="Deposit (€)" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                        </div>
                    </section>

                    {/* LOCATION */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Location
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input name="address" placeholder="Street Address" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                            <input name="city" placeholder="City" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                            <input name="region" placeholder="Region / State" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                            <input name="country" placeholder="Country" onChange={handleChange} className="input bg-gray-100 p-3 rounded-xl" />
                        </div>
                    </section>

                    {/* FEATURES */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Features
                        </h2>

                        <label className="flex items-center gap-3 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                name="furnished"
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            Furnished Property
                        </label>
                    </section>

                    {/* AMENITIES */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Amenities
                        </h2>

                          <div className="card p-fluid bg-gray-100">
            <Chips value={value} onChange={(e) => setValue(e.value)} className="bg-gray-100 border"/>
        </div>
                    </section>

                    {/* IMAGES */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Property Images
                        </h2>

                        <div className="grid gap-4">
                            <input
                                type="file"
                                onChange={(e) => setForm({ ...form, cover_image: e.target.files[0] })}
                            />
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setForm({ ...form, images: Array.from(e.target.files) })}
                            />
                        </div>
                    </section>

                    {/* FEEDBACK */}
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    {success && <p className="text-green-600 text-sm">Property created successfully</p>}

                    {/* ACTION */}
                    <div className="pt-6 border-t">
                        <button
                            disabled={loading}
                            className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-2xl text-sm font-medium hover:opacity-90 disabled:opacity-50"
                        >
                            {loading ? "Creating Property..." : "Create Property"}
                        </button>
                    </div>

                </form>
            </div>
        </div>

    );
}
