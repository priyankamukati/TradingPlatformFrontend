export class UserInfo {
  public cash_balance: number | undefined = undefined;
  public full_name: string | undefined = undefined;
  public username: string | undefined = undefined;
  public passcode: string | undefined = undefined;
  public email: string | undefined = undefined;
}

export class SaveUserInfo extends UserInfo {
  public type: string | undefined = undefined;
}

export class GetUserInfo extends UserInfo {
  public type: string | undefined = undefined;
}
