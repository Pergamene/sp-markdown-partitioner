import { generateMarkdown } from './partitions-to-markdown';


let testCases = [
  {
    name: 'test for headers',
    paramPartitions: [{type: 'h4', value: 'This is an h4 header'},{type: 'h3', value: 'This is an h3 header'},{type: 'h1', value: 'This is an h1 header'},{type: 'h6', value: 'This is an h6 header'},{type: 'h5', value: 'This is an h5 header'},{type: 'h2', value: 'This is an h2 header'}],
    returnMarkdown: '#### This is an h4 header\n\n### This is an h3 header\n\n# This is an h1 header\n\n###### This is an h6 header\n\n##### This is an h5 header\n\n## This is an h2 header'
  },
  {
    name: 'test for paragraphs',
    paramPartitions: [{type: 'p', partitions: [{type: 'text', value: 'Paragraph text\non multiple lines.'}]}],
    returnMarkdown: 'Paragraph text\non multiple lines.'
  },
  {
    name: 'test for unordered list',
    paramPartitions: [{type: 'ul', items: [{type: 'text', value: 'list item 1'},{type: 'text', value: 'list item 2'},{type: 'text', value: 'list item 3'}]}],
    returnMarkdown: '* list item 1\n* list item 2\n* list item 3'
  },
  {
    name: 'test for ordered list',
    paramPartitions: [{type: 'ol', items: [{type: 'text', value: 'list item 1'},{type: 'text', value: 'list item 2'},{type: 'text', value: 'list item 3'}]}],
    returnMarkdown: '. list item 1\n. list item 2\n. list item 3'
  },
  {
    name: 'test for mixed list',
    paramPartitions: [{type: 'ul', items: [{type: 'text', value: 'list item 1'},{type: 'text', value: 'list item 2'},{type: 'text', value: 'list item 3'}]},{type: 'ol', items: [{type: 'text', value: 'list item 4'},{type: 'text', value: 'list item 5'},{type: 'text', value: 'list item 6'}]},{type: 'ul', items: [{type: 'text', value: 'list item 7'},{type: 'text', value: 'list item 8'},{type: 'text', value: 'list item 9'}]}],
    returnMarkdown: '* list item 1\n* list item 2\n* list item 3\n\n. list item 4\n. list item 5\n. list item 6\n\n* list item 7\n* list item 8\n* list item 9'
  },
  {
    name: 'test for image',
    paramPartitions: [{type: 'image', altText: 'alt text for an image', link: 'https://www.google.com/someimage'},{type: 'image', altText: null, link: 'https://www.google.com/someimage'}],
    returnMarkdown: '![alt text for an image](https://www.google.com/someimage)\n\n![](https://www.google.com/someimage)'
  },
  {
    name: 'test for single line quote',
    paramPartitions: [{type: 'quotes', value: 'No need to be offended just because I insulted you.'}],
    returnMarkdown: '> No need to be offended just because I insulted you.'
  },
  {
    name: 'test for multiline quote',
    paramPartitions: [{type: 'quotes', value: 'What is the most important step a man can take?\nThe next one.'}],
    returnMarkdown: '>>>\nWhat is the most important step a man can take?\nThe next one.\n>>>'
  },
  {
    name: 'test for hr',
    paramPartitions: [{type: 'hr'}],
    returnMarkdown: '---'
  },
  {
    name: 'test for text',
    paramPartitions: [{type: 'p', partitions: [{type: 'text', value: 'This is text\nsplit on multiple lines.'}]}],
    returnMarkdown: 'This is text\nsplit on multiple lines.'
  },
  {
    name: 'test for bold',
    paramPartitions: [{type: 'p', partitions: [{type: 'bold', value: 'bold words'}]}],
    returnMarkdown: '*bold words*'
  },
  {
    name: 'test for italics',
    paramPartitions: [{type: 'p', partitions: [{type: 'italics', value: 'italics words'}]}],
    returnMarkdown: '_italics words_'
  },
  {
    name: 'test for link',
    paramPartitions: [{type: 'p', partitions: [{type: 'link', value: 'inline links', link: 'https://www.google.com'}]}],
    returnMarkdown: '[inline links](https://www.google.com)'
  },
  {
    name: 'test for relation',
    paramPartitions: [{type: 'p', partitions: [{type: 'relation', value: 'relations text', relation: 'PG_123456789012345'}]}],
    returnMarkdown: '{relations text}(PG_123456789012345)'
  },
  {
    name: 'test for color',
    paramPartitions: [{type: 'p', partitions: [{type: 'color', value: 'colors text', color: '#FF2200'}]}],
    returnMarkdown: '{colors text}(#FF2200)'
  },
  {
    name: 'test for combined partitions',
    paramPartitions: [{type: 'h1',value: 'This is an h1 header'},{type: 'h2',value: 'This is an h2 header'},{type: 'p',partitions: [{type: 'text',value: 'This is regular text.\nIt can be split on multiple lines.\nIt '},{type: 'bold',value: 'can'},{type: 'text',value: ' '},{type: 'italics',value: 'also'},{type: 'text',value: ' '},{type: 'bold',partitions: [{type: 'italics',value: 'contain'}]},{type: 'text',value: ' '},{type: 'link',value: 'inline links',link: 'https://www.google.com'},{type: 'text',value: ' '},{type: 'relation',value: 'relations',relation: 'PG_123456789012345',},{type: 'text',value: ' or '},{type: 'color',value: 'colors',color: '#FF2200'},{type: 'text',value: '.'}]},{type: 'ul',items: [{type: 'text',value: 'unordered list'}]},{type: 'ol',items: [{type: 'bold',partitions: [{type: 'italics',value: 'ordered list 1'}]},{type: 'text',value: 'ordered list 2'}]},{type: 'image',altText: 'alt text for an image',link: 'https://www.google.com/someimage'},{type: 'image',altText: null,link: 'https://www.google.com/someimage'},{type: 'quotes',value: 'quoted text'},{type: 'hr'},{type: 'quotes',value: 'or quoted paragraphs\nif it\'s more than one line'}],
    returnMarkdown: '# This is an h1 header\n\n## This is an h2 header\n\nThis is regular text.\nIt can be split on multiple lines.\nIt *can* _also_ *_contain_* [inline links](https://www.google.com) {relations}(PG_123456789012345) or {colors}(#FF2200).\n\n* unordered list\n\n. *_ordered list 1_*\n. ordered list 2\n\n![alt text for an image](https://www.google.com/someimage)\n\n![](https://www.google.com/someimage)\n\n> quoted text\n\n---\n\n>>>\nor quoted paragraphs\nif it\'s more than one line\n>>>'
  }
];

for (let testCase of testCases) {
  test(testCase.name, () => {
    expect(generateMarkdown(testCase.paramPartitions)).toBe(testCase.returnMarkdown);
  });
}