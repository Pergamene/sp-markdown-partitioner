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
    paramMarkdown: '',
    returnPartitions: [{}]
  },
  {
    name: 'test for relation',
    paramMarkdown: '',
    returnPartitions: [{}]
  },
  {
    name: 'test for color',
    paramMarkdown: '',
    returnPartitions: [{}]
  },
  {
    name: 'test for text',
    paramMarkdown: '',
    returnPartitions: [{}]
  },
  {
    name: 'test for multiple inner partitions',
    paramMarkdown: '',
    returnPartitions: [{}]
  }
]

for (let testCase of testCases) {
  test(testCase.name, () => {
    expect(generateMarkdown(testCase.paramPartitions)).toBe(testCase.returnMarkdown);
  });
}