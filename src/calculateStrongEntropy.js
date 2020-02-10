import calculateEntropy from 'eslint-plugin-no-credentials/calculateEntropy';
import zlib from 'zlib';

function calculateStrongEntropy(string) {
  const entropy = calculateEntropy(string);
  const zipped = zlib.gzipSync(string);

  return Math.sqrt((entropy + 1) * (zipped.length - 20));
}

export default calculateStrongEntropy;
