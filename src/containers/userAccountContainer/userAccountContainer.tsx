import styled from "styled-components";
import { FunctionComponent, Dispatch } from "react";
import { connect } from "react-redux";
import { UserAccountContainerLogic } from "./userAccountContainer.hook";
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

const UserAccountContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100vw;
  height: 100vh;
  background: #F0F8FF;
  margin-top: 1rem;
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;


const HorizontallyCenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;

`;

const HorizontallySaveCenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
`;

const StockText = styled.div`
  display: flex;
  margin-left: 0.25rem;
  width: 10rem;
  font-size: 100px;
  line-weight: 20px;
  letter-spacing: 0.25px;
  font-weight: 400;
  text-align: left;
`;

const SpinnerComponent = styled.div`
  display: flex;
  justify-content: center;
`;


const NoStockText = styled.div`
  display: flex;
  font-size: 14px;
  line-weight: 20px;
  letter-spacing: 0.25px;
  font-weight: 400;
`;


const PageTitleText = styled.div`
  display: flex;
  width: 50rem;
  font-size: 60px;
  line-weight: 40px;
  letter-spacing: 0.25px;
  font-weight: 200;
  margin-top: 2rem;
  margin-left: 4rem;
`;

const StyledButton = styled(Button)`
  text-align: center;
  max-height: 4rem;
  padding-left: 3rem;
  padding-right: 3rem;
  vertical-align: middle;
  background: #warning;
`;

const StyledFormControl = styled(Form.Control)`
  width: 30rem;
`;

const MainContainer = styled.div`
  padding: 20rem;
  background: #EBEDEF;
`;


export interface IUserAccountContainerProps {
  getUserCashBalance: typeof getUserCashBalance;
  getUserCashBalanceResponse: State<UserInfo>;

  saveUserCashBalance: typeof saveUserCashBalance;
  saveUserCashBalanceResponse: State<UpdateUserCashBalance>;
}

const UserAccountContainer: FunctionComponent<IUserAccountContainerProps> & {
  defaultProps: Partial<IUserAccountContainerProps>;
} = ({
  getUserCashBalance,
  getUserCashBalanceResponse,
  saveUserCashBalance,
  saveUserCashBalanceResponse,
}: IUserAccountContainerProps) => {
    console.log(
      "getUserCashBalanceResponse: ",
      getUserCashBalanceResponse.data?.cash_balance
    );

    const { handleOnCashBalanceOnChange, handleDeposit, handleWithdraw } =
      UserAccountContainerLogic({
        getUserCashBalance,
        saveUserCashBalance,
        saveUserCashBalanceResponse,
      } as IUserAccountContainerProps);

    const balance = getUserCashBalanceResponse.data?.cash_balance ? '$' + getUserCashBalanceResponse.data?.cash_balance.toFixed(2) : '$0'
    return (
      <UserAccountContainerWrapper>
        <NavigationBar></NavigationBar>
        <PageTitleText>My Account</PageTitleText>
        <VerticalContainer>
          <HorizontallyCenterContainer>
            <SpinnerComponent>
              {getUserCashBalanceResponse.loading === LoadingState.Pending ? (
                <Spinner animation="border" variant="info" />
              ) : (
                <div></div>
              )}
            </SpinnerComponent>
          </HorizontallyCenterContainer>

<MainContainer>
          <HorizontallyCenterContainer>
            <HorizontallyCenterContainer>
              <StockText>
                {balance}
              </StockText>
            </HorizontallyCenterContainer>
            <VerticalContainer>
              <Form>
                <Form.Group className="mb-3" controlId="formBasic">
                  <NoStockText>Enter Amount</NoStockText>
                  <StyledFormControl
                    type="text"
                    placeholder="Enter deposit/withdraw amount"
                    onChange={handleOnCashBalanceOnChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicCheckbox"
                ></Form.Group>
                <StyledButton variant="primary" type="submit" onClick={handleDeposit}>
                  <NoStockText>Deposit</NoStockText>
                </StyledButton>{" "}
                <StyledButton variant="primary" type="submit" onClick={handleWithdraw}>
                  <NoStockText>Withdraw</NoStockText>
                </StyledButton>
              </Form>
            </VerticalContainer>
          </HorizontallyCenterContainer>
          </MainContainer>
          <HorizontallyCenterContainer>
          
            {getUserCashBalanceResponse.error ? (
              <Alert key={"danger"} variant={"danger"}>
                <NoStockText>Error retrieving stocks data. Please try again!</NoStockText>
              </Alert>
            ) : (
              <div></div>
            )}
          </HorizontallyCenterContainer>
          <HorizontallySaveCenterContainer>

          </HorizontallySaveCenterContainer>
          <HorizontallyCenterContainer>
            <SpinnerComponent>
              {saveUserCashBalanceResponse.loading === LoadingState.Pending ? (
                <Spinner animation="border" variant="info" />
              ) : (
                <div></div>
              )}
            </SpinnerComponent>
          </HorizontallyCenterContainer>
          <HorizontallyCenterContainer>
            {saveUserCashBalanceResponse.error ? (
              <Alert key={"danger"} variant={"danger"}>
                <NoStockText>Error saving stock. Please try again after sometime!</NoStockText>
              </Alert>
            ) : (
              <div></div>
            )}

          </HorizontallyCenterContainer>
        </VerticalContainer>
      </UserAccountContainerWrapper>
    );
  };

UserAccountContainer.defaultProps = {};

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
)(UserAccountContainer);
