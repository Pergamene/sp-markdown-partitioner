import { generateInnerPartitions } from './markdown-to-inner-partitions';

let testCases = [
  {
    name: 'test for bold',
    paramMarkdown: '*This is a test for bold partitions*',
    returnPartitions: [{type: 'bold', value: 'This is a test for bold partitions'}]
  },
  {
    name: 'test for italics',
    paramMarkdown: '_This is a test for italics partitions_',
    returnPartitions: [{type: 'italics', value: 'This is a test for italics partitions'}]
  },
  {
    name: 'test for link',
    paramMarkdown: '[This is a test for links](www.link.com)',
    returnPartitions: [{type: 'link', value: 'This is a test for links', link: 'www.link.com'}]
  },
  {
    name: 'test for relation',
    paramMarkdown: '{This is a test for relations}(PG_123456789012345)',
    returnPartitions: [{type: 'relation', value: 'This is a test for relations', relation: 'PG_123456789012345'}]
  },
  {
    name: 'test for color',
    paramMarkdown: '{This is a test for colors}(#FF2200)',
    returnPartitions: [{type: 'color', value: 'This is a test for colors', color: '#FF2200'}]
  },
  {
    name: 'test for multiple inner partitions',
    paramMarkdown: '',
    returnPartitions: [{}]
  }
]

for (let testCase of testCases) {
  test(testCase.name, () => {
    debugger;
    expect(generateInnerPartitions(testCase.paramMarkdown)).toEqual(testCase.returnPartitions);
  });
}