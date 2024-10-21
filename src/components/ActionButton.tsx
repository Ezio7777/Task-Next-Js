import React from "react";
import styles from "../styles/TaskManager.module.css";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Task, useTaskContext } from "../context/TaskContext"; // Import Task type and useTaskContext

const MySwal = withReactContent(Swal);

interface ActionButtonProps {
  task: Task; // The task object to be edited or deleted
}

const ActionButton: React.FC<ActionButtonProps> = ({ task }) => {
  const { editTask, deleteTask } = useTaskContext(); // Get editTask and deleteTask from context

  const handleDelete = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#941b0f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: styles.customPopupDelete,
        actions: styles.customButtonContainerDelete,
        confirmButton: styles.customConfirmButton,
        cancelButton: styles.customCancelButton,
      },
    });

    if (result.isConfirmed) {
      deleteTask(task.id); // Call the delete action
      MySwal.fire({
        title: "Deleted!",
        text: "Your task has been deleted.",
        icon: "success",
        confirmButtonColor: "#941b0f",
        customClass: {
          confirmButton: styles.customOkButton,
        },
      });
    }
  };

  const handleEdit = async () => {
    const { value: formValues } = await MySwal.fire({
      title: "Edit Task",
      html: `
        <label class="${styles.customLabel}" for="task-name">Title</label>
        <input id="task-name" class="swal2-input ${
          styles.customInput
        }" placeholder="Task Name" value="${task.name}" required>

        <label class="${
          styles.customLabel
        }" for="task-description">Description</label>
        <textarea id="task-description" class="swal2-textarea ${
          styles.customInput
        }" placeholder="Task Description">${task.description}</textarea>

        <label class="${
          styles.customLabel
        }" for="task-due-date">Due Date</label>
        <input type="date" id="task-due-date" class="swal2-input ${
          styles.customInput
        }" value="${task.dueDate}">

        <label class="${styles.customLabel}" for="task-status">Status</label>
        <select id="task-status" class="swal2-select ${styles.customInput}">
          <option value="In Progress" ${
            task.status === "In Progress" ? "selected" : ""
          }>In Progress</option>
          <option value="Completed" ${
            task.status === "Completed" ? "selected" : ""
          }>Completed</option>
          <option value="Cancelled" ${
            task.status === "Cancelled" ? "selected" : ""
          }>Cancelled</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById("task-name") as HTMLInputElement)
          .value;
        const description = (
          document.getElementById("task-description") as HTMLTextAreaElement
        ).value;
        const dueDate = (
          document.getElementById("task-due-date") as HTMLInputElement
        ).value;
        const status = (
          document.getElementById("task-status") as HTMLSelectElement
        ).value;

        if (!name) {
          Swal.showValidationMessage("Please enter a task name");
        }

        return {
          name,
          description,
          dueDate,
          status,
        } as Partial<Task>;
      },
      confirmButtonText: "Update Task",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#941b0f",
      cancelButtonColor: "#d33",
      customClass: {
        popup: styles.customPopup,
        confirmButton: styles.customConfirmButton,
        cancelButton: styles.customCancelButton,
        actions: styles.customButtonContainer,
      },
    });

    if (formValues) {
      editTask(task.id, formValues);
      MySwal.fire({
        title: "Updated!",
        text: "Your task has been successfully updated.",
        icon: "success",
        confirmButtonColor: "#941b0f",
        customClass: {
          confirmButton: styles.customOkButton,
        },
      });
    }
  };

  return (
    <div className={styles.actions}>
      <button className={styles.iconButton} onClick={handleEdit}>
        <FiEdit /> {/* Edit Icon */}
      </button>
      <button className={styles.iconButton} onClick={handleDelete}>
        <HiOutlineTrash /> {/* Trash Icon */}
      </button>
    </div>
  );
};

export default ActionButton;
