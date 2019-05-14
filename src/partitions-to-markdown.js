import { PARTITION_TYPES } from './partition-types';

/**
 * Converts partition array into markdown text for editing.
 * @param  {partition} partitions Array of partitions.
 * @return {string}
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
      return markdownText += '# ' + _addEscapeCharacter(partition.value);
    case PARTITION_TYPES.PARAGRAPH:
      return markdownText += _partitionCheckParseOrAdd(partition);
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
      return markdownText += '[' + _addEscapeCharacter(partition.value) + '](' + partition.link + ')';
    case PARTITION_TYPES.RELATION:
      return markdownText += '{' + _addEscapeCharacter(partition.value) + '}(' + partition.relation + ')';
    case PARTITION_TYPES.COLOR:
      return markdownText += '{' + _addEscapeCharacter(partition.value) + '}(' + partition.color + ')';
  }
}

function _partitionCheckParseOrAdd(partition) {
  let markdownText = '';
  if (partition.partitions) {
    return markdownText += _generateMarkdownRecursiveInner(partition.partitions);
  }
  return markdownText += _addEscapeCharacter(partition.value);
}

function _parseQuote(partition) {
  let markdownText = _partitionCheckParseOrAdd(partition);
  if (markdownText.includes('\n')) {
    return '>>>\n' + markdownText + '\n>>>';
  } else {
    return '> ' + markdownText;
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

function _addEscapeCharacter(value) {
  value = value.replace(/[*]/g, '\*');
  value = value.replace(/[_]/g, '\_');
  value = value.replace(/^[>]/g, '\>');
  value = value.replace(/^[#]/g, '\#');
  value = value.replace(/^[.]/g, '\.');
  return value;
}