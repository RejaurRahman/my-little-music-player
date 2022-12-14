const process = require('process');
const { spawn } = require('child_process');
const fs = require('fs');

const Util = {
  getCommand() {
    let cmd = 'npm';
    process.argv.forEach((command) => {
      if (command === '--yarn') {
        cmd = 'yarn';
      }
    });
    if (process.platform === 'win32') {
      cmd += '.cmd';
    }
    return cmd;
  },
  getFiles: (dir) => {
    const files = {};
    fs.readdirSync(dir).forEach((file) => {
      files[file] = file;
    });
    return files;
  },
  isHtml: (filename) => {
    const splitted = filename.split('.');
    return splitted[1] === 'html';
  }
};

const Server = {
  process: null,
  files: [],
  start() {
    const cmd = Util.getCommand();
    this.process = spawn(cmd, ['run', 'serve'], { stdio: 'inherit' });
  },
  restart() {
    this.process.kill();
    this.start();
  },
  watch(dir) {
    this.files = Util.getFiles(dir);
    this.start();
    fs.watch(
      dir, {
        recursive: true
      },
      (eventType, filename) => {
        if (filename && eventType === 'rename') {
          if (Util.isHtml(filename)) {
            if (!this.files[filename]) {
              this.files = Util.getFiles(dir);
              this.restart();
            }
          }
        }
      }
    );
  }
};

Server.watch('./src/html');
