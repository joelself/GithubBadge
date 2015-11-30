/*
 *	 github-badge - v0.5.1
 *	 A jQuery widget to show-off your GitHub Repositories.
 *	 https://github.com/joelself/github-badge
 *
 *	 Copyright (c) 2015
 *	 MIT License
 *	 Forked from github.com/zenorocha/jquery-github-repos then github.com/ricardobeat/github-repos
 */
// -- Github Repository --------------------------------------------------------

function GithubRepo( repo ) {
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
GithubRepo.prototype.toHTML = function () {
	var data = this, template = "<div class='github-box'>\n	<div class='github-box-header'>\n		<h3>\n			<a href='{{html_url}}'>{{name}}</a>\n		</h3>\n		<div class='github-stats'>\n			<a class='repo-stars' title='Stars' data-icon='&#61482' href='{{html_url}}/stargazers'>{{stargazers_count}}</a>\n			<a class='repo-watchers' title='Watchers' data-icon='&#61518' href='{{html_url}}/watchers'>{{watchers_count}}</a>\n			<a class='repo-forks' title='Forks' data-icon='&#61442' href='{{html_url}}/network'>{{forks_count}}</a>\n			<a class='repo-issues' title='Issues' data-icon='&#61478' href='{{html_url}}/issues'>{{open_issues}}</a>\n		</div>\n	</div>\n	<div class='github-box-content'>\n		<p>{{description}} &mdash; <a href='{{html_url}}#readme'>Read More</a></p>\n	</div>\n	<div class='github-box-download'>\n		<p class='repo-update'>Latest commit to <strong>master</strong> on {{pushed_at}}</p>\n		<a class='repo-download' title='Download as zip' data-icon='&#61660' href='{{html_url}}/zipball/master'></a>\n	</div>\n</div>\n";
	this.pushed_at = this._parsePushedDate( this.pushed_at );
	return $( template.replace(/\{\{(\w+)\}\}/g, function(m, key){
		return data[key];
	} ) );
};

// Parses pushed_at with date format
GithubRepo.prototype._parsePushedDate = function ( pushed_at ) {
	var date = new Date( pushed_at );

	return date.getDate() + "/" + ( date.getMonth() + 1 ) + "/" + date.getFullYear();
};

// -- Github Plugin ------------------------------------------------------------

function Github( element, options ) {
	var defaults = {
				iconStars:  false,
				iconWatchers:  true,
				iconForks:  true,
				iconIssues: false
			};

	this.element    = element;
	this.$container = $( element );
	this.repo       = this.$container.attr( "data-repo" );

	this.options = $.extend( {}, defaults, options ) ;

	this._defaults = defaults;

	this.init();
}

// Initializer
Github.prototype.init = function () {
	var cached = this.getCache();

	if ( cached !== null ) {
		this.applyTemplate( JSON.parse( cached ) );
		return;
	}

	this.requestData( this.repo );
};

// Display or hide icons
Github.prototype.displayIcons = function () {
	var options = this.options,
			$iconStars = $( ".repo-stars" ),
			$iconWatchers = $( ".repo-watchers" ),
			$iconForks = $( ".repo-forks" ),
			$iconIssues = $( ".repo-issues" );

	$iconStars.css( "display", options.iconStars ? "inline-block" : "none" );
	$iconWatchers.css( "display", options.iconWatchers ? "inline-block" : "none" );
	$iconForks.css( "display", options.iconForks ? "inline-block" : "none" );
	$iconIssues.css( "display", options.iconIssues ? "inline-block" : "none" );
};

// Request repositories from Github
Github.prototype.requestData = function ( repo ) {
	var that = this;

	$.ajax({
		url: "https://api.github.com/repos/" + repo,
		dataType: "jsonp",
		success: function( results ) {
			var result_data = results.data,
				isFailling = results.meta.status >= 400 && result_data.message;

			if ( isFailling ) {
				that.handleErrorRequest( result_data );
				return;
			}

			that.handleSuccessfulRequest( result_data );
		}
	});
};

// Handle Errors requests
Github.prototype.handleErrorRequest = function ( result_data ) {
	console.warn( result_data.message );
	return;
};

// Handle Successful request
Github.prototype.handleSuccessfulRequest = function ( result_data ) {
	this.applyTemplate( result_data );
	this.setCache( result_data );
};

// Stores repostories in sessionStorage if available
Github.prototype.setCache = function ( result_data ) {
	// Cache data
	if ( window.sessionStorage ) {
		window.sessionStorage.setItem( "gh-repos:" + this.repo, JSON.stringify( result_data ) );
	}
};

// Grab cached results
Github.prototype.getCache = function() {
	if ( window.sessionStorage ) {
		return window.sessionStorage.getItem( "gh-repos:" + this.repo );
	}
	else {
		return false;
	}
};

// Apply results to HTML template
Github.prototype.applyTemplate = function ( repo ) {
	var githubRepo = new GithubRepo( repo ),
		$widget = githubRepo.toHTML();

	$widget.appendTo( this.$container );

	this.displayIcons();
};

// -- Attach plugin to jQuery's prototype --------------------------------------

;( function ( $, window, undefined ) {

	$.fn.github = function ( options ) {
		return this.each(function () {
			if ( !$( this ).data( "plugin_github" ) ) {
				$( this ).data( "plugin_github", new Github( this, options ) );
			}
		});
	};

}( window.jQuery || window.Zepto, window ) );
