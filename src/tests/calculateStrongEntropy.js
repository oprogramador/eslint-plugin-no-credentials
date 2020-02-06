import calculateStrongEntropy from 'eslint-plugin-no-credentials/calculateStrongEntropy';
import expect from 'eslint-plugin-no-credentials/tests/expect';

describe('calculateStrongEntropy', () => {
  it('calculates strong entropy for an empty string', async () => {
    const string = '';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(0, 0.00001);
  });

  it('calculates strong entropy for a', async () => {
    const string = 'a';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(1, 0.00001);
  });

  it('calculates strong entropy for aaaaa', async () => {
    const string = 'aaaaa';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(1.73205, 0.00001);
  });

  it('calculates strong entropy for abcde', async () => {
    const string = 'abcde';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(4.07549, 0.00001);
  });

  it('calculates strong entropy for foo', async () => {
    const string = 'foo';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(2.39893, 0.00001);
  });

  it('calculates strong entropy for foofoofoo', async () => {
    const string = 'foofoofoo';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(3.09701, 0.00001);
  });

  it('calculates strong entropy for foo repeated 10 times', async () => {
    const string = 'foo'.repeat(10);

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(3.09701, 0.00001);
  });

  it('calculates strong entropy for foo repeated 100 times', async () => {
    const string = 'foo'.repeat(100);

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(3.66443, 0.00001);
  });

  it('calculates strong entropy for foo1foo2foo', async () => {
    const string = 'foo1foo2foo';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(4.85332, 0.00001);
  });

  it('calculates strong entropy for foobarbaz', async () => {
    const string = 'foobarbaz';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(5.61509, 0.00001);
  });

  it('calculates strong entropy for a random 9-characters string', async () => {
    const string = 'wYPT0KmIp';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(6.12611, 0.00001);
  });

  it('calculates strong entropy for a random 12-characters string', async () => {
    const string = 'tBfsfGjuw7Nc';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(7.28145, 0.00001);
  });

  it('calculates strong entropy for a random 12-characters 01 sequence', async () => {
    const string = '101001010001';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(4.22123, 0.00001);
  });

  it('calculates strong entropy for a random 32-characters 01 sequence', async () => {
    const string = '10001011101100010100100011000111';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(5.82684, 0.00001);
  });

  it('calculates strong entropy for a random 12-characters digits sequence', async () => {
    const string = '676158717724';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(6.55892, 0.00001);
  });

  it('calculates strong entropy for a random 32-characters digits sequence', async () => {
    const string = '45220077709114486712228402662775';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(10.55522, 0.00001);
  });

  it('calculates strong entropy for aą#$@;,vŽžő', async () => {
    const string = 'aą#$@;,vŽžő';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(8.44694, 0.00001);
  });
});
