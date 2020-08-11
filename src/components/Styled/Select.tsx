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
  background: ${props => props.background ? props.background : "white"};
  padding: ${props => props.padding ? props.padding : "0.3em"};
  min-width: 12em;
  height: 40px;
  border-radius: ${props => props.borderRadius ? props.borderRadius : "5px"};
  font-weight: 400;
  font-size: ${props => props.fontSize ? props.fontSize : "14px"};
  outline:none;
  border: ${props => props.border ? props.border : "none" };
  margin: ${props => props.margin ? props.margin : "0"};
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;       /* Remove default arrow */
  // background-image: url(...);   /* Add custom arrow */

  border: 1px solid #b9b9b9;
  display: inline-block;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  

  background-image:
    linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
  
  &:focus {
    background-image:
      linear-gradient(45deg, ${colors.primary} 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, ${colors.primary} 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position:
      calc(100% - 15px) 1em,
      calc(100% - 20px) 1em,
      calc(100% - 2.5em) 0.5em;
    background-size:
      5px 5px,
      5px 5px,
      1px 1.5em;
    background-repeat: no-repeat;
    border: ${props => props.focusBorder ? props.focusBorder : "1px solid " + colors.primary};
    outline: 0;
  }
  
  
  select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }

  .selector {
    background-color: #b9b9b9;
    padding: 1em;
  }
`

export default Input;