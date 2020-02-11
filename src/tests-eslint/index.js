import { RuleTester } from 'eslint';
import { rules } from 'eslint-plugin-no-credentials';

const rule = rules['no-credentials'];

const ruleTester = new RuleTester({ env: { es6: true } });

ruleTester.run('no-credentials', rule, {
  invalid: [
    {
      code: `
      // foo bar baz averylongstring
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [],
    },
    {
      code: `
      /* foo bar baz averylongstring */
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [],
    },
    {
      code: `
      // foo bar baz
      // averylongstring
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [],
    },
    {
      code: `
      const text = 'foo bar baz averylongstring';
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [],
    },
    {
      code: `
      const text = "foo bar baz averylongstring";
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [],
    },
    {
      code: `
      const text = \`foo bar baz averylongstring\`;
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [],
    },
    {
      code: `
      const text = 'foo bar baz a-very-long-string';
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [],
    },
    {
      code: `
      const text = 'foo bar baz aVeryLongString';
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [],
    },
    {
      code: `
      const text = 'foo bar baz aVeryLongString';
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [{ minimumNumberOfWords: 8, shouldSplitCamelCase: true }],
    },
    {
      code: `
      const text = 'foo bar baz aVeryLongString';
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [{ minimumNumberOfWords: 6, minimumWordLength: 4, shouldSplitCamelCase: true }],
    },
  ],
  valid: [
    {
      code: `
      // foo bar baz
`,
      options: [],
    },
    {
      code: `
      /* foo bar baz */
`,
      options: [],
    },
    {
      code: `
      // foo bar baz
      // foo bar baz
`,
      options: [],
    },
    {
      code: `
      const text = 'foo bar baz';
`,
      options: [],
    },
    {
      code: `
      const text = "foo bar baz";
`,
      options: [],
    },
    {
      code: `
      const text = \`foo bar baz\`;
`,
      options: [],
    },
    {
      code: `
      const number = 123;
`,
      options: [],
    },
    {
      code: `
      const text = 'foo bar baz a-very-long-string';
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [{ delimiters: [' ', '-'] }],
    },
    {
      code: `
      const text = 'foo bar baz aVeryLongString';
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [{ shouldSplitCamelCase: true }],
    },
    {
      code: `
      const text = 'foo bar baz aVeryLongString';
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [{ minimumNumberOfWords: 7, shouldSplitCamelCase: true }],
    },
    {
      code: `
      const text = 'foo bar baz aVeryLongString';
`,
      errors: [{ messageId: 'tooHighEntropy' }],
      options: [{ minimumNumberOfWords: 5, minimumWordLength: 4, shouldSplitCamelCase: true }],
    },
  ],
});
