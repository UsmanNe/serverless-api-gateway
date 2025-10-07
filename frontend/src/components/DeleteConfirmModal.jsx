import LoadingButton from "./LoadingButton";

export default function DeleteConfirmModal({
  user,
  onClose,
  onConfirm,
  loading,
}) {
  if (!user) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to delete user
              <strong> {user.userName}</strong>? This action cannot be undone.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <LoadingButton
              className="btn btn-danger"
              onClick={() => onConfirm(user.userId)}
              loading={loading}
            >
              Delete
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
