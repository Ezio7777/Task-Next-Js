"use client";
import React, { useState } from "react";
import styles from "../styles/MobileView.module.css";
import DropDown from "./DropDown";
import ActionButton from "./ActionButton";
import { Task, useTaskContext } from "../context/TaskContext";

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks = [] }) => {
  const { editTask, deleteTask } = useTaskContext();

  // State to handle which rows are collapsed/expanded
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Toggle row expansion
  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className={styles.taskTableContainer}>
      <table className={styles.taskTable}>
        <thead>
          <tr>
            <th>SL.No</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <tr onClick={() => toggleRow(index)} className={styles.taskRow}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
              </tr>
              {expandedRow === index && (
                <tr>
                  <td colSpan={2}>
                    <div className={styles.expandedRowContent}>
                      <p>
                        <strong>Description:</strong> {task.description}
                      </p>
                      <p>
                        <strong>Due Date:</strong> {task.dueDate}
                      </p>
                      <p>
                        <strong>Status:</strong>
                        <span
                          className={`${styles.status} ${
                            styles[task.status.toLowerCase().replace(" ", "-")]
                          }`}
                        >
                          {task.status}
                        </span>
                      </p>
                      <div className={styles.priorityContainer}>
                        <strong>Priority: </strong>
                        <DropDown
                          onChange={(priority) =>
                            editTask(task.id, { ...task, priority })
                          }
                          initialPriority={task.priority}
                        />
                      </div>
                      <div className={styles.actionsContainer}>
                        <ActionButton task={task} />
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
