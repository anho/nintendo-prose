import React from "react";
import styled from "styled-components";

export const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: ${({ cols }) => `${100 / cols}%`}
  flex-wrap: wrap;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
