import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import BoardCard from "../components/BoardCard";
import BoardModal from "../components/BoardModal";

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [stats, setStats] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const fetchBoards = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/boards`,
      { withCredentials: true }
    );
    setBoards(data);
  };

  const fetchStats = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/dashboard`,
      { withCredentials: true }
    );
    setStats(data);
  };

  useEffect(() => {
    fetchBoards();
    fetchStats();
  }, []);

  const createBoard = async (boardData) => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/user/boards`,
      boardData,
      { withCredentials: true }
    );
    toast.success("Board Created Successfully");
    fetchBoards();
  };

  const updateBoard = async (boardData) => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/user/boards/${selectedBoard._id}`,
      boardData,
      { withCredentials: true }
    );
    toast.success("Board Updated Successfully");
    fetchBoards();
  };

  const deleteBoard = async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/user/boards/${id}`,
      { withCredentials: true }
    );
    toast.success("Board Deleted Successfully");
    fetchBoards();
  };

  return (
    <>
      <Navbar />

      <main className="page-shell">
        <section className="page-header">
          <div>
            <p className="eyebrow">Project Workspace</p>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-description">Manage boards, review progress, and create new plans with confidence.</p>
          </div>

          <button
            onClick={() => {
              setSelectedBoard(null);
              setOpenModal(true);
            }}
            className="btn btn-primary"
          >
            Create Board
          </button>
        </section>

        {stats && (
          <section className="stats-grid">
            <div className="card stat-card">
              <p className="stat-label">Total Boards</p>
              <p className="stat-number">{stats.totalBoards}</p>
            </div>
            <div className="card stat-card">
              <p className="stat-label">Total Tasks</p>
              <p className="stat-number">{stats.totalTasks}</p>
            </div>
            <div className="card stat-card">
              <p className="stat-label">Completed</p>
              <p className="stat-number">{stats.completedTasks}</p>
            </div>
            <div className="card stat-card">
              <p className="stat-label">Pending</p>
              <p className="stat-number">{stats.pendingTasks}</p>
            </div>
          </section>
        )}

        <section className="board-grid">
          {boards.length === 0 ? (
            <div className="card empty-card">
              <h3>No boards yet</h3>
              <p className="muted">Create your first project board to get started. Boards group related tasks and help track progress across stages.</p>
              <button
                onClick={() => {
                  setSelectedBoard(null);
                  setOpenModal(true);
                }}
                className="btn btn-primary"
              >
                Create Board
              </button>
            </div>
          ) : (
            boards.map((board) => (
              <BoardCard
                key={board._id}
                board={board}
                onDelete={deleteBoard}
                onEdit={() => {
                  setSelectedBoard(board);
                  setOpenModal(true);
                }}
              />
            ))
          )}
        </section>
      </main>

      <BoardModal
        isOpen={openModal}
        board={selectedBoard}
        onClose={() => setOpenModal(false)}
        onSubmit={selectedBoard ? updateBoard : createBoard}
      />
    </>
  );
};

export default Dashboard;