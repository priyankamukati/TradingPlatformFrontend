import styled from "styled-components";
import { FunctionComponent, Dispatch } from "react";
import { connect } from "react-redux";
import { UserOrderContainerLogic } from "./userOrderContainer.hook";
import { getUserAllOrders } from "../../store/getUserAllOrders.slice";
import { Order } from "../../model/userOrder";
import { State } from "../../model/state";
import { Spinner } from "react-bootstrap";
import { LoadingState } from "../../model/loadingState";
import Alert from "react-bootstrap/Alert";
import NavigationBar from "../../layout/navigationBar";

const UserOrderContainerWrapper = styled.div`
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

export interface IUserOrderContainerProps {
  getUserAllOrders: typeof getUserAllOrders;
  getUserAllOrdersResponse: State<Order[]>;
}

const UserOrderContainer: FunctionComponent<IUserOrderContainerProps> & {
  defaultProps: Partial<IUserOrderContainerProps>;
} = ({
  getUserAllOrders,
  getUserAllOrdersResponse,
}: IUserOrderContainerProps) => {
  UserOrderContainerLogic({
    getUserAllOrders,
  } as IUserOrderContainerProps);
  return (
    <UserOrderContainerWrapper>
      <NavigationBar></NavigationBar>
      <HorizontallyCenterContainer>
        <VerticalContainer>
          <GetStockContainer>
            <SpinnerComponent>
              {getUserAllOrdersResponse.loading === LoadingState.Pending ? (
                <Spinner animation="border" variant="info" />
              ) : (
                <div></div>
              )}
            </SpinnerComponent>
            <VerticalContainer>
              {getUserAllOrdersResponse.data?.map((user_order) => (
                <Alert key={"success"} variant={"success"}>
                  <HorizontalContainer>
                    <StockText>{user_order.ticker}</StockText>
                    <StockText>{user_order.company_name}</StockText>
                    <StockText>{user_order.order_nature}</StockText>
                    <StockText>{user_order.order_type}</StockText>
                    <StockText>{user_order.quantity}</StockText>
                    <StockText>{user_order.limit_price}</StockText>
                    <StockText>{user_order.status}</StockText>
                    <StockText>{user_order.status_reason}</StockText>
                  </HorizontalContainer>
                </Alert>
              ))}
            </VerticalContainer>
            {getUserAllOrdersResponse.error ? (
              <Alert key={"danger"} variant={"danger"}>
                Error retrieving Orders data. Please try again!
              </Alert>
            ) : (
              <div></div>
            )}
          </GetStockContainer>
        </VerticalContainer>
      </HorizontallyCenterContainer>
    </UserOrderContainerWrapper>
  );
};

UserOrderContainer.defaultProps = {};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getUserAllOrders: () => dispatch(getUserAllOrders()),
  };
};

const mapStateToProps = (state: any) => {
  return {
    getUserAllOrdersResponse: state.getUserAllOrdersReducer,
  };
};

type StateToPropsType = ReturnType<typeof mapStateToProps>;
type DispatchToPropsType = typeof mapDispatchToProps;

export default connect<StateToPropsType, DispatchToPropsType>(
  mapStateToProps,
  mapDispatchToProps
)(UserOrderContainer);