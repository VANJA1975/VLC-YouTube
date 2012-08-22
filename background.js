var settings = new Store("settings", {
	"max-res": 1080,
	"load-time": 3
});
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.action) {
		chrome.pageAction.show(sender["tab"]["id"]);
		sendResponse(settings.get("max-res"));
	} else {
		chrome.pageAction.hide(sender["tab"]["id"]);
	}
});
chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, {player: "vlc"}, function(response){});
});