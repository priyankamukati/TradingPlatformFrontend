import { Amplify, Auth } from "aws-amplify";

import Alert from "react-bootstrap/Alert";
import {
  Authenticator,
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate } from "react-router-dom";

import config from "../../aws-exports-new";
import { Dispatch, FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { SaveUserInfo, UserInfo } from "../../model/userInfo";
import { saveUserInfo } from "../../store/saveUserInfo.slice";
import { State } from "../../model/state";
import { LoadingState } from "../../model/loadingState";
Amplify.configure(config);

interface ILoginContainerProps extends WithAuthenticatorProps {
  saveUserInfo: typeof saveUserInfo;
  saveUserInfoResponse: State<SaveUserInfo>;
}

const LoginContainer: FunctionComponent<ILoginContainerProps> & {
  defaultProps: Partial<ILoginContainerProps>;
} = ({
  signOut,
  user,
  saveUserInfo,
  saveUserInfoResponse,
}: ILoginContainerProps) => {
  const navigate = useNavigate();

  const services = {
    async handleSignUp(formData: any) {
      let { username, password, attributes } = formData;
      // custom username
      username = username.toLowerCase();
      attributes.email = attributes.email.toLowerCase();

      return Auth.signUp({
        username,
        password,
        attributes,
        autoSignIn: {
          enabled: true,
        },
      });
    },
  };

  useEffect(() => {
    if (user) {
      const userInfo = new UserInfo();
      userInfo.full_name = user.attributes?.name;
      userInfo.username = user.attributes?.preferred_username;
      userInfo.passcode = user.attributes?.nickname;
      userInfo.email = user.attributes?.email;
      saveUserInfo(userInfo);
    }
  }, [user]);

  useEffect(() => {
    if (saveUserInfoResponse.error) {
      // error stuff
    } else if (
      saveUserInfoResponse &&
      saveUserInfoResponse.loading == LoadingState.Idle
    ) {
      localStorage.setItem("user_type", saveUserInfoResponse?.data?.type ?? "");

      if (saveUserInfoResponse.data?.type == "admin") {
        //  navigate('/admin')
      } else {
        // navigate('/userorder')
      }
    }
  }, [saveUserInfoResponse]);

  return (
    <div>
      {saveUserInfoResponse.error ? (
        <Alert key={"success"} variant={"danger"}>
          Error getting user info records
        </Alert>
      ) : (
        <div></div>
      )}
      <Authenticator services={services} initialState="signUp">
        {({ signOut }) => <button onClick={signOut}>Sign out</button>}
      </Authenticator>
      <div>Welcome, {user?.attributes?.name}</div>
    </div>
  );
};

LoginContainer.defaultProps = {};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    saveUserInfo: (saveUserInfoRequest: UserInfo) =>
      dispatch(saveUserInfo(saveUserInfoRequest)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    saveUserInfoResponse: state.saveUserInfoReducer,
  };
};

type StateToPropsType = ReturnType<typeof mapStateToProps>;
type DispatchToPropsType = typeof mapDispatchToProps;

export default withAuthenticator(
  connect<StateToPropsType, DispatchToPropsType>(
    mapStateToProps,
    mapDispatchToProps
  )(LoginContainer)
);
