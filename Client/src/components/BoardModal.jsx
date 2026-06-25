import { useEffect, useState } from "react";

const BoardModal = ({
  isOpen,
  onClose,
  onSubmit,
  board,
}) => {
  const [title, setTitle] = useState(board?.title || "");
  const [description, setDescription] = useState(board?.description || "");

  useEffect(() => {
    setTitle(board?.title || "");
    setDescription(board?.description || "");
  }, [board]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{width: '450px'}}>
        <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px'}}>
          {board ? "Edit Board" : "Create Board"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Board Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{width: '100%', marginBottom: '12px'}}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{width: '100%', marginBottom: '12px'}}
            rows="4"
          />

          <div style={{display: 'flex', gap: '12px'}}>
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

export default BoardModal;