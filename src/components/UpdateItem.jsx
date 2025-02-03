import React, { useState, useEffect } from 'react';

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`; // Leave the API_URI unchanged

const UpdateItem = ({ item }) => {
    // 1. Create a state for the form
    // 2. Create a function to handle the form submission
    // 3. Create a function to handle the form input changes

    const [fetchedItem, setFetchedItem] = useState(null);
    const [updatedItem, setUpdatedItem] = useState({});
    const [apiResponse, setApiResponse] = useState(null);
    const [error, setError] = useState(null); // Error state

    const fetchItem = async () => {
        try {
            const response = await fetch(`${API_URI}/1`);
            const data = await response.json();
            setFetchedItem(data);
            setUpdatedItem(data); // Initialize updatedItem with fetched data
        } catch (er) {
            setError(er); // Set error state
            console.log(er);
        }
    };

    useEffect(() => {
        fetchItem();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedItem((prev) => ({
            ...prev, [name]: value
        }));
    };

    const handleUpdateItem = async () => { // Renamed function
        try {
            const response = await fetch(`${API_URI}/1`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem),
            });
            const data = await response.json();
            setApiResponse(data);
        } catch (er) {
            setError(er); // Set error state
            console.log(er);
        }
    };

    return (
        <div>
            {fetchedItem && (
                <div>
                    <h2>{fetchedItem.name}</h2>
                    <p>Status: {fetchedItem.status}</p>
                    <input
                        type="text"
                        name="name"
                        value={updatedItem.name || fetchedItem.name}
                        onChange={handleInputChange}
                    />

                    <input
                        type="text"
                        name="status"
                        value={updatedItem.status || fetchedItem.status}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleUpdateItem}>Update Item</button>
                    {apiResponse && (
                        <div>
                            <h2>API Response</h2>
                            <p>{apiResponse.name}</p>
                            <p>{apiResponse.status}</p>
                        </div>
                    )}
                    {error && (
                        <div>
                            <h2>Error</h2>
                            <p>{error.message}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UpdateItem;
