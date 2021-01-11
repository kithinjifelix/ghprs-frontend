import SourceLink from 'components/SourceLink';
import React from 'react';
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdRadioButtonChecked,
  MdWeb,
  MdLink,
  MdExtension,
  MdFileUpload,
  MdFileDownload,
  MdDone,
  MdFace,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { authentication } from '../../_services/authentication';

let navTemplates = [];
if (authentication.currentRole === 'Administrator') {
  navTemplates = [
    { to: '/initialize-Template', name: 'Initialize', exact: true, Icon: MdExtension },
    { to: '/download-Template', name: 'Downloads', exact: true, Icon: MdFileDownload },
    //{ to: '/upload-Template', name: 'Submit Data', exact: true, Icon: MdFileUpload },
    { to: '/review', name: 'Review Data Submissions', exact: true, Icon: MdDone },
  ];
} else if (authentication.currentRole === 'User') {
  navTemplates = [
    { to: '/upload-Template', name: 'Submit Data', exact: true, Icon: MdFileUpload },
    { to: '/download-Template', name: 'Downloads', exact: true, Icon: MdFileDownload },
  ];
}

const navAdmin = [
  { to: '/users', name: 'Users', exact: false, Icon: MdFace },
];

const navComponents = [
  { to: '/', name: 'Document Manager', exact: false, Icon: MdRadioButtonChecked },
  { to: 'https://www.datim.org/dhis', name: 'DATIM', exact: true, Icon: MdRadioButtonChecked },
  { to: 'https://pepfar-panorama.org/', name: 'Panaroma Dashboard', exact: false, Icon: MdRadioButtonChecked },
  { to: 'https://sites.google.com/a/usaid.gov/gh-oha/home/reports-resources/quarterly-reporting-guidance-and-resources', name: 'OHA Dashboard', exact: false, Icon: MdRadioButtonChecked },
  { to: 'https://www.pepfar.net/OGAC-HQ/icpi/Products/Forms/AllItems.aspx', name: 'Partner Performance Report', exact: false, Icon: MdRadioButtonChecked },
  { to: 'http://hmis.reachproject.or.tz/MonthlyReporting/', name: 'Monthly Portal', exact: false, Icon: MdRadioButtonChecked },
  { to: 'https://usaidtanzaniaiprs.com/index.cfm', name: 'IP Reporting System', exact: false, Icon: MdRadioButtonChecked },
  { to: 'https://statcompiler.com/en/', name: 'STAT Compiler', exact: false, Icon: MdRadioButtonChecked },
  { to: 'https://data.unicef.org/', name: 'UNICEF (MICS)', exact: false, Icon: MdRadioButtonChecked },
  { to: 'http://apps.who.int/gho/data/node.home', name: 'Global Health Data ', exact: false, Icon: MdRadioButtonChecked },
  { to: 'https://data.worldbank.org/', name: 'World Bank', exact: false, Icon: MdRadioButtonChecked },
  { to: 'http://datatopics.worldbank.org/sdi/', name: 'World Bank Service Delivery Indicators', exact: false, Icon: MdRadioButtonChecked },
  { to: '/Observatory', name: 'WHO Global Health Observatory', exact: false, Icon: MdRadioButtonChecked },
];

const navItems = [
  { to: '/', name: 'Dashboard', exact: true, Icon: MdDashboard },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenLinks: false,
    isOpenTemplates: false,
    isOpenAdmin: false,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()}>
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <span className="text-white">GHPRS</span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Templates')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdWeb className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Templates</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenTemplates
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenTemplates}>
              {navTemplates.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {(authentication.currentRole === 'Administrator') && (<NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Admin')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdWeb className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Admin</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenAdmin
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>)}
            <Collapse isOpen={this.state.isOpenAdmin}>
              {navAdmin.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Links')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdLink className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Links</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenLinks
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenLinks}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <a
                    href={to} target="_blank" rel="noopener noreferrer"
                    id={`navItem-${name}-${index}`}
                    style={{colour: '#ffff !important;'}}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </a>
                </NavItem>
              ))}
            </Collapse>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
