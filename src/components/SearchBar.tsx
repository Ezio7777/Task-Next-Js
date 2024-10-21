"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useTaskContext } from "../context/TaskContext"; // Import the context
import styles from "../styles/SearchBar.module.css"; // Import custom styles

const SearchBar: React.FC = () => {
  const { setSearch } = useTaskContext(); // Use the setSearch function from context
  const [isExpanded, setIsExpanded] = useState(false); // State to manage the input field visibility

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // This will update the search query in the context
  };

  const toggleInput = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={`d-flex align-items-center ${styles.searchBarContainer}`}>
      {/* Move the input before the button for proper alignment */}
      <input
        type="text"
        onChange={handleInputChange} // Trigger search on typing
        placeholder="Search tasks..."
        className={`form-control me-2 ${styles.searchInput} ${
          isExpanded ? styles.expanded : styles.collapsed
        }`}
      />
      {/* Button only visible in mobile view */}
      <button
        className={`btn ${styles.searchButton} ${
          isExpanded ? "d-none" : "d-block"
        }`} // Use Bootstrap classes to control visibility
        onClick={toggleInput} // Toggle input field expansion on mobile
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
