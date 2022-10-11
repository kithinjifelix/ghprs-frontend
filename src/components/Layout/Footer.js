import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { MdHelpOutline } from 'react-icons/md';
import bn from 'utils/bemnames';

const bem = bn.create('footer');

const Footer = () => {
  return (
    <Navbar className="fixed-bottom navbar-light bg-light">
      <Nav navbar>
        <NavItem>
          USAID Tanzania Data Portal - {new Date().getFullYear()}
        </NavItem>
      </Nav>
      <Nav navbar className={bem.e('nav-right')}>
        <a href="https://thepalladiumgroup.atlassian.net/servicedesk/customer/portal/21" target="_blank" rel="noopener noreferrer">< MdHelpOutline/>Help</a>
      </Nav>
    </Navbar>
  );
};

export default Footer;
