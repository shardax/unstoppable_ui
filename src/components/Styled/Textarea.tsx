import React from 'react';
import colors from '../../assets/colors';
import styled from 'styled-components';

interface TextareaProps {
  color?: string,
  background?: string,
  focusBorder?: string,
  border?: string,
  padding?: string,
  margin?: string,
  fontSize?: string,
  borderRadius?: string,
  height?: string,
  width?: string,
  overflow?: string
}

const Textarea = styled.textarea<TextareaProps>`
  color: ${props => props.color ? props.color : "#484848"};
  background: ${props => props.background ? props.background : "#ffffff"};
  padding: ${props => props.padding ? props.padding : "4px 8px"};
  border-radius: ${props => props.borderRadius ? props.borderRadius : "5px"};
  font-size: ${props => props.fontSize ? props.fontSize : "14px"};
  border: ${props => props.border ? props.border : "1px solid #b9b9b9"};
  border-radius: ${props => props.borderRadius ? props.borderRadius : "50px"};
  margin: ${props => props.margin ? props.margin : "0"};
  height: ${props => props.height ? props.height : "100px"};
  min-width: 25em;
  width: ${props => props.width ? props.width : "auto"};
  font-weight: 400;
  outline: none;
  overflow: ${props => props.overflow ? props.overflow : "none"};
  outline-style: none;
  resize: none;
  &:focus, &:not(:placeholder-shown) {
    border: ${props => props.focusBorder ? props.focusBorder : "1px solid " + colors.primary};
  }
`

export default Textarea;