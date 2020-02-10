import expect from 'eslint-plugin-no-credentials/tests-mocha/expect';
import findSubstrings from 'eslint-plugin-no-credentials/findSubstrings';

describe('findSubstrings', () => {
  it('finds substrings for an empty string', () => {
    const string = '';

    const result = findSubstrings(string);

    expect(result).to.deep.equal([
    ]);
  });

  it('finds substrings for a 1-character string', () => {
    const string = 'a';

    const result = findSubstrings(string);

    expect(result).to.deep.equal([
    ]);
  });

  it('finds substrings for a 2-characters string', () => {
    const string = 'ab';

    const result = findSubstrings(string);

    expect(result).to.deep.equal([
      'a',
      'b',
    ]);
  });

  it('finds substrings for a 3-characters string', () => {
    const string = 'abc';

    const result = findSubstrings(string);

    expect(result).to.deep.equal([
      'a',
      'b',
      'c',
    ]);
  });

  it('finds substrings for a 4-characters string', () => {
    const string = 'abcd';

    const result = findSubstrings(string);

    expect(result).to.deep.equal([
      'a',
      'ab',
      'b',
      'bc',
      'c',
      'cd',
      'd',
    ]);
  });

  it('finds substrings for a 5-characters string', () => {
    const string = 'abcde';

    const result = findSubstrings(string);

    expect(result).to.deep.equal([
      'a',
      'ab',
      'b',
      'bc',
      'c',
      'cd',
      'd',
      'de',
      'e',
    ]);
  });

  it('finds substrings for a 6-characters string', () => {
    const string = 'abcdef';

    const result = findSubstrings(string);

    expect(result).to.deep.equal([
      'a',
      'ab',
      'abc',
      'b',
      'bc',
      'bcd',
      'c',
      'cd',
      'cde',
      'd',
      'de',
      'def',
      'e',
      'ef',
      'f',
    ]);
  });
});
