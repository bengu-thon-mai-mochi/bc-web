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

export const skipDefault = 10;
export const limit = 10;

export const pageMapping: Record<string, string> = {
  "about-us": "4MWZ7XMFochsW5tL3yIGWO",
  "biodiversity-singapore": "6ssJoVeL6f4R1yoL3Gak9z",
  "open-science": "2LEA3PHyXoTpIcvxidThdl",
};
