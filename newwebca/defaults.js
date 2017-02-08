function Defaults() {}

Defaults.get = function(options) {
	var default_options = {
		url: "/defaults",
		cache: false,
		async: true
	};

	var default_options_keys = Object.keys(default_options);

	for(var i = 0; i < default_options_keys.length; i += 1) {
		default_options_key = default_options_keys[i];

		options[default_options_key] = default_options[default_options_key];
	}

	return $.ajax(options);
}
