import React from 'react';
import { connect } from "react-redux";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdWeb,
  MdLink,
  MdExtension,
  MdFileUpload,
  MdFileDownload,
  MdDone,
  MdViewList,
  MdSettings,
  MdReceipt,
  MdExitToApp
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
import * as ACTION_TYPES from "../../actions/types";
import { links } from "../../actions/links";

let navTemplates = [];
if (authentication.currentRole === 'Administrator') {
  navTemplates = [
    { to: '/initialize-Template', name: 'Initialize', exact: true, Icon: MdExtension },
    { to: '/download-Template', name: 'Downloads', exact: true, Icon: MdFileDownload },
    { to: '/review', name: 'Review', exact: true, Icon: MdDone },
    { to: '/upload-Template', name: 'Submit', exact: true, Icon: MdFileUpload },
    { to: '/upload-MER', name: 'Data Upload', exact: true, Icon: MdFileUpload },
    { to: '/files-upload', name: 'Data Uploads', exact: true, Icon: MdViewList }
  ];
} else if (authentication.currentRole === 'User') {
  navTemplates = [
    { to: '/upload-Template', name: 'Submit', exact: true, Icon: MdFileUpload },
    { to: '/upload-MER', name: 'Data Upload', exact: true, Icon: MdFileUpload },
    { to: '/submissions', name: 'Submissions', exact: true, Icon: MdViewList },
    { to: '/download-Template', name: 'Downloads', exact: true, Icon: MdFileDownload },
    { to: '/upload-MER', name: 'Data Upload', exact: true, Icon: MdFileUpload },
    { to: '/files-upload', name: 'Data Uploads', exact: true, Icon: MdViewList }
  ];
}

const navItems = [
  { to: '/', name: 'Home', exact: false, Icon: MdDashboard },
  { to: '/dashboards', name: 'Dashboards', exact: false, Icon: MdWeb },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {

  componentDidMount() {
    this.props.fetchExternalLinks("external", ACTION_TYPES.LINK_EXTERNAL);
    this.props.fetchDashboardLinks("dashboard", ACTION_TYPES.LINK_DASHBOARDS);
  }

  state = {
    isOpenLinks: false,
    isOpenTemplates: false,
    isOpenDashboards: false,
    isOpenAdmin: false,
    externalLinks: [],
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];
      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  logout = () => {
    authentication.logout();
  }

  render() {
    return (
      <aside className={bem.b()}>
        <div className={bem.e('content')}>
          <Navbar style={{ backgroundColor: "#fff" }}>
            <BSNavLink href="/" className="navbar-brand d-flex" style={{ padding: "0rem" }}>
              <img src={'./logo-tz.png'} alt="USAID Tanzania Data Portal" width="100%"/>
            </BSNavLink>

          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  tag={NavLink}
                  to={to}
                  activeClassName=""
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
              <BSNavLink className={`${bem.e('nav-item-collapse')}`}>
                <div className="d-flex">
                  <MdReceipt className={bem.e('nav-item-icon')} />
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
                <NavItem key={index} className={bem.e('nav-item-sub')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    tag={NavLink}
                    to={to}
                    activeClassName=""
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            {(authentication.currentRole === 'Administrator') && (<NavItem className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-resources`}
                  tag={NavLink}
                  to="/administration"
                  activeClassName=""
                  exact={true}
                >
                  <MdSettings className={bem.e('nav-item-icon')} />
                  <span className="">Administration</span>
                </BSNavLink>
            </NavItem>)}
            <NavItem className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-resources`}
                  tag={NavLink}
                  to="/resources"
                  activeClassName=""
                  exact={true}
                >
                  <MdLink className={bem.e('nav-item-icon')} />
                  <span className="">Resources</span>
                </BSNavLink>
              </NavItem>
              <hr className="my-12"/>
              <NavItem className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-resources`}
                  tag={NavLink}
                  to="/login"
                  onClick={this.logout}
                  exact={true}
                >
                  <MdExitToApp className={bem.e('nav-item-icon')} />
                  <span className="">Signout</span>
                </BSNavLink>
              </NavItem>
          </Nav>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    externalLinks: state.links.external,
    dashboards: state.links.dashboards,
  };
};

const mapActionToProps = {
  fetchExternalLinks: links,
  fetchDashboardLinks: links,
};

export default connect(mapStateToProps, mapActionToProps)(Sidebar);
