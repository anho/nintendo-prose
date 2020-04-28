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

  img {
    max-width: 50%;
  }

  .author {
  }

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

  .title {
    font-family: Roboto,Helvetica,Arial,sans-serif;
    list-style-type: none;
    font-weight: 700;
    font-size: 25px !important;
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

}}
`;

const StyledList = styled.ul`
  list-style: none;
  display: inline-flex;
  
  li {
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
`;

const CategoryList = ({ categories }) => {
  return (
    <StyledList>
      {categories.map(({ fields: { category } }) => {
        return <li key={category}>{category}</li>;
      })}
    </StyledList>
  );
};

const Title = ({ text }) => {
  return (<h1 className="title">{text}</h1>);
};

const SubTitle = ({ text }) => {
  if (!text) {
    return null;
  }

  return (<div className="subtitle">{text}</div>);
};

const Author = ({ author }) => {
  const { fields: { name, avatar, handle } } = author;

  return (
    <div className="author">
      <Image image={avatar}/> by {name}
    </div>
  )
};

const Image = ({ image }) => {
  if (!image) {
    return null;
  }

  const { fields: { file: { url }, title } } = image;
  return (<img src={url} alt={title}/>);
};

const BlogPost = ({ entry: { fields } }) => {
  const { author, title, subtitle, image, body, categories } = fields;
  const htmlBody = documentToHtmlString(body);

  return (
    <StyledBlogPost>
      <CategoryList categories={categories}/>
      <Title text={title}/>
      <SubTitle text={subtitle}/>
      <Author author={author}/>
      <Image image={image}/>
      <div dangerouslySetInnerHTML={{ __html: htmlBody }}/>
    </StyledBlogPost>
  );
};

export default BlogPost;
