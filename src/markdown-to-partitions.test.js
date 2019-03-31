import { generatePartitions } from './markdown-to-partitions';

let testCases = [
  {
    name: 'test for headers',
    paramMarkdown: '## This is an h2 header\n###### This is an h6 header\n#### This is an h4 header\n### This is an h3 header\n##### This is an h5 header\n# This is an h1 header',
    returnPartitions: [{type: 'h2', value: 'This is an h2 header'},{type: 'h6', value: 'This is an h6 header'},{type: 'h4', value: 'This is an h4 header'},{type: 'h3', value: 'This is an h3 header'},{type: 'h5', value: 'This is an h5 header'},{type: 'h1', value: 'This is an h1 header'}]
  },
  // {
  //   name: 'test for paragraphs',
  //   paramMarkdown: '',
  //   returnPartitions: []
  // },
  // {
  //   name: 'test for unordered list',
  //   paramMarkdown: '* list item 1\n* list item 2\n* list item 3\n* list item 4',
  //   returnPartitions: [{type: 'ul', items: [{type: 'text', value: 'list item 1'},{type: 'text', value: 'list item 2'},{type: 'text', value: 'list item 3'},{type: 'text', value: 'list item 4'}]}]
  // },
  // {
  //   name: 'test for ordered list',
  //   paramMarkdown: '. list item 1\n. list item 2\n. list item 3\n. list item 4',
  //   returnPartitions: [{type: 'ol', items: [{type: 'text', value: 'list item 1'},{type: 'text', value: 'list item 2'},{type: 'text', value: 'list item 3'},{type: 'text', value: 'list item 4'}]}]
  // },
  // {
  //   name: 'test for mixed list',
  //   paramMarkdown: '* ul 1\n* ul 2\n. ol 1\n. ol 2\n* ul 2-1\n* ul 2-2',
  //   returnPartitions: [{type: 'ul', items: [{type: 'text', value: 'ul 1'},{type: 'text', value: 'ul 2'}]},{type: 'ol', items: [{type: 'text', value: 'ol 1'},{type: 'text', value: 'ol 2'}]},{type: 'ul', items: [{type: 'text', value: 'ul 2-1'},{type: 'text', value: 'ul 2-2'}]}]
  // },
  {
    name: 'test for image',
    paramMarkdown: '![alt text for an image](https://www.google.com/someimage)\n\n![](https://www.google.com/someimage)',
    returnPartitions: [{type: 'image', altText: 'alt text for an image', link: 'https://www.google.com/someimage'},{type: 'image', altText: null, link: 'https://www.google.com/someimage'}]
  },
  {
    name: 'test for single line quote',
    paramMarkdown: '> No need to be offended just because I insulted you.',
    // returnPartitions: [{type: 'quotes', value: 'No need to be offended just because I insulted you.'}]
    // @REMOVE: temp test until inner-partitions are done
    returnPartitions: [{type: 'quotes', partitions: [{type: 'text', value: 'No need to be offended just because I insulted you.'}]}]
  },
  // {
  //   name: 'test for multiline quote',
  //   paramMarkdown: '>>>\nWhat is the most important step a man can take?\nThe next one.\n>>>',
  //   returnPartitions: [{type: 'quotes', value: 'What is the most important step a man can take?\nThe next one.'}]
  // },
  {
    name: 'test for hr',
    paramMarkdown: '---',
    returnPartitions: [{type: 'hr'}]
  }
];

for (let testCase of testCases) {
  test(testCase.name, () => {
    debugger;
    expect(generatePartitions(testCase.paramMarkdown)).toEqual(testCase.returnPartitions);
  });
}