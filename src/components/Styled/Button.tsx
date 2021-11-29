import React from 'react';
import forgot_password from '../../assets/submit';
import colors from '../../assets/colors';
import styled from 'styled-components';

interface ButtonProps {
  color?: string,
  background?: string,
  hoverBorder?: string,
  border?: string,
  padding?: string,
  margin?: string,
  fontSize?: string,
  borderRadius?: string
}

const Button = styled.button<ButtonProps>`
  color: ${props => props.color ? props.color : "#f0658c"};
  height: 52px;
  left: 750px;
  top: 731px;
  background: ${props => props.background ? props.background : forgot_password.buttonBackground};

  padding: ${props => props.padding ? props.padding : "4px 6px"};
  border-radius: ${props => props.borderRadius ? props.borderRadius : "6px"};
  font-weight: 700;
  font-size: ${props => props.fontSize ? props.fontSize : "16px"};
  outline:none;
  border: ${props => props.border ? props.border : "none"};
  // margin: ${props => props.margin ? props.margin : "0"};
  margin-left: 45px;
`

export default Button;