import calculateEntropy from 'eslint-plugin-no-credentials/calculateEntropy';
import zlib from 'zlib';

const gzip = string => new Promise((resolve, reject) => zlib.gzip(string, (error, result) => {
  if (error) {
    reject(error);
  }
  resolve(result);
}));

async function calculateStrongEntropy(string) {
  const entropy = calculateEntropy(string);
  const zipped = await gzip(string);

  return Math.sqrt((entropy + 1) * (zipped.length - 20));
}

export default calculateStrongEntropy;
