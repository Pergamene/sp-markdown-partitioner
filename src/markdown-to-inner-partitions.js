import { PARTITION_TYPES } from './partition-types';

export function generateInnerPartitions(markdownSubstring) {
  if (markdownSubstring.length === 0) {
    return null;
  }
  let partitions = [];
  let currentIndex = 0;
  let nextIndex = _findNextInnerStart(currentIndex, markdownSubstring);
  if (nextIndex === markdownSubstring.length) {
    return null;
  }
  let currentChar, close;
  while (nextIndex < markdownSubstring.length) {
    if (nextIndex !== currentIndex) {
      partitions.push(_buildTextPartition(markdownSubstring.substring(currentIndex, nextIndex)));
      currentIndex = nextIndex;
    } else {
      currentChar = markdownSubstring.charAt(currentIndex);
      if (currentChar === '*') {
        close = _findNextValidChar(currentChar, currentIndex + 1, markdownSubstring);
        if (close > 0) {
          partitions.push(_buildBoldPartition(markdownSubstring.substring(currentIndex + 1, close)));
        }
      } else if (currentChar === '_') {
        close = _findNextValidChar(currentChar, currentIndex + 1, markdownSubstring);
        if (close > 0) {
          partitions.push(_buildItalicsPartition(markdownSubstring.substring(currentIndex + 1, close)));
        }
      } else if (currentChar === '[') {
        close = markdownSubstring.indexOf(')', currentIndex);
        partitions.push(_buildLinkPartition(markdownSubstring.substring(currentIndex, close + 1)));
      } else if (currentChar === '{') {
        close = markdownSubstring.indexOf(')', currentIndex);
        partitions.push(_buildRelationOrColorPartition(markdownSubstring.substring(currentIndex, close + 1)));
      }
      currentIndex = close + 1;
    }
    nextIndex = _findNextInnerStart(currentIndex, markdownSubstring);
  }
  if (currentIndex !== nextIndex) {
    partitions.push(_buildTextPartition(markdownSubstring.substring(currentIndex)));
  }
  return partitions;
}

function _buildBoldPartition(markdownSubstring) {
  let partitions = generateInnerPartitions(markdownSubstring);
  if (!partitions) {
    return { type: PARTITION_TYPES.BOLD, value: markdownSubstring.replace(/\\/g, '') };
  } else {
    return { type: PARTITION_TYPES.BOLD, partitions };
  }
}

function _buildItalicsPartition(markdownSubstring) {
  let partitions = generateInnerPartitions(markdownSubstring);
  if (!partitions) {
    return { type: PARTITION_TYPES.ITALICS, value: markdownSubstring.replace(/\\/g, '') };
  } else {
    return { type: PARTITION_TYPES.ITALICS, partitions };
  }
}

function _buildLinkPartition(markdownSubstring) {
  let breaks = _breakLinkRelationColor(']', markdownSubstring.replace(/\\/g, ''));
  return { type: PARTITION_TYPES.LINK, value: breaks[0], link: breaks[1] };
}

function _buildRelationOrColorPartition(markdownSubstring) {
  let breaks = _breakLinkRelationColor('}', markdownSubstring.replace(/\\/g, ''));
  if (breaks[2] !== true) {
    return _buildRelationPartition(breaks);
  } else {
    return _buildColorPartition(breaks);
  }
}

function _buildRelationPartition(breaks) {
  return { type: PARTITION_TYPES.RELATION, value: breaks[0], relation: breaks[1] };
}

function _buildColorPartition(breaks) {
  return { type: PARTITION_TYPES.COLOR, value: breaks[0], color: breaks[1] };
}

function _buildTextPartition(markdownSubstring) {
  return { type: PARTITION_TYPES.TEXT, value: markdownSubstring.replace(/\\/g, '') };
}

// HELPER METHODS

function _findNextInnerStart(index, markdownSubstring) {
  if (index >= markdownSubstring.length) {
    return markdownSubstring.length;
  }
  let boldIndex = _findNextValidChar('*', index, markdownSubstring);
  let italicsIndex = _findNextValidChar('_', index, markdownSubstring);
  let linkIndex = _findNextValidChar('[', index, markdownSubstring);
  let relColIndex = _findNextValidChar('{', index, markdownSubstring);
  let smallestArr = [markdownSubstring.length];
  let close;
  if (boldIndex >= 0) {
    close = _findNextValidChar('*', boldIndex + 1, markdownSubstring);
    if (close >= 0) {
      smallestArr.push(boldIndex);
    }
  }
  if (italicsIndex >= 0) {
    close = _findNextValidChar('_', italicsIndex + 1, markdownSubstring);
    if (close >= 0) {
      smallestArr.push(italicsIndex);
    }
  }
  if (linkIndex >= 0) {
    close = _findNextValidChar(')', linkIndex, markdownSubstring);
    if (markdownSubstring.indexOf('](', linkIndex) >= 0 && close >= 0) {
      smallestArr.push(linkIndex);
    }
  }
  if (relColIndex >= 0) {
    close = _findNextValidChar(')', relColIndex, markdownSubstring);
    if (markdownSubstring.indexOf('}(', relColIndex) >= 0 && close >= 0) {
      smallestArr.push(relColIndex);
    }
  }
  return Math.min(...smallestArr);
}

function _findNextValidChar(keyChar, index, markdownSubstring) {
  let charIndex = markdownSubstring.indexOf(keyChar, index);
  while (charIndex >= 0) {
    if ((charIndex === 0 || markdownSubstring.charAt(charIndex - 1) !== '\\') && !_inLinkRelationColor(charIndex, markdownSubstring)) {
      return charIndex;
    } else {
      charIndex = markdownSubstring.indexOf(keyChar, charIndex + 1);
    }
  }
  return charIndex;
}

function _breakLinkRelationColor(breakChar, markdownSubstring) {
  let breakPoint = markdownSubstring.indexOf(breakChar);
  let isColor = false;
  if (breakChar === '}') {
    isColor = (markdownSubstring.charAt(breakPoint + 2) === '#');
  }
  let first = markdownSubstring.substring(1, breakPoint);
  let second = markdownSubstring.substring(breakPoint + 2, markdownSubstring.length - 1);
  return [ first, second, isColor ];
}

function _inLinkRelationColor(index, markdownSubstring) {
  let inLink = _inLink(index, markdownSubstring);
  let inRelCol = _inRelationColor(index, markdownSubstring) 
  return inLink || inRelCol;
} 

function _inLink(index, markdownSubstring) {
  let open = markdownSubstring.lastIndexOf('[', index);
  let mid = markdownSubstring.indexOf('](', open);
  let close = markdownSubstring.indexOf(')', mid);
  if (open > 0 && mid > 0 && close > 0) {
    if (open < index && close > index) {
      return true;
    }
  }
  return false;
}

function _inRelationColor(index, markdownSubstring) {
  let open = markdownSubstring.lastIndexOf('{', index);
  let mid = markdownSubstring.indexOf('}(', open);
  let close = markdownSubstring.indexOf(')', mid);
  if (open > 0 && mid > 0 && close > 0) {
    if (open < index && close > index) {
      return true;
    }
  }
  return false;
}