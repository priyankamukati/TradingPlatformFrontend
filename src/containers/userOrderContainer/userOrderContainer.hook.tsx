import React, { useCallback } from "react";
import { useEffect } from "react";
import { Stock } from "../../model/stock";
import { IUserOrderContainerProps } from "./userOrderContainer";

export function UserOrderContainerLogic({
  getUserAllOrders,
}: IUserOrderContainerProps) {
  useEffect(() => {
    getUserAllOrders();
  }, [getUserAllOrders]);
}
