# eslint-plugin-no-credentials

[![MIT License](https://img.shields.io/badge/license-mit-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.com/oprogramador/eslint-plugin-no-credentials.svg?branch=master)](https://travis-ci.com/oprogramador/eslint-plugin-no-credentials
)

[![NPM status](https://nodei.co/npm/eslint-plugin-no-credentials.png?downloads=true&stars=true)](https://npmjs.org/package/eslint-plugin-no-credentials
)

An ESlint plugin checking for any hardcoded credentials like a password or a token.

This library detects credentials hardcoded in a JS string (no matter whether it's defined with apostrophes, quotation marks or it's a template string) or a JS comment.

However, it doesn't check non-JS files like JSON or txt.

The percentage of found hardcoded credentials depends on applied params which should be chosen according to the code in a given project.

I recommend using additionally a spellchecking tool like [that](https://github.com/aotaduy/eslint-plugin-spellcheck) as the credentials are usually strings not matching any word found in a dictionary.

## how to install?
`yarn add --dev eslint-plugin-no-credentials`

or

`npm i --save-dev eslint-plugin-no-credentials`

## how to use?
In your `.eslintrc` file add `"no-credentials"` to the `plugins` section:
```
  "plugins": [
    "no-credentials"
  ],
```
and the `no-credentials/no-credentials` rule with the chosen params to that file:
```
    "no-credentials/no-credentials": [
      "error",
      {
        delimiters: [" ", "/", "-", "_", "."],
        maximumEntropy: 8,
        minimumWordLength: 5,
        shouldSplitCamelCase: true,
      },
    ],
```

Possible params:
- `delimiters` (default `[' ']`): delimiters used to split each string into words so for each word, the entropy is calculated separately
- `minimumNumberOfWords` (default `0`): if the number of words in a given string is less than this param, the entire string is treated as one word
- `minimumWordLength` (default `1`): if a given word is shorter than this param, it's concatenated to the next word
- `maximumEntropy` (default `5`): maximum tolerated entropy for each word
- `shouldSplitCamelCase` (default `false`): whether a camelCase string should be split into separate words

In order to have a better understanding, how these params work, you can read the tests.
