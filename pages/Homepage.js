import React from "react";
import get from "lodash/get";
import { client } from "../api/client";
import { Grid, Col } from "../components/Grid";
import { BlogPostTeaser } from "../components/BlogPostTeaser";

const HOMEPAGE_ENTRY_ID = "1nAmfd2ZDp7864RPUwtNxw";

export default class Homepage extends React.Component {
  state = {
    content: null,
  };

  async componentDidMount() {
    const content = await client.getEntry(HOMEPAGE_ENTRY_ID, { include: 10 });
    this.setState({ content });
  }

  render() {
    if (!this.state.content) {
      return <div>Loading...</div>;
    }

    const {
      content: {
        fields: { content },
      },
    } = this.state;

    return content.map(({ fields: { columns } }, index) => (
      <Grid cols={columns.length} key={index}>
        {columns.map((column, indexB) => {
          const title = get(column, "fields.content[0].fields.title", "");
          return (
            <Col key={indexB}>
              <BlogPostTeaser title={title} />
            </Col>
          );
        })}
      </Grid>
    ));
  }
}
