import { generateMarkdown } from './partitions-to-markdown';

//outer partitions
// @TEST: header
const headerPartitions = [{type: 'h4',value: 'This is an h4 header'},{type: 'h3',value: 'This is an h3 header'},{type: 'h1',value: 'This is an h1 header'},{type: 'h6',value: 'This is an h6 header'},{type: 'h5',value: 'This is an h5 header'},{type: 'h2',value: 'This is an h2 header'}];
const headerMarkdownExpected = '#### This is an h4 header\n\n### This is an h3 header\n\n# This is an h1 header\n\n###### This is an h6 header\n\n##### This is an h5 header\n\n## This is an h2 header';

test('test for headers', () => {
  expect(generateMarkdown(headerPartitions)).toBe(headerMarkdownExpected);
});

// @TEST: paragraph
const paragraphPartitions = [{type: 'p', partitions: [{type: 'text', value: 'Paragraph text\non multiple lines.'}]}];
const paragraphMarkdownExpected = 'Paragraph text\non multiple lines.';

test('test for paragraphs', () => {
  expect(generateMarkdown(paragraphPartitions)).toBe(paragraphMarkdownExpected);
});

// @TEST: unordered list
const unorderedListPartitions = [{type: 'ul', items: [{type: 'text', value: 'list item 1'},{type: 'text', value: 'list item 2'},{type: 'text', value: 'list item 3'}]}];
const unorderedListMarkdownExpected = '* list item 1\n* list item 2\n* list item 3';

test('test for unordered list', () => {
  expect(generateMarkdown(unorderedListPartitions)).toBe(unorderedListMarkdownExpected);
});

// @TEST: ordered list
const orderedListPartitions = [{type: 'ol', items: [{type: 'text', value: 'list item 1'},{type: 'text', value: 'list item 2'},{type: 'text', value: 'list item 3'}]}];
const orderedListMarkdownExpected = '. list item 1\n. list item 2\n. list item 3';

test('test for ordered list', () => {
  expect(generateMarkdown(orderedListPartitions)).toBe(orderedListMarkdownExpected);
});

// @TEST: mixed lists
const mixedListPartitions = [{type: 'ul', items: [{type: 'text', value: 'list item 1'},{type: 'text', value: 'list item 2'},{type: 'text', value: 'list item 3'}]},{type: 'ol', items: [{type: 'text', value: 'list item 4'},{type: 'text', value: 'list item 5'},{type: 'text', value: 'list item 6'}]},{type: 'ul', items: [{type: 'text', value: 'list item 7'},{type: 'text', value: 'list item 8'},{type: 'text', value: 'list item 9'}]}];
const mixedListMarkdownExpected = '* list item 1\n* list item 2\n* list item 3\n\n. list item 4\n. list item 5\n. list item 6\n\n* list item 7\n* list item 8\n* list item 9';

test('test for mixed list', () => {
  expect(generateMarkdown(mixedListPartitions)).toBe(mixedListMarkdownExpected);
});

// @TEST: image
const imagePartitions = [{type: 'image', altText: 'alt text for an image', link: 'https://www.google.com/someimage'},{type: 'image', altText: null, link: 'https://www.google.com/someimage'}];
const imageMarkdownExpected = '![alt text for an image](https://www.google.com/someimage)\n\n![](https://www.google.com/someimage)';

test('test for image', () => {
  expect(generateMarkdown(imagePartitions)).toBe(imageMarkdownExpected);
});

// @TEST: single line quote
const singleQuotePartitions = [{type: 'quotes', value: 'No need to be offended just because I insulted you.'}];
const singleQuoteMarkdownExpected = '> No need to be offended just because I insulted you.';

test('test for single line quote', () => {
  expect(generateMarkdown(singleQuotePartitions)).toBe(singleQuoteMarkdownExpected);
});

// @TEST: multi-line quote
const multiQuotePartitions = [{type: 'quotes', value: 'What is the most important step a man can take?\nThe next one.'}];
const multiQuoteMarkdownExpected = '>>>\nWhat is the most important step a man can take?\nThe next one.\n>>>';

test('test for multiline quote', () => {
  expect(generateMarkdown(multiQuotePartitions)).toBe(multiQuoteMarkdownExpected);
});

// @TEST: hr
const hrPartitions = [{type: 'hr'}];
const hrMarkdownExpected = '---';

test('test for hr', () => {
  expect(generateMarkdown(hrPartitions)).toBe(hrMarkdownExpected);
});

// inner partitions
// @TEST: text
const textPartitions = [{type: 'p', partitions: [{type: 'text', value: 'This is text\nsplit on multiple lines.'}]}];
const textMarkdownExpected = 'This is text\nsplit on multiple lines.';

test('test for text', () => {
  expect(generateMarkdown(textPartitions)).toBe(textMarkdownExpected);
});

// @TEST: bold
const boldPartitions = [{type: 'p', partitions: [{type: 'bold', value: 'bold words'}]}];
const boldMarkdownExpected = '*bold words*';

test('test for bold', () => {
  expect(generateMarkdown(boldPartitions)).toBe(boldMarkdownExpected);
});

// @TEST: italics
const italicsPartitions = [{type: 'p', partitions: [{type: 'italics', value: 'italics words'}]}];
const italicsMarkdownExpected = '_italics words_';

test('test for italics', () => {
  expect(generateMarkdown(italicsPartitions)).toBe(italicsMarkdownExpected);
});

// @TEST: link
const linkPartitions = [{type: 'p', partitions: [{type: 'link', value: 'inline links', link: 'https://www.google.com'}]}];
const linkMarkdownExpected = '[inline links](https://www.google.com)';

test('test for link', () => {
  expect(generateMarkdown(linkPartitions)).toBe(linkMarkdownExpected);
});

// @TEST: relation
const relationPartitions = [{type: 'p', partitions: [{type: 'relation', value: 'relations text', relation: 'PG_123456789012345'}]}];
const relationMarkdownExpected = '{relations text}(PG_123456789012345)';

test('test for relation', () => {
  expect(generateMarkdown(relationPartitions)).toBe(relationMarkdownExpected);
});

// @TEST: color
const colorPartitions = [{type: 'p', partitions: [{type: 'color', value: 'colors text', color: '#FF2200'}]}];
const colorMarkdownExpected = '{colors text}(#FF2200)';

test('test for color', () => {
  expect(generateMarkdown(colorPartitions)).toBe(colorMarkdownExpected);
});

// combination tests
// @TEST all

/**
 * I want to test a combination of all of them, like with the example you gave
 * me to write the code, but that's not really a unit test anymore (integration test? is that the right word)
 * so should I put that in a seperate file?
 */