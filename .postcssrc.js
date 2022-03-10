// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-import": {},
    "autoprefixer": {},
    // 移动端适配
    "postcss-px2rem-exclude": {
      remUnit: 75,
      // 声明不转换的文件（为了不影响UI组件）
      exclude: /node_modules|folder_name/i
    }
  }
}
