import { Amplify } from "aws-amplify";
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate } from "react-router-dom";

import config from "../../aws-exports-new";
import { Dispatch, FunctionComponent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
Amplify.configure(config);


const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: radial-gradient(circle at 10% 20%, rgb(0, 52, 89) 0%, rgb(0, 168, 232) 90%);`
;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
;`

const HorizontalCenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 3rem;
;`

const LandingPageTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;  


const BackgroundImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  background:${(props) => `url('${process.env.PUBLIC_URL}/landingpageimage.svg')`};
  background-repeat: no-repeat;
  background-position: right;
  mix-blend-mode: normal;
  height: 80rem;
  width: 100rem;
  background-size: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
`;

const StyledButton = styled(Button)`
  text-align: center;
  padding-left: 4rem;
  padding-right: 4rem;
  vertical-align: middle;
  font-size: 3em;
  background: linear-gradient(114.9deg, rgb(34, 34, 34) 8.3%, rgb(0, 40, 60) 41.6%, rgb(0, 143, 213) 93.4%);
`;

const LandingPageTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 3rem;
  margin-top: 7rem;
  display: flex;
  width: 10rem;
  font-size: 80px;
  line-weight: 40px;
  letter-spacing: 3px;
  font-weight: 200;
  color: white;
`;

const LandingPageDetailTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 3rem;
  margin-top: 10rem;
  display: flex;
  width: 50rem;
  font-size: 50px;
  line-weight: 40px;
  letter-spacing: 3px;
  font-weight: 200;
  color: white;
`;

interface ILandingContainerProps extends WithAuthenticatorProps {}

const LandingContainer: FunctionComponent<ILandingContainerProps> & {
  defaultProps: Partial<ILandingContainerProps>;
} = ({}: ILandingContainerProps) => {
  const navigate = useNavigate();

  


  return (
    <LandingPageContainer>
    <HorizontalContainer>
    <LandingPageTitleContainer>
      <LandingPageTitle>EasyTrading</LandingPageTitle>
      <LandingPageDetailTitle>World's best stock trading platform that makes trading super convenient!</LandingPageDetailTitle>
      <HorizontalCenterContainer>
      <ButtonContainer>
      <StyledButton variant="primary" type="submit" onClick={() => {navigate('/login')}}>
          Get Started
      </StyledButton>
      </ButtonContainer>
      </HorizontalCenterContainer>
    </LandingPageTitleContainer>
    <BackgroundImageContainer>
    </BackgroundImageContainer>
    </HorizontalContainer>
    </LandingPageContainer>
  )
};

LandingContainer.defaultProps = {};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {};
};

const mapStateToProps = (state: any) => {
  return {};
};

type StateToPropsType = ReturnType<typeof mapStateToProps>;
type DispatchToPropsType = typeof mapDispatchToProps;

export default 
  connect<StateToPropsType, DispatchToPropsType>(
    mapStateToProps,
    mapDispatchToProps
  )(LandingContainer);
