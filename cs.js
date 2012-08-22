console.log("cs.js loaded");
function getMetaContents(mn){
  var m = document.getElementsByTagName('meta');
  for(var i=0;i<m.length;i++) {
   if(m[i].getAttribute("property") == mn){
	 return m[i].getAttribute("content");
   }
  }
}
var formats = new Array();
formats[240] = 5;
formats[360] = 18;
formats[480] = 35;
formats[720] = 22;
formats[1080] = 37;
formats[3072] = 38;
var res_max = parseInt(getMetaContents("client:video-max"));
console.log("Resolution limit:     "+res_max+"p");
var vid_max = getMetaContents("og:video:height");
console.log("Video resolution:     "+vid_max+"p");
var sel_hsz = parseInt((res_max>vid_max)?vid_max:res_max);
console.log("Preferred resolution: "+sel_hsz+"p");
var sel_res = 240;
for (format in formats) {
	if (format<=sel_hsz) {
		sel_res = format;
	}
}
console.log("Selected resolution:  "+sel_res+"p - fmt="+formats[sel_res]);
function remove(id) {
	if (document.getElementById(id)) {
		return (elem=document.getElementById(id)).parentNode.removeChild(elem);
	}
}
function setWidth(w) {
	document.getElementById("watch-player").style.width = w+"px";
}
function setHeight(h) {
	document.getElementById("watch-player").style.height = h+"px";
}
function sWH(w, h) {
	setWidth(w);
	setHeight(h);
}
function removeClass(element, cls) {
	while (containsClass(element, cls)) {
		var tmpcls = " "+element.getAttribute("class")+" ";
		element.setAttribute("class", tmpcls.replace(" "+cls+" ", " "));
		if (String.prototype.trim) {
			element.setAttribute("class", element.getAttribute("class").trim());
		}
	}
}
function addClass(element, cls) {
	removeClass(element, cls);
	element.setAttribute("class", element.getAttribute("class")+" "+cls);
}
function containsClass(element, cls) {
	var tmpcls = " "+element.getAttribute("class")+" ";
	return (tmpcls.indexOf(" "+cls+" ") != -1);
}
remove("movie_player");
remove("movie_player-html5");
var embed = document.createElement("embed");
embed.setAttribute("type", "application/x-vlc-plugin");
embed.setAttribute("name", "movie_player");
embed.setAttribute("id", "movie_player");
embed.setAttribute("autoplay", "yes");
embed.setAttribute("loop", "no");
if (!/(\&|\?)fmt=\d+/.test(location.href)) {
	var target = document.URL + "&fmt=" + formats[sel_res];
} else {
	var target = document.URL.replace(/(\&|\?)fmt=(\d+)?/g, "&fmt=" + formats[sel_res]);
}
console.log("Playing "+target);
embed.setAttribute("target", target);
document.getElementById("watch-player").appendChild(embed);
if (containsClass(document.getElementById("watch-video"), "medium")) {
	sWH(840, 480);
} else if (containsClass(document.getElementById("watch-video"), "large")) {
	sWH(1280, 720);
} else {
	sWH(640, 360);
}
var bs = document.createElement("span");
bs.setAttribute("class", "yt-uix-button-group");
var b = document.createElement("button");
b.setAttribute("onclick", ";return false;");
b.setAttribute("type", "button");
b.setAttribute("class", "start yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty");
b.setAttribute("id", "vlc-size");
b.innerHTML = '<span class="yt-uix-button-content">Player size</span>';
var b1 = document.createElement("button");
b1.setAttribute("onclick", ";return false;");
b1.setAttribute("title", "Small player size");
b1.setAttribute("type", "button");
b1.setAttribute("class", "yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty");
b1.setAttribute("id", "vlc-small");
b1.innerHTML = '<span class="yt-uix-button-content">360p</span>';
b1.onclick = function() {
	removeClass(document.getElementById("watch-video"), "medium");
	removeClass(document.getElementById("watch-video"), "large");
	removeClass(document.getElementById("page"), "watch-wide");
	sWH(640, 360);
}
var b2 = document.createElement("button");
b2.setAttribute("onclick", ";return false;");
b2.setAttribute("title", "Medium player size");
b2.setAttribute("type", "button");
b2.setAttribute("class", "yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty");
b2.setAttribute("id", "vlc-medium");
b2.innerHTML = '<span class="yt-uix-button-content">480p</span>';
b2.onclick = function() {
	addClass(document.getElementById("watch-video"), "medium");
	removeClass(document.getElementById("watch-video"), "large");
	addClass(document.getElementById("page"), "watch-wide");
	sWH(840, 480);
}
var b3 = document.createElement("button");
b3.setAttribute("onclick", ";return false;");
b3.setAttribute("title", "Large player size");
b3.setAttribute("type", "button");
b3.setAttribute("class", "end yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty");
b3.setAttribute("id", "vlc-large");
b3.innerHTML = '<span class="yt-uix-button-content">720p</span>';
b3.onclick = function() {
	removeClass(document.getElementById("watch-video"), "medium");
	addClass(document.getElementById("watch-video"), "large");
	addClass(document.getElementById("page"), "watch-wide");
	sWH(1280, 720);
}
document.getElementById("watch-actions").appendChild(bs);
bs.appendChild(b);
bs.appendChild(b1);
bs.appendChild(b2);
bs.appendChild(b3);