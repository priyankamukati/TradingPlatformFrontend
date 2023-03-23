import styled from "styled-components";
import { FunctionComponent, Dispatch } from "react";
import { connect } from "react-redux";
import { UserHomePageContainerLogic } from "./userHomePageContainer.hook";
import { getAllStocks } from "../../store/getAllStocks.slice";
import { Stock } from "../../model/stock";
import { Order } from "../../model/userOrder";
import { State } from "../../model/state";
import { ButtonGroup, Spinner, ToggleButton } from "react-bootstrap";
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
  width: 100vw;
  height: 100vh;
  background: #F0F8FF;
`

const UserHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  flex-grow: 1;
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
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
`;

const SaveOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockText = styled.div`
  display: flex;
  width: 10rem;
  font-size: 14px;
  line-weight: 20px;
  letter-spacing: 0.25px;
  font-weight: 400;
`;

const NoStockText = styled.div`
  display: flex;
  font-size: 14px;
  line-weight: 20px;
  letter-spacing: 0.25px;
  font-weight: 400;
`;


const StockHeaderText = styled.div`
  display: flex;
  width: 10rem;
  font-size: 14px;
  line-weight: 20px;
  letter-spacing: 0.25px;
  font-weight: 400;
`;

const PageTitleText = styled.div`
  display: flex;
  width: 10rem;
  font-size: 60px;
  line-weight: 40px;
  letter-spacing: 0.25px;
  font-weight: 200;
  margin-top: 2rem;
  margin-left: 4rem;
`;

const FormLabel = styled.div`
  display: flex;
  font-size: 14px;
  line-weight: 20px;
  letter-spacing: 0.25px;
  font-weight: 400;
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
  box-shadow: 3px 3px #FCF3CF;
`;

const StyledFormGroup = styled(Form.Group)`
  padding: 0.5rem;
`

const ButtonContainer = styled.div`
  text-align: center;
  max-height: 4rem;
  max-width: 25rem;
  vertical-align: middle;
  margin-bottom: 1rem;
  margin-left: 1rem;
`;

const StyledButton = styled(Button)`
  text-align: center;
  max-height: 4rem;
  padding-left: 3rem;
  padding-right: 3rem;
  vertical-align: middle;
  background: #warning;
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
      quantity,
      limitPrice,
      handleOnTickerOnChange,
      handleOnQuantityChange,
      handleOnSetLimitPriceChange,
      handleSubmit,
      errorMessage,
      limitValueChecked,
      limitValueOptions,
      setLimitValueChecked,
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

    const stockData = <div>{getAllStocksResponse.data && getAllStocksResponse.data.length > 0 ? getAllStocksResponse.data.map((stock) => (
      <Alert key={stock.id} variant={'success'}>
        <HorizontalContainer>
          <StockText>{stock.ticker}</StockText>
          <StockText>{stock.company_name}</StockText>
          <StockText>{stock.current_price ? stock.current_price.toFixed(2) : ''}</StockText>
          <StockText>{stock.initial_price ? stock.initial_price.toFixed(2) : ''}</StockText>
          <StockText>{stock.volume}</StockText>
          <StockText>{stock.todays_max_price ? stock.todays_max_price.toFixed(2) : ''}</StockText>
          <StockText>{stock.todays_min_price ? stock.todays_min_price.toFixed(2) : ''}</StockText>
          <StockText>{stock.todays_open_price ? stock.todays_open_price.toFixed(2) : ''}</StockText>
        </HorizontalContainer>
      </Alert>
    )) : <Alert key={'no-stock'} variant={'danger'}>
      <NoStockText>No stocks added to the platform</NoStockText>
    </Alert>
    }</div>

    const stockTable = <div>
      <div>{stockHeaders}</div>
      <div>{stockData}</div>
    </div>


    return (
      <UserHomePageContainerWrapper>
        <NavigationBar></NavigationBar>
        <PageTitleText>Market</PageTitleText>
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
                      <NoStockText>Error retrieving stocks data. Please try again after sometime!</NoStockText>
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
                          <FormLabel>Stock Ticker</FormLabel>
                          <Form.Control
                            value={ticker}
                            type="input"
                            placeholder="AAPL"
                            required
                            onChange={handleOnTickerOnChange}
                          />
                        </StyledFormGroup>
      
                         <StyledFormGroup className="mb-3" controlId="buy">
                          <FormLabel>Order Type</FormLabel>
                          <ButtonGroup>
                            {limitValueOptions.map((radio, idx) =>  <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                                name="radio"
                                value={radio.value}
                                checked={limitValueChecked === radio.value}
                                onChange={(e) => {
                                  e.stopPropagation(); 
                                  e.preventDefault(); 
                                  console.log("limit checked: ", e.currentTarget.value); 
                                  setLimitValueChecked(e.currentTarget.value);
                                }}
                              >
                                {radio.name}
                              </ToggleButton>
                            )}
                          </ButtonGroup>
                        </StyledFormGroup>

                      {limitValueChecked == "2" ?
                        <StyledFormGroup className="mb-3" controlId="formStockQuantity">
                          <FormLabel>Limit Price</FormLabel>
                          <Form.Control
                            value={limitPrice}
                            type="input"
                            placeholder="optional field, ex 0"
                            required
                            onChange={handleOnSetLimitPriceChange}
                          />
                        </StyledFormGroup>
                        : <div></div>}

                        <StyledFormGroup className="mb-3" controlId="formStockQuantity">
                          <FormLabel>Quantity</FormLabel>
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
                          <StyledButton variant="primary" type="submit" onClick={(e:any) => handleSubmit(e, true)}>
                            <FormLabel>Place Buy</FormLabel>
                          </StyledButton>
                        </ButtonContainer>
                        <ButtonContainer>
                          <StyledButton variant="warning" type="submit" onClick={(e:any) => handleSubmit(e, false)}>
                            <FormLabel>Place Sell</FormLabel>
                          </StyledButton>
                        </ButtonContainer>
                      </HorizontallyCenterContainer>
                      {saveOrdersResponse.error ? (
                        <Alert key={"danger"} variant={"danger"}>
                          <NoStockText>{'Error saving Order. Please try again!'}</NoStockText>
                        </Alert>
                      ) : (
                        <div></div>
                      )}
                      {errorMessage !== undefined ? (
                        <Alert key={"danger"} variant={"danger"}>
                          <NoStockText>{errorMessage}</NoStockText>
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
