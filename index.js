const path = require('path');
const childProcess = require('child_process');

const results = {
  'npm/npm': {
    average: 0,
    name: 'npm 4.x',
    runs: []
  },
  'npm/npm-cached': {
    average: 0,
    name: 'npm 4.x (cached)',
    runs: []
  },
  'npm/shrinkpack': {
    average: 0,
    name: 'npm 4.x (shrinkpacked)',
    runs: []
  },
  'npm/shrinkpack-compressed': {
    average: 0,
    name: 'npm 4.x (shrinkpacked, compressed)',
    runs: []
  },
  'yarn/yarn': {
    average: 0,
    name: 'yarn',
    runs: []
  },
  'yarn/yarn-offline': {
    average: 0,
    name: 'yarn --offline',
    runs: []
  },
  'npm5/npm': {
    average: 0,
    name: 'npm 5.x',
    runs: []
  },
  'npm5/npm-cached': {
    average: 0,
    name: 'npm 5.x (cached)',
    runs: []
  },
  'npm5/shrinkpack': {
    average: 0,
    name: 'npm 5.x (shrinkpacked)',
    runs: []
  },
  'npm5/shrinkpack-compressed': {
    average: 0,
    name: 'npm 5.x (shrinkpacked, compressed)',
    runs: []
  }
};

function average(list) {
  return list.reduce((total, value) => total + value, 0) / list.length;
}

function spawn(cmd, args, options = {}) {
  childProcess.spawnSync(cmd, args, options);
}

function clean(dirPath) {
  spawn('npm', ['cache', 'clean']);
  spawn('yarn', ['cache', 'clean']);
  if (dirPath.includes('-cached') === false) {
    spawn('rm', ['-rf', path.join(dirPath, 'node_cache')]);
  }
  spawn('rm', ['-rf', path.join(dirPath, 'node_modules')]);
}

function runBenchmark(installer, args, directory) {
  const key = `${installer}/${directory}`;
  const dirPath = path.resolve(directory);

  clean(dirPath);
  const start = new Date().getTime();
  spawn(installer, args, { cwd: dirPath });
  const end = new Date().getTime();
  clean(dirPath);

  const time = (end - start) / 1000;
  const result = results[key];
  result.runs.push(time);
  result.average = average(result.runs);

  console.log(`${result.name}: ${time.toFixed(2)}s (average ${result.average.toFixed(2)}s)`);
}

function runAll() {
  const sampleSize = 5;
  for (let i = 1; i <= sampleSize; i++) {
    console.log(`Run ${i}`);
    runBenchmark('npm', ['install'], 'npm');
    runBenchmark('npm', ['install'], 'npm-cached');
    runBenchmark('npm', ['install'], 'shrinkpack');
    runBenchmark('npm', ['install'], 'shrinkpack-compressed');
    runBenchmark('yarn', ['install'], 'yarn');
    runBenchmark('yarn', ['install', '--offline'], 'yarn-offline');
    runBenchmark('npm5', ['install'], 'npm');
    runBenchmark('npm5', ['install'], 'npm-cached');
    runBenchmark('npm5', ['install'], 'shrinkpack');
    runBenchmark('npm5', ['install'], 'shrinkpack-compressed');
    console.log('');
  }
}

try {
  runAll();
} catch (err) {
  console.error(err);
  process.exit(1);
}
