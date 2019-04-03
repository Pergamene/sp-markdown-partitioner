import { PARTITION_TYPES } from './partition-types';
import { generateInnerPartitions } from './markdown-to-inner-partitions';

/**
 * assemble all partition fragments
 * 
 * @param {string} markdownText see partitions-to-markdown 
 */
export function generatePartitions(markdownText) {
  // markdownText = markdownText.replace(/\n\s*\n/g, '\n');  Original, doesn't seem to be needed.
  markdownText = markdownText.replace(/\n+/g, '\n');
  let partition;
  let partitions = [];
  let markdownSplits = _splitAtOuterBreakPoints(markdownText.trim());
  for (let markdownSubstring of markdownSplits) {
    partition = _parseOuterPartition(markdownSubstring);
    partitions.push(partition);
  }
  return partitions;
}

function _parseOuterPartition(markdownSubstring) {
  if (markdownSubstring.startsWith('#')) {
    return _buildHeaderPartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('*')) {
    return _buildUnorderedListPartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('.')) {
    return _buildOrderedListPartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('>')) {
    return _buildQuotePartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('![')) {
    return _buildImagePartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('---')) {
    return _buildHrPartition();
  } else {
    return _buildParagraphPartition(markdownSubstring);
  }
}

function _buildHeaderPartition(markdownSubstring) {
  let size = markdownSubstring.lastIndexOf('#') + 1;
  let type = _getHeaderPartitionType(size);
  let value = markdownSubstring.substring(size).trim();
  return { type, value };
}

const headerSizeMap = {
  1: PARTITION_TYPES.H1,
  2: PARTITION_TYPES.H2,
  3: PARTITION_TYPES.H3,
  4: PARTITION_TYPES.H4,
  5: PARTITION_TYPES.H5,
  6: PARTITION_TYPES.H6
};

function _getHeaderPartitionType(size) {
  if (size < 1) {
    size = 1;
  } else if (size > 6) {
    size = 6;
  }
  return headerSizeMap[size];
}

function _buildUnorderedListPartition(markdownSubstring) {
  let items = _makeListItems(markdownSubstring);
  return { type: PARTITION_TYPES.UNORDERED_LIST, items };
}

function _buildOrderedListPartition(markdownSubstring) {
  let items = _makeListItems(markdownSubstring);
  return { type: PARTITION_TYPES.ORDERED_LIST, items };
}

function _makeListItems(markdownSubstring) {
  let items = [];
  let listItems = markdownSubstring.split('\n');
  let value;
  let itemObject;
  for (let item of listItems) {
    value = item.substring(1).trim();
    itemObject = generateInnerPartitions(value);
    if (!itemObject) {
      itemObject = { type: PARTITION_TYPES.TEXT, value };
    }
    items.push(itemObject);
  }
  return items;
}

function _buildQuotePartition(markdownSubstring) {
  let value;
  if (markdownSubstring.startsWith('>>>')) {
    value = markdownSubstring.substring(3, markdownSubstring.length - 3).trim();
  } else {
    value = markdownSubstring.substring(1).trim();
  }
  let partitions = generateInnerPartitions(value);
  if (partitions) {
    return { type: PARTITION_TYPES.QUOTES, partitions };
  } else {
    return { type: PARTITION_TYPES.QUOTES, value };
  }
}

function _buildImagePartition(markdownSubstring) {
  let breakIndex = markdownSubstring.indexOf(']');
  let altText = markdownSubstring.substring(2, breakIndex);
  if (altText === '') {
    altText = null;
  }
  let link = markdownSubstring.substring(breakIndex + 2, markdownSubstring.length - 1);
  return { type: PARTITION_TYPES.IMAGE, altText, link };
}

function _buildHrPartition() {
  return { type: PARTITION_TYPES.HR };
}

function _buildParagraphPartition(markdownSubstring) {
  return { type: PARTITION_TYPES.PARAGRAPH, partitions: generateInnerPartitions(markdownSubstring) };
}

// HELPER METHODS

function _splitAtOuterBreakPoints(markdownText) {
  let markdownSplits = [];
  let lastBreakPoint = 0;
  let index = markdownText.indexOf('\n', lastBreakPoint);
  while (index !== -1) {
    index = _findOuterBreakPoint(lastBreakPoint, index, markdownText);
    if (index === -1) {
      break;
    }
    markdownSplits.push(markdownText.substring(lastBreakPoint, index).trim());
    lastBreakPoint = index + 1;
    index = markdownText.indexOf('\n', lastBreakPoint);
  }
  markdownSplits.push(markdownText.substring(lastBreakPoint).trim());
  return markdownSplits;
}

function _findOuterBreakPoint(lastBreakPoint, index, markdownText) {
  if (index === -1) {
    return index;
  }
  let currentSubstring = markdownText.substring(lastBreakPoint);
  let nextSubstring = markdownText.substring(index + 1);
  if (currentSubstring.startsWith('#')) {
    return index;
  } else if (currentSubstring.startsWith('* ')) {
    if (nextSubstring.startsWith('* ')) {
      index = markdownText.indexOf('\n', index + 1);
      return _findOuterBreakPoint(lastBreakPoint, index, markdownText);
    } else {
      return index;
    }
  } else if (currentSubstring.startsWith('. ')) {
    if (nextSubstring.startsWith('. ')) {
      index = markdownText.indexOf('\n', index + 1);
      return _findOuterBreakPoint(lastBreakPoint, index, markdownText);
    } else {
      return index;
    }
  } else if (currentSubstring.startsWith('>>>')) {
    index = markdownText.indexOf('>>>', index + 1);
    return index + 3;
  } else if (currentSubstring.startsWith('> ')) {
    return index;
  } else if (currentSubstring.startsWith('![')) {
    return index;
  } else if (currentSubstring.startsWith('---')) {
    return index;
  } else {
    if (nextSubstring.startsWith('#')) {
      return index;
    } else if (nextSubstring.startsWith('* ')) {
      return index;
    } else if (nextSubstring.startsWith('. ')) {
      return index;
      // @TODO: needed?
    } else if (nextSubstring.startsWith('>') /*|| nextSubstring.startsWith('>>>')*/) {
      return index;
    } else {
      index = markdownText.indexOf('\n', index + 1);
      return _findOuterBreakPoint(lastBreakPoint, index, markdownText);
    }
  }
}