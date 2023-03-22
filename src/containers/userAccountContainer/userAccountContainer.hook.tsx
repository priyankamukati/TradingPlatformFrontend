import React, { useCallback } from "react";
import { useEffect } from "react";
import { Stock } from "../../model/stock";
import { UpdateUserCashBalance } from "../../model/UpdateUserCashBalance";
import { UserInfo } from "../../model/userInfo";
import { IUserAccountContainerProps } from "./userAccountContainer";

export function UserAccountContainerLogic({
  getUserCashBalance,
  saveUserCashBalance,
  saveUserCashBalanceResponse,
}: IUserAccountContainerProps) {
  const [cashBalance, setCashBalance] = React.useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    getUserCashBalance();
  }, [getUserCashBalance]);

  const handleOnCashBalanceOnChange = (event: any) => {
    try {
      const value = parseInt(event.target.value);
      setCashBalance(value);
    } catch (e) {
      setCashBalance(0);
    }
  };

  const handleDeposit = useCallback(
    (event: any) => {
      event.preventDefault();
      if (cashBalance != undefined) {
        const saveUserCashBalanceRequest = new UpdateUserCashBalance();

        saveUserCashBalanceRequest.amount = cashBalance;

        saveUserCashBalance(saveUserCashBalanceRequest);
      }
    },
    [saveUserCashBalance, cashBalance]
  );

  const handleWithdraw = useCallback(
    (event: any) => {
      event.preventDefault();
      if (cashBalance != undefined) {
        const saveUserCashBalanceRequest = new UpdateUserCashBalance();

        saveUserCashBalanceRequest.amount = -1 * cashBalance;

        saveUserCashBalance(saveUserCashBalanceRequest);
      }
    },
    [saveUserCashBalance, cashBalance]
  );

  useEffect(() => {
    if (saveUserCashBalanceResponse.data) {
      getUserCashBalance();
    }
  }, [saveUserCashBalanceResponse]);

  return {
    handleDeposit,
    handleWithdraw,
    handleOnCashBalanceOnChange,
  };
}
