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
  justify-content: center;
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
  justify-content: center;
  margin-top: 20rem;
  
`;

const StyledButton = styled(Button)`
  text-align: center;
  padding-left: 4rem;
  padding-right: 4rem;
  vertical-align: middle;
  font-size: 3em;
  background: linear-gradient(112.4deg, rgb(176, 174, 225) 44.9%, rgb(135, 197, 235) 94.5%);
`;

const LandingPageTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 6em;
  min-width: 30rem;
  margin-left: 3rem;
  margin-top: 2rem;
  color: #c0c0c0;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
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
