import React from 'react';
import colors from '../../assets/colors';
import styled from 'styled-components';

interface PaperProps {
  color?: string,
  background?: string,
  hoverBorder?: string,
  border?: string,
  padding?: string,
  margin?: string,
  borderRadius?: string,
  display?: string,
}

const Paper = styled.div<PaperProps>`
  background: ${props => props.background ? props.background : "white"};
  padding: ${props => props.padding ? props.padding : "1em"};
  border-radius: ${props => props.borderRadius ? props.borderRadius : "2px"};
  width: 1579px;
  height: 916px;
  left: 171px;
  top: 86px;
  outline:none;
  border: ${props => props.border ? props.border : "none"};
  margin: ${props => props.margin ? props.margin : "2em 0em"};
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12) !important;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .profile-block {
    width: 48%;
  };
  `

export default Paper;