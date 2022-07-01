import * as contentful from "contentful";

import getConfig from "next/config";

const {
  serverRuntimeConfig: { CONTENTFUL_CDA_KEY },
} = getConfig();

export const createContentfulClient = () =>
  contentful.createClient({
    space: "d3mitm0kcpu1",
    accessToken: CONTENTFUL_CDA_KEY,
  });
