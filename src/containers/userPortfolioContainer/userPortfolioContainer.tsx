import styled from "styled-components";
import { FunctionComponent, Dispatch } from "react";
import { connect } from "react-redux";
import { UserPortfolioContainerLogic } from "./userPortfolioContainer.hook";
import { getUserStocks } from "../../store/getUserStocks.slice";
import { userStock } from "../../model/userStock";
import { State } from "../../model/state";
import { Spinner } from "react-bootstrap";
import { LoadingState } from "../../model/loadingState";
import Alert from "react-bootstrap/Alert";
import NavigationBar from "../../layout/navigationBar";

const UserPortfolioContainerWrapper = styled.div`
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
  width: 10rem;
  font-size: 60px;
  line-weight: 40px;
  letter-spacing: 0.25px;
  font-weight: 200;
  margin-top: 2rem;
  margin-left: 4rem;
`;


export interface IUserPortfolioContainerProps {
  getUserStocks: typeof getUserStocks;
  getUserStocksResponse: State<userStock[]>;
}

const UserPortfolioContainer: FunctionComponent<IUserPortfolioContainerProps> & {
  defaultProps: Partial<IUserPortfolioContainerProps>;
} = ({ getUserStocks, getUserStocksResponse }: IUserPortfolioContainerProps) => {
  UserPortfolioContainerLogic({ getUserStocks } as IUserPortfolioContainerProps);

  const portfolioHeaders = <Alert key={'primary'} variant={'primary'}><HorizontalContainer>
  <StockHeaderText>{'Ticker'}</StockHeaderText>
  <StockHeaderText>{'Company'}</StockHeaderText>
  <StockHeaderText>{'Current Price'}</StockHeaderText>
  <StockHeaderText>{'Volume'}</StockHeaderText>
  <StockHeaderText>{'Total Asset'}</StockHeaderText>
</HorizontalContainer></Alert>

const portfolioData = <div>{getUserStocksResponse.data && getUserStocksResponse.data.length > 0 ? getUserStocksResponse.data.map((stock) => (
  <Alert key={stock.ticker} variant={'success'}>
    <HorizontalContainer>
      <StockText>{stock.ticker}</StockText>
      <StockText>{stock.company_name}</StockText>
      <StockText>{stock.current_price ? stock.current_price.toFixed(2) : ''}</StockText>
      <StockText>{stock.quantity ? stock.quantity.toFixed(2) : ''}</StockText>
      <StockText>{stock.quantity && stock.current_price ? (stock.quantity * stock.current_price).toFixed(2) : 0}</StockText>
    </HorizontalContainer>
  </Alert>
)) : <Alert key={'no-stock'} variant={'danger'}>
  <NoStockText>No stocks added to the platform</NoStockText>
</Alert>
}</div>

const portfolioTable = <div>
<div>{portfolioHeaders}</div>
<div>{portfolioData}</div>
</div>

  return (
    <UserPortfolioContainerWrapper>
      <NavigationBar></NavigationBar>
      <PageTitleText>Portfolio</PageTitleText>
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
              {portfolioTable}
              {getUserStocksResponse.error ? (
              <Alert key={"danger"} variant={"danger"}>
                <NoStockText>Error retrieving stocks data. Please try again after sometime!</NoStockText>
              </Alert>
            ) : (
              <div></div>
            )}
            </VerticalContainer>
          </GetStockContainer>
        </VerticalContainer>
        </HorizontallyCenterContainer>    
    </UserPortfolioContainerWrapper>
  );
};

UserPortfolioContainer.defaultProps = {};

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
)(UserPortfolioContainer);
