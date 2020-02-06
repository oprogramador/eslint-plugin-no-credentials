const log2 = x => Math.log(x) / Math.log(2);

function calculateEntropy(string) {
  let entropy = 0;
  const charset = [...new Set(string.split(''))];
  for (let i = 0; i < charset.length; i++) {
    const ratio = (string.split(charset[i]).length - 1) / string.length;
    if (ratio > 0) {
      entropy -= ratio * (log2(ratio));
    }
  }

  return entropy;
}

export default calculateEntropy;
