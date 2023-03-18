import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { Stock } from '../../model/stock';
import { Order } from '../../model/userOrder';
import { IOrderPageContainerProps } from './orderPageContainer';

export function OrderPageContainerLogic({ getAllStocks, saveOrder, saveOrdersResponse }: IOrderPageContainerProps) {
  
  const [ticker, setTicker] = React.useState<string|undefined>(undefined);
  const [companyName, setCompanyName] = React.useState<string|undefined>(undefined);
  const [orderNature, setOrderNature] = React.useState<string|undefined>(undefined);
  const [orderType, setOrderType] = React.useState<string|undefined>(undefined);
  const [quantity, setQuantity] = React.useState<number|undefined>(undefined);
  const [limitPrice, setLimitPrice] = React.useState<number|undefined>(undefined);

  useEffect(() => {
    getAllStocks();
  }, [getAllStocks]);

  const handleOnTickerOnChange = (event: any) => {
    const value = event.target.value;
    setTicker(value);
  }
  const handleCompanyNameChange = (event: any) => {
    const value = event.target.value;
    setCompanyName(value);
  }

  const handleOrderNatureChange = (event: any) => {
    const value = event.target.value;
    setOrderNature(value);
  }
  const handleOrderTypeChange = (event: any) => {
    const value = event.target.value;
    setOrderType(value);
  }
  
    
  const handleOnQuantityChange = (event: any) => {
    try {
    const value = parseInt(event.target.value);
    setQuantity(value);
  } catch(e) {
    setQuantity(0)
  }
  }

  const handleOnSetLimitPriceChange = (event: any) => {
    try{
    const value = parseInt(event.target.value);
    setLimitPrice(value);
    } catch(e) {
        setLimitPrice(0)
    }
  }

  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();
    if(ticker && ticker.length > 0 && orderNature && companyName && orderType && quantity && ((limitPrice?? 0) >=0)) {
      const saveOrderRequest = new Order();
      saveOrderRequest.user_id = 1;
      saveOrderRequest.stock_id = 1;
      saveOrderRequest.ticker = ticker;
      saveOrderRequest.company_name = companyName;
      saveOrderRequest.order_nature = orderNature;
      saveOrderRequest.order_type = orderType;
      saveOrderRequest.quantity = quantity;
      saveOrderRequest.limit_price = limitPrice;
      saveOrder(saveOrderRequest)
    }
  }, [ticker, companyName, orderNature, orderType,quantity, limitPrice,saveOrder]);

  useEffect(() => {
    if(saveOrdersResponse.data) {
      getAllStocks();
      setTicker('');
      setCompanyName('');
      setOrderNature('');
      setOrderType('');
      setLimitPrice(0);
      setQuantity(0)
    }
  }, [saveOrdersResponse, getAllStocks]);

  return {
    ticker, companyName, orderNature, orderType,quantity, limitPrice,
    handleOnTickerOnChange, handleCompanyNameChange, handleOrderNatureChange, handleOrderTypeChange, handleOnQuantityChange,
    handleOnSetLimitPriceChange, handleSubmit
  }

}