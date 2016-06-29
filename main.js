const {app, Menu, Tray} = require('electron')
const exec = require('child_process').exec

let tray = null
app.on('ready', () => {
	tray = new Tray('./icon.png')
	tray.on('click', function(event, bounds) {
		exec('i3-msg "[title=Wunderlist] scratchpad show"')
	});
})
