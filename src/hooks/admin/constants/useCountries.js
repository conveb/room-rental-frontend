import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { createCountryApi, deleteCountryApi, getAllCountriesApi, updateCountryApi } from "../../../services/allAPI";


export const useCountries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCountries = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllCountriesApi();
            if (response.status >= 200 && response.status < 300) {
                setCountries(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch countries", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const addCountry = async (countryData) => {
        try {
            const response = await createCountryApi(countryData);
            if (response.status >= 200 && response.status < 300) {
                setCountries((prev) => [...prev, response.data]);
                toast.success(`${countryData.name} added successfully`);
                return true;
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add country");
            return false;
        }
    };
    // Inside useCountries.js
    const updateCountry = async (id, data) => {
        try {
            const response = await updateCountryApi(id, data);
            if (response.status >= 200 && response.status < 300) {
                setCountries((prev) =>
                    prev.map((c) => (c.id === id ? { ...c, ...response.data } : c))
                );
                toast.success("Country updated");
            }
        } catch (err) {
            toast.error("Update failed");
        }
    };
    const removeCountry = async (id, name) => {
        try {
            const response = await deleteCountryApi(id);
            if (response.status >= 200 && response.status < 300) {
                setCountries((prev) => prev.filter((c) => c.id !== id));
                toast.success(`${name} removed`);
            }
        } catch (err) {
            toast.error("Failed to delete country");
        }
    };

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    return { countries, addCountry, removeCountry,updateCountry, loading, refresh: fetchCountries };
};