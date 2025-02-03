import React, { useState, useEffect } from 'react';
import UpdateItem from "./components/UpdateItem";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [item, setItem] = useState(null); // State to hold the existing item

  // Fetch the existing item from the server
  const fetchItem = async () => {
    try {
      const response = await fetch(`${API_URI}/1`);
      const data = await response.json();
      setItem(data); // Set the fetched item
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  useEffect(() => {
    fetchItem(); // Fetch item when the component mounts
  }, []);

  return <UpdateItem item={item} />; // Pass the item to UpdateItem as a prop
}

export default App;
