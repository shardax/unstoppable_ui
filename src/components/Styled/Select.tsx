import React from 'react';
import colors from '../../assets/colors';
import styled from 'styled-components';

interface SelectProps {
  color?: string,
  background?: string,
  focusBorder?: string,
  border?: string,
  padding?: string,
  margin?: string,
  fontSize?: string,
  borderRadius?: string
}

const Input = styled.select<SelectProps>`
  color: ${props => props.color ? props.color : "#484848"};
  background: ${props => props.background ? props.background : "#f0f0f0"};
  padding: ${props => props.padding ? props.padding : "0.3em"};
  min-width: 25em;
  height: 50px;
  border-radius: ${props => props.borderRadius ? props.borderRadius : "5px"};
  font-weight: 400;
  font-size: ${props => props.fontSize ? props.fontSize : "14px"};
  outline:none;
  border: ${props => props.border ? props.border : "none" };
  margin: ${props => props.margin ? props.margin : "0"};
  cursor: pointer;
  &:after {
    position: absolute;
    content: "";
    top: 14px;
    right: 10px;
`

export default Input;