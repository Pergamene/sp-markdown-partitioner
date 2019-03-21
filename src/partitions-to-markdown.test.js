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
const unorderedListPartitions = [{}];
const unorderedListMarkdownExpected = '';

test('test for unordered list', () => {
  expect(generateMarkdown(unorderedListPartitions)).toBe(unorderedListMarkdownExpected);
});

// @TEST: ordered list
const orderedListPartitions = [{}];
const orderedListMarkdownExpected = '';

test('test for ordered list', () => {
  expect(generateMarkdown(orderedListPartitions)).toBe(orderedListMarkdownExpected);
});

// @TEST: mixed lists
const mixedListPartitions = [{}];
const mixedListMarkdownExpected = '';

test('test for unordered list', () => {
  expect(generateMarkdown(mixedListPartitions)).toBe(mixedListMarkdownExpected);
});

// @TEST: image
const imagePartitions = [{}];
const imageMarkdownExpected = '';

test('test for unordered list', () => {
  expect(generateMarkdown(imagePartitions)).toBe(imageMarkdownExpected);
});

// @TEST: single line quote
const singleQuotePartitions = [{}];
const singleQuoteMarkdownExpected = '';

test('test for unordered list', () => {
  expect(generateMarkdown(singleQuotePartitions)).toBe(singleQuoteMarkdownExpected);
});

// @TEST: multi-line quote
const multiQuotePartitions = [{}];
const multiQuoteMarkdownExpected = '';

test('test for unordered list', () => {
  expect(generateMarkdown(multiQuotePartitions)).toBe(multiQuoteMarkdownExpected);
});

// @TEST: hr
const hrPartitions = [{}];
const hrMarkdownExpected = '';

test('test for unordered list', () => {
  expect(generateMarkdown(hrPartitions)).toBe(hrMarkdownExpected);
});

// inner partitions
// @TEST: text
const textPartitions = [{}];
const textMarkdownExpected = '';

test('test for unordered list', () => {
  expect(generateMarkdown(textPartitions)).toBe(textMarkdownExpected);
});

// @TEST: bold
const boldPartitions = [{}];
const boldMarkdownExpected = '';

test('test for unordered list', () => {
  expect(generateMarkdown(boldPartitions)).toBe(boldMarkdownExpected);
});

// @TEST: italics
const italicsPartitions = [{}];
const italicsMarkdownExpected = '';

test('test for unordered list', () => {
  expect(generateMarkdown(italicsPartitions)).toBe(italicsMarkdownExpected);
});

// @TEST: link
const linkPartitions = [{}];
const linkMarkdownExpected = '';

test('test for unordered list', () => {
  expect(generateMarkdown(linkPartitions)).toBe(linkMarkdownExpected);
});

// @TEST: relation
const relationPartitions = [{}];
const relationMarkdownExpected = '';

test('test for unordered list', () => {
  expect(generateMarkdown(relationPartitions)).toBe(relationMarkdownExpected);
});

// @TEST: color
const colorPartitions = [{}];
const colorMarkdownExpected = '';

test('test for unordered list', () => {
  expect(generateMarkdown(colorPartitions)).toBe(colorMarkdownExpected);
});

// combination tests
// @TEST all
