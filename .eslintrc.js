module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb-typescript"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        "project": "./tsconfig.json",
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "import/prefer-default-export": "off",
        "@typescript-eslint/explicit-function-return-type": [
            "error"
        ],
        "react/jsx-curly-spacing": [
            "error",
            {
                "when": "always",
                "children": {
                    "when": "always"
                }
            }
        ],
        "@typescript-eslint/no-use-before-define": [
            "error",
            {
                "functions": false
            }
        ],
        "react/button-has-type": "off",
        "no-param-reassign": [
            "error",
            {
                "props": true,
                "ignorePropertyModificationsFor": [
                    "state"
                ]
            }
        ],
        "react/prop-types" : 0,
        "import/no-cycle": 0,
        "@typescript-eslint/no-shadow": 0,
        "@typescript-eslint/no-unused-vars": 0,
        "jsx-a11y/no-autofocus": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "jsx-a11y/click-events-have-key-events":0,
        "jsx-a11y/no-static-element-interactions":0,
        "max-len": 0,
    }
};

