"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import tasksData from "../Assets/TaskData.json";

export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  editTask: (id: number, updatedTask: Task) => void;
  deleteTask: (id: number) => void;
  filterTasks: (priority: string, status: string) => void;
  setSearch: (query: string) => void;
  updateSortOrder: (order: "asc" | "desc" | "default") => void;
}

// Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Custom hook for using the TaskContext
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

// TaskProvider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasksData);
  const [originalTasks] = useState<Task[]>(tasksData); // Keep track of original tasks order
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    "default"
  );

  // Function to update the filteredTasks based on the filters, search query, and sort order
  const updateFilteredTasks = () => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply priority filter
    if (priorityFilter) {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    // Apply sorting order (asc or desc)
    if (sortOrder === "asc") {
      filtered.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    } else if (sortOrder === "desc") {
      filtered.sort(
        (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      );
    }

    setFilteredTasks(filtered); // Update filtered tasks with combined logic
  };

  // Trigger filtering logic whenever tasks, filters, search query, or sort order change
  useEffect(() => {
    updateFilteredTasks();
  }, [tasks, searchQuery, priorityFilter, statusFilter, sortOrder]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const editTask = (id: number, updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // This function filters tasks based on priority and status.
  const filterTasks = (priority: string, status: string) => {
    setPriorityFilter(priority);
    setStatusFilter(status);
  };

  // This function updates the sort order.
  const updateSortOrder = (order: "asc" | "desc" | "default") => {
    if (order === "default") {
      // Reset filteredTasks to the original task order (unsorted)
      setFilteredTasks([...originalTasks]);
    } else {
      setSortOrder(order);
    }
  };

  const setSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        setTasks,
        setFilteredTasks,
        addTask,
        editTask,
        deleteTask,
        filterTasks,
        setSearch,
        updateSortOrder, // Handle sort order changes
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
