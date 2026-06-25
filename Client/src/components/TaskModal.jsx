import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const parseToIsoDateTime = (value) => {
  if (!value) return "";
  const text = String(value).trim();

  const parsed = new Date(text);
  if (!isNaN(parsed)) {
    return parsed.toISOString().slice(0, 16);
  }

  const slashDate = text.match(/^(\d{1,2})[\-/](\d{1,2})[\-/](\d{4})(?:[ T](\d{1,2}):(\d{2}))?$/);
  if (slashDate) {
    const [_, a, b, year, hour = "09", minute = "00"] = slashDate;
    const date = new Date(`${year}-${a.padStart(2, "0")}-${b.padStart(2, "0")}T${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00Z`);
    if (!isNaN(date)) {
      return date.toISOString().slice(0, 16);
    }
  }

  return "";
};

const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  task,
  boardId,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    estimatedHours: "",
  });

  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? parseToIsoDate(task.dueDate) : "",
        estimatedHours: task.estimatedHours || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        estimatedHours: "",
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getEstimate = async () => {
    try {
      const fallbackDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      if (!formData.title.trim() && !formData.description.trim()) {
        setFormData((prev) => ({
          ...prev,
          estimatedHours: 8,
          dueDate: fallbackDate,
        }));
        toast("Please add task details for a better AI estimate. Using a default 7-day estimate.");
        return;
      }

      setLoadingAI(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/ai/estimate`,
        {
          title: formData.title,
          description: formData.description,
        },
        {
          withCredentials: true,
        }
      );

      setFormData((prev) => ({
        ...prev,
        estimatedHours: data.estimatedHours || 8,
        dueDate: parseToIsoDateTime(data.suggestedDueDateTime || data.suggestedDueDate) || fallbackDate,
      }));
      toast.success("AI estimate generated!");
    } catch (error) {
      toast.error("Failed to generate AI estimate");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      board: boardId,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{width: '450px'}}>
        <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px'}}>
          {task ? "Edit Task" : "Create Task"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            style={{width: '100%', marginBottom: '12px'}}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={{width: '100%', marginBottom: '12px'}}
            rows="4"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={{width: '100%', marginBottom: '12px'}}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="datetime-local"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            style={{width: '100%', marginBottom: '12px'}}
          />

          <input
            type="number"
            name="estimatedHours"
            placeholder="Estimated Hours"
            value={formData.estimatedHours}
            onChange={handleChange}
            style={{width: '100%', marginBottom: '12px'}}
          />

          <button
            type="button"
            onClick={getEstimate}
            className="btn"
            style={{width: '100%', marginBottom: '12px'}}
          >
            {loadingAI ? "Generating..." : "AI Estimate"}
          </button>

          <div className="form-actions">
            <button
              type="submit"
              className="btn"
              style={{flex: 1}}
            >
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
              style={{flex: 1}}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;