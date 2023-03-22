import styled from "styled-components";
import { FunctionComponent, Dispatch } from "react";
import { connect } from "react-redux";
import { UserHomePageContainerLogic } from "./userHomePageContainer.hook";
import { getUserStocks } from "../../store/getUserStocks.slice";
import { Stock } from "../../model/stock";
import { userStock } from "../../model/userStock";
import { State } from "../../model/state";
import { Spinner } from "react-bootstrap";
import { LoadingState } from "../../model/loadingState";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavigationBar from "../../layout/navigationBar";

const UserHomePageContainerWrapper = styled.div`
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

export interface IUserHomePageContainerProps {
  getUserStocks: typeof getUserStocks;
  getUserStocksResponse: State<userStock[]>;
}

const UserHomePageContainer: FunctionComponent<IUserHomePageContainerProps> & {
  defaultProps: Partial<IUserHomePageContainerProps>;
} = ({ getUserStocks, getUserStocksResponse }: IUserHomePageContainerProps) => {
  UserHomePageContainerLogic({ getUserStocks } as IUserHomePageContainerProps);
  return (
    <UserHomePageContainerWrapper>
      <NavigationBar></NavigationBar>
      <HorizontallyCenterContainer>
        <VerticalContainer>
          <GetStockContainer>
            <SpinnerComponent>
              {getUserStocksResponse.loading === LoadingState.Pending ? (
                <Spinner animation="border" variant="info" />
              ) : (
                <div></div>
              )}
            </SpinnerComponent>
            <VerticalContainer>
              {getUserStocksResponse.data?.map((user_stock) => (
                <Alert key={"success"} variant={"success"}>
                  <HorizontalContainer>
                    <StockText>{user_stock.ticker}</StockText>
                    <StockText>{user_stock.company_name}</StockText>
                    <StockText>{user_stock.quantity}</StockText>
                    <StockText>{user_stock.current_price}</StockText>
                  </HorizontalContainer>
                </Alert>
              ))}
            </VerticalContainer>
            {getUserStocksResponse.error ? (
              <Alert key={"danger"} variant={"danger"}>
                Error retrieving stocks data. Please try again!
              </Alert>
            ) : (
              <div></div>
            )}
          </GetStockContainer>
        </VerticalContainer>
      </HorizontallyCenterContainer>
    </UserHomePageContainerWrapper>
  );
};

UserHomePageContainer.defaultProps = {};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getUserStocks: () => dispatch(getUserStocks()),
  };
};

const mapStateToProps = (state: any) => {
  return {
    getUserStocksResponse: state.getUserStocksReducer,
  };
};

type StateToPropsType = ReturnType<typeof mapStateToProps>;
type DispatchToPropsType = typeof mapDispatchToProps;

export default connect<StateToPropsType, DispatchToPropsType>(
  mapStateToProps,
  mapDispatchToProps
)(UserHomePageContainer);
