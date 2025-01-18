module.exports = {
  input: {
    path: './src', // only files in this directory are considered for extraction
    include: ['**/*.js', '**/*.ts', '**/*.vue', '**/*.tsx'], // glob patterns to select files for extraction
    exclude: [], // glob patterns to exclude files from extraction
  },
  output: {
    locales: ['en', 'zh_CN'],
  },
}
