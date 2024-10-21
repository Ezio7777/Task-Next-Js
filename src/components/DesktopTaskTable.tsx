"use client";
import React from "react";
import styles from "../styles/TaskManager.module.css";
import DropDown from "./DropDown";
import ActionButton from "./ActionButton";
import { Task, useTaskContext } from "../context/TaskContext";

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks = [] }) => {
  const { filterTasks, editTask, deleteTask } = useTaskContext(); // Get editTask and deleteTask from context

  return (
    <div className={styles.taskTableContainer}>
      <table className={styles.taskTable}>
        <thead>
          <tr>
            <th>SL.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td className={styles.DueColumn}>{task.dueDate}</td>
              <td className={styles.statusColumn}>
                <span
                  className={`${styles.status} ${
                    styles[task.status.toLowerCase().replace(" ", "-")]
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td>
                <DropDown
                  onChange={(priority) =>
                    editTask(task.id, { ...task, priority })
                  }
                  initialPriority={task.priority}
                />
              </td>
              <td>
                <ActionButton
                  task={task} // Pass the task object to ActionButton
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
