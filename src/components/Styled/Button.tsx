import React from 'react';
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
  background: ${props => props.background ? props.background : colors.activebuttonBackground};
  padding: ${props => props.padding ? props.padding : "4px 6px"};
  min-width: 20px;
  border-radius: ${props => props.borderRadius ? props.borderRadius : "5px"};
  font-weight: 700;
  font-size: ${props => props.fontSize ? props.fontSize : "16px"};
  outline:none;
  border: ${props => props.border ? props.border : "none"};
  margin: ${props => props.margin ? props.margin : "0"};
`

export default Button;