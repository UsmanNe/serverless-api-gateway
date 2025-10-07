import { Container, Navbar, Button } from "react-bootstrap";
import { List } from "react-bootstrap-icons";

export default function Header({ onSidebarToggle }) {
  return (
    <Navbar bg="light" expand="lg" className="app-header border-bottom">
      <Container fluid>
        <Button
          variant="light"
          className="d-lg-none me-2"
          onClick={onSidebarToggle}
        >
          <List size={20} /> Menu
        </Button>

        <Navbar.Brand href="#home" className="fw-bold header-icon">
          Crazy Fitness GYM
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
