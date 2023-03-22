import React, { useCallback } from "react";
import { useEffect } from "react";
import { Stock } from "../../model/stock";
import { UserInfo } from "../../model/userInfo";
import { IUserInfoPageContainerProps } from "./userInfoContainer";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { LoadingState } from "../../model/loadingState";

export function UserInfoPageContainerLogic({
  saveUserInfo,
  saveUserInfoResponse,
}: IUserInfoPageContainerProps) {
  const [fullName, setFullName] = React.useState<string | undefined>(undefined);
  const [userName, setUserName] = React.useState<string | undefined>(undefined);
  const [passcode, setPasscode] = React.useState<string | undefined>(undefined);
  const [email, setEmail] = React.useState<string | undefined>(undefined);
  const [password, setPassword] = React.useState<string | undefined>(undefined);
  const navigate = useNavigate();

  // useEffect(() => {
  //   getAllStocks();
  // }, [getAllStocks]);

  const handleOnTickerOnChange = (event: any) => {
    const value = event.target.value;
    setFullName(value);
  };

  const handleCompanyNameChange = (event: any) => {
    const value = event.target.value;
    setUserName(value);
  };

  const handleOnInitialPriceChange = (event: any) => {
    const value = event.target.value;
    setPasscode(value);
  };

  const handleOnEmailChange = (event: any) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleOnPasswordChange = (event: any) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSignUp = async (
    user_name: string,
    emailfield: string,
    password: string,
    fullName: string,
    passcode: string
  ) => {
    // custom username
    let attributes: any = {};
    let username = emailfield.toLowerCase();
    attributes.email = email;
    attributes.nickname = passcode;
    attributes.name = fullName;
    attributes.preferred_username = user_name.toLowerCase();
    return Auth.signUp({
      username,
      password,
      attributes,
      autoSignIn: {
        enabled: true,
      },
    });
  };

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      if (email && password && fullName && userName && passcode) {
        const user = await handleSignUp(
          userName,
          email,
          password,
          fullName,
          passcode
        );
        if (user) {
          const signedInUser = await Auth.signIn(email, password);
          if (signedInUser) {
            const saveUserInfoRequest = new UserInfo();
            saveUserInfoRequest.full_name = fullName;
            saveUserInfoRequest.username = userName;
            saveUserInfoRequest.passcode = passcode;
            saveUserInfoRequest.email = email;
            saveUserInfo(saveUserInfoRequest);
          }
        }
      }
    },
    [fullName, userName, passcode, email, password, handleSignUp]
  );

  useEffect(() => {
    if (saveUserInfoResponse.error) {
      // error stuff
    } else if (
      saveUserInfoResponse.data &&
      saveUserInfoResponse.loading == LoadingState.Idle
    ) {
      localStorage.setItem("user_type", saveUserInfoResponse?.data?.type ?? "");

      if (saveUserInfoResponse.data?.type == "admin") {
        navigate("/admin");
      } else {
        navigate("/userorder");
      }
    }
  }, [saveUserInfoResponse]);

  useEffect(() => {
    if (saveUserInfoResponse.data) {
      setEmail("");
      setFullName("");
      setUserName("");
      setPasscode("");
      setPassword("");
      navigate(`/`);
    }
  }, [saveUserInfoResponse]);

  return {
    fullName,
    userName,
    passcode,
    email,
    password,
    handleOnTickerOnChange,
    handleCompanyNameChange,
    handleOnInitialPriceChange,
    handleSubmit,
    handleOnEmailChange,
    handleOnPasswordChange,
  };
}
