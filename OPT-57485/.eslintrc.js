// eslint-disable-next-line no-undef
module.exports = {
    extends: 'eslint:recommended',
    rules: {
        'indent': ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 4
        }],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: ['*'],
                next: ['if']
            },
            {
                blankLine: 'always',
                prev: ['*'],
                next: ['return']
            },
            {
                blankLine: 'always',
                prev: ['function'],
                next: ['*']
            },
            {
                blankLine: 'always',
                prev: ['*'],
                next: ['function']
            },
            {
                blankLine: 'always',
                prev: ['const', 'let', 'var'],
                next: '*'
            },
            {
                blankLine: 'any',
                prev: ['const', 'let', 'var'],
                next: ['const', 'let', 'var']
            },
            {
                blankLine: 'always',
                prev: 'directive',
                next: '*'
            },
            {
                blankLine: 'any',
                prev: 'directive',
                next: 'directive'
            }
        ],
        'no-use-before-define': ['error', {
            variables: false
        }],
        'brace-style': ['error', '1tbs'],
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never'
        }],
        'curly': 'error',
        'space-before-blocks': 'error',
        'key-spacing': ['error', {
            mode: 'strict'
        }],
        'no-shadow': ['error', {
            hoist: 'functions'
        }],
        'space-infix-ops': 'error',
        'no-trailing-spaces': ['error', {
            ignoreComments: true
        }],
        'newline-after-var': ['error', 'always'],
        'array-bracket-newline': ['error', 'consistent'],
        'comma-spacing': ['error', {
            before: false,
            after: true
        }],
        'keyword-spacing': 'error',
        'object-curly-spacing': ['error', 'always', {
            arraysInObjects: false,
            objectsInObjects: false
        }],
        'array-bracket-spacing': ['error', 'never', {
            singleValue: false,
            objectsInArrays: false,
            arraysInArrays: false
        }],
        'no-cond-assign': 'error',
        'no-duplicate-case': 'error',
        'one-var': ['error', 'never'],
        'no-debugger': 'error',
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-console': 'error',
        'no-else-return': 'error',
        'no-eval': 'error',
        'no-global-assign': 'error',
        'no-new-object': 'error',
        'no-nested-ternary': 'error',
        'no-multi-assign': 'error',
        'no-whitespace-before-property': 'error',
        'no-underscore-dangle': ['error', {
            allow: ['__external', '_expires']
        }],
        'no-multiple-empty-lines': ['error', {
            max: 1,
            maxEOF: 0
        }],
        'no-multi-spaces': ['error', {
            ignoreEOLComments: false,
            exceptions: {
                BinaryExpression: true,
                VariableDeclarator: true,
                Property: true
            }
        }],
        'eqeqeq': ['error', 'always'],
        'new-cap': 'error',
        'semi-spacing': 'error',
        'quotes': ['error', 'single'],
        'quote-props': ['error', 'consistent-as-needed'],
        'semi': ['error', 'always'],
        'max-params': ['error', 3],
        'max-len': ['error', {
            code: 120,
            ignoreComments: false,
            tabWidth: 4,
            ignoreStrings: true,
            ignoreRegExpLiterals: true,
            ignoreUrls: true
        }]
    },
    globals: {
        Insider: true,
        insider_object: true,
        partner_site: true,
        partnerName: true,
        spApi: true,
        sQuery: true,
        ga: true,
        dataLayer: true,
        camp: true,
        ActionBuilder: true,
        Promise: 'off'
    },
    env: {
        browser: true,
        es6: false,
        node: false
    },
    parserOptions: {
        ecmaVersion: 5,
        ecmaFeatures: {
            globalReturn: true
        }
    }
};