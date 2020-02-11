import _ from 'lodash';
import calculateStrongEntropy from 'eslint-plugin-no-credentials/calculateStrongEntropy';
import splitStringIntoWords from 'eslint-plugin-no-credentials/splitStringIntoWords';

const inspectNode = ({ node, value, context }) => {
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
  const tooLowEntropies = _.filter(entropies, entropy => entropy > maximumEntropy);
  if (tooLowEntropies.length) {
    context.report({
      data: {},
      messageId: 'tooHighEntropy',
      node,
    });
  }
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
            const tooLowEntropies = _.filter(entropies, entropy => entropy > maximumEntropy);
            if (tooLowEntropies.length) {
              context.report({
                data: {},
                loc: comment.loc,
                messageId: 'tooHighEntropy',
              });
            }
          });
        },
        TemplateElement(node) {
          return inspectNode({ context, node, value: node.value.raw });
        },
      };
    },
    meta: {
      messages: {
        tooHighEntropy: 'too high entropy',
      },
    },
  },
};

export { rules };
export default null;
