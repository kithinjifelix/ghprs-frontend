import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import React from 'react';
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import {
  MdClearAll,
  MdExitToApp,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { authentication } from "../../_services/authentication";

const bem = bn.create('header');
const currentUsername =  JSON.parse(localStorage.getItem('currentUser')) ? jwt_decode(JSON.parse(localStorage.getItem('currentUser')).token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] : '';
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

  logout = () =>{
    authentication.logout();
    this.props.history.push('/login')
  }
    componentDidMount(){
    }
  render() {
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <img src={'./USAID-Logo.png'}  style={{width:"250px"}} alt="USAIDlogo"/>

        <Nav navbar className={bem.e('nav-right')}>
        <img src={'./DataFI.png'}  alt="DataFIlogo"style={{width:"200px",paddingTop:"0px",paddingRight:"20px"}}/>
          <NavItem>
            <NavLink id="profile">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="profile"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  className="border-light"

                  style={{textAlign: "center"}}
                >
                   {currentUsername}
                  <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light"   onClick={this.logout} >
                      <MdExitToApp /> Signout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}


export default withRouter(Header);
