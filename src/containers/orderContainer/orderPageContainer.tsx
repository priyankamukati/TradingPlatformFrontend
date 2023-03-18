import styled from "styled-components";
import { FunctionComponent, Dispatch } from "react";
import { connect } from "react-redux";
import { OrderPageContainerLogic } from "./orderPageContainer.hook";
import { getAllStocks } from "../../store/getAllStocks.slice";
import { Stock } from "../../model/stock";
import { Order } from "../../model/userOrder";
import { State } from "../../model/state";
import { Spinner } from "react-bootstrap";
import { LoadingState } from "../../model/loadingState";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { saveOrder } from "../../store/saveOrder.slice";

const OrderPageContainerWrapper = styled.div`
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


const SaveOrderContainer = styled.div`
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

export interface IOrderPageContainerProps {
  getAllStocks: typeof getAllStocks;
  getAllStocksResponse: State<Stock[]>;

  saveOrder: typeof saveOrder;
  saveOrdersResponse: State<Order[]>;
}

const OrderPageContainer: FunctionComponent<IOrderPageContainerProps> & {
  defaultProps: Partial<IOrderPageContainerProps>;
} = ({ getAllStocks, getAllStocksResponse, saveOrder, saveOrdersResponse }: IOrderPageContainerProps) => {

  const { ticker, companyName, orderNature, orderType,quantity, limitPrice, handleOnTickerOnChange, handleCompanyNameChange,
    handleOrderNatureChange, handleOrderTypeChange, handleOnQuantityChange,
    handleOnSetLimitPriceChange, handleSubmit } =
  OrderPageContainerLogic({ getAllStocks, saveOrder, saveOrdersResponse } as IOrderPageContainerProps);
  return (
    <OrderPageContainerWrapper>
      <HorizontallyCenterContainer>
        <VerticalContainer>

          <GetStockContainer>
            <SpinnerComponent>
              {getAllStocksResponse.loading === LoadingState.Pending ? (
                <Spinner animation="border" variant="info" />
              ) : (
                <div></div>
              )}
            </SpinnerComponent>
            <VerticalContainer>
              {getAllStocksResponse.data?.map((stock) => (
                <Alert key={"success"} variant={"success"}>
                  <HorizontalContainer>
                    <StockText>{stock.ticker}</StockText>
                    <StockText>{stock.company_name}</StockText>
                    <StockText>{stock.current_price}</StockText>
                    <StockText>{stock.initial_price}</StockText>
                    <StockText>{stock.volume}</StockText>
                  </HorizontalContainer>
                </Alert>
              ))}
            </VerticalContainer>
            {getAllStocksResponse.error ? (
              <Alert key={"danger"} variant={"danger"}>
                Error retrieving stocks data. Please try again!
              </Alert>
            ) : (
              <div></div>
            )}
          </GetStockContainer>

          <SaveOrderContainer>
          <SpinnerComponent>
              {saveOrdersResponse.loading === LoadingState.Pending ? (
                <Spinner animation="border" variant="info" />
              ) : (
                <div></div>
              )}
            </SpinnerComponent>
            <Form>
              <HorizontallyCenterContainer>
                <Form.Group className="mb-3" controlId="formStockTicker">
                  <Form.Label>Stock Ticker</Form.Label>
                  <Form.Control value={ticker} type="input" placeholder="AAPL" required onChange={handleOnTickerOnChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStockCompanyName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control value={companyName} type="input" placeholder="Apple Inc" required onChange={handleCompanyNameChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStockInitialPrice">
                  <Form.Label>Order Nature</Form.Label>
                  <Form.Control value={orderNature} type="input" placeholder="Buy/Sell" required onChange={handleOrderNatureChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStockQuantity">
                  <Form.Label>Order Type</Form.Label>
                  <Form.Control value={orderType} type="input" placeholder="Limit/Market" required onChange={handleOrderTypeChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStockQuantity">
                  <Form.Label>Limit Price</Form.Label>
                  <Form.Control value={limitPrice} type="input" placeholder="0" required onChange={handleOnSetLimitPriceChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStockQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control value={quantity} type="input" placeholder="0" required onChange={handleOnQuantityChange} />
                </Form.Group>
              </HorizontallyCenterContainer>

              <Button variant="primary" type="submit" onClick={handleSubmit} >
                Save
              </Button>
            </Form>
            {saveOrdersResponse.error ? (
              <Alert key={"danger"} variant={"danger"}>
                Error saving Order. Please try again!
              </Alert>
            ) : (
              <div></div>
            )}
          </SaveOrderContainer>
        </VerticalContainer>
      </HorizontallyCenterContainer>
    </OrderPageContainerWrapper>
  );
};

OrderPageContainer.defaultProps = {};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getAllStocks: () => dispatch(getAllStocks()),
    saveOrder: (saveOrderRequest: Order) => dispatch(saveOrder(saveOrderRequest)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    getAllStocksResponse: state.getAllStocksReducer,
    saveOrdersResponse: state.saveOrderReducer,
  };
};

type StateToPropsType = ReturnType<typeof mapStateToProps>;
type DispatchToPropsType = typeof mapDispatchToProps;

export default connect<StateToPropsType, DispatchToPropsType>(
  mapStateToProps,
  mapDispatchToProps
)(OrderPageContainer);
