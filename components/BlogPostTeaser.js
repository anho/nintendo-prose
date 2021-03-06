import React from "react";
import styled from "styled-components";
import get from "lodash/get";

const HEIGHT = 385;

const DISPLAY_TYPES = {
  TEASER: "teaser",
  IMAGE_TOP: "image-top",
  IMAGE_LEFT: "image-left",
};

const StyledBlogPostTeaser = styled.div`
  & ~ & {
    margin-top: 15px;
  }

  a {
    text-decoration: none;
  }

  display: flex;
  flex-direction: column;
  min-height: ${HEIGHT / 2}px;
  height: 100%;
  padding: 15px;
  justify-content: flex-end;

  .category {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    list-style-type: none;
    -webkit-transition: none;
    font-weight: 700;
    text-transform: uppercase;
    color: #fff !important;
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

  ${({ displayType, imageUrl }) => {
    if (displayType === DISPLAY_TYPES.TEASER) {
      return `
        background-image: url("${imageUrl}");
        background-position: center;
        background-size: cover;

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

    if (displayType === DISPLAY_TYPES.IMAGE_TOP) {
      return `
        .post-image {
          background-image: url("${imageUrl}");
          background-position: center;
          background-size: cover;
          width: 100%;
          height: 300px;
        }

        .title {
          font-family: Roboto,Helvetica,Arial,sans-serif;
          font-size: 28px;
          font-weight: 700;
          line-height: 125%;
          color: #555;
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
      {displayType === DISPLAY_TYPES.IMAGE_TOP && (
        <div className="post-image" />
      )}
      <div>
        {category && <span className="category">{category}</span>}
        <a href="/news/2020/04/nintendo_goes_big_with_latest_animal_crossing_new_horizons_tv_ad_campaign">
          <span className="title">{title}</span>
        </a>
      </div>
      <span className="subtitle">{subtitle}</span>
    </StyledBlogPostTeaser>
  );
}
