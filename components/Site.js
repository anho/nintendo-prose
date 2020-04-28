import React from "react";
import { client } from "../api/client";
import { Grid, Col } from "./Grid";
import { BlogPostTeaser } from "./BlogPostTeaser";
import { ContentType } from "./ContentType";
import get from "lodash/get";
import Error from "next/error";

// naive approach, see for a more elaborated one: https://nextjs.org/docs/basic-features/pages#scenario-2-your-page-paths-depend-on-external-data
export async function getServerSideProps(context) {
  const {
    query: { slug = [] },
  } = context;
  const pageSlug = "/" + slug.join("/");
  const query = { include: 10, content_type: "page", "fields.slug": pageSlug };
  const {
    total,
    items: [item],
  } = await client.getEntries(query);

  if (total !== 1) {
    return { props: { errorCode: 404 } };
  }

  return { props: { item } };
}

export default function Site({ item, errorCode }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  console.log("ITEM IS", item);

  return (
    <div className="container">
      {item.fields.content.map(({ fields: { columns } }, index) => (
        <Grid cols={columns.length} key={index}>
          {columns.map((column, indexB) => {
            const title = get(column, "fields.content[0].fields.title", "");
            const entry = column.fields.content[0]
            console.log('ENTRY', entry)
            return (
              <Col key={indexB}>
                {/* <BlogPostTeaser title={title} /> */}
                <ContentType entry={entry} />
              </Col>
            );
          })}
        </Grid>
      ))}
      {item.fields.title}
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
