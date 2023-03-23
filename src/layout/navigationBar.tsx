import styled from "styled-components";
import { FunctionComponent, useEffect } from "react";
import { Auth } from "aws-amplify";
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  width: 100%;
  background:black;
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HorizontallyContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export interface INavigationBarProps extends WithAuthenticatorProps {}

const NavigationBar: FunctionComponent<INavigationBarProps> = ({
  signOut,
  user,
}: INavigationBarProps) => {
  const GetSignInInfo = async () => {
    try {
      const response = await Auth.currentSession();
      let accessToken = response.getAccessToken();
      const access_token = accessToken.getJwtToken();
    } catch (err) {
      console.log("are you signed in? " + err);
      // Auth.federatedSignIn()
    }
  };

  useEffect(() => {
    GetSignInInfo();
  }, []);

  const navigate = useNavigate();

  return (
    <NavBarContainer>
      <HorizontallyContainer>
      <Navbar fixed="top" expand="lg"  bg="primary" variant="dark">
          <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/portfolio">Portfolio</Nav.Link>
            <Nav.Link href="/order">Order History</Nav.Link>
            <Nav.Link href="/myaccount">Account</Nav.Link>
          </Nav>
          <Button variant="primary" type="submit" onClick={()=> {signOut && signOut(); navigate('/');}}>
              LogOut
          </Button>
      </Navbar>
      </HorizontallyContainer>

    </NavBarContainer>
  );
};

export default withAuthenticator(NavigationBar, { hideSignUp: true } );
