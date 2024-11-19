module.exports = {
  extends: ['@it-incubator/eslint-config', 'plugin:storybook/recommended'],
  "plugins": ["import"],
  "rules": {
    "import/no-unresolved": "error"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}