import React from 'react';
import { withRouter } from "react-router-dom";
import {
  MdClearAll,
} from 'react-icons/md';
import {
  Button,
  Nav,
  Navbar,
  NavItem,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { authentication } from "../../_services/authentication";

const bem = bn.create('header');
class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };


  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  logout = () => {
    authentication.logout();
    this.props.history.push('/login')
  }
  componentDidMount() {
  }
  render() {
    return (
      <Navbar light expand className={`${bem.b('bg-white')}`}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
          <NavItem  style={{ width: "24%" }} >
          <img src={'./USAID-Logo.png'} className="img-fluid" alt="USAIDlogo" />
          </NavItem>
        </Nav>
        <Nav navbar className={bem.e('nav-right')}>
          <NavItem  style={{ width: "60%" }}>
            <img src={'./DataFI.png'} className="img-fluid" alt="DataFIlogo" />
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}


export default withRouter(Header);
