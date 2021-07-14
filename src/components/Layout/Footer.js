import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          USAID Tanzania Data Portal
          <div>
            <a href="https://thepalladiumgroup.atlassian.net/servicedesk/customer/portal/21" target="_blank" rel="noopener noreferrer">Help</a>
          </div>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
