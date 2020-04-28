import React from "react";
import { client } from "../api/client";
import { Grid, Col } from "./Grid";
import { BlogPostTeaser } from "./BlogPostTeaser";
import { ContentType } from "./ContentType";
import { Header } from "./Header";
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
    <>
      <Header />
      <div className="container">
        {item.fields.content.map(({ fields: { columns } }, index) => (
          <Grid cols={columns.length} key={index}>
            {columns.map((column, indexB) => {
              const title = get(column, "fields.content[0].fields.title", "");
              const entries = column.fields.content;
              return (
                <Col key={indexB}>
                  {entries.map((entry, entryIndex) => (
                    <ContentType entry={entry} key={entryIndex} />
                  ))}
                </Col>
              );
            })}
          </Grid>
        ))}
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

          html,
          body {
            display: flex;
            flex-direction: column;
            min-height: 100%;
            margin: 0;
            font-family: "Roboto", sans-serif;
          }

          body {
            background-image: url("https://images.ctfassets.net/rjvs8luxqaq7/5drj1bwoWW4ig6hOBoarLZ/c557ca8a273705d8b511e010b4525465/bg.png");
            background-origin: padding-box;
            background-position-x: 50%;
            background-position-y: 0%;
            background-size: auto;
            padding: 0;
          }

          * {
            box-sizing: border-box;
          }

          .container {
            max-width: 1200px;
          }
        `}</style>
      </div>
    </>
  );
}
