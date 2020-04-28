import React from "react";
import styled from "styled-components";

const StyledHeading = styled.h1`
  color: white;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 0.08) 60%,
    rgba(0, 0, 0, 0.08) 100%
  );

  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: bold;
  color: #fff;
  line-height: 32px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  font-weight: 700;
  font-size: 24px;
  padding-left: 5px;
  text-decoration: none;
  width: 100%;
  margin: 0;
  padding: 15px;
`;

export function SectionHeading({
  entry: {
    fields: { title },
  },
}) {
  return (
    <div style={{ backgroundColor: "#e60012" }}>
      <StyledHeading>{title}</StyledHeading>
    </div>
  );
}
