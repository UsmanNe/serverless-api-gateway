import { Table, ButtonGroup, Button, Badge } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

export default function UserList({ users, onDelete, onEdit, onAdd }) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center text-muted py-4">
        <Button onClick={onAdd} variant="dark" className="mb-3">
          + Add User
        </Button>
        <p>No users yet. Use the button above to add one.</p>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={onAdd} variant="dark">
          + Add User
        </Button>
      </div>

      <div className="table-responsive">
        <Table
          hover
          size="sm"
          className="align-middle mb-0"
          style={{ tableLayout: "fixed" }}
        >
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "120px" }} />
          </colgroup>

          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Membership Type</th>
              <th>Shift</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.userId}>
                <td className="text-truncate" title={u.userName}>
                  {u.userName}
                </td>
                <td className="text-truncate">
                  <Badge bg="secondary" className="fw-normal">
                    {u.userRole}
                  </Badge>
                </td>
                <td className="text-truncate">
                  <Badge bg="secondary" className="fw-normal">
                    {u.userMembershipType}
                  </Badge>
                </td>
                <td className="text-truncate">
                  <Badge bg="secondary" className="fw-normal">
                    {u.userShift}
                  </Badge>
                </td>
                <td className="text-center">
                  <ButtonGroup
                    size="sm"
                    aria-label="actions"
                    className="whitespace-nowrap"
                  >
                    <Button
                      variant="outline-primary"
                      onClick={() => onEdit(u)}
                      title="Edit"
                    >
                      <PencilSquare className="me-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => onDelete(u.userId)}
                      title="Delete"
                    >
                      <Trash className="me-1" />
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
