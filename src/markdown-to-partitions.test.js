import { generatePartitions } from './markdown-to-partitions';

let testCases = [
  {
    name: 'test for headers',
    paramMarkdown: '## This is an h2 header\n###### This is an h6 header\n#### This is an h4 header\n### This is an h3 header\n##### This is an h5 header\n# This is an h1 header',
    returnPartitions: [{type: 'h2', value: 'This is an h2 header'},{type: 'h6', value: 'This is an h6 header'},{type: 'h4', value: 'This is an h4 header'},{type: 'h3', value: 'This is an h3 header'},{type: 'h5', value: 'This is an h5 header'},{type: 'h1', value: 'This is an h1 header'}]
  },
  {
    name: 'test for paragraphs',
    paramMarkdown: 'This is a simple paragraph text.\nThat has multiple lines.',
    returnPartitions: [{type: 'p', partitions: [{type: 'text', value: 'This is a simple paragraph text.\nThat has multiple lines.'}]}]
  },
  {
    name: 'test for unordered list',
    paramMarkdown: '* list item 1\n* list item 2\n* list item 3\n* list item 4',
    returnPartitions: [{type: 'ul', items: [{type: 'text', value: 'list item 1'},{type: 'text', value: 'list item 2'},{type: 'text', value: 'list item 3'},{type: 'text', value: 'list item 4'}]}]
  },
  {
    name: 'test for ordered list',
    paramMarkdown: '. list item 1\n. list item 2\n. list item 3\n. list item 4',
    returnPartitions: [{type: 'ol', items: [{type: 'text', value: 'list item 1'},{type: 'text', value: 'list item 2'},{type: 'text', value: 'list item 3'},{type: 'text', value: 'list item 4'}]}]
  },
  {
    name: 'test for mixed list',
    paramMarkdown: '* ul 1\n* ul 2\n. ol 1\n. ol 2\n* ul 2-1\n* ul 2-2',
    returnPartitions: [{type: 'ul', items: [{type: 'text', value: 'ul 1'},{type: 'text', value: 'ul 2'}]},{type: 'ol', items: [{type: 'text', value: 'ol 1'},{type: 'text', value: 'ol 2'}]},{type: 'ul', items: [{type: 'text', value: 'ul 2-1'},{type: 'text', value: 'ul 2-2'}]}]
  },
  {
    name: 'test for image',
    paramMarkdown: '![alt text for an image](https://www.google.com/someimage)\n\n![](https://www.google.com/someimage)',
    returnPartitions: [{type: 'image', altText: 'alt text for an image', link: 'https://www.google.com/someimage'},{type: 'image', altText: null, link: 'https://www.google.com/someimage'}]
  },
  {
    name: 'test for single line quote',
    paramMarkdown: '> No need to be offended just because I insulted you.',
    returnPartitions: [{type: 'quotes', value: 'No need to be offended just because I insulted you.'}]
  },
  {
    name: 'test for multiline quote',
    paramMarkdown: '>>>\nWhat is the most important step a man can take?\nThe next one.\n>>>',
    returnPartitions: [{type: 'quotes', value: 'What is the most important step a man can take?\nThe next one.'}]
  },
  {
    name: 'test for hr',
    paramMarkdown: '---',
    returnPartitions: [{type: 'hr'}]
  },
  {
    name: 'test for multiple outer partitions',
    paramMarkdown: 'This test contains\nparagraphs.\n# And headers\n* ul 1\n* ul 2\n* ul 3\n. ol 1\n. ol 2\n. ol 3\n![image with alt text](www.image.com)\n![](www.image.com)\n> Quotes on a single line.\n>>>\nMultiline\nquotes.\n>>>',
    returnPartitions: [{type: 'p', partitions: [{type: 'text', value: 'This test contains\nparagraphs.'}]},{type: 'h1', value: 'And headers'},{type: 'ul', items: [{type: 'text', value: 'ul 1'},{type: 'text', value: 'ul 2'},{type: 'text', value: 'ul 3'}]},{type: 'ol', items: [{type: 'text', value: 'ol 1'},{type: 'text', value: 'ol 2'},{type: 'text', value: 'ol 3'}]},{type: 'image', altText: 'image with alt text', link: 'www.image.com'},{type: 'image', altText: null, link: 'www.image.com'},{type: 'quotes', value: 'Quotes on a single line.'},{type: 'quotes', value: 'Multiline\nquotes.'}]
  }
];

for (let testCase of testCases) {
  test(testCase.name, () => {
    expect(generatePartitions(testCase.paramMarkdown)).toEqual(testCase.returnPartitions);
  });
}