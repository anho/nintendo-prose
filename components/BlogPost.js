import React from "react";
import styled from "styled-components";
import get from "lodash/get";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const StyledBlogPost = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url("${(props) => props.imageUrl}");
  background-position: center;
  background-size: cover;
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

const BlogPost = ({ entry: { fields } }) => {
  const { author, title, subtitle, image, body, categories } = fields;
  const htmlBody = documentToHtmlString(body);

  return (
    <StyledBlogPost>
      <div></div>
      <div></div>
      <div dangerouslySetInnerHTML={{ __html: htmlBody }}/>
    </StyledBlogPost>
  );
};

export default BlogPost;
