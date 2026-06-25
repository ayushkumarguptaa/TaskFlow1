import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const BoardDetails = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/tasks/board/${id}`,
        {
          withCredentials: true,
        }
      );

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const createTask = async (taskData) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/tasks`,
        taskData,
        {
          withCredentials: true,
        }
      );
      toast.success("Task Created");
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  const updateTask = async (taskData) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/user/tasks/${selectedTask._id}`,
        taskData,
        {
          withCredentials: true,
        }
      );
      toast.success("Task Updated");
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/tasks/${taskId}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Task Deleted");
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/tasks/${taskId}/status`,
        {
          status: newStatus,
        },
        {
          withCredentials: true,
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const todo = tasks.filter((task) => task.status === "todo");
  const inprogress = tasks.filter((task) => task.status === "inprogress");
  const done = tasks.filter((task) => task.status === "done");

  return (
    <>
      <Navbar />

      <main className="page-shell">
        <section className="page-header">
          <div>
            <p className="eyebrow">Kanban Board</p>
            <h1 className="page-title">Board Tasks</h1>
            <p className="page-description">Drag tasks between columns to organize work and keep every delivery on track.</p>
          </div>

          <button
            onClick={() => {
              setSelectedTask(null);
              setOpenModal(true);
            }}
            className="btn btn-primary"
          >
            Create Task
          </button>
        </section>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban-grid">
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="status-column mb-4"
                >
                  <h2>To Do ({todo.length})</h2>

                  <div style={{flex: 1, overflowY: 'auto', paddingRight: '8px'}}>
                    <div className="status-column-list">
                      {todo.map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-row"
                              style={provided.draggableProps.style}
                            >
                              <TaskCard
                                task={task}
                                onEdit={() => {
                                  setSelectedTask(task);
                                  setOpenModal(true);
                                }}
                                onDelete={deleteTask}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  </div>
                </div>
              )}
            </Droppable>

            <Droppable droppableId="inprogress">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="status-column"
                >
                  <h2>In Progress ({inprogress.length})</h2>

                  <div className="status-column-list">
                    {inprogress.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-row"
                            style={provided.draggableProps.style}
                          >
                            <TaskCard
                              task={task}
                              onEdit={() => {
                                setSelectedTask(task);
                                setOpenModal(true);
                              }}
                              onDelete={deleteTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>

            <Droppable droppableId="done">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="status-column"
                >
                  <h2>Done ({done.length})</h2>

                  <div className="status-column-list">
                    {done.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-row"
                            style={provided.draggableProps.style}
                          >
                            <TaskCard
                              task={task}
                              onEdit={() => {
                                setSelectedTask(task);
                                setOpenModal(true);
                              }}
                              onDelete={deleteTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </main>

      <TaskModal
        isOpen={openModal}
        task={selectedTask}
        boardId={id}
        onClose={() => setOpenModal(false)}
        onSubmit={selectedTask ? updateTask : createTask}
      />
    </>
  );
};

export default BoardDetails;