const partitionsToMarkdown = require("./partitions-to-markdown");

//outer partitions
// @TEST: header
const headerPartitions = [{type: 'h4',value: 'This is an h4 header'},{type: 'h3',value: 'This is an h3 header'},{type: 'h1',value: 'This is an h1 header'},{type: 'h6',value: 'This is an h6 header'},{type: 'h5',value: 'This is an h5 header'},{type: 'h2',value: 'This is an h2 header'}];
const headerMarkdownExpected = "#### This is an h4 header\n\n### This is an h3 header\n\n# This is an h1 header\n\n###### This is an h6 header\n\n##### This is an h5 header\n\n## This is an h2 header";

test('test for headers', () => {
  expect(partitionsToMarkdown.generateMarkdown(headerPartitions)).toBe(headerMarkdownExpected);
});

// @TEST: paragraph


// @TEST: unordered list


// @TEST: ordered list


// @TEST: mixed lists


// @TEST: image


// @TEST: single line quote


// @TEST: multi-line quote


// @TEST: hr


// inner partitions
// @TEST: text


// @TEST: bold


// @TEST: italics


// @TEST: link


// @TEST: relation


// @TEST: color

// combination test
// @TEST all
