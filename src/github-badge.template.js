// -- ISO Date Polyfill --------------------------------------------------------
(function(){
	var D= new Date("2011-06-02T09:34:29+02:00");
	if(!D || +D!== 1307000069000){
		Date.fromISO= function(s){
			var day, tz,
			rx=/^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
			p= rx.exec(s) || [];
			if(p[1]){
				day= p[1].split(/\D/);
				for(var i= 0, L= day.length; i<L; i++){
					day[i]= parseInt(day[i], 10) || 0;
				}
				day[1]-= 1;
				day= new Date(Date.UTC.apply(Date, day));
				if(!day.getDate()) {
					return NaN;
				}
				if(p[5]){
					tz= (parseInt(p[5], 10)*60);
					if(p[6]) {
						tz+= parseInt(p[6], 10);
					}
					if(p[4] === "+") {
						tz*= -1;
					}
					if(tz) {
						day.setUTCMinutes(day.getUTCMinutes()+ tz);
					}
				}
				return day;
			}
			return NaN;
		};
	}
	else{
		Date.fromISO= function(s){
			return new Date(s);
		};
	}
})();

// -- Github Repository --------------------------------------------------------
function GithubRepo(repo) {
	this.description = repo.description;
	this.forks_count = repo.forks_count;
	this.name = repo.name;
	this.open_issues = repo.open_issues;
	this.pushed_at = repo.pushed_at;
	this.html_url = repo.html_url;
	this.stargazers_count = repo.stargazers_count;
	this.watchers_count = repo.watchers_count;
}

// Parses HTML template
GithubRepo.prototype.toHTML = function (dateFormat) {
	var data = this, template = "{{template}}";
	this.pushed_at = this._parsePushedDate(this.pushed_at, dateFormat);
	return template.replace(/\{\{(\w+)\}\}/g, function(m, key){
		return data[key];
	});
};

// Parses pushed_at with date format
GithubRepo.prototype._parsePushedDate = function (pushed_at, dateFormat) {
	var date = new Date.fromISO(pushed_at), tokens = dateFormat.toUpperCase().split("/"), dateString = "", i;
	for(i = 0; i < tokens.length; i++) {
		switch(tokens[i]) {
			case "D":
				dateString += date.getDate();
				break;
			case "M":
				dateString += date.getMonth() + 1;
				break;
			case "Y":
				dateString += date.getFullYear();
				break;
		}
		if(i < tokens.length - 1) {
			dateString += "/";
		}
	}
	return dateString;
};

// -- Github Plugin ------------------------------------------------------------
;(function(){
	var cid = 0;                   // unique ID for jsonp callbacks
	// Private function to generate a jsonp callback that deletes itself upon invocation
	function JSONPCallback (context, cb) {
		var name = "GHBadgeLoaded" + (++cid);
		window[name] = function(data) {
			cb.call(context, data);
			window[name] = undefined;
			try {
				delete window[name];
			} catch (e) {
			}
		};
		return name;
	}

	function Github(element, options, dateFormat) {
		var defaults = {
					iconStars:  false,
					iconWatchers:  true,
					iconForks:  true,
					iconIssues: false,
					dateFormat: "M/D/Y"
				};

		this.element    = element;
		this.repo       = element.getAttribute("data-repo");
		this.callback   = JSONPCallback(this, this.handle);

		this.options = this.simpleExtend(defaults, options);
		this.init();
	}

	// Initializer
	Github.prototype.init = function () {
		var cached = this.getCache();

		if (cached !== null && cached) {
			this.applyTemplate(JSON.parse(cached));
			return;
		}

		this.requestData(this.repo);
	};

	// Mimics jQuery's extend function see: http://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method
	Github.prototype.simpleExtend = function(left, right) {
		for(var key in right) {
			if(right.hasOwnProperty(key)) {
				left[key] = right[key];
			}
		}
		return left;
	};

	// Display or hide icons
	Github.prototype.displayIcons = function () {
		var options = this.options,
				iconStars = this.element.querySelectorAll(".repo-stars")[0],
				iconWatchers = this.element.querySelectorAll(".repo-watchers")[0],
				iconForks = this.element.querySelectorAll(".repo-forks")[0],
				iconIssues = this.element.querySelectorAll(".repo-issues")[0];

		iconStars.style.display = options.iconStars ? "inline-block" : "none";
		iconWatchers.style.display = options.iconWatchers ? "inline-block" : "none";
		iconForks.style.display = options.iconForks ? "inline-block" : "none";
		iconIssues.style.display = options.iconIssues ? "inline-block" : "none";
	};

	// Request repositories from Github
	Github.prototype.requestData = function (repo) {
		var script = document.createElement("script");
		script.async = true;
		script.src = "https://api.github.com/repos/" + repo + "?callback=" + this.callback;
		document.body.appendChild(script);
	};

	Github.prototype.handle = function(results) {
		var result_data = results.data,	isFailing = results.meta.status >= 400 && result_data.message;

		if (isFailing) {
			this.handleErrorRequest(result_data);
			return;
		}

		this.handleSuccessfulRequest(result_data);
	};

	// Handle Errors requests
	Github.prototype.handleErrorRequest = function (result_data) {
		console.warn(result_data.message);
		return;
	};

	// Handle Successful request
	Github.prototype.handleSuccessfulRequest = function (result_data) {
		this.applyTemplate(result_data);
		this.setCache(result_data);
	};

	// Stores repostories in sessionStorage if available
	Github.prototype.setCache = function (result_data) {
		// Cache data
		if (window.sessionStorage) {
			window.sessionStorage.setItem("GHBadges:" + this.repo, JSON.stringify(result_data));
		}
	};

	// Grab cached results
	Github.prototype.getCache = function() {
		if (window.sessionStorage) {
			return window.sessionStorage.getItem("GHBadges:" + this.repo);
		}
		else {
			return false;
		}
	};

	// Apply results to HTML template
	Github.prototype.applyTemplate = function (repo) {
		var githubRepo = new GithubRepo(repo), widget = githubRepo.toHTML(this.options.dateFormat), div = document.createElement("div");
		div.className = "github-box";
		div.innerHTML = widget;

		this.element.parentNode.replaceChild(div, this.element);
		this.element = div;
		this.displayIcons();
	};

	var GHBadges = {
		create: function (selector, options) {
			var elements = document.querySelectorAll(selector), i, element;

			for(i = 0; i < elements.length; i++) {
				new Github(elements[i], options);
			}
		}
	};

	if (typeof exports !== "undefined"){
		exports = GHBadges;
	} else {
		window.GHBadges = GHBadges;
	}
})();
