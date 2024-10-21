"use client";
import React, { useState } from "react";
import styles from "../styles/DropDown.module.css";

interface PriorityDropdownProps {
  onChange: (priority: string) => void; // Prop to handle priority change
  initialPriority?: string; // Optional initial priority
}

const PriorityDropdown: React.FC<PriorityDropdownProps> = ({
  onChange,
  initialPriority = "Medium",
}) => {
  const [selectedPriority, setSelectedPriority] =
    useState<string>(initialPriority);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const priority = event.target.value;
    setSelectedPriority(priority);
    onChange(priority); // Call the onChange prop to update the priority in context
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdownButton}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedPriority} <span className={styles.arrow}>▼</span>
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <label className={styles.dropdownItem}>
            High
            <input
              type="radio"
              value="High"
              checked={selectedPriority === "High"}
              onChange={handleSelection}
            />
          </label>
          <label className={styles.dropdownItem}>
            Medium
            <input
              type="radio"
              value="Medium"
              checked={selectedPriority === "Medium"}
              onChange={handleSelection}
            />
          </label>
          <label className={styles.dropdownItem}>
            Low
            <input
              type="radio"
              value="Low"
              checked={selectedPriority === "Low"}
              onChange={handleSelection}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default PriorityDropdown;
