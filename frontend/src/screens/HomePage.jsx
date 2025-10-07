import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { trackPromiseWithToast } from "../utils/toast";
import { api } from "../api";
import UserList from "../components/UserList";
import EditModal from "../components/EditModal";
import UserForm from "../components/UserForm";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.listUsers();
      setUsers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (payload) => {
    setError("");
    try {
      const created = await trackPromiseWithToast(api.createUser(payload), {
        pending: `Creating user ${payload.userName}...`,
        success: `${payload.userName} created successfully!`,
        error: (err) => `Creation failed: ${err.message}`,
      });
      setUsers((prev) => [created, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => {
    const user = users.find((u) => u.userId === id);
    if (user) {
      setDeletingUser(user);
    }
  };

  const handleConfirmDelete = async (id) => {
    setError("");
    const userName = deletingUser ? deletingUser.userName : "User";
    setLoading(true);
    try {
      await trackPromiseWithToast(api.deleteUser(id), {
        pending: `Deleting ${userName}...`,
        success: `${userName} deleted successfully.`,
        error: (err) => `Deletion failed: ${err.message}`,
      });
      setUsers((prev) => prev.filter((u) => u.userId !== id));
      setDeletingUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, payload) => {
    setError("");
    try {
      const updated = await trackPromiseWithToast(api.updateUser(id, payload), {
        pending: `Updating ${payload.userName || "user"}...`,
        success: `${payload.userName || "User"} updated successfully.`,
        error: (err) => `Update failed: ${err.message}`,
      });
      setUsers((prev) => prev.map((u) => (u.userId === id ? updated : u)));
      setEditingUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefresh = () => loadUsers();

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" />
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h1 className="h3">Crazy Gym Fitness</h1>
          <p className="text-muted mb-0">
            Manage your gym users and memberships seamlessly
          </p>
        </div>

        <div className="mt-3 mt-md-0">
          <small className="text-muted"></small>
        </div>
      </header>
      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between">
                <span>Users</span>
                <small className="text-muted">
                  {loading ? "Loading..." : `${users.length} users`}
                </small>
              </h5>
              {error && console.log(error)}
              <UserList
                users={users}
                onDelete={handleDelete}
                onEdit={(user) => setEditingUser(user)}
                onRefresh={handleRefresh}
                loading={loading}
                onAdd={() => setShowAddModal(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm onSubmit={handleCreate} loading={false} />
        </Modal.Body>
      </Modal>

      {editingUser && (
        <EditModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={(payload) => handleUpdate(editingUser.userId, payload)}
          loading={false}
        />
      )}

      {deletingUser && (
        <DeleteConfirmModal
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      )}
    </div>
  );
}
