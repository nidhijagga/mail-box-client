import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <Nav bg="dark" variant="dark"> {/* Adding a dark navigation bar */}
        <Nav.Item>
          <Link to="/sentbox" className="nav-link">Sentbox</Link> {/* Adding a link to "sentbox" */}
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Header;
