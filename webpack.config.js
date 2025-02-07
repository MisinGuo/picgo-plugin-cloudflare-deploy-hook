const path = require('path');

module.exports = {
  entry: './src/index.ts',  // 入口文件如果是 TypeScript，指定为 .ts 文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],  // 确保解析 .ts 和 .js 文件
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',  // 使用 ts-loader 编译 TypeScript 文件
        exclude: /node_modules/,
      },
    ],
  },
};
