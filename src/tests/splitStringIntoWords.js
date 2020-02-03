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
});
