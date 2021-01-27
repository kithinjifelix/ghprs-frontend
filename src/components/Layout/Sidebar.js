import SourceLink from 'components/SourceLink';
import React from 'react';
import { connect } from "react-redux";
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
  MdViewList,
  MdSettings,
  MdReceipt,
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
    //{ to: '/upload-Template', name: 'Submit Data', exact: true, Icon: MdFileUpload },
    { to: '/review', name: 'Review Data Submissions', exact: true, Icon: MdDone },
  ];
} else if (authentication.currentRole === 'User') {
  navTemplates = [
    { to: '/upload-Template', name: 'Submit Data', exact: true, Icon: MdFileUpload },
    { to: '/submissions', name: 'View Submissions', exact: true, Icon: MdViewList },
    { to: '/download-Template', name: 'Downloads', exact: true, Icon: MdFileDownload },
  ];
}

const navAdmin = [
  { to: '/users', name: 'Users', exact: false, Icon: MdFace },
  { to: '/links', name: 'Links', exact: false, Icon: MdLink },
];

const navItems = [
  { to: '/', name: 'Home', exact: true, Icon: MdDashboard },
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
              onClick={this.handleClick('Dashboards')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdWeb className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Dashboards</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenDashboards
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenDashboards}>
              {this.props.dashboards.map(({ url, name, number, key }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={`/dashboard?url=${url}&key=${key}&number=${number}`}
                    activeClassName="active"
                    exact={true}
                  >
                    <MdRadioButtonChecked className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Templates')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
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
                  <MdSettings className={bem.e('nav-item-icon')} />
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
              {this.props.externalLinks.map(({ url, name }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <a
                    className="nav-link"
                    href={url} target="_blank" rel="noopener noreferrer"
                    id={`navItem-${name}-${index}`}
                  >
                    <MdRadioButtonChecked className={bem.e('nav-item-icon')} />
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
