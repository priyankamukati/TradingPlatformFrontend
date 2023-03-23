import styled from "styled-components";
import { FunctionComponent, Dispatch } from "react";
import { connect } from "react-redux";
import { AdminHomePageContainerLogic } from "./adminContainer.hook";
import { getAllStocks } from "../../store/getAllStocks.slice";
import { Stock } from "../../model/stock";
import { State } from "../../model/state";
import { Spinner } from "react-bootstrap";
import { LoadingState } from "../../model/loadingState";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { saveStock } from "../../store/saveStock.slice";
import NavigationBar from "../../layout/navigationBar";
import AdminNavigationBar from "../../layout/adminNavigationBar";
import { getUserInfo, getUserInfoReducer } from "../../store/getUserInfo.slice";
import { GetUserInfo, UserInfo } from "../../model/userInfo";

const AdminHomePageContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100vw;
  height: 100vh;
  background: #F0F8FF;
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
  height: 40rem;
  justify-content: center;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 2rem;
`;

const SaveStockContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SpinnerComponent = styled.div`
  display: flex;
  justify-content: center;
`;

const VerticalCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;

`;

const TextContent = styled.div`
  display: flex;
  margin-left: 0.25rem;
  font-size: 30px;
  line-weight: 20px;
  letter-spacing: 0.25px;
  font-weight: 200;
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
  width: 30rem;
  font-size: 60px;
  line-weight: 40px;
  letter-spacing: 0.25px;
  font-weight: 200;
  margin-top: 2rem;
  margin-left: 4rem;
`;

const SectionTitleText = styled.div`
  display: flex;
  width: 30rem;
  font-size: 30px;
  line-weight: 40px;
  letter-spacing: 0.25px;
  font-weight: 200;
`;

const StyledButton = styled(Button)`
  text-align: center;
  max-height: 4rem;
  padding-left: 3rem;
  padding-right: 3rem;
  vertical-align: middle;
  background: #warning;
`;

const StyledFormLabel = styled.div`
display: flex;
width: 10rem;
font-size: 16px;
line-weight: 20px;
letter-spacing: 0.25px;
font-weight: 400;
`;

const MainContainer = styled.div`
  padding: 10rem;
  background: #EBEDEF;
`;


export interface IAdminHomePageContainerProps {
  getAllStocks: typeof getAllStocks;
  getAllStocksResponse: State<Stock[]>;

  saveStock: typeof saveStock;
  saveStocksResponse: State<Stock[]>;

  getUserInfo: typeof getUserInfo;
  getUserInfoResponse: State<GetUserInfo>;
}

const AdminHomePageContainer: FunctionComponent<IAdminHomePageContainerProps> & {
  defaultProps: Partial<IAdminHomePageContainerProps>;
} = ({
  getAllStocks,
  getAllStocksResponse,
  saveStock,
  saveStocksResponse,
  getUserInfo,
  getUserInfoResponse
}: IAdminHomePageContainerProps) => {
    const {
      ticker,
      companyName,
      initialPrice,
      volume,
      handleOnTickerOnChange,
      handleCompanyNameChange,
      handleOnInitialPriceChange,
      handleOnVolumeChange,
      handleSubmit,
    } = AdminHomePageContainerLogic({
      getAllStocks,
      saveStock,
      saveStocksResponse,
      getUserInfo,
      getUserInfoResponse
    } as IAdminHomePageContainerProps);


    const noAdminContent = <AdminHomePageContainerWrapper>
      <AdminNavigationBar></AdminNavigationBar>
      <VerticalCenterContainer>
        <HorizontallyCenterContainer>
          <TextContent>
            User unauthorized: needs Admin access
          </TextContent>
        </HorizontallyCenterContainer>
      </VerticalCenterContainer>
    </AdminHomePageContainerWrapper>

    const stockHeaders = <Alert key={'primary'} variant={'primary'}><HorizontalContainer>
      <StockHeaderText>{'Ticker'}</StockHeaderText>
      <StockHeaderText>{'Company'}</StockHeaderText>
      <StockHeaderText>{'Current Price'}</StockHeaderText>
      <StockHeaderText>{'Initial Price'}</StockHeaderText>
      <StockHeaderText>{'Volume'}</StockHeaderText>
    </HorizontalContainer></Alert>

    const stockData = <div>{getAllStocksResponse.data && getAllStocksResponse.data.length > 0 ? getAllStocksResponse.data.map((stock) => (
      <Alert key={stock.id} variant={'success'}>
        <HorizontalContainer>
          <StockText>{stock.ticker}</StockText>
          <StockText>{stock.company_name}</StockText>
          <StockText>{stock.current_price ? stock.current_price.toFixed(2) : ''}</StockText>
          <StockText>{stock.initial_price ? stock.initial_price.toFixed(2) : ''}</StockText>
          <StockText>{stock.volume}</StockText>
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



    const adminContent = (
      <AdminHomePageContainerWrapper>
        <AdminNavigationBar></AdminNavigationBar>
        <PageTitleText>Admin Panel</PageTitleText>
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
                {stockTable}
              </VerticalContainer>
              {getAllStocksResponse.error ? (
                <Alert key={"danger"} variant={"danger"}>
                  <NoStockText>Error retrieving stocks data. Please try again!</NoStockText>
                </Alert>
              ) : (
                <div></div>
              )}
            </GetStockContainer>

            <MainContainer>
              <SectionTitleText>Add Stocks to Platform</SectionTitleText>
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
                      <StyledFormLabel>Stock Ticker</StyledFormLabel>
                      <Form.Control
                        value={ticker}
                        type="input"
                        placeholder="AAPL"
                        required
                        onChange={handleOnTickerOnChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStockCompanyName">
                      <StyledFormLabel>Company Name</StyledFormLabel>
                      <Form.Control
                        value={companyName}
                        type="input"
                        placeholder="Apple Inc"
                        required
                        onChange={handleCompanyNameChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStockInitialPrice">
                      <StyledFormLabel>Initial Price</StyledFormLabel>
                      <Form.Control
                        value={initialPrice}
                        type="input"
                        placeholder="50"
                        required
                        onChange={handleOnInitialPriceChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStockQuantity">
                      <StyledFormLabel>Volume</StyledFormLabel>
                      <Form.Control
                        value={volume}
                        type="input"
                        placeholder="1000"
                        required
                        onChange={handleOnVolumeChange}
                      />
                    </Form.Group>
                  </HorizontallyCenterContainer>

                  <StyledButton variant="primary" type="submit" onClick={handleSubmit}>
                    <NoStockText> Save</NoStockText>
                  </StyledButton>
                </Form>
                {saveStocksResponse.error ? (
                  <Alert key={"danger"} variant={"danger"}>
                    <NoStockText>Error saving stock. Please try again!</NoStockText>
                  </Alert>
                ) : (
                  <div></div>
                )}

              </SaveStockContainer>
            </MainContainer>
          </VerticalContainer>
        </HorizontallyCenterContainer>
      </AdminHomePageContainerWrapper>
    );


    if (getUserInfoResponse.data?.type === 'admin') {
      return adminContent;
    } else {
      return noAdminContent;
    }
  };


AdminHomePageContainer.defaultProps = {};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getAllStocks: () => dispatch(getAllStocks()),
    saveStock: (saveStockRequest: Stock) =>
      dispatch(saveStock(saveStockRequest)),
    getUserInfo: () => dispatch(getUserInfo()),
  };
};

const mapStateToProps = (state: any) => {
  return {
    getAllStocksResponse: state.getAllStocksReducer,
    saveStocksResponse: state.saveStockReducer,
    getUserInfoResponse: state.getUserInfoReducer
  };
};

type StateToPropsType = ReturnType<typeof mapStateToProps>;
type DispatchToPropsType = typeof mapDispatchToProps;

export default connect<StateToPropsType, DispatchToPropsType>(
  mapStateToProps,
  mapDispatchToProps
)(AdminHomePageContainer);
