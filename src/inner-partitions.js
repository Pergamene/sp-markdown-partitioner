import { PARTITION_TYPES } from "./partition-types";

export function generateInnerPartitions(markdownSubstring) {
  let partitions = [];
  let breakPoints = _splitAtInnerBreakPoints(markdownSubstring);
  for ()
}

function _parseInnerPartition(markdownSubstring) {
    
}

function _buildBoldPartition(markdownSubstring) {

}

function _buildItalicsPartition(markdownSubstring) {

}

function _buildLinkPartition(markdownSubstring) {

}

function _buildRelationPartition(markdownSubstring) {

}

function _buildColorPartition(markdownSubstring) {

}

function _buildTextPartition(markdownSubstring) {

}

// HELPER METHODS

function _splitAtInnerBreakPoints(markdownSubstring) {
  let breakPoints = [];

}

function _findNextInnerBreakPoint(startIndex, markdownSubstring) {
  
}

function _ignoreCharacter(charIndex, markdownSubstring) {
  if (charIndex < 0) {
    return false;
  } else if (charIndex > 0 && markdownSubstring[charIndex - 1] === '\\') {
    return true;
  }
  let startI = markdownSubstring.lastIndexOf('[', charIndex);
  let endI = markdownSubstring.indexOf(')', charIndex);
  if (startI < charIndex && endI > charIndex) {
    let midI = markdownSubstring.indexOf('](', startI);
    if (startI < midI && endI > midI) {
      return true;
    }
  } 
  startI = markdownSubstring.lastIndexOf('{', charIndex);
  endI = markdownSubstring.indexOf(')', charIndex);
  if (startI < charIndex && endI > charIndex) {
    midI = markdownSubstring.indexOf('}(', startI);
    if (startI < midI && endI > midI) {
      return true;
    }
  }
  return false;
}