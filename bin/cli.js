#!/usr/bin/env node
/* eslint-disable no-console */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const packageJson = require('../package.json');

if (process.argv.length < 3) {
  console.log('\x1b[31m%s\x1b[0m', '========================= 🚨 E R R O R 🚨 =========================');
  console.log('\x1b[31m%s\x1b[0m', '🚨 Warning:');
  console.log('');
  console.log('Please specify the project directory:');
  console.log('\x1b[32m%s\x1b[0m', 'npx @harang-jennie/nextjs-starter <project-directory>');
  console.log('');
  console.log('For example:');
  console.log('npx @harang-jennie/nextjs-starter my-nextjs-project');
  console.log('\x1b[31m%s\x1b[0m', '=========================== 🚨 E N D 🚨 ===========================');

  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPOSITORY = 'https://github.com/jennie-harang/nextjs-starter';

const gitCloneOrderArray = ['git', 'clone', '--depth', '1', GIT_REPOSITORY, projectPath];
const gitCloneCommand = gitCloneOrderArray.map((item) => item.replace(/\s/g, '')).join(' ');

if (projectName !== '.') {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log('\x1b[31m%s\x1b[0m', '========================= 🚨 E R R O R 🚨 =========================');
      console.log(projectName);
      console.log(
        '\x1b[31m%s\x1b[0m',
        `🚨 The folder ${projectName} already exist in the current directory, please give it another name.`,
      );
      console.log('\x1b[31m%s\x1b[0m', '=========================== 🚨 E N D 🚨 ===========================');
    } else {
      console.log('\x1b[31m%s\x1b[0m', '========================= 🚨 E R R O R 🚨 =========================');
      console.log(err);
      console.log('\x1b[31m%s\x1b[0m', '=========================== 🚨 E N D 🚨 ===========================');
    }
    process.exit(1);
  }
}

async function main() {
  try {
    console.log('========================= 🚀 S T A R T 🚀 =========================');
    console.log('Using yarn berry with zero install.');
    console.log("This next.js starter kit doesn't need to install dependencies.");
    console.log('https://yarnpkg.com/features/zero-installs');
    console.log('');
    console.log('⭐ Next.js Starter Kit ⭐');
    console.log('🥰 Create by Harang');
    console.log(`🚀 From ${GIT_REPOSITORY}`);
    console.log(`🏷️ Version: ${packageJson.version}`);
    console.log('');
    console.log(`🚀 Creating project ${projectName}...`);
    console.log('');
    console.log('🚚 Downloading files:');
    execSync(gitCloneCommand);

    if (projectName !== '.') {
      process.chdir(projectPath);
    }

    console.log('');
    console.log('📦 Installing dependencies:');
    execSync('yarn install');
    console.log('');
    console.log('🔥 Removing useless files:');
    execSync('npx rimraf ./.git');
    console.log('');
    console.log('\x1b[36m%s\x1b[0m', 'Successfully installed!');
    console.log('');
    console.log('\x1b[35m%s\x1b[0m', '🎉 The installation is done, ready to use. Happy coding!');
    console.log('========================= 🎉 E N D 🎉 =========================');
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', '========================= 🚨 E R R O R 🚨 =========================');
    console.log(error);
    console.log('\x1b[31m%s\x1b[0m', '=========================== 🚨 E N D 🚨 ===========================');
  }
}

main();
