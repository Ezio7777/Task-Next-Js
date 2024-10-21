import React, { useState } from "react";
import { BiSort } from "react-icons/bi";
import { useTaskContext } from "../context/TaskContext";
import styles from "../styles/Button.module.css";

const Sort: React.FC = () => {
  const { updateSortOrder } = useTaskContext();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSort = (order: "asc" | "desc" | "default") => {
    updateSortOrder(order);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className={styles.sortContainer}>
      <button
        onClick={toggleDropdown}
        className={styles.customSortButton}
        aria-haspopup="true"
        aria-expanded={dropdownVisible}
      >
        <BiSort className={styles.icon} />
        <span className={styles.sortText}>Sort</span>
      </button>
      {dropdownVisible && (
        <div className={styles.dropdownMenu}>
          <button
            className={styles.dropdownItem}
            onClick={() => handleSort("asc")}
          >
            Asc
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => handleSort("desc")}
          >
            Desc
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => handleSort("default")}
          >
            Default
          </button>
        </div>
      )}
    </div>
  );
};

export default Sort;
