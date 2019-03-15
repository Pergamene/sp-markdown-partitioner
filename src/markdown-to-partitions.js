import { PARTITION_TYPES } from "./partition-types";

/**
 * assemble all partition fragments
 * 
 * @param {string} markdownText see partitions-to-markdown 
 */
export function generatePartitions(markdownText) {
  let partition;
  let partitions = [];
  let markdownSplits = _splitAtOuterBreakPoints(markdownText.trim());
  for (let substringIndex in markdownSplits) {
    partition = _parseOuterPartition(markdownSplits[substringIndex]);
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
  for (let i in listItems) {
    value = listItems[i].substring(1).trim();
    if (_checkForInnerPartitions(value)) {
      itemObject = _generateInnerPartitions(value);
    } else {
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
  if (_checkForInnerPartitions(value)) {
    value = _generateInnerPartitions(value);
    return { type: PARTITION_TYPES.QUOTES, partitions: value };
  }
  return { type: PARTITION_TYPES.QUOTES, value };
}

function _buildImagePartition(markdownSubstring) {
  let breakIndex = markdownSubstring.indexOf(']');
  let altText = markdownSubstring.substring(2, breakIndex);
  let link = markdownSubstring.substring(breakIndex + 2, markdownSubstring.length - 1);
  return { type: PARTITION_TYPES.IMAGE, altText, link };
}

function _buildHrPartition() {
  return { type: PARTITION_TYPES.HR };
}

function _buildParagraphPartition(markdownSubstring) {
  return { type: PARTITION_TYPES.PARAGRAPH, partitions: _generateInnerPartitions(markdownSubstring) };
}

// @TODO: let _generateInnerPartitions check, not the outer partitions
function _checkForInnerPartitions(markdownSubstring) {
  let markdownCharacters = [ '*', '_', '[', '{' ];
  let hasPartitions = false;
  for (let charIndex in markdownCharacters) {
    if (markdownSubstring.indexOf(markdownCharacters[charIndex]) >= 0) {
      hasPartitions = hasPartitions || !_isEscapedCharacter(charIndex, markdownSubstring);
    }
  }
  return hasPartitions;
}

function _isEscapedCharacter(charIndex, markdownSubstring) {
  if (charIndex > 0 && markdownSubstring[charIndex - 1] === '\\') {
    return true;
  }
  return false;
}

function _generateInnerPartitions(markdownSubstring) {
  let partition;
  let partitions = [];
  let innerSplits = _splitAtInnerBreakPoint(markdownSubstring);
  for (let substringIndex in innerSplits) {
    partition = _parseInnerPartition(innerSplits[substringIndex]);
    // @TODO: possibly old way?
    if (partition.length) {
      for (let partitionIndex in partition) {
        partitions.push(partition[partitionIndex]);
      }
    } else {
      partitions.push(partition);
    }
  }
  return partitions;
}

function _parseInnerPartition(markdownSubstring) {
  // @TODO: by the time it gets here, markdownSubstring should just have a .type property
  // that you apply the switch on.  The string parser should know the partition types and there's
  // no reason to repeat that work.
  if (markdownSubstring.startsWith('*')) {
    return _buildBoldPartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('_')) {
    return _buildItalicsPartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('[')) {
    return _buildLinkPartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('{')) {
    if (markdownSubstring.indexOf('#') < 0) {
      return _buildRelationPartition(markdownSubstring);
    } else {
      return _buildColorPartition(markdownSubstring);
    }
  } else {
    return _buildTextPartition(markdownSubstring);
  }
}

function _buildBoldPartition(markdownSubstring) {
  let value = markdownSubstring.substring(1, markdownSubstring.length - 1);
  return { type: PARTITION_TYPES.BOLD, value };
}

function _buildItalicsPartition(markdownSubstring) {
  let value = markdownSubstring.substring(1, markdownSubstring.length - 1);
  return { type: PARTITION_TYPES.ITALICS, value };
}

function _buildLinkPartition(markdownSubstring) {
  let value = markdownSubstring.substring(1, markdownSubstring.indexOf(']'));
  let link = markdownSubstring.substring(markdownSubstring.indexOf('(') + 1, markdownSubstring.length - 1);
  return { type: PARTITION_TYPES.LINK, value, link };
}

function _buildRelationPartition(markdownSubstring) {
  let value = markdownSubstring.substring(1, markdownSubstring.indexOf('}'));
  let relation = markdownSubstring.substring(markdownSubstring.indexOf('(') + 1, markdownSubstring.length - 1);
  return { type: PARTITION_TYPES.RELATION, value, relation };
}

function _buildColorPartition(markdownSubstring) {
  let value = markdownSubstring.substring(1, markdownSubstring.indexOf('}'));
  let color = markdownSubstring.substring(markdownSubstring.indexOf('(') + 1, markdownSubstring.length - 1);
  return { type: PARTITION_TYPES.COLOR, value, color };
}

function _buildTextPartition(markdownSubstring) {
  let value = markdownSubstring;
  return { type: PARTITION_TYPES.TEXT, value };
}

function _splitAtOuterBreakPoints(markdownText) {
  let markdownSplits = [];
  let lastBreakPoint = 0;
  let index = markdownText.indexOf('\n', lastBreakPoint);
  while (index !== -1) {
    index = _findOuterBreakPoint(lastBreakPoint, index, markdownText);
    markdownSplits.push(markdownText.substring(lastBreakPoint, index).trim());
    lastBreakPoint = index + 1;
    index = markdownText.indexOf('\n', lastBreakPoint);
  }
  return markdownSplits;
}

function _findOuterBreakPoint(lastBreakPoint, index, markdownText) {
  if (index >= markdownText.length) {
    return markdownText.length;
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

function _splitAtInnerBreakPoint(markdownSubstring) {
  let markdownSubstringWithBreaks = _findInnerBreakPoint(markdownSubstring);
  // @TODO: make <b> a const, and something more generic, like "SP_BREAK"
  let markdownSplits = markdownSubstringWithBreaks.split('<b>');
  return markdownSplits;
}

function _findInnerBreakPoint(markdownSubstring) {
  let markdownSubstringWithBreaks = markdownSubstring;
  let index = markdownSubstringWithBreaks.indexOf('*');
  while (index >= 0) {
    markdownSubstringWithBreaks = _insertBreakPoint(index, markdownSubstringWithBreaks);
    index = markdownSubstringWithBreaks.indexOf('*', index + 4);
    if (index >= 0) {
      markdownSubstringWithBreaks = _insertBreakPoint(index + 1, markdownSubstringWithBreaks);
      index = markdownSubstringWithBreaks.indexOf('*', index + 1);
    }
  }
  index = markdownSubstringWithBreaks.indexOf('_');
  while (index >= 0) {
    markdownSubstringWithBreaks = _insertBreakPoint(index, markdownSubstringWithBreaks);
    index = markdownSubstringWithBreaks.indexOf('_', index + 4);
    if (index >= 0) {
      markdownSubstringWithBreaks = _insertBreakPoint(index + 1, markdownSubstringWithBreaks);
      index = markdownSubstringWithBreaks.indexOf('_', index + 1);
    }
  }
  let startIndex, endIndex;
  index = markdownSubstringWithBreaks.indexOf('[');
  while (index >= 0) {
    startIndex = index;
    markdownSubstringWithBreaks = _insertBreakPoint(index, markdownSubstringWithBreaks);
    index = markdownSubstringWithBreaks.indexOf(')', index + 4);
    endIndex = index;
    markdownSubstringWithBreaks = _removeBreakPoint(startIndex, endIndex, markdownSubstring);
    if (index >= 0) {
      markdownSubstringWithBreaks = _insertBreakPoint(index + 1, markdownSubstringWithBreaks);
      index = markdownSubstringWithBreaks.indexOf('[', index + 1);
    }
  }
  index = markdownSubstringWithBreaks.indexOf('{');
  while (index >= 0) {
    startIndex = index;
    markdownSubstringWithBreaks = _insertBreakPoint(index, markdownSubstringWithBreaks);
    index = markdownSubstringWithBreaks.indexOf(')', index + 4);
    endIndex = index;
    markdownSubstringWithBreaks = _removeBreakPoint(startIndex, endIndex, markdownSubstring);
    if (index >= 0) {
      markdownSubstringWithBreaks = _insertBreakPoint(index + 1, markdownSubstringWithBreaks);
      index = markdownSubstringWithBreaks.indexOf('{', index + 1);
    }
  }
  return markdownSubstringWithBreaks;
}

function _insertBreakPoint(insertAt, markdownSubstring) {
  if (!_isEscapedCharacter(insertAt, markdownSubstring)) {
    let firstHalf = markdownSubstring.substring(0, insertAt);
    let secondHalf = markdownSubstring.substring(insertAt);
    return firstHalf + '<b>' + secondHalf;
  } else {
    return markdownSubstring;
  }
}

function _removeBreakPoint(startIndex, endIndex, markdownSubstring) {
  let split = markdownSubstring.substring(startIndex, endIndex).split('<b>');
  return split[0] + split[1];
}