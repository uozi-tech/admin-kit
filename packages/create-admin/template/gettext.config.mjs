export default {
  input: {
    path: "./src", // only files in this directory are considered for extraction
      include: ["src/**/*.js", "src/**/*.ts", "src/**/*.vue", "src/**/*.tsx", "src/**/*.jsx"], // glob patterns to select files for extraction
      exclude: [], // glob patterns to exclude files from extraction
  },
  output: {
    locales: ['en', 'zh_CN'],
  },
}