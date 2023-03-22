import React, { useCallback } from "react";
import { useEffect } from "react";
import { Stock } from "../../model/stock";
import { Order } from "../../model/userOrder";
import { IUserHomePageContainerProps } from "./userHomePageContainer";

export function UserHomePageContainerLogic({
  getAllStocks,
  saveOrder,
  saveOrdersResponse,
  getAllStocksResponse,
}: IUserHomePageContainerProps) {
  const [ticker, setTicker] = React.useState<string | undefined>(undefined);
  const [orderNature, setOrderNature] = React.useState<string | undefined>(
    undefined
  );
  const [orderType, setOrderType] = React.useState<string | undefined>(
    undefined
  );
  const [quantity, setQuantity] = React.useState<number | undefined>(undefined);
  const [limitPrice, setLimitPrice] = React.useState<number | undefined>(
    undefined
  );

/*   useEffect(() => {
    const interval = setInterval(() => {
    getAllStocks();
     }, 10000)
     return () => clearInterval(interval);
  }, [getAllStocks]); */

  const handleOnTickerOnChange = (event: any) => {
    const value = event.target.value;
    setTicker(value);
  };

  const handleOrderNatureChange = (event: any) => {
    const value = event.target.value;
    setOrderNature(value);
  };

  const handleOrderTypeChange = (event: any) => {
    const value = event.target.value;
    setOrderType(value);
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
    (event: any) => {
      event.preventDefault();
      if (
        ticker &&
        ticker.length > 0 &&
        orderNature &&
        orderType &&
        quantity &&
        (limitPrice ?? 0) >= 0
      ) {
        const stocks = getAllStocksResponse.data?.filter((stock) => stock.ticker?.toLowerCase() == ticker.toLowerCase());
        console.log("stocks : ", stocks);
        const stock = stocks ? stocks[0] : undefined;
        console.log("stock : ", stock);
        if (stock) {
          const saveOrderRequest = new Order();
          saveOrderRequest.stock_id = stock.id;
          saveOrderRequest.ticker = ticker;
          saveOrderRequest.order_nature = orderNature.toLowerCase() ;
          saveOrderRequest.order_type = orderType.toLowerCase() ;
          saveOrderRequest.quantity = quantity;
          saveOrderRequest.limit_price = limitPrice;
          saveOrder(saveOrderRequest);
        }
      }
    },
    [
      ticker,
      orderNature,
      orderType,
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
      setOrderNature("");
      setOrderType("");
      setLimitPrice(0);
      setQuantity(0);
    }
  }, [saveOrdersResponse, getAllStocks]);

  return {
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
  };
}
