import {Container, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios'

const Header = ({ userData, setUserData, setIsUserLoggedIn, isUserLoggedIn }) => {

  const logoutUser = async () => {
    try {
      const res = await Axios({
        method: 'get',
        url: 'api/auth/logout',
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        }
      })
      if(res.status === 200){
        setUserData({})
        setIsUserLoggedIn(false)
      }

    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  }

  const getUser = async () => {
    try {
      const res = await Axios({
        method: 'get',
        url: 'api/auth/user',
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        }
      })
      console.log(res);
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  }

  

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">HMS 2</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            { isUserLoggedIn && ( <button className="btn nav-link" onClick={logoutUser}>Logout</button> ) }
          </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;