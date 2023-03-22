import styled from "styled-components";
import { FunctionComponent, Dispatch } from "react";
import { connect } from "react-redux";
import { UserInfoPageContainerLogic } from "./userInfoContainer.hook";
import { State } from "../../model/state";
import { Spinner } from "react-bootstrap";
import { LoadingState } from "../../model/loadingState";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { saveUserInfo } from "../../store/saveUserInfo.slice";
import NavigationBar from "../../layout/navigationBar";
import { SaveUserInfo, UserInfo } from "../../model/userInfo";

const UserInfoPageContainerWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-grow: 1;
  margin-top: 1rem;
  justify-content: center;
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SpinnerComponent = styled.div`
  display: flex;
  justify-content: center;
`;

export interface IUserInfoPageContainerProps {
  saveUserInfo: typeof saveUserInfo;
  saveUserInfoResponse: State<SaveUserInfo>;
}

const UserInfoPageContainer: FunctionComponent<IUserInfoPageContainerProps> & {
  defaultProps: Partial<IUserInfoPageContainerProps>;
} = ({ saveUserInfo, saveUserInfoResponse }: IUserInfoPageContainerProps) => {
  const {
    fullName,
    userName,
    passcode,
    email,
    password,
    handleOnTickerOnChange,
    handleCompanyNameChange,
    handleOnInitialPriceChange,
    handleSubmit,
    handleOnEmailChange,
    handleOnPasswordChange,
  } = UserInfoPageContainerLogic({
    saveUserInfo,
    saveUserInfoResponse,
  } as IUserInfoPageContainerProps);
  return (
    <UserInfoPageContainerWrapper>
      <VerticalContainer>
        <SpinnerComponent>
          {saveUserInfoResponse.loading === LoadingState.Pending ? (
            <Spinner animation="border" variant="info" />
          ) : (
            <div></div>
          )}
        </SpinnerComponent>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={userName}
            type="input"
            placeholder="johnsmith"
            required
            onChange={handleCompanyNameChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email </Form.Label>
          <Form.Control
            value={email}
            type="email"
            placeholder="johnsmith@gmail.com"
            required
            onChange={handleOnEmailChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            type="password"
            placeholder=""
            required
            onChange={handleOnPasswordChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>Full Name </Form.Label>
          <Form.Control
            value={fullName}
            type="input"
            placeholder="John Smith"
            required
            onChange={handleOnTickerOnChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPasscode">
          <Form.Label>Admin Passcode</Form.Label>
          <Form.Control
            value={passcode}
            type="input"
            placeholder="000"
            required
            onChange={handleOnInitialPriceChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Sign Up
        </Button>
        {saveUserInfoResponse.error ? (
          <Alert key={"danger"} variant={"danger"}>
            Error saving User Information. Please try again!
          </Alert>
        ) : (
          <div></div>
        )}
      </VerticalContainer>
    </UserInfoPageContainerWrapper>
  );
};

UserInfoPageContainer.defaultProps = {};

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

export default connect<StateToPropsType, DispatchToPropsType>(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoPageContainer);
