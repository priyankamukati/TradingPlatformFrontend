import React, { useCallback } from "react";
import { useEffect } from "react";
import { Order } from "../../model/userOrder";
import { IUserHomePageContainerProps } from "./userHomePageContainer";

const limitValueOptions = [
  { name: 'Market', value: "1" },
  { name: 'Limit', value: "2" },
];

export function UserHomePageContainerLogic({
  getAllStocks,
  saveOrder,
  saveOrdersResponse,
  getAllStocksResponse,
}: IUserHomePageContainerProps) {
  const [ticker, setTicker] = React.useState<string | undefined>(undefined);

  const [quantity, setQuantity] = React.useState<number | undefined>(undefined);
  const [limitPrice, setLimitPrice] = React.useState<number | undefined>(
    undefined
  );

  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );

  const [limitValueChecked, setLimitValueChecked] = React.useState<string>(
    '1'
  );


  useEffect(() => {
    const interval = setInterval(() => {
    getAllStocks();
     }, 1000)
     return () => clearInterval(interval);
  }, [getAllStocks]);

  const handleOnTickerOnChange = (event: any) => {
    const value = event.target.value;
    setTicker(value);
  };

  const handleOnQuantityChange = (event: any) => {
    try {
      const value = parseInt(event.target.value);
      setQuantity(value);
    } catch (e) {
      setQuantity(0);
    }
  };

  const handleOnSetLimitPriceChange = (event: any) => {
    try {
      const value = parseInt(event.target.value);
      setLimitPrice(value);
    } catch (e) {
      setLimitPrice(0);
    }
  };

  const handleSubmit = useCallback(
    (event: any, isBuy: boolean) => {
      event.preventDefault();
      if (
        ticker &&
        ticker.length > 0 &&
        limitValueChecked &&
        quantity &&
        (limitPrice ?? 0) >= 0
      ) {
        const stocks = getAllStocksResponse.data?.filter((stock) => stock.ticker?.toLowerCase() == ticker.toLowerCase());

        const stock = stocks ? stocks[0] : undefined;

        if (stock) {
        
          const saveOrderRequest = new Order();
          saveOrderRequest.stock_id = stock.id;
          saveOrderRequest.ticker = ticker;
          saveOrderRequest.order_type = limitValueChecked == "1" ? 'market' : 'limit' ;
          saveOrderRequest.order_nature  = isBuy ? 'buy' : 'sell';
          saveOrderRequest.quantity = quantity;
          saveOrderRequest.limit_price = limitPrice;
          saveOrder(saveOrderRequest);
        } else {
          setErrorMessage("The platform doesn't support the stock ticker")
        }
      } else {
        setErrorMessage('Error placing order. Make sure the form fields are submitted correctly')
      }
    },
    [
      ticker,
      limitValueChecked,
      quantity,
      limitPrice,
      saveOrder,
      getAllStocksResponse,
    ]
  );

  useEffect(() => {
    if (saveOrdersResponse.data) {
      getAllStocks();
      setTicker("");
      setLimitValueChecked("1");
      setLimitPrice(0);
      setQuantity(0);
    }
  }, [saveOrdersResponse, getAllStocks]);

  return {
    ticker,
    quantity,
    limitPrice,
    handleOnTickerOnChange,
    handleOnQuantityChange,
    handleOnSetLimitPriceChange,
    errorMessage,
    limitValueOptions,
    limitValueChecked,
    setLimitValueChecked,
    handleSubmit
  };
}
