// 构建后配置 SPA 应用响应全部交给 index.html 处理，解决 404 问题

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = '../dist/_redirects';
const dir = path.join(__dirname, filePath)

const sentence = "/* /index.html 200";
fs.writeFile(dir, sentence, (err) => {
  if (err) {
    console.error('写入文件时发生错误:', err);
  }
});