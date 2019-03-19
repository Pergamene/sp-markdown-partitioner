import { PARTITION_TYPES } from '../sp-markdown-partitioner/partition-types';

const partitionExample = [
  {
    type: 'h1',
    value: 'This is an h1 header'
  },
  {
    type: 'h2',
    value: 'This is an h2 header'
  },
  {
    type: 'p',
    partitions: [
      {
        type: 'text',
        value: 'This is regular text.\nIt can be split on multiple lines.\nIt '
      },
      {
        type: 'bold',
        value: 'can'
      },
      {
        type: 'text',
        value: ' '
      },
      {
        type: 'italics',
        value: 'also'
      },
      {
        type: 'text',
        value: ' '
      },
      {
        type: 'bold',
        partitions: [
          {
            type: 'italics',
            value: 'contain'  
          }
        ]
      },
      {
        type: 'text',
        value: ' '
      },
      {
        type: 'link',
        value: 'inline links',
        link: 'https://www.google.com'
      },
      {
        type: 'text',
        value: ' '
      }, 
      {
        type: 'relation',
        value: 'relations',
        relation: 'PG_123456789012345',
      },
      {
        type: 'text',
        value: ' or '
      },
      {
        type: 'color',
        value: 'colors',
        color: '#FF2200'
      },
      {
        type: 'text',
        value: '.'                        
      }
    ]
  },
  {
    type: 'ul',
    items: [
      {
        type: 'text',
        value: 'unordered list'
      }
    ]
  },
  {
    type: 'ol',
    items: [
      {
        type: 'bold',
        partitions: [
          {
            type: 'italics',
            value: 'ordered list 1'  
          }
        ]
      },
      {
        type: 'text',
        value: 'ordered list 2'
      }
    ]
  },
  {
    type: 'image',
    altText: 'alt text for an image',
    link: 'https://www.google.com/someimage'
  },
  {
    type: 'image',
    altText: null,
    link: 'https://www.google.com/someimage'
  },
  {
    type: 'quotes',
    value: 'quoted text'
  },
  {
    type: 'hr'
  },
  {
    type: 'quotes',
    value: 'or quoted paragraphs\nif it\'s more than one line'
  }
];

//should print out something like:
`
# This is an h1 header

## This is an h2 header

This is regular text.
Any parition type can be split on multiple lines.
It *can* _also_ *_contain_* [inline links](https://www.google.com) {relations}(PG_123456789012345) or {colors}(#FF2200).

* unordered list

. *_ordered list 1_*
. ordered list 2

![alt text for an image](https://www.google.com/someimage)

![](https://www.google.com/someimage)

> quoted text

---

>>>
or quoted paragraphs
if it's more than one line
>>>
`

/**
 * 
 * @param partition - Array of Partitions.  See Partition object above as an example.
 * @return string
 */
export function generateMarkdown(partitions) {
  return _generateMarkdownRecursiveOuter(partitions).trim();
}

function _generateMarkdownRecursiveOuter(partitions) {
  let markdownText = '';
  for (let i in partitions) {
    markdownText += _convertPartitionToMarkdownOuter(partitions[i]) + '\n\n';
  }
  return markdownText;
}

function _generateMarkdownRecursiveInner(partitions) {
  let markdownText = '';
  for (let i in partitions) {
    markdownText += _convertPartitionToMarkdownInner(partitions[i]);
  }
  return markdownText;
}

function _convertPartitionToMarkdownOuter(partition) {
  let markdownText = '';
  switch (partition.type) {
    case PARTITION_TYPES.H6:
      markdownText += '#';
    case PARTITION_TYPES.H5:
      markdownText += '#';
    case PARTITION_TYPES.H4:
      markdownText += '#';
    case PARTITION_TYPES.H3:
      markdownText += '#';
    case PARTITION_TYPES.H2:
      markdownText += '#';
    case PARTITION_TYPES.H1:
      return markdownText += '# ' + _partitionCheckParseOrAdd(partition);
    case PARTITION_TYPES.PARAGRAPH:
      return markdownText += _partitionCheckParseOrAdd(partition);
      // return markdownText += '# ' + partition.value + '\n\n';         // TODO: If we decide no on embeded markdown for headers.
    case PARTITION_TYPES.UNORDERED_LIST:
      return markdownText += _parseList(partition.items, PARTITION_TYPES.UNORDERED_LIST).trim();
    case PARTITION_TYPES.ORDERED_LIST:
      return markdownText += _parseList(partition.items, PARTITION_TYPES.ORDERED_LIST).trim();
    case PARTITION_TYPES.IMAGE:
      return markdownText += '![' + (partition.altText ? partition.altText : '') + '](' + partition.link + ')';
    case PARTITION_TYPES.QUOTES:
      return markdownText += _parseQuote(partition);
    case PARTITION_TYPES.HR:
      return markdownText += '---';
  }
}

function _convertPartitionToMarkdownInner(partition) {
  let markdownText = '';
  switch (partition.type) {
    case PARTITION_TYPES.TEXT:
      return markdownText += _partitionCheckParseOrAdd(partition);
    case PARTITION_TYPES.BOLD:
      return markdownText += '*' + _partitionCheckParseOrAdd(partition) + '*';
    case PARTITION_TYPES.ITALICS:
      return markdownText += '_' + _partitionCheckParseOrAdd(partition) + '_';
    case PARTITION_TYPES.LINK:
      return markdownText += '[' + partition.value + '](' + partition.link + ')';
    case PARTITION_TYPES.RELATION:
      return markdownText += '{' + partition.value + '}(' + partition.relation + ')';
    case PARTITION_TYPES.COLOR:
      return markdownText += '{' + partition.value + '}(' + partition.color + ')';
  }
}

function _partitionCheckParseOrAdd(partition) {
  let markdownText = '';
  if (partition.partitions) {
    markdownText += _generateMarkdownRecursiveInner(partition.partitions);
  } else {
    markdownText += partition.value;
  }
  return markdownText;
}

function _parseQuote(partition) {
  let markdownText = _partitionCheckParseOrAdd(partition);
  if (markdownText.includes('\n')) {
    return '>>>\n' + markdownText + '\n>>>\n\n';
  } else {
    return '> ' + markdownText + '\n\n';
  }
}

function _parseList(partitions, type) {
  let markdownText = '';
  for (let i in partitions) {
    if (type === PARTITION_TYPES.UNORDERED_LIST) {
      markdownText += '* ' + _convertPartitionToMarkdownInner(partitions[i]) + '\n';
    } else {
      markdownText += '. ' + _convertPartitionToMarkdownInner(partitions[i]) + '\n';
    }
  }
  return markdownText;
}