import { applyPattern, computeRenames, formatBytes, splitExtension } from './rename';

const opts = { pattern: 'file_{index}', startIndex: 1, leadingZeros: 0 };

describe('splitExtension', () => {
  it('splits on the last dot', () => {
    expect(splitExtension('archive.tar.gz')).toEqual({ base: 'archive.tar', ext: '.gz' });
  });

  it('treats dotfiles and extensionless names as having no extension', () => {
    expect(splitExtension('.gitignore')).toEqual({ base: '.gitignore', ext: '' });
    expect(splitExtension('README')).toEqual({ base: 'README', ext: '' });
  });
});

describe('applyPattern', () => {
  it('replaces every {index} and pads it', () => {
    expect(applyPattern('{index}_img_{index}', 7, 3)).toBe('007_img_007');
  });

  it('strips characters that are invalid in file names', () => {
    expect(applyPattern('a/b:c_{index}', 1, 0)).toBe('a_b_c_1');
  });

  it('falls back to the index for an empty pattern', () => {
    expect(applyPattern('   ', 4, 2)).toBe('04');
  });
});

describe('computeRenames', () => {
  it('keeps extensions and counts from the start index', () => {
    const result = computeRenames(['a.jpg', 'b.PNG', 'c'], { ...opts, startIndex: 0 });
    expect(result.map((r) => r.newName)).toEqual(['file_0.jpg', 'file_1.PNG', 'file_2']);
  });

  it('de-duplicates colliding names instead of overwriting them', () => {
    const result = computeRenames(['a.jpg', 'b.jpg', 'c.JPG'], { ...opts, pattern: 'photo' });
    expect(result.map((r) => r.newName)).toEqual(['photo.jpg', 'photo (2).jpg', 'photo (3).JPG']);
    expect(result.map((r) => r.adjusted)).toEqual([false, true, true]);
  });
});

describe('formatBytes', () => {
  it('formats human-readable sizes', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(1536)).toBe('1.5 KB');
    expect(formatBytes(5 * 1024 * 1024)).toBe('5.0 MB');
  });
});
