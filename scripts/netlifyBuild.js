// 构建后配置 SPA 应用响应全部交给 index.html 处理，解决 404 问题

import fs from 'fs'
const sentence = "/* /index.html 200";
const filePath = '../dist/_redirects';

fs.writeFile(filePath, sentence, (err) => {
  if (err) {
    console.error('写入文件时发生错误:', err);
  }
});