import { useEffect } from "react";
import { IUserPortfolioContainerProps } from "./userPortfolioContainer";

export function UserPortfolioContainerLogic({
  getUserStocks,
}: IUserPortfolioContainerProps) {
  useEffect(() => {
    getUserStocks();
  }, [getUserStocks]);
}
