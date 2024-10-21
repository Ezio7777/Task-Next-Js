import { IoMdAdd } from "react-icons/io";
import { useTaskContext } from "../context/TaskContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styles from "../styles/AddTask.module.css"; // Import your custom styles for SweetAlert2

const MySwal = withReactContent(Swal);

const AddTask: React.FC = () => {
  const { addTask } = useTaskContext();

  const handleAddTask = async () => {
    const { value: formValues } = await MySwal.fire({
      title: "Add Task",
      html: `
        <label class="${styles.customLabel}" for="task-name">Title</label>
        <input id="task-name" class="swal2-input ${styles.customInput}" placeholder="Task Name" required>

        <label class="${styles.customLabel}" for="task-description">Description</label>
        <textarea id="task-description" class="swal2-textarea ${styles.customInput}" placeholder="Task Description"></textarea>

        <label class="${styles.customLabel}" for="task-due-date">Due Date</label>
        <input type="date" id="task-due-date" class="swal2-input ${styles.customInput}">

        <label class="${styles.customLabel}" for="task-priority">Priority</label>
        <select id="task-priority" class="swal2-select ${styles.customInput}">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label class="${styles.customLabel}" for="task-status">Status</label>
        <select id="task-status" class="swal2-select ${styles.customInput}">
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
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
        const priority = (
          document.getElementById("task-priority") as HTMLSelectElement
        ).value;
        const status = (
          document.getElementById("task-status") as HTMLSelectElement
        ).value;

        // Validation checks
        if (!name || !description || !dueDate) {
          Swal.showValidationMessage(
            "Please make sure the Name, Description, and Due Date are not empty."
          );
          return null;
        }

        return { name, description, dueDate, priority, status };
      },
      confirmButtonText: "Add Task",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#941b0f",
      cancelButtonColor: "#d33",
      customClass: {
        popup: styles.customPopup,
        confirmButton: styles.customConfirmButton,
        cancelButton: styles.customCancelButton,
        input: styles.customInput,
        actions: styles.customButtonContainer,
      },
    });

    if (formValues) {
      const newTask = {
        id: Date.now(),
        ...formValues,
      };

      addTask(newTask);
    }
  };

  return (
    <button onClick={handleAddTask} className={styles.addTaskButton}>
      <IoMdAdd /> Add Task
    </button>
  );
};

export default AddTask;
