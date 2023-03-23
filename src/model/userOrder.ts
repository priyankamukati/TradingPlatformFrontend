export class Order {
  public id: number | undefined = undefined;
  public limit_price: number | undefined = undefined;
  public ticker: string | undefined = undefined;
  public company_name: string | undefined = undefined;
  public order_nature: string | undefined = undefined;
  public order_type: string | undefined = undefined;
  public quantity: number | undefined = undefined;
  public stock_id: number | undefined = undefined;
  public status: string | undefined = undefined;
  public status_reason: string | undefined = undefined;
  public update_date: string | undefined = undefined;
}

export class CancelOrder {
  public order_id: number | undefined = undefined;
}
