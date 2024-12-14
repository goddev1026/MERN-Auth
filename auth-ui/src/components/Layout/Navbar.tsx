import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap-v5";

import { useAuth } from "../../store";

export const MainNavbar: React.FC = () => {
  const { accessToken: isLoggedIn, isAdmin, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <Navbar fixed="top" bg="light">
      <Container fluid>
        <Navbar.Brand>
          <Link className="text-dark text-decoration-none" to="/">
            URL Metadata
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="d-flex align-items-center ms-auto">
            {isLoggedIn && (
              <Link className="text-dark text-decoration-none me-3" to="/">
                Preview
              </Link>
            )}
            {isAdmin && (
              <Link className="text-dark text-decoration-none me-3" to="/log">
                Logs
              </Link>
            )}
            {!pathname.startsWith("/auth") && (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
