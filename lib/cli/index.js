#!/usr/bin/env node

'use strict';

// https://www.npmjs.com/package/colorful
require('colorful').colorful();
// https://www.npmjs.com/package/commander
const program = require('commander');
const packageInfo = require('../../package.json');

program
  .version(packageInfo.version)
  .command('[name]', 'run the specified task')
  .parse(process.argv);

const proc = program.runningCommand;

// 如果有正在运行的进程
if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}

const task = program.args[0];

if (!task) {
  program.help();
} else if (task === 'server') {
  console.log(1);
  require('../server');
} else {
  console.log(12);
}
