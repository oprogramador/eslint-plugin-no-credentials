import expect from 'eslint-plugin-no-credentials/tests/expect';
import splitStringIntoWords from 'eslint-plugin-no-credentials/splitStringIntoWords';

describe('splitStringIntoWords', () => {
  it('splits only by space as default', () => {
    const string = 'lorem-ipsum doLor sit@amet.com';

    const result = splitStringIntoWords(string);

    expect(result).to.deep.equal([
      'lorem-ipsum',
      'doLor',
      'sit@amet.com',
    ]);
  });

  it('splits with passed delimiters', () => {
    const string = 'lorem-ipsum doLor sit@amet.com foo/bar/baz-lorem ipsum';

    const result = splitStringIntoWords(string, { delimiters: [' ', '-', '@', '/'] });

    expect(result).to.deep.equal([
      'lorem',
      'ipsum',
      'doLor',
      'sit',
      'amet.com',
      'foo',
      'bar',
      'baz',
      'lorem',
      'ipsum',
    ]);
  });

  it('does not split with number of words below the minimum', () => {
    const string = 'FOO_BAR';

    const result = splitStringIntoWords(string, {
      delimiters: ['_'],
      minimumNumberOfWords: 3,
    });

    expect(result).to.deep.equal([
      'FOO_BAR',
    ]);
  });

  it('splits with number of words equal to the minimum', () => {
    const string = 'FOO_BAR_BAZ';

    const result = splitStringIntoWords(string, {
      delimiters: ['_'],
      minimumNumberOfWords: 3,
    });

    expect(result).to.deep.equal([
      'FOO',
      'BAR',
      'BAZ',
    ]);
  });

  it('splits with number of words higher than the minimum', () => {
    const string = 'FOO_BAR_BAZ_LOREM';

    const result = splitStringIntoWords(string, {
      delimiters: ['_'],
      minimumNumberOfWords: 3,
    });

    expect(result).to.deep.equal([
      'FOO',
      'BAR',
      'BAZ',
      'LOREM',
    ]);
  });

  it('works for the minimum length 0', () => {
    const string = 'FOO BAR BAZ LOREM';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 0,
    });

    expect(result).to.deep.equal([
      'FOO',
      'BAR',
      'BAZ',
      'LOREM',
    ]);
  });

  it('works for the minimum length 1', () => {
    const string = 'FOO BAR BAZ LOREM';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 1,
    });

    expect(result).to.deep.equal([
      'FOO',
      'BAR',
      'BAZ',
      'LOREM',
    ]);
  });

  it('does not join words for length above the minimum length', () => {
    const string = 'FOO BAR BAZ LOREM';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 2,
    });

    expect(result).to.deep.equal([
      'FOO',
      'BAR',
      'BAZ',
      'LOREM',
    ]);
  });

  it('does not join words for length at least the minimum length', () => {
    const string = 'FOO BAR BAZ LOREM';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 3,
    });

    expect(result).to.deep.equal([
      'FOO',
      'BAR',
      'BAZ',
      'LOREM',
    ]);
  });

  it('join words below the minimum length 4', () => {
    const string = 'FOO BAR BAZ LOREM';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 4,
    });

    expect(result).to.deep.equal([
      'FOOBAR',
      'BAZLOREM',
    ]);
  });

  it('join words below the minimum length 5', () => {
    const string = 'FOO BAR BAZ LOREM';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 5,
    });

    expect(result).to.deep.equal([
      'FOOBAR',
      'BAZLOREM',
    ]);
  });

  it('join words below the minimum length 6', () => {
    const string = 'FOO BAR BAZ LOREM';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 6,
    });

    expect(result).to.deep.equal([
      'FOOBAR',
      'BAZLOREM',
    ]);
  });

  it('join words below the minimum length 7', () => {
    const string = 'FOO BAR BAZ LOREM';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 7,
    });

    expect(result).to.deep.equal([
      'FOOBARBAZ',
      'LOREM',
    ]);
  });

  it('join words below the minimum length 8', () => {
    const string = 'FOO BAR BAZ LOREM';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 8,
    });

    expect(result).to.deep.equal([
      'FOOBARBAZ',
      'LOREM',
    ]);
  });

  it('join words below the minimum length 9', () => {
    const string = 'FOO BAR BAZ LOREM';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 9,
    });

    expect(result).to.deep.equal([
      'FOOBARBAZ',
      'LOREM',
    ]);
  });

  it('join words below the minimum length 10', () => {
    const string = 'FOO BAR BAZ LOREM';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 10,
    });

    expect(result).to.deep.equal([
      'FOOBARBAZLOREM',
    ]);
  });
});
