import React from 'react';
import colors from '../../assets/colors';
import styled from 'styled-components';

interface InputProps {
  color?: string,
  background?: string,
  focusBorder?: string,
  border?: string,
  padding?: string,
  margin?: string,
  fontSize?: string,
  borderRadius?: string
}

const Input = styled.input<InputProps>`
  color: ${props => props.color ? props.color : "#484848"};
  background: ${props => props.background ? props.background : "#ffffff"};
  padding: ${props => props.padding ? props.padding : "4px 16px"};
<<<<<<< HEAD
  min-width: 25em;
=======
>>>>>>> master
  height: 50px;
  border-radius: ${props => props.borderRadius ? props.borderRadius : "5px"};
  font-weight: 400;
  font-size: ${props => props.fontSize ? props.fontSize : "14px"};
  outline:none;
  border: ${props => props.border ? props.border : "1px solid #b9b9b9"};
  margin: ${props => props.margin ? props.margin : "0"};
  &:focus, &:not(:placeholder-shown) {
    border: ${props => props.focusBorder ? props.focusBorder : "1px solid " + colors.primary};
  }
`

export default Input;