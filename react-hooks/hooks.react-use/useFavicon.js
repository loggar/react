// The useFavicon hook is used to set the favicon of the page.

import { useFavicon } from "react-use";
const Demo = () => {
  useFavicon("https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico");
  return null;
};
