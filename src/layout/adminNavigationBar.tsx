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
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HorizontallyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-grow: 1;
`;

export interface IAdminNavigationBarProps extends WithAuthenticatorProps {}

const AdminNavigationBar: FunctionComponent<IAdminNavigationBarProps> = ({
  signOut,
  user,
}: IAdminNavigationBarProps) => {
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
      <HorizontallyContainer>
          <Button variant="primary" type="submit" onClick={()=> {signOut && signOut(); navigate('/');}}>
              LogOut
          </Button>
          </HorizontallyContainer>
      </Navbar>
      </HorizontallyContainer>

    </NavBarContainer>
  );
};

export default withAuthenticator(AdminNavigationBar, { hideSignUp: true });
