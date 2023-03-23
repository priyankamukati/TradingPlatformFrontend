import styled from "styled-components";
import { FunctionComponent, Dispatch } from "react";
import { connect } from "react-redux";
import { UserOrderContainerLogic } from "./userOrderContainer.hook";
import { getUserAllOrders } from "../../store/getUserAllOrders.slice";
import { CancelOrder, Order } from "../../model/userOrder";
import { State } from "../../model/state";
import { Button, Spinner } from "react-bootstrap";
import { LoadingState } from "../../model/loadingState";
import Alert from "react-bootstrap/Alert";
import NavigationBar from "../../layout/navigationBar";
import { cancelOrder } from "../../store/cancelOrder.slice";

const UserOrderContainerWrapper = styled.div`
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
  height: 60rem;
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
  font-size: 1rem;
  line-weight: 20px;
  letter-spacing: 0.25px;
  font-weight: 400;
  text-align: left;
`;

const SpinnerComponent = styled.div`
  display: flex;
  justify-content: center;
`;

const StockHeaderText = styled.div`
  display: flex;
  width: 10rem;

  font-size: 1rem;
  line-weight: 20px;
  letter-spacing: 0.25px;
  font-weight: 400;
  text-align: left;
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
  vertical-align: middle;
`;


export interface IUserOrderContainerProps {
  getUserAllOrders: typeof getUserAllOrders;
  getUserAllOrdersResponse: State<Order[]>;
  cancelOrder: typeof cancelOrder;
  cancelOrderResponse: State<CancelOrder>
}

const UserOrderContainer: FunctionComponent<IUserOrderContainerProps> & {
  defaultProps: Partial<IUserOrderContainerProps>;
} = ({
  getUserAllOrders,
  getUserAllOrdersResponse,
  cancelOrder,
  cancelOrderResponse
}: IUserOrderContainerProps) => {
    UserOrderContainerLogic({
      getUserAllOrders,
    } as IUserOrderContainerProps);


    const orderHeaders = <Alert key={'primary'} variant={'primary'}><HorizontalContainer>
      <StockHeaderText>{'Ticker'}</StockHeaderText>
      <StockHeaderText>{'Company'}</StockHeaderText>
      <StockHeaderText>{'Buy/Sell'}</StockHeaderText>
      <StockHeaderText>{'Market/Limit'}</StockHeaderText>
      <StockHeaderText>{'Quantity'}</StockHeaderText>
      <StockHeaderText>{'Limit Price'}</StockHeaderText>
      <StockHeaderText>{'Status'}</StockHeaderText>
      <StockHeaderText>{'Status Reason'}</StockHeaderText>
      <StockHeaderText>{''}</StockHeaderText>
    </HorizontalContainer></Alert>

    const orderData = <div>{getUserAllOrdersResponse.data && getUserAllOrdersResponse.data.length > 0 ? 
      getUserAllOrdersResponse.data.map((order) => (
      <Alert key={order.ticker} variant={'success'}>
        <HorizontalContainer>
          <StockText>{order.ticker}</StockText>
          <StockText>{order.company_name}</StockText>
          <StockText>{order.order_nature}</StockText>
          <StockText>{order.order_type}</StockText>
          <StockText>{order.quantity}</StockText>
          <StockText>{order.limit_price}</StockText>
          <StockText>{order.status}</StockText>
          <StockText>{order.status_reason}</StockText>
          <StockText>
            <StyledButton variant="info" type="submit" onClick={(e: any) => { e.preventDefault(); cancelOrder({ order_id: order.id }) }}>
              Cancel
            </StyledButton>
          </StockText>
        </HorizontalContainer>
      </Alert>
    )) : <Alert key={'no-stock'} variant={'danger'}>
      <NoStockText>No stocks added to the platform</NoStockText>
    </Alert>
    }</div>

    const orderTable = <div>
      <div>{orderHeaders}</div>
      <div>{orderData}</div>
    </div>


    return (
      <UserOrderContainerWrapper>
        <NavigationBar></NavigationBar>
        <PageTitleText>Transaction History</PageTitleText>
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
                {orderTable}
              </VerticalContainer>
            </GetStockContainer>
            {getUserAllOrdersResponse.error ? (
              <Alert key={"danger"} variant={"danger"}>
                Error retrieving Orders data. Please try again!
              </Alert>
            ) : (
              <div></div>
            )}
          </VerticalContainer>
        </HorizontallyCenterContainer>
      </UserOrderContainerWrapper>
    );
  };

UserOrderContainer.defaultProps = {};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getUserAllOrders: () => dispatch(getUserAllOrders()),
    cancelOrder: (cancelOrderRequest: CancelOrder) => dispatch(cancelOrder(cancelOrderRequest))
  };
};

const mapStateToProps = (state: any) => {
  return {
    getUserAllOrdersResponse: state.getUserAllOrdersReducer,
    cancelOrderResponse: state.cancelOrderReducer,
  };
};

type StateToPropsType = ReturnType<typeof mapStateToProps>;
type DispatchToPropsType = typeof mapDispatchToProps;

export default connect<StateToPropsType, DispatchToPropsType>(
  mapStateToProps,
  mapDispatchToProps
)(UserOrderContainer);
