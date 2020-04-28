import React from "react";
import styled from "styled-components";
import get from "lodash/get";

const HEIGHT = 385;

const StyledBlogPostTeaser = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url("${(props) => props.imageUrl}");
  background-position: center;
  background-size: cover;
  min-height: ${HEIGHT / 2}px;
  height: 100%;
  padding: 15px;
  justify-content: flex-end;

  .category {
    font-family: Roboto,Helvetica,Arial,sans-serif;
    list-style-type: none;
    -webkit-transition: none;
    font-weight: 700;
    text-transform: uppercase;
    color: #fff!important;
    -webkit-border-radius: 2px;
    line-height: 100%;
    padding: 5px;
    font-size: 60%;
    border-right: none;
    display: inline-block;
    vertical-align: middle;
    background: rgb(230, 0, 18);
    display: inline-block;
    margin-right: 10px;
  }

  ${({ displayType }) => {
    if (displayType === "teaser") {
      return `
      .title {
        font-family: Roboto,Helvetica,Arial,sans-serif;
        list-style-type: none;
        font-weight: 700;
        font-size: 25px !important;
        color: #fff!important;
        font-size: inherit;
        line-height: 135%;
      }

      .subtitle {
        font-family: Roboto,Helvetica,Arial,sans-serif;
        list-style-type: none;
        margin: 0;
        padding: 0;
        font-size: 100%;
        font-weight: 700;
        line-height: 150%;
        color: #c1c1c1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-bottom: 0;
        margin-right: 40px;
      }   
      `;
    }
  }}
`;

export function BlogPostTeaser({
  entry: {
    fields: {
      blogPost: {
        fields: {
          categories,
          title,
          subtitle,
          image: {
            fields: {
              file: { url: imageUrl },
            },
          },
        },
      },
      displayType,
    },
  },
}) {
  const category = get(categories, [0, "fields", "category"], "");
  return (
    <StyledBlogPostTeaser imageUrl={imageUrl} displayType={displayType}>
      <div>
        {category && <span className="category">{category}</span>}
        <span className="title">{title}</span>
      </div>
      <span className="subtitle">{subtitle}</span>
    </StyledBlogPostTeaser>
  );
}
