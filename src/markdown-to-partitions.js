import { PARTITION_TYPES } from "./partition-types";

/**
 * assemble all partition fragments
 * 
 * @param {string} markdownText see partitions-to-markdown 
 */
export function generatePartitions(markdownText) {
  let partitions = [];
  let markdownSplits = markdownText.split('\n');
  markdownSplits = _combineListItems(markdownSplits);
  for (let substringIndex in markdownSplits) {
    if (partitions.length === 0) {
      partitions = _parseOuterPartition(markdownSplits[substringIndex]);
    } else {
      partitions = [partitions, _parseOuterPartition(markdownSplits[substringIndex])];
    }
  }
  return partitions;
}

function _parseOuterPartition(markdownSubstring) {
  if (markdownSubstring.startsWith('#')) {
    return _buildHeaderPartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('* ')) {
    return _buildUnorderedListPartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('. ')) {
    return _buildOrderedListPartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('>' || '>>>')) {
    return _buildQuotePartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('![')) {
    return _buildImagePartition(markdownSubstring);
  } else if (markdownSubstring.startsWith('---')) {
    return _buildHrPartition(markdownSubstring);
  } else {
    return _buildParagraphPartition(markdownSubstring);
  }
}

// TODO: inner partitions?
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
  let list = [];
  let listItems = markdownSubstring.split('\n');
  let item;
  let itemObject;
  for (let i in listItems) {
    item = listItems[i].substring(1).trim();
    itemObject = [ { type: PARTITION_TYPES.TEXT, value: item } ];
    if (list.length === 0) {
      list = itemObject;
    } else {
      list = [list, itemObject];
    }
  }
  return [ { type: PARTITION_TYPES.UNORDERED_LIST, items: list } ];
}

function _buildOrderedListPartition(markdownSubstring) {
  let list = [];
  let listItems = markdownSubstring.split('\n');
  let item;
  let itemObject;
  for (let i in listItems) {
    item = listItems[i].substring(1).trim();
    itemObject = [ { type: PARTITION_TYPES.TEXT, value: item } ];
    if (list.length === 0) {
      list = itemObject;
    } else {
      list = [list, itemObject];
    }
  }
  return [ { type: PARTITION_TYPES.ORDERED_LIST, items: list } ];
}

function _buildQuotePartition(markdownSubstring) {

}

function _buildImagePartition(markdownSubstring) {

}

function _buildHrPartition(markdownSubstring) {

}

function _buildParagraphPartition(markdownSubstring) {
  
}

function _checkForInnerPartitions(markdownSubstring) {

}

function _parseInnerPartition(markdownSubstring) {

}



function _combineListItems(markdownSplits) {
  let newSplits = [];
  let previousType = null;
  let currentSplit;
  let combinedItem;
  for (let split in markdownSplits) {
    currentSplit = markdownSplits[split].trim();
    if (currentSplit.startsWith('* ')) {
      if (previousType === PARTITION_TYPES.ORDERED_LIST) {
        newSplits.push(combinedItem);
        previousType = null;
      } 
      if (previousType !== PARTITION_TYPES.UNORDERED_LIST) {
        previousType = PARTITION_TYPES.UNORDERED_LIST;
        combinedItem = currentSplit;
      } else {
        combinedItem += '\n' + currentSplit;
      }
    } else if (currentSplit.startsWith('. ')) {
      if (previousType === PARTITION_TYPES.UNORDERED_LIST) {
        newSplits.push(combinedItem);
        previousType = null;
      } 
      if (previousType !== PARTITION_TYPES.ORDERED_LIST) {
        previousType = PARTITION_TYPES.ORDERED_LIST;
        combinedItem = currentSplit;
      } else {
        combinedItem += '\n' + currentSplit;
      }
    } else if (previousType === PARTITION_TYPES.UNORDERED_LIST || previousType === PARTITION_TYPES.ORDERED_LIST) {
      newSplits.push(combinedItem);
      previousType = null;
      newSplits.push(currentSplit);
    } else {
      newSplits.push(currentSplit);
    }
  }
  return newSplits;
}