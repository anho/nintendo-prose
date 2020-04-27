const contentful = require("contentful");
import { SPACE_ID, CDN_TOKEN } from "./config";

export const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: CDN_TOKEN,
});
