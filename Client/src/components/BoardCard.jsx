import { Link } from "react-router-dom";

const BoardCard = ({ board, onDelete, onEdit }) => {
  return (
    <div className="card">
      <h2 style={{fontSize: '18px', fontWeight: 'semibold'}}>{board.title}</h2>
      <p className="muted" style={{marginTop: '8px', fontSize: '14px'}}>{board.description}</p>

      <div style={{display: 'flex', gap: '8px', marginTop: '16px'}}>
        <Link
          to={`/boards/${board._id}`}
          className="btn"
        >
          Open
        </Link>

        <button
          onClick={() => onEdit(board)}
          className="btn-ghost"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(board._id)}
          className="btn-ghost"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BoardCard;