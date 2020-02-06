import calculateStrongEntropy from 'eslint-plugin-no-credentials/calculateStrongEntropy';
import expect from 'eslint-plugin-no-credentials/tests/expect';

describe('calculateStrongEntropy', () => {
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

  it('calculates strong entropy for aą#$@;,vŽžő', async () => {
    const string = 'aą#$@;,vŽžő';

    const result = await calculateStrongEntropy(string);

    expect(result).to.be.closeTo(8.44694, 0.00001);
  });
});
