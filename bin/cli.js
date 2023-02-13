#!/usr/bin/env node
/* eslint-disable no-console */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const packageJson = require('../package.json');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m', // Scarlet
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
};

if (process.argv.length < 3) {
  console.log(`${colors.fg.red}%s${colors.reset}`, '========================= 🚨 E R R O R 🚨 =========================');
  console.log(`${colors.fg.red}%s${colors.reset}`, '🚨 Warning:');
  console.log('');
  console.log('Please specify the project directory:');
  console.log(`${colors.fg.green}npx @harang-jennie/nextjs-starter${colors.reset}`, `${colors.fg.magenta}<my-nextjs-app>${colors.reset}`);
  console.log('');
  console.log('For example:');
  console.log(`${colors.fg.cyan}npx @harang-jennie/nextjs-starter${colors.reset}`, `${colors.fg.magenta}my-nextjs-app${colors.reset}`);
  console.log(`${colors.fg.red}%s${colors.reset}`, '=========================== 🚨 E N D 🚨 ===========================');

  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPOSITORY = 'https://github.com/mbti-nf-team/nextjs-starter';

const gitCloneOrderArray = ['git', 'clone', '--depth', '1', GIT_REPOSITORY, projectPath];
const gitCloneCommand = gitCloneOrderArray.map((item) => item.replace(/\s/g, '')).join(' ');

if (projectName !== '.') {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`${colors.fg.red}%s${colors.reset}`, '🚨 Something Wrong... 🚨');
      console.log(
        `${colors.fg.red}%s${colors.reset}`,
        `🚨 The folder ${projectName} already exist in the current directory, please give it another name.`,
      );
    } else {
      console.log(`${colors.fg.red}%s${colors.reset}`, '🚨 Something Wrong... 🚨');
      console.log(`${colors.fg.red}%s${colors.reset}`, `${err}`);
    }
    process.exit(1);
  }
}

async function run() {
  try {
    console.log('========================= 🚀 S T A R T 🚀 =========================');
    console.log(`${colors.fg.cyan}%s${colors.reset}`, '👉 Using yarn berry with zero install.');
    console.log(`${colors.fg.yellow}%s${colors.reset}`, "This next.js starter kit doesn't need to install dependencies.");
    console.log('https://yarnpkg.com/features/zero-installs');
    console.log('');
    console.log('⭐ Next.js Starter Kit ⭐');
    console.log(`🥰 Create by ${packageJson.author}`);
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
    console.log('📦 Installing dependencies...');
    execSync('yarn install');
    console.log('');
    console.log('🗑️ Removing useless files...');
    execSync('npx rimraf ./.git');
    execSync('npx rimraf ./.github/workflows/release.yml');
    execSync('npx rimraf ./.releaserc');
    execSync('npx rimraf ./bin');
    console.log('');
    console.log('🗑️ Removing useless dependencies...');
    execSync('yarn remove semantic-release @types/semantic-release');
    console.log('');
    console.log(`${colors.fg.cyan}%s${colors.reset}`, 'Successfully installed!');
    console.log('');
    console.log(`${colors.fg.magenta}%s${colors.reset}`, '🎉 The installation is done, ready to use.');
    console.log(`${colors.fg.magenta}%s${colors.reset}`, `Go to cd ./${projectName}`);
    console.log('========================= 🎉 E N D 🎉 =========================');
  } catch (error) {
    console.log(`${colors.fg.red}%s${colors.reset}`, '🚨 Something Wrong... 🚨');
    console.log(`${colors.fg.red}%s${colors.reset}`, `${error}`);
  }
}

run();
