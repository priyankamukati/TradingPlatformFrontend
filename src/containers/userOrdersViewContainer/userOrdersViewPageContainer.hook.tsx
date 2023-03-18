import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { Stock } from '../../model/stock';
import { IUserOrdersViewPageContainerProps } from './userOrdersViewPageContainer';

export function UserOrdersViewPageContainerLogic({ getUserAllOrders}: IUserOrdersViewPageContainerProps) {
  

  useEffect(() => {
    getUserAllOrders();
  }, [getUserAllOrders]);



}