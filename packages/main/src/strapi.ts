import {spawn} from 'child_process';
import {join} from 'path';

const serverUrl = 'http://127.0.0.1:1337'; // Strapi服务器的URL
const retryInterval = 1000; // 重试间隔（以毫秒为单位）

export function launchStrapi() {
  // 1. 启动 strapi
  // TODO: 生产环境下启动 npm run strapi:start，禁止用户在后台修改 content builder
  const strapiServer = spawn('npm', ['run', 'strapi:develop'], {
    cwd: join(__dirname, '../../strapi'), // 设置工作目录为 Strapi 项目目录
    stdio: 'inherit', // 将子进程的输出传递给主进程
  });

  strapiServer.on('close', code => {
    console.log(`Strapi server exited with code ${code}`);
  });
}

export function checkServerStatus() {
  return new Promise<void>(resolve => {
    const check = async () => {
      try {
        const response = await fetch(serverUrl);
        if (response) {
          console.log('Strapi server is up. Ready to perform additional actions.');
          resolve();
        }
      } catch (error) {
        console.log('Strapi server is not yet up. Retrying in ' + retryInterval + 'ms...');
        setTimeout(check, retryInterval);
      }
    };

    check();
  });
}
