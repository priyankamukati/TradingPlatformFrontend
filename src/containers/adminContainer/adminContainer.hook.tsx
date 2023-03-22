import React, { useCallback } from "react";
import { useEffect } from "react";
import { Stock } from "../../model/stock";
import { IAdminHomePageContainerProps } from "./adminContainer";

export function AdminHomePageContainerLogic({
  getAllStocks,
  saveStock,
  saveStocksResponse,
  getUserInfo,
  getUserInfoResponse
}: IAdminHomePageContainerProps) {
  const [ticker, setTicker] = React.useState<string | undefined>(undefined);
  const [companyName, setCompanyName] = React.useState<string | undefined>(
    undefined
  );
  const [initialPrice, setInitialPrice] = React.useState<number | undefined>(
    undefined
  );
  const [volume, setVolume] = React.useState<number | undefined>(undefined);

  useEffect(() => {
    getAllStocks();
  }, [getAllStocks]);


  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);
  

  const handleOnTickerOnChange = (event: any) => {
    const value = event.target.value;
    setTicker(value);
  };

  const handleCompanyNameChange = (event: any) => {
    const value = event.target.value;
    setCompanyName(value);
  };

  const handleOnInitialPriceChange = (event: any) => {
    try {
      const value = parseInt(event.target.value);
      setInitialPrice(value);
    } catch (e) {
      setInitialPrice(0);
    }
  };

  const handleOnVolumeChange = (event: any) => {
    try {
      const value = parseInt(event.target.value);
      setVolume(value);
    } catch (e) {
      setVolume(0);
    }
  };

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      if (
        ticker &&
        ticker.length > 0 &&
        initialPrice &&
        companyName &&
        initialPrice &&
        volume
      ) {
        const saveStockRequest = new Stock();
        saveStockRequest.ticker = ticker;
        saveStockRequest.company_name = companyName;
        saveStockRequest.initial_price = initialPrice;
        saveStockRequest.current_price = initialPrice;
        saveStockRequest.volume = volume;
        saveStock(saveStockRequest);
      }
    },
    [ticker, companyName, initialPrice, volume, saveStock]
  );

  useEffect(() => {
    if (saveStocksResponse.data) {
      getAllStocks();
      setTicker("");
      setCompanyName("");
      setInitialPrice(0);
      setVolume(0);
    }
  }, [saveStocksResponse, getAllStocks]);

  return {
    ticker,
    companyName,
    initialPrice,
    volume,
    handleOnTickerOnChange,
    handleCompanyNameChange,
    handleOnInitialPriceChange,
    handleOnVolumeChange,
    handleSubmit,
  };
}
