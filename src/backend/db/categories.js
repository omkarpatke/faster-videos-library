import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "html",
    description:
      "Learn HTML from Basics",
  },
  {
    _id: uuid(),
    categoryName: "css",
    description:
      "Learn CSS from Basics",
  },
  {
    _id: uuid(),
    categoryName: "javascript",
    description:
      "Learn JavaScript from Basics",
  },
];
