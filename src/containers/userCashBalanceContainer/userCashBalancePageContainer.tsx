import styled from "styled-components";
import { FunctionComponent, Dispatch } from "react";
import { connect } from "react-redux";
import { UserCashBalancePageContainerLogic } from "./userCashBalancePageContainer.hook";
import { getUserCashBalance } from "../../store/getUserCashBalance.slice";
import { UserInfo } from "../../model/userInfo";
import { State } from "../../model/state";
import { Spinner } from "react-bootstrap";
import { LoadingState } from "../../model/loadingState";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { userInfo } from "os";
import { saveUserCashBalance } from "../../store/saveBalance.slice";
import { UpdateUserCashBalance } from "../../model/UpdateUserCashBalance";
import NavigationBar from "../../layout/navigationBar";

const UserCashBalancePageContainerWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  margin-top: 1rem;
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const HorizontallyCenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
`;

const GetStockContainer = styled.div`
  display: flex;
  height: 30rem;
  justify-content: center;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 2rem;
`;

const SaveStockContainer = styled.div`
  display: flex;
  margin-top: 5rem;
`;

const StockText = styled.div`
  display: flex;
  margin-left: 0.25rem;
  width: 10rem;
  font-size: 0.75rem;
`;

const SpinnerComponent = styled.div`
  display: flex;
  justify-content: center;
`;

export interface IUserCashBalancePageContainerProps {
  getUserCashBalance: typeof getUserCashBalance;
  getUserCashBalanceResponse: State<UserInfo>;

  saveUserCashBalance: typeof saveUserCashBalance;
  saveUserCashBalanceResponse: State<UpdateUserCashBalance>;
}

const UserCashBalancePageContainer: FunctionComponent<IUserCashBalancePageContainerProps> & {
  defaultProps: Partial<IUserCashBalancePageContainerProps>;
} = ({
  getUserCashBalance,
  getUserCashBalanceResponse,
  saveUserCashBalance,
  saveUserCashBalanceResponse,
}: IUserCashBalancePageContainerProps) => {
  console.log(
    "getUserCashBalanceResponse: ",
    getUserCashBalanceResponse.data?.cash_balance
  );

  const { handleOnCashBalanceOnChange, handleDeposit, handleWithdraw } =
    UserCashBalancePageContainerLogic({
      getUserCashBalance,
      saveUserCashBalance,
      saveUserCashBalanceResponse,
    } as IUserCashBalancePageContainerProps);
  return (
    <UserCashBalancePageContainerWrapper>
      <NavigationBar></NavigationBar>
      <HorizontallyCenterContainer>
        <VerticalContainer>
          <GetStockContainer>
            <SpinnerComponent>
              {getUserCashBalanceResponse.loading === LoadingState.Pending ? (
                <Spinner animation="border" variant="info" />
              ) : (
                <div></div>
              )}
            </SpinnerComponent>
            <VerticalContainer>
              <Alert key={"success"} variant={"success"}>
                <HorizontalContainer>
                  <StockText>
                    {getUserCashBalanceResponse.data?.cash_balance}
                  </StockText>
                </HorizontalContainer>
              </Alert>
            </VerticalContainer>
            {getUserCashBalanceResponse.error ? (
              <Alert key={"danger"} variant={"danger"}>
                Error retrieving stocks data. Please try again!
              </Alert>
            ) : (
              <div></div>
            )}
          </GetStockContainer>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Enter Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter deposit/withdraw amount"
                onChange={handleOnCashBalanceOnChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
            <Button variant="primary" type="submit" onClick={handleDeposit}>
              Deposit
            </Button>{" "}
            <Button variant="primary" type="submit" onClick={handleWithdraw}>
              Withdraw
            </Button>
          </Form>
          <SaveStockContainer>
            <SpinnerComponent>
              {saveUserCashBalanceResponse.loading === LoadingState.Pending ? (
                <Spinner animation="border" variant="info" />
              ) : (
                <div></div>
              )}
            </SpinnerComponent>
            <Form>
              <HorizontallyCenterContainer></HorizontallyCenterContainer>
            </Form>
            {saveUserCashBalanceResponse.error ? (
              <Alert key={"danger"} variant={"danger"}>
                Error saving stock. Please try again!
              </Alert>
            ) : (
              <div></div>
            )}
          </SaveStockContainer>
        </VerticalContainer>
      </HorizontallyCenterContainer>
    </UserCashBalancePageContainerWrapper>
  );
};

UserCashBalancePageContainer.defaultProps = {};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getUserCashBalance: () => dispatch(getUserCashBalance()),
    saveUserCashBalance: (saveUserCashBalanceRequest: UpdateUserCashBalance) =>
      dispatch(saveUserCashBalance(saveUserCashBalanceRequest)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    getUserCashBalanceResponse: state.getUserCashBalanceReducer,
    saveUserCashBalanceResponse: state.saveUserCashBalanceReducer,
  };
};

type StateToPropsType = ReturnType<typeof mapStateToProps>;
type DispatchToPropsType = typeof mapDispatchToProps;

export default connect<StateToPropsType, DispatchToPropsType>(
  mapStateToProps,
  mapDispatchToProps
)(UserCashBalancePageContainer);
