import calculateEntropy from 'eslint-plugin-no-credentials/calculateEntropy';
import expect from 'eslint-plugin-no-credentials/tests/expect';

describe('calculateEntropy', () => {
  it('calculates entropy for a', () => {
    const string = 'a';

    const result = calculateEntropy(string);

    expect(result).to.be.closeTo(0, 0.00001);
  });

  it('calculates entropy for aaaaa', () => {
    const string = 'aaaaa';

    const result = calculateEntropy(string);

    expect(result).to.be.closeTo(0, 0.00001);
  });

  it('calculates entropy for abcde', () => {
    const string = 'abcde';

    const result = calculateEntropy(string);

    expect(result).to.be.closeTo(2.32193, 0.00001);
  });

  it('calculates entropy for foo', () => {
    const string = 'foo';

    const result = calculateEntropy(string);

    expect(result).to.be.closeTo(0.91830, 0.00001);
  });

  it('calculates entropy for foofoofoo', () => {
    const string = 'foofoofoo';

    const result = calculateEntropy(string);

    expect(result).to.be.closeTo(0.91830, 0.00001);
  });

  it('calculates entropy for aą#$@;,vŽžő', () => {
    const string = 'aą#$@;,vŽžő';

    const result = calculateEntropy(string);

    expect(result).to.be.closeTo(3.45943, 0.00001);
  });
});
