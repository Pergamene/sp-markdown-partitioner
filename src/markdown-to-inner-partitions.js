import { PARTITION_TYPES } from './partition-types';

export function generateInnerPartitions(markdownSubstring) {
  if (markdownSubstring.length === 0) {
    return null;
  }
  let partitions = [];
  let currentIndex = 0;
  let nextIndex = _findNextInnerStart(currentIndex, markdownSubstring);
  if (nextIndex === markdownSubstring.length) {
    if (currentIndex === 0) {
      return null;
    } else {
      partitions.push(_buildTextPartition(markdownSubstring.substring(currentIndex)));
    }
  }
  let currentChar, close, colorIndex;
  while (currentIndex < markdownSubstring.length) {
    currentChar = markdownSubstring.indexOf(currentIndex);
    if (currentChar === '*') {
      partitions.push(_buildBoldPartition(markdownSubstring.substring(currentIndex + 1, nextIndex - 1)));
    } else if (currentChar === '_') {
      partitions.push(_buildItalicsPartition(markdownSubstring.substring(currentIndex + 1, nextIndex - 1)));
    } else if (currentChar === '[') {
      close = markdownSubstring.indexOf(')', currentIndex) + 1;
      partitions.push(_buildLinkPartition(markdownSubstring.substring(currentIndex, close)));
    } else if (currentChar === '{') {
      close = markdownSubstring.indexOf(')', currentIndex) + 1;
      colorIndex = markdownSubstring.indexOf('#', currentIndex);
      if (colorIndex > 0 && colorIndex < close) {
        partitions.push(_buildColorPartition(markdownSubstring.substring(currentIndex, close)));
      } else {
        partitions.push(_buildRelationPartition(markdownSubstring.substring(currentIndex, close)));
      }
    } else {
      partitions.push(_buildTextPartition(markdownSubstring.substring(currentIndex, nextIndex)));
    }
    currentIndex = nextIndex;
    nextIndex = _findNextInnerStart(currentIndex, markdownSubstring);
  }
  return partitions;
}

function _buildBoldPartition(markdownSubstring) {
  let partitions = generateInnerPartitions(markdownSubstring);
  if (!partitions) {
    return { type: PARTITION_TYPES.BOLD, value: markdownSubstring };
  } else {
    return { type: PARTITION_TYPES.BOLD, partitions };
  }
}

function _buildItalicsPartition(markdownSubstring) {
  let partitions = generateInnerPartitions(markdownSubstring);
  if (!partitions) {
    return { type: PARTITION_TYPES.ITALICS, value: markdownSubstring };
  } else {
    return { type: PARTITION_TYPES.ITALICS, partitions };
  }
}

function _buildLinkPartition(markdownSubstring) {
  let breaks = _breakLinkRelationColor(']', markdownSubstring);
  return { type: PARTITION_TYPES.LINK, value: breaks[0], link: breaks[1] };
}

function _buildRelationPartition(markdownSubstring) {
  let breaks = _breakLinkRelationColor('}', markdownSubstring);
  return { type: PARTITION_TYPES.RELATION, value: breaks[0], relation: breaks[1] };
}

function _buildColorPartition(markdownSubstring) {
  let breaks = _breakLinkRelationColor('}', markdownSubstring);
  return { type: PARTITION_TYPES.COLOR, value: breaks[0], color: breaks[1] };
}

function _buildTextPartition(markdownSubstring) {
  return { type: PARTITION_TYPES.TEXT, value: markdownSubstring };
}

// HELPER METHODS

function _findNextInnerStart(index, markdownSubstring) {
  let boldIndex = markdownSubstring.indexOf('*', index);
  let italicsIndex = markdownSubstring.indexOf('_', index);
  let linkIndex = markdownSubstring.indexOf('[', index);
  let relColIndex = markdownSubstring.indexOf('{', index);
  let smallestArr = [markdownSubstring.length];
  if (boldIndex >= 0) {
    if (markdownSubstring.charAt(boldIndex - 1) !== '\\') {
      smallestArr.push(boldIndex);
    }
  }
  if (italicsIndex >= 0) {
    if (markdownSubstring.charAt(boldIndex - 1) !== '\\') {
      smallestArr.push(italicsIndex);
    }
  }
  if (linkIndex >= 0) {
    if (markdownSubstring.charAt(boldIndex - 1) !== '\\') {
      if (markdownSubstring.indexOf('](', linkIndex) > 0) {
        smallestArr.push(linkIndex);
      }
    }
  }
  if (relColIndex >= 0) {
    if (markdownSubstring.charAt(boldIndex - 1) !== '\\') {
      if (markdownSubstring.indexOf('}(', relColIndex) > 0) {
        smallestArr.push(relColIndex);
      }
    }
  }
  return Math.min(...smallestArr);
}

function _breakLinkRelationColor(breakChar, markdownSubstring) {
  let breakPoint = markdownSubstring.indexOf(breakChar);
  let first = markdownSubstring.substring(1, breakPoint);
  let second = markdownSubstring.substring(breakPoint + 2, markdownSubstring.length - 1);
  return [ first, second ];
}