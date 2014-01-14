sys = require('sys')
exec = require('child_process').exec;

function print(error, stdout, stderr) {
  console.log(stdout)
  if (error !== null) {
    console.log('exec error: ' + error)
  }
}

command = process.argv[2]
console.log('command', command)

server = exec("db-migrate "+command+" -e staging --migrations-dir ./db/migrations/ --config ./config/database.json", print)
pwd = exec("pwd", print)
