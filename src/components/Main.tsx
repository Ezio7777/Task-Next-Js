"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTaskContext } from "../context/TaskContext";
import SearchBar from "./SearchBar";
import MobileTaskTable from "./MobileTaskTable";
import DesktopTaskTable from "./DesktopTaskTable";
import AddTask from "./AddTask";
import Sort from "./TaskSort";
import Filter from "./TaskFilter";
import useWindowSize from "../Hook/windowSize"; // Import the custom hook
import styles from "../styles/Main.module.css";

const TaskManager = () => {
  const { filteredTasks } = useTaskContext(); // Get filtered tasks and setSearch from context

  const windowSize = useWindowSize(); // Get the current window size
  const isMobile = windowSize.width <= 1000; // Set the mobile breakpoint

  return (
    <div className={`container ${styles.TaskTableContainer}`}>
      <div className={styles.headerContainer}>
        <div className={styles.Title}>
          <h1>Tasks</h1>
        </div>
        <div className={styles.FormContainer}>
          {/* Search input now directly updates context */}
          <SearchBar />
          <div className={styles.ButtonContainer}>
            <AddTask />
            <Sort />
            <Filter />
          </div>
        </div>
      </div>

      {/* Conditionally render MobileTaskTable or DesktopTaskTable based on window size */}
      {isMobile ? (
        <MobileTaskTable tasks={filteredTasks} />
      ) : (
        <DesktopTaskTable tasks={filteredTasks} />
      )}

      {/* Display "No tasks found" message if there are no tasks after filtering */}
      {filteredTasks.length === 0 && (
        <div className={styles.notFound}>
          <p>No task found</p>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
