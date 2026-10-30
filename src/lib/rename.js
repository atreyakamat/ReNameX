// eslint-disable-next-line no-control-regex
const INVALID_CHARS = /[\\/:*?"<>|\u0000-\u001f]/g;

export function splitExtension(fileName) {
  const dot = fileName.lastIndexOf('.');
  // A leading dot (".gitignore") is part of the name, not an extension
  if (dot <= 0) return { base: fileName, ext: '' };
  return { base: fileName.slice(0, dot), ext: fileName.slice(dot) };
}

export function formatIndex(number, leadingZeros) {
  return leadingZeros > 0
    ? String(number).padStart(leadingZeros, '0')
    : String(number);
}

export function applyPattern(pattern, number, leadingZeros) {
  const index = formatIndex(number, leadingZeros);
  const base = pattern.split('{index}').join(index).replace(INVALID_CHARS, '_').trim();
  return base || index;
}

/**
 * Builds the final name for every file. Names that would collide inside the
 * ZIP (case-insensitively, as on Windows/macOS) get a " (n)" suffix so no
 * file is silently overwritten.
 */
export function computeRenames(names, { pattern, startIndex, leadingZeros }) {
  const used = new Set();

  return names.map((originalName, i) => {
    const { ext } = splitExtension(originalName);
    const base = applyPattern(pattern, startIndex + i, leadingZeros);

    let newName = base + ext;
    let copy = 2;
    while (used.has(newName.toLowerCase())) {
      newName = `${base} (${copy++})${ext}`;
    }
    used.add(newName.toLowerCase());

    return { originalName, newName, adjusted: newName !== base + ext };
  });
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unit]}`;
}
