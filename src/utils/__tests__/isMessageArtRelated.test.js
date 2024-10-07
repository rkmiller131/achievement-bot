const isMessageArtRelated = require('../isMessageArtRelated');
const { REGEX_ART, ART_WORDS } = require('../constants');

describe('isMessageArtRelated function', () => {
  it('returns true for art-related channel names', () => {
    expect(isMessageArtRelated({
      channel: { name: 'art' },
      attachments: [{ url: 'test.jpg' }]
    })).toBe(true);

    expect(isMessageArtRelated({
      channel: { name: 'text-art' },
      attachments: [{ url: 'test.jpg' }]
    })).toBe(true);

    expect(isMessageArtRelated({
      channel: { name: 'fan-art' },
      attachments: [{ url: 'test.jpg' }]
    })).toBe(true);

    expect(isMessageArtRelated({
      channel: { name: 'artsy' },
      attachments: [{ url: 'test.jpg' }]
    })).toBe(true);

    expect(isMessageArtRelated({
      channel: { name: 'artistic' },
      attachments: [{ url: 'test.jpg' }]
    })).toBe(true);
  });

  it('returns false for non-art-related channel names', () => {
    expect(isMessageArtRelated({
      channel: { name: 'partial' },
      attachments: [{ url: 'test.jpg' }]
    })).toBe(false);

    expect(isMessageArtRelated({
      channel: { name: 'start' },
      attachments: [{ url: 'test.jpg' }]
    })).toBe(false);
  });

  it('returns art-text-only for channels that are partially related to art but lack attachments', () => {
    expect(isMessageArtRelated({
      channel: { name: 'art' },
      attachments: new Map()
    })).toBe('art-text-only');
  });

  it('returns false for channels that are not related to art, even if they have attachments', () => {
    expect(isMessageArtRelated({
      channel: { name: 'non-related-channel' },
      attachments: [{ url: 'test.jpg' }]
    })).toBe(false);
  });
});
