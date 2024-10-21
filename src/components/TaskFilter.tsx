import React, { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { useTaskContext } from "../context/TaskContext";
import styles from "../styles/Button.module.css";

const Filter: React.FC = () => {
  const { filterTasks } = useTaskContext();
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const handleFilter = () => {
    filterTasks(selectedPriority, selectedStatus);
    setIsDropdownVisible(false); // Close the dropdown
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className={styles.filterContainer}>
      <button onClick={toggleDropdown} className={styles.filterButton}>
        <IoFilterSharp className={styles.filterIcon} />
        <span className={styles.filterText}>Filter</span>
      </button>

      {isDropdownVisible && (
        <div className={styles.filterDropdown}>
          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className={styles.filterItem}
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Mid">Mid</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className={styles.filterSection}>
            <label className={styles.filterLabel}>Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={styles.filterItem}
            >
              <option value="">All</option>
              <option value="Complete">Complete</option>
              <option value="In Progress">In Progress</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <button onClick={handleFilter} className={styles.filterApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
