/**
 * This component will render the appropriate React component
 * for any content type based on the content type name in the sys prop
 */

import React from "react";
import get from "lodash/get";
import { CONTENT_TYPE_IDS } from "../api/config";
import { BlogPostTeaser } from "./BlogPostTeaser";
import BlogPost from "./BlogPost";

function renderAppropriateComponent(entry) {
  const contentTypeId = get(entry, "sys.contentType.sys.id");

  switch (contentTypeId) {
    case CONTENT_TYPE_IDS.BLOG_POST_TEASER:
      return <BlogPostTeaser entry={entry} />;
    case CONTENT_TYPE_IDS.BLOG_POST:
      return <BlogPost entry={entry} />;
    default:
      return null;
  }
}

export class ContentType extends React.Component {
  render() {
    return renderAppropriateComponent(this.props.entry);
  }
}

export default ContentType;
