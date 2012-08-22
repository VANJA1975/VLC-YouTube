this.manifest = {
    "name": "VLC for YouTube",
    "icon": "../../icons/48.png",
    "settings": [
		{
			"tab": "Settings",
			"group": "Video Quality",
			"type": "description",
			"text": "This setting limits the maximum resolution that VLC will attempt to load, and should be used<br />in cases where processing power or bandwidth is limited. By default, the limit is set to 1080p."
		},
        {
            "tab": "Settings",
            "group": "Video Quality",
            "name": "max-res",
            "type": "popupButton",
            "label": "Maximum video resolution:",
            "options": [
				{value: 240, text: "240p"},
				{value: 360, text: "360p"},
				{value: 480, text: "480p"},
				{value: 720, text: "720p"},
				{value: 1080, text: "1080p"},
				{value: 3072, text: "3072p"}
			]
        },
		{
			"tab": "Settings",
			"group": "Video Quality",
			"type": "description",
			"text": "<br />"
		},
		{
			"tab": "Settings",
			"group": "Loading Time",
			"type": "description",
			"text": "This setting is optional, but it is recommended to set it properly before using <i>VLC for YouTube</i>,<br />in order to prevent glitches. You must press the VLC icon that replaces the YouTube video player<br />with VLC <b>after</b> the YouTube player is fully loaded, otherwise VLC may glitch and not replace the<br />YouTube video player. This delay prevents the icon from appearing before the player fully loads.<br />By default, the delay is set to 3 seconds."
		},
		{
			"tab": "Settings",
			"group": "Loading Time",
			"name": "load-time",
			"type": "slider",
			"label": "Time needed for the YouTube flash player to load:",
			"max": 10,
			"min": 0,
			"step": 0.5,
			"display": true,
			"displayModifier": function(val){return val+" seconds";}
		}
    ]
};