import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import bn from 'utils/bemnames';

const bem = bn.create('footer');

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          USAID Tanzania Data Portal - {new Date().getFullYear()}
        </NavItem>
      </Nav>
      <Nav navbar className={bem.e('nav-right')}>
        <a href="https://thepalladiumgroup.atlassian.net/servicedesk/customer/portal/21" target="_blank" rel="noopener noreferrer">Help</a>
      </Nav>
    </Navbar>
  );
};

export default Footer;
