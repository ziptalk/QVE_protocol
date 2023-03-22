import styled, { keyframes } from "styled-components";
import AptosLogo from "../../../../assets/img/AptosLogo.png";
import UsdtIcon from "../../../../assets/img/UsdtIcon.png";

export const TOKEN = [
  {
    logo: AptosLogo,
    name: "APT",
    description: "Aptos coin",
    subname: "Aptos",
  },
  {
    logo: UsdtIcon,
    name: "USDT",
    description: "Tether USD",
    subname: "USDT",
  },
  {
    logo: "https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png",
    name: "USDC",
    description: "USD Circle",
    subname: "USDC",
  },
];

export const Label = styled.span`
  font-size: 12px;
  text-align: center;
`;

export const Cell = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

export const Caption = styled.span`
  font-size: 9px;
  font-weight: 700;
`;

export const Body = styled.span`
  font-size: 11px;
  font-weight: 400;
`;

export const Heading5 = styled.span`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

export const Heading4 = styled.span`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

export const Heading3 = styled.span`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

export const Heading1 = styled.span`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  transition: all 0.1s;
`;

export const Input = styled.span`
  font-size: 16px;
  font-weight: 400;
`;

export const Aum = styled.span`
  font-size: 12px;
  font-weight: 600;
`;

export const CustomButton = styled.button`
  width: 100%;
  height: 55px;
  border: none;
  background-color: #4a3ce8;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 15px;
`;

export const Logo = styled.img`
  width: 31px;
  height: 31px;
  border-radius: 100%;
`;

/**
 * 맥시멈 값이면 max={true}
 * 아직 남았으면 false
 */
export const MaxButton = styled.button`
  border: none;
  color: white;
  width: 54px;
  height: 27px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

export const CustomInputWrapper = styled.div`
  width: 100%;
  min-height: 75px;
  border-radius: 15px;
  border: 1px solid #3f3f46;
  padding: 14px;
`;

export const InputUpperBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StartBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

export const DescriptionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  gap: 3px;
`;

export const Description = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LoadingBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

export const loader = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

export const LoadingSpinner = styled.div`
  border: 0.2em solid transparent;
  border-top-color: currentcolor;
  border-radius: 50%;
  animation: 1s ${loader} linear infinite;
  color: white;
  font-size: 124px;
  position: relative;
`;

export const LoadingCenter = styled.div`
  width: 36px;
  height: 36px;
  background-color: #2b2b34;
  position: absolute;
  border-radius: 100%;
`;
