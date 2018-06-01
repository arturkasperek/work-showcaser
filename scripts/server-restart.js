const express = require('express')
const shell = require('shelljs');
const app = express()
let shellScriptInProgress = false;
const tasks = [];

app.all('/', (req, res) => {
  //shell.exec('docker-compose pull && docker-compose down && docker-compose up -d --build', {async:true})
  tasks.push(() => {
    shellScriptInProgress = true;
    shell.exec('docker-compose pull && docker-compose down && docker-compose up -d --build', () => {
      shellScriptInProgress = false;
    });
  });

  res.send(`Restart in progress, tasks todo: ${tasks.length}`);
});

const worker = () => {
  if ( tasks[0] && !shellScriptInProgress ) {
    const job = tasks.shift();

    job();
  }

  setTimeout(() => {
    worker();
  }, 1000);
}

worker();

app.listen(3000, () => console.log('Restart server listening on port 3000!'))