/* eslint-disable max-len */
import expect from 'eslint-plugin-no-credentials/tests-mocha/expect';
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

  it('does not split camelCase by default', () => {
    const string = 'fooBarBazLorem';

    const result = splitStringIntoWords(string);

    expect(result).to.deep.equal([
      'fooBarBazLorem',
    ]);
  });

  it('does not split camelCase if it contains any non-letters', () => {
    const string = 'fooBarBaz1Lorem';

    const result = splitStringIntoWords(string, {
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'fooBarBaz1Lorem',
    ]);
  });

  it('does not split camelCase if it contains only upper case', () => {
    const string = 'ABCDEFGHI';

    const result = splitStringIntoWords(string, {
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'ABCDEFGHI',
    ]);
  });

  it('does not split camelCase if it contains only lower case', () => {
    const string = 'abcdefghi';

    const result = splitStringIntoWords(string, {
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'abcdefghi',
    ]);
  });

  it('splits camelCase', () => {
    const string = 'fooBarBazLorem';

    const result = splitStringIntoWords(string, {
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'foo',
      'Bar',
      'Baz',
      'Lorem',
    ]);
  });

  it('splits camelCase with minimumWordLength 2', () => {
    const string = 'fooBarBazLorem';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 2,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'foo',
      'Bar',
      'Baz',
      'Lorem',
    ]);
  });

  it('splits camelCase with minimumWordLength 3', () => {
    const string = 'fooBarBazLorem';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 3,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'foo',
      'Bar',
      'Baz',
      'Lorem',
    ]);
  });

  it('splits camelCase with minimumWordLength 4', () => {
    const string = 'fooBarBazLorem';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 4,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'fooBar',
      'BazLorem',
    ]);
  });

  it('splits camelCase with minimumWordLength 7', () => {
    const string = 'fooBarBazLorem';

    const result = splitStringIntoWords(string, {
      minimumWordLength: 7,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'fooBarBaz',
      'Lorem',
    ]);
  });

  it('does not split camelCase with number of words below minimumNumberOfWords', () => {
    const string = 'fooBarBazLorem';

    const result = splitStringIntoWords(string, {
      minimumNumberOfWords: 5,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'fooBarBazLorem',
    ]);
  });

  it('splits camelCase with number of words equal to minimumNumberOfWords', () => {
    const string = 'fooBarBazLorem';

    const result = splitStringIntoWords(string, {
      minimumNumberOfWords: 4,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'foo',
      'Bar',
      'Baz',
      'Lorem',
    ]);
  });

  it('splits camelCase with number of words above minimumNumberOfWords', () => {
    const string = 'fooBarBazLorem';

    const result = splitStringIntoWords(string, {
      minimumNumberOfWords: 3,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'foo',
      'Bar',
      'Baz',
      'Lorem',
    ]);
  });

  it('splits camelCase and by delimiter in the same time', () => {
    const string = 'fooBar bazLorem';

    const result = splitStringIntoWords(string, {
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'foo',
      'Bar',
      'baz',
      'Lorem',
    ]);
  });

  it('splits camelCase and by many delimiters in the same time', () => {
    const string = 'fooBar-bazLorem-foo2_bar3 loremIpsumDolorSitAmet_foo3';

    const result = splitStringIntoWords(string, {
      delimiters: ['-', '_', ' '],
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'foo',
      'Bar',
      'baz',
      'Lorem',
      'foo2',
      'bar3',
      'lorem',
      'Ipsum',
      'Dolor',
      'Sit',
      'Amet',
      'foo3',
    ]);
  });

  it('splits camelCase and by many delimiters in the same time - number of words above minimumWordLength', () => {
    const string = 'fooBar-bazLorem-foo2_bar3 loremIpsumDolorSitAmet_foo3';

    const result = splitStringIntoWords(string, {
      delimiters: ['-', '_', ' '],
      minimumNumberOfWords: 11,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'foo',
      'Bar',
      'baz',
      'Lorem',
      'foo2',
      'bar3',
      'lorem',
      'Ipsum',
      'Dolor',
      'Sit',
      'Amet',
      'foo3',
    ]);
  });

  it('splits camelCase and by many delimiters in the same time - number of words equal to minimumWordLength', () => {
    const string = 'fooBar-bazLorem-foo2_bar3 loremIpsumDolorSitAmet_foo3';

    const result = splitStringIntoWords(string, {
      delimiters: ['-', '_', ' '],
      minimumNumberOfWords: 12,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'foo',
      'Bar',
      'baz',
      'Lorem',
      'foo2',
      'bar3',
      'lorem',
      'Ipsum',
      'Dolor',
      'Sit',
      'Amet',
      'foo3',
    ]);
  });

  it('does not split camelCase and by many delimiters in the same time - number of words below minimumWordLength', () => {
    const string = 'fooBar-bazLorem-foo2_bar3 loremIpsumDolorSitAmet_foo3';

    const result = splitStringIntoWords(string, {
      delimiters: ['-', '_', ' '],
      minimumNumberOfWords: 13,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'fooBar-bazLorem-foo2_bar3 loremIpsumDolorSitAmet_foo3',
    ]);
  });

  it('splits camelCase and by many delimiters in the same time - minimumWordLength', () => {
    const string = 'fooBar-bazLorem-fo2_bar3 loremIpsumDolorSitAmet_foo3';

    const result = splitStringIntoWords(string, {
      delimiters: ['-', '_', ' '],
      minimumWordLength: 4,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'fooBar',
      'bazLorem',
      'fo2bar3',
      'lorem',
      'Ipsum',
      'Dolor',
      'SitAmet',
      'foo3',
    ]);
  });

  it('splits camelCase and by many delimiters in the same time - minimumWordLength, number of words above minimumNumberOfWords', () => {
    const string = 'fooBar-bazLorem-fo2_bar3 loremIpsumDolorSitAmet_foo3';

    const result = splitStringIntoWords(string, {
      delimiters: ['-', '_', ' '],
      minimumNumberOfWords: 7,
      minimumWordLength: 4,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'fooBar',
      'bazLorem',
      'fo2bar3',
      'lorem',
      'Ipsum',
      'Dolor',
      'SitAmet',
      'foo3',
    ]);
  });

  it('splits camelCase and by many delimiters in the same time - minimumWordLength, number of words equal to minimumNumberOfWords', () => {
    const string = 'fooBar-bazLorem-fo2_bar3 loremIpsumDolorSitAmet_foo3';

    const result = splitStringIntoWords(string, {
      delimiters: ['-', '_', ' '],
      minimumNumberOfWords: 8,
      minimumWordLength: 4,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'fooBar',
      'bazLorem',
      'fo2bar3',
      'lorem',
      'Ipsum',
      'Dolor',
      'SitAmet',
      'foo3',
    ]);
  });

  it('does not split camelCase and by many delimiters in the same time - minimumWordLength, number of words below minimumNumberOfWords', () => {
    const string = 'fooBar-bazLorem-fo2_bar3 loremIpsumDolorSitAmet_foo3';

    const result = splitStringIntoWords(string, {
      delimiters: ['-', '_', ' '],
      minimumNumberOfWords: 9,
      minimumWordLength: 4,
      shouldSplitCamelCase: true,
    });

    expect(result).to.deep.equal([
      'fooBar-bazLorem-fo2_bar3 loremIpsumDolorSitAmet_foo3',
    ]);
  });
});
