import styled from "styled-components";
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
