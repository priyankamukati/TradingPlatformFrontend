import styled from "styled-components";
import { FunctionComponent, useEffect } from "react";
import { Auth } from "aws-amplify";
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";

const AdminHomePageContainerWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  margin-top: 1rem;
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HorizontallyCenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-grow: 1;
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

  return (
    <AdminHomePageContainerWrapper>
      <HorizontallyCenterContainer>
        <VerticalContainer>
          <button onClick={signOut}>Sign out</button>
        </VerticalContainer>
      </HorizontallyCenterContainer>
    </AdminHomePageContainerWrapper>
  );
};

export default NavigationBar;
