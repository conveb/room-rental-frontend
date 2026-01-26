import { useState, useEffect, useCallback } from "react";
import { AddFavouritesApi, GetFavouritesApi, RemoveFavouritesApi } from "../../services/allAPI";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFavorites = useCallback(async () => {
        try {
            const result = await GetFavouritesApi();
            if (result.status === 200) {
                // Ensure we handle cases where data might be nested or direct
                setFavorites(Array.isArray(result.data) ? result.data : []);
            }
        } catch (err) {
            setError("Failed to load saved rooms.");
        } finally {
            setLoading(false);
        }
    }, []);

    const isSaved = (propertyId) => {
        return favorites.some(fav => 
            fav.property_id === propertyId || (fav.property && fav.property.id === propertyId)
        );
    };

    const addToFavorites = async (propertyId) => {
        const tempId = Date.now();
        // Optimistic add
        const newFav = { id: tempId, property_id: propertyId, isTemp: true };
        setFavorites(prev => [...prev, newFav]);

        try {
            const result = await AddFavouritesApi({ property_id: propertyId });
            if (result.status === 200 || result.status === 201) {
                // Replace temp entry with real server data to get the real 'id'
                fetchFavorites(); 
            } else {
                setFavorites(prev => prev.filter(fav => fav.id !== tempId));
            }
        } catch (err) {
            setFavorites(prev => prev.filter(fav => fav.id !== tempId));
        }
    };

    const removeFromFavorites = async (propertyId) => {
        // Find the actual favorite object ID (the primary key in the favorites table)
        const favItem = favorites.find(f => 
            f.property_id === propertyId || (f.property && f.property.id === propertyId) || f.id === propertyId
        );
        
        if (!favItem) return;

        const originalFavorites = [...favorites];
        // Optimistic remove
        setFavorites(prev => prev.filter(item => item.id !== favItem.id));

        try {
            const result = await RemoveFavouritesApi(favItem.id);
            if (result.status !== 200 && result.status !== 204) {
                setFavorites(originalFavorites); // Rollback
            }
        } catch (err) {
            setFavorites(originalFavorites);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    return { favorites, loading, error, addToFavorites, removeFromFavorites, isSaved, refresh: fetchFavorites };
};