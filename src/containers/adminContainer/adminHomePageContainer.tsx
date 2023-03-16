import styled from "styled-components";
import { FunctionComponent, Dispatch } from "react";
import { connect } from "react-redux";
import { AdminHomePageContainerLogic } from "./adminHomePageContainer.hook";
import { getAllStocks } from "../../../store/getAllStocks.slice";
import { Stock } from "../../../model/stock";
import { State } from "../../../model/state";
import { Spinner } from "react-bootstrap";
import { LoadingState } from "../../../model/loadingState";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { saveStock } from "../../../store/saveStock.slice";

const AdminHomePageContainerWrapper = styled.div`
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

export interface IAdminHomePageContainerProps {
  getAllStocks: typeof getAllStocks;
  getAllStocksResponse: State<Stock[]>;

  saveStock: typeof saveStock;
  saveStocksResponse: State<Stock[]>;
}

const AdminHomePageContainer: FunctionComponent<IAdminHomePageContainerProps> & {
  defaultProps: Partial<IAdminHomePageContainerProps>;
} = ({ getAllStocks, getAllStocksResponse, saveStock, saveStocksResponse }: IAdminHomePageContainerProps) => {

  const { ticker, companyName, initialPrice, volume, handleOnTickerOnChange, handleCompanyNameChange, handleOnInitialPriceChange, handleOnVolumeChange, handleSubmit } =
  AdminHomePageContainerLogic({ getAllStocks, saveStock, saveStocksResponse } as IAdminHomePageContainerProps);
  return (
    <AdminHomePageContainerWrapper>
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

          <SaveStockContainer>
          <SpinnerComponent>
              {saveStocksResponse.loading === LoadingState.Pending ? (
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
                  <Form.Label>Initial Price</Form.Label>
                  <Form.Control value={initialPrice} type="input" placeholder="50" required onChange={handleOnInitialPriceChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStockQuantity">
                  <Form.Label>Volume</Form.Label>
                  <Form.Control value={volume} type="input" placeholder="1000" required onChange={handleOnVolumeChange} />
                </Form.Group>
              </HorizontallyCenterContainer>

              <Button variant="primary" type="submit" onClick={handleSubmit} >
                Save
              </Button>
            </Form>
            {saveStocksResponse.error ? (
              <Alert key={"danger"} variant={"danger"}>
                Error saving stock. Please try again!
              </Alert>
            ) : (
              <div></div>
            )}
          </SaveStockContainer>
        </VerticalContainer>
      </HorizontallyCenterContainer>
    </AdminHomePageContainerWrapper>
  );
};

AdminHomePageContainer.defaultProps = {};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getAllStocks: () => dispatch(getAllStocks()),
    saveStock: (saveStockRequest: Stock) => dispatch(saveStock(saveStockRequest)),
  };
};

const mapStateToProps = (state: any) => {
  return {
    getAllStocksResponse: state.getAllStocksReducer,
    saveStocksResponse: state.saveStockReducer,
  };
};

type StateToPropsType = ReturnType<typeof mapStateToProps>;
type DispatchToPropsType = typeof mapDispatchToProps;

export default connect<StateToPropsType, DispatchToPropsType>(
  mapStateToProps,
  mapDispatchToProps
)(AdminHomePageContainer);
