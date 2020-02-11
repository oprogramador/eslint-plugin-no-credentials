import _ from 'lodash';
import calculateStrongEntropy from 'eslint-plugin-no-credentials/calculateStrongEntropy';
import splitStringIntoWords from 'eslint-plugin-no-credentials/splitStringIntoWords';

const inspectNode = ({ node, value, context }) => {
  if (typeof value !== 'string') {
    return;
  }
  const {
    delimiters, minimumWordLength, minimumNumberOfWords, shouldSplitCamelCase, maximumEntropy = 5,
  } = context.options[0] || {};
  const words = splitStringIntoWords(value, {
    delimiters,
    minimumNumberOfWords,
    minimumWordLength,
    shouldSplitCamelCase,
  });
  const entropies = _.zipObject(words, words.map(word => calculateStrongEntropy(word)));
  const tooLowEntropies = Object.entries(entropies).filter(([, entropy]) => entropy > maximumEntropy);
  tooLowEntropies.forEach(([word, entropy]) => {
    context.report({
      data: {
        entropy,
        word,
      },
      messageId: 'tooHighEntropy',
      node,
    });
  });
};

const rules = {
  'no-credentials': {
    create(context) {
      const sourceCode = context.getSourceCode();

      return {
        Literal(node) {
          return inspectNode({ context, node, value: node.value });
        },
        Program() {
          const comments = sourceCode.getAllComments();
          const {
            delimiters,
            maximumEntropy = 5,
            minimumNumberOfWords,
            minimumWordLength,
            shouldSplitCamelCase,
          } = context.options[0] || {};
          comments.forEach((comment) => {
            const words = splitStringIntoWords(comment.value, {
              delimiters,
              minimumNumberOfWords,
              minimumWordLength,
              shouldSplitCamelCase,
            });
            const entropies = _.zipObject(words, words.map(word => calculateStrongEntropy(word)));
            const tooLowEntropies = Object.entries(entropies).filter(([, entropy]) => entropy > maximumEntropy);
            tooLowEntropies.forEach(([word, entropy]) => {
              context.report({
                data: {
                  entropy,
                  word,
                },
                loc: comment.loc,
                messageId: 'tooHighEntropy',
              });
            });
          });
        },
        TemplateElement(node) {
          return inspectNode({ context, node, value: node.value.raw });
        },
      };
    },
    meta: {
      messages: {
        tooHighEntropy: 'too high entropy {{entropy}} : {{word}}',
      },
    },
  },
};

export { rules };
export default null;
