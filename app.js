const BrowserWindow = require('electron');
const url = require('url');
const path = require('path');
const { exec } = require('child_process');
let { PythonShell } = require('python-shell');

scriptPath = url.format({
  pathname: __dirname,
  slashes: false,
});
console.log(scriptPath);

function download(args) {
  /* 	
  var options = {
    pythonPath: path.join(__dirname, 'downloader_venv\\Scripts\\python.exe'),
    mode: 'text',
    encoding: 'utf8',
    pythonOptions: ['-u'],
    scriptPath: scriptPath,
    args: ['-f'],
  };

  options.args = options.args.concat(args);

  PythonShell.run('test.py', options, function (err, results) {
    if (err) throw err;
    console.log(results);
	});
	 */
  command = 'test -f';
  args.forEach((element) => {
    command += ' ' + element;
	});
	
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

const downloadAudio = document.getElementById('downloadAudio');
downloadAudio.addEventListener('click', function (event) {
  console.log('Hello from Audio');
  download(['-a']);
});

const downloadVideo = document.getElementById('downloadVideo');
downloadVideo.addEventListener('click', function (event) {
  console.log('Hello from Video');
  download([]);
});
