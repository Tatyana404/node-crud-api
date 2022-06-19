module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',
  entry: './src/app.ts',
  target: 'node',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{ test: /\.ts?$/, loader: 'ts-loader' }]
  }
}
