function getMetaContents(mn){
  var m = document.getElementsByTagName('meta');
  for(var i=0;i<m.length;i++) {
   if(m[i].getAttribute("property") == mn){
     return m[i].getAttribute("content");
   }
  }
}
function newMeta(name, value) {
	var m = document.createElement("meta");
	m.setAttribute("property", name);
	m.setAttribute("content", value);
	document.getElementsByTagName('head')[0].appendChild(m);
}
if (getMetaContents("og:type") == "video") {
	if(/^https?:\/\/(\w+\.)?youtube\.com\/watch\?.*v=/.test(location.href)) {
		setTimeout(function() {
			chrome.extension.sendMessage({action: true}, function(response) {
				newMeta("client:video-max", response);
			});
		}, 3000);
	}
}
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	function injectJs(link) {
		var scr = document.createElement('script');
		scr.type="text/javascript";
		scr.src=link;
		document.getElementsByTagName('head')[0].appendChild(scr);
	}
	injectJs(chrome.extension.getURL('cs.js')+"?"+(Math.round(new Date().getTime() / 1000)));
	chrome.extension.sendMessage({action: false}, function(response) {});
});