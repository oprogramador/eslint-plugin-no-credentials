import calculateStrongEntropy from 'eslint-plugin-no-credentials/calculateStrongEntropy';
import expect from 'eslint-plugin-no-credentials/tests-mocha/expect';

describe('calculateStrongEntropy', () => {
  it('calculates strong entropy for an empty string', () => {
    const string = '';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(0, 0.00001);
  });

  it('calculates strong entropy for a', () => {
    const string = 'a';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(1, 0.00001);
  });

  it('calculates strong entropy for aaaaa', () => {
    const string = 'aaaaa';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(1.73205, 0.00001);
  });

  it('calculates strong entropy for abcde', () => {
    const string = 'abcde';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(4.07549, 0.00001);
  });

  it('calculates strong entropy for foo', () => {
    const string = 'foo';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(2.39893, 0.00001);
  });

  it('calculates strong entropy for foofoofoo', () => {
    const string = 'foofoofoo';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(3.09701, 0.00001);
  });

  it('calculates strong entropy for foo repeated 10 times', () => {
    const string = 'foo'.repeat(10);

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(3.09701, 0.00001);
  });

  it('calculates strong entropy for foo repeated 100 times', () => {
    const string = 'foo'.repeat(100);

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(3.66443, 0.00001);
  });

  it('calculates strong entropy for foo1foo2foo', () => {
    const string = 'foo1foo2foo';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(4.85332, 0.00001);
  });

  it('calculates strong entropy for foobarbaz', () => {
    const string = 'foobarbaz';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(5.61509, 0.00001);
  });

  it('calculates strong entropy for a random 9-characters string', () => {
    const string = 'wYPT0KmIp';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(6.12611, 0.00001);
  });

  it('calculates strong entropy for a random 12-characters string', () => {
    const string = 'tBfsfGjuw7Nc';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(7.28145, 0.00001);
  });

  it('calculates strong entropy for a random 12-characters 01 sequence', () => {
    const string = '101001010001';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(4.22123, 0.00001);
  });

  it('calculates strong entropy for a random 32-characters 01 sequence', () => {
    const string = '10001011101100010100100011000111';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(5.82684, 0.00001);
  });

  it('calculates strong entropy for a random 12-characters digits sequence', () => {
    const string = '676158717724';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(6.55892, 0.00001);
  });

  it('calculates strong entropy for a random 32-characters digits sequence', () => {
    const string = '45220077709114486712228402662775';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(10.55522, 0.00001);
  });

  it('calculates strong entropy for aą#$@;,vŽžő', () => {
    const string = 'aą#$@;,vŽžő';

    const result = calculateStrongEntropy(string);

    expect(result).to.be.closeTo(8.44694, 0.00001);
  });
});
