import styled from "styled-components";
import { FunctionComponent, Dispatch } from "react";
import { connect } from "react-redux";
import { UserHomePageContainerLogic } from "./userHomePageContainer.hook";
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
import NavigationBar from "../../layout/navigationBar";

const UserHomePageContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;
`

const UserHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;


const VerticalCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-top: 3rem;
`;

const SaveOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockText = styled.div`
  display: flex;
  width: 10rem;
  font-size: 1rem;
`;

const StockHeaderText = styled.div`
  display: flex;
  width: 10rem;
  font-size: 1rem; 
`;

const SpinnerComponent = styled.div`
  display: flex;
  justify-content: center;
`;

const BuyStockContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #EBEDEF;
  padding: 2rem;
  justify-content: center;
  box-shadow: 3px 3px #FCF3CF;
`;

const StyledFormGroup = styled(Form.Group)`
  padding: 0.5rem;
`

const ButtonContainer = styled.div`
  text-align: center;
  max-height: 4rem;
  max-width: 20rem;
  vertical-align: middle;
`;

const StyledButton = styled(Button)`
  text-align: center;
  max-height: 4rem;
  vertical-align: middle;
`;


export interface IUserHomePageContainerProps {
  getAllStocks: typeof getAllStocks;
  getAllStocksResponse: State<Stock[]>;

  saveOrder: typeof saveOrder;
  saveOrdersResponse: State<Order[]>;
}

const UserHomePageContainer: FunctionComponent<IUserHomePageContainerProps> & {
  defaultProps: Partial<IUserHomePageContainerProps>;
} = ({
  getAllStocks,
  getAllStocksResponse,
  saveOrder,
  saveOrdersResponse,
}: IUserHomePageContainerProps) => {
    const {
      ticker,
      orderNature,
      orderType,
      quantity,
      limitPrice,
      handleOnTickerOnChange,
      handleOrderNatureChange,
      handleOrderTypeChange,
      handleOnQuantityChange,
      handleOnSetLimitPriceChange,
      handleSubmit,
    } = UserHomePageContainerLogic({
      getAllStocks,
      saveOrder,
      saveOrdersResponse,
      getAllStocksResponse,
    } as IUserHomePageContainerProps);


    const stockHeaders = <Alert key={'primary'} variant={'primary'}><HorizontalContainer>
      <StockHeaderText>{'Ticker'}</StockHeaderText>
      <StockHeaderText>{'Company'}</StockHeaderText>
      <StockHeaderText>{'Current Price'}</StockHeaderText>
      <StockHeaderText>{'Initial Price'}</StockHeaderText>
      <StockHeaderText>{'Volume'}</StockHeaderText>
      <StockHeaderText>{'Todays MaxPrice'}</StockHeaderText>
      <StockHeaderText>{'Todays MinPrice'}</StockHeaderText>
      <StockHeaderText>{'Todays OpenPrice'}</StockHeaderText>
    </HorizontalContainer></Alert>

    const stockData = <div>{getAllStocksResponse.data?.map((stock) => (
      <Alert key={stock.id} variant={'success'}>
        <HorizontalContainer>
          <StockText>{stock.ticker}</StockText>
          <StockText>{stock.company_name}</StockText>
          <StockText>{stock.current_price ? stock.current_price.toFixed(2) : ''}</StockText>
          <StockText>{stock.initial_price ? stock.initial_price.toFixed(2) : ''}</StockText>
          <StockText>{stock.volume}</StockText>
          <StockText>{stock.todays_max_price ? stock.todays_max_price.toFixed(2) : ''}</StockText>
          <StockText>{stock.todays_min_price  ? stock.todays_min_price.toFixed(2) : ''}</StockText>
          <StockText>{stock.todays_open_price  ? stock.todays_open_price.toFixed(2) : ''}</StockText>
        </HorizontalContainer>
      </Alert>
    ))}</div>

    const stockTable = <div>
      <div>{stockHeaders}</div>
      <div>{stockData}</div>
    </div>


    return (
      <UserHomePageContainerWrapper>
        <NavigationBar></NavigationBar>
        <UserHomeContainer>
          <HorizontallyCenterContainer>
            <VerticalContainer>
            <VerticalCenterContainer>
              <GetStockContainer>

                <SpinnerComponent>
                  {getAllStocksResponse.loading === LoadingState.Pending ? (
                    <Spinner animation="border" variant="info" />
                  ) : (
                    <div></div>
                  )}
                </SpinnerComponent>
                <VerticalContainer>
                  {stockTable}
                </VerticalContainer>
              </GetStockContainer>

              <ErrorContainer>
                  {getAllStocksResponse.error ? (
                  <Alert key={"danger"} variant={"danger"}>
                    Error retrieving stocks data. Please try again!
                  </Alert>
                ) : (
                  <div></div>
                )}
                </ErrorContainer>
              </VerticalCenterContainer>



              <BuyStockContainer>
                <SaveOrderContainer>
                  <SpinnerComponent>
                    {saveOrdersResponse.loading === LoadingState.Pending ? (
                      <Spinner animation="border" variant="info" />
                    ) : (
                      <div></div>
                    )}
                  </SpinnerComponent>
                  <VerticalContainer>
                    <VerticalCenterContainer>
                    <HorizontallyCenterContainer>
                      <StyledFormGroup className="mb-3" controlId="formStockTicker">
                        <Form.Label>Stock Ticker</Form.Label>
                        <Form.Control
                          value={ticker}
                          type="input"
                          placeholder="AAPL"
                          required
                          onChange={handleOnTickerOnChange}
                        />
                      </StyledFormGroup>

                      <StyledFormGroup className="mb-3" controlId="formStockInitialPrice">
                        <Form.Label>Order Nature</Form.Label>
                        <Form.Control
                          value={orderNature}
                          type="input"
                          placeholder="'buy' or 'sell'"
                          required
                          onChange={handleOrderNatureChange}
                        />
                      </StyledFormGroup>

                      <StyledFormGroup className="mb-3" controlId="formStockQuantity">
                        <Form.Label>Order Type</Form.Label>
                        <Form.Control
                          value={orderType}
                          type="input"
                          placeholder="'limit' or 'market'"
                          required
                          onChange={handleOrderTypeChange}
                        />
                      </StyledFormGroup>

                      <StyledFormGroup className="mb-3" controlId="formStockQuantity">
                        <Form.Label>Limit Price</Form.Label>
                        <Form.Control
                          value={limitPrice}
                          type="input"
                          placeholder="optional field, ex 0"
                          required
                          onChange={handleOnSetLimitPriceChange}
                        />
                      </StyledFormGroup>

                      <StyledFormGroup className="mb-3" controlId="formStockQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          value={quantity}
                          type="input"
                          placeholder="100"
                          required
                          onChange={handleOnQuantityChange}
                        />
                      </StyledFormGroup>

                    </HorizontallyCenterContainer>
                    <HorizontallyCenterContainer>
                    <ButtonContainer>
                    <StyledButton variant="primary" type="submit" onClick={handleSubmit}>
                      Place Order
                    </StyledButton>
                    </ButtonContainer>
                    
                    </HorizontallyCenterContainer>
                    {saveOrdersResponse.error ? (
                    <Alert key={"danger"} variant={"danger"}>
                      Error saving Order. Please try again!
                    </Alert>
                  ) : (
                    <div></div>
                  )}
                    </VerticalCenterContainer>
                    </VerticalContainer>
                </SaveOrderContainer>
              </BuyStockContainer>
            </VerticalContainer>
          </HorizontallyCenterContainer>
        </UserHomeContainer>
      </UserHomePageContainerWrapper>
    );
  };

UserHomePageContainer.defaultProps = {};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getAllStocks: () => dispatch(getAllStocks()),
    saveOrder: (saveOrderRequest: Order) =>
      dispatch(saveOrder(saveOrderRequest)),
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
)(UserHomePageContainer);
