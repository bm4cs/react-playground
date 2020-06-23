const courses = [
  {
    id: 1,
    title: "The C Programming Language",
    slug: "clang",
    authorId: 1,
    category: "Unix",
  },
  {
    id: 2,
    title: "Unix Programmer's Manual",
    slug: "unix-man",
    authorId: 1,
    category: "Unix",
  },
  {
    id: 3,
    title: "The Evolution of the Unix Time-sharing System",
    slug: "time-sharing",
    authorId: 1,
    category: "Unix",
  },
  {
    id: 4,
    title: "A Stream Input/Output System",
    slug: "streamio",
    authorId: 1,
    category: "Unix",
  },
  {
    id: 5,
    title: "Interprocess Communication in the Ninth Edition Unix System",
    slug: "ipc-ninth",
    authorId: 1,
    category: "Unix",
  },
  {
    id: 6,
    title: "VAX over 20+ years",
    slug: "vax",
    authorId: 1,
    category: "Unix",
  },
  {
    id: 7,
    title: "Resurrection of two primeval C compilers from 1972-73",
    slug: "compilers",
    authorId: 1,
    category: "Unix",
  },
  {
    id: 8,
    title: "The Unix Programming Environment",
    slug: "unix-programming",
    authorId: 2,
    category: "Unix",
  },
];

const authors = [
  { id: 1, name: "Dennis Ritchie" },
  { id: 2, name: "Rob Pike" },
  { id: 3, name: "Ken Thompson" },
];

const newCourse = {
  id: null,
  title: "",
  authorId: null,
  category: "",
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCourse,
  courses,
  authors,
};
