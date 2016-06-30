const {app, Menu, Tray} = require('electron')
const exec = require('child_process').exec
const WunderlistSDK = require('wunderlist');
const config = require(__dirname + '/config.js')

// start Wunderlist
exec('chromium --app-id=ojcflmmmcfpacggndoaaflkmcoblhnbh')

var wl = new WunderlistSDK({
	'accessToken': config.accessToken,
	'clientID': config.clientID
});

var tray = null
app.on('ready', () => {
	tray = new Tray(__dirname + '/icon.png')
	tray.on('click', function(event, bounds) {
		exec('i3-msg "[title=Wunderlist$] scratchpad show"')
		update()
	});
	const contextMenu = Menu.buildFromTemplate([
		{label: 'Quit', click() { app.quit() }}
	]);
	tray.setContextMenu(contextMenu)
	update()
})

function update() {
	wl.http.lists.all().done(function (lists) {
		for (let i = 0; i < lists.length; i++) {
			let list = lists[i]
			if (list.title == 'inbox') {
				updateToolTip(list.id)
				break
			}
		}
	});
}

function updateToolTip(id) {
	wl.http.tasks.forList(id).done(function (tasksData, statusCode) {
		var todayTasks = 0, weekTasks = 0
		var today = new Date()
		for (let i = 0; i < tasksData.length; i++) {
			let task = tasksData[i]
			if (!task.due_date)
				continue
			let td = new Date(task.due_date)
			let days = diffDays(today, td)
			if (days < 1)
				todayTasks++
			else if (days <= 7)
				weekTasks++
		}

		tray.setToolTip(todayTasks.toString() + ' tasks for today, ' +
			weekTasks.toString()+ ' tasks for this week')
	});
}

function diffDays(d1, d2) {
	var diff = d2.getTime() - d1.getTime()
	return Math.ceil(diff / (1000 * 3600 * 24))
}
