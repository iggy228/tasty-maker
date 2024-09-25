import { describe, expect, test } from 'vitest';
import { validVideoUrl } from '../../src/utils';

describe('Valid video url', () => {
  test('Url contain mp4 format extension', () => {
    expect(validVideoUrl('https://example/video.mp4')).toBe(true);
  });

  test('Url not contain video extension', () => {
    expect(validVideoUrl('https://example/video')).toBe(false);
  });

  test('Url contain contain avi video extension', () => {
    expect(validVideoUrl('https://example/video.avi')).toBe(true);
  });

  test('Url contain contain webm video extension', () => {
    expect(validVideoUrl('https://example/video.webm')).toBe(true);
  });

  test('Url contain contain mov video extension', () => {
    expect(validVideoUrl('https://example/video.mov')).toBe(true);
  });
});
