import React, { useCallback } from "react";
import { useEffect } from "react";
import { IUserHomePageContainerProps } from "./userHomePageContainer";

export function UserHomePageContainerLogic({
  getUserStocks,
}: IUserHomePageContainerProps) {
  useEffect(() => {
    getUserStocks();
  }, [getUserStocks]);
}
