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

  it('splits with space and passed delimiters', () => {
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
});
