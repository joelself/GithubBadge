describe("github-badge.repo", function() {

	var instance;

	beforeEach(function() {
		instance = new GithubRepo({
			name: "jquery-github",
			description: "A jQuery plugin to display your Github Repositories",
			forks_count: 33,
			pushed_at: "2013-07-02T12:08:36Z",
			html_url: "https://api.github.com/repos/zenorocha/jquery-github",
			stargazers_count: 131,
			watchers_count: 22,
			open_issues: 5,
		});
	});

	describe("initialize GithubRepo", function() {
		it("should be repository's name", function() {
			expect(instance.name)
				.toEqual("jquery-github");
		});

		it("should be repository's description", function() {
			expect(instance.description)
				.toEqual("A jQuery plugin to display your Github Repositories");
		});

		it("should be repository's number of forks", function() {
			expect(instance.forks_count)
				.toEqual(33);
		});

		it("should be repository's last update date", function() {
			expect(instance.pushed_at)
				.toEqual("2013-07-02T12:08:36Z");
		});

		it("should be repository's api url", function() {
			expect(instance.html_url)
				.toEqual("https://api.github.com/repos/zenorocha/jquery-github");
		});

		it("should be repository's number of stargazers", function() {
			expect(instance.stargazers_count)
				.toEqual(131);
		});

		it("should be repository's number of watchers", function() {
			expect(instance.watchers_count)
				.toEqual(22);
		});

		it("should be repository's number of open issues", function() {
			expect(instance.open_issues)
				.toEqual(5);
		});
	});

	describe("execute _parsePushedDate()", function() {
		it("should parse repository's pushed_at attribute", function() {
			expect(instance._parsePushedDate(instance.pushed_at))
				.toEqual("2/7/2013");
		});
	});

	describe("execute toHTML()", function() {
		it("should output html via the toHTML function", function() {
			expect(instance.toHTML()[0].outerHTML)
				.toEqual('<div class="github-box">\n	<div class="github-box-header">\n		<h3>\n			<a href="https://api.github.com/repos/zenorocha/jquery-github">jquery-github</a>\n		</h3>\n		<div class="github-stats">\n			<a class="repo-stars" title="Stars" data-icon="" href="https://api.github.com/repos/zenorocha/jquery-github/stargazers">131</a>\n			<a class="repo-watchers" title="Watchers" data-icon="" href="https://api.github.com/repos/zenorocha/jquery-github/watchers">22</a>\n			<a class="repo-forks" title="Forks" data-icon="" href="https://api.github.com/repos/zenorocha/jquery-github/network">33</a>\n			<a class="repo-issues" title="Issues" data-icon="" href="https://api.github.com/repos/zenorocha/jquery-github/issues">5</a>\n		</div>\n	</div>\n	<div class="github-box-content">\n		<p>A jQuery plugin to display your Github Repositories — <a href="https://api.github.com/repos/zenorocha/jquery-github#readme">Read More</a></p>\n	</div>\n	<div class="github-box-download">\n		<p class="repo-update">Latest commit to <strong>master</strong> on 2/7/2013</p>\n		<a class="repo-download" title="Download as zip" data-icon="" href="https://api.github.com/repos/zenorocha/jquery-github/zipball/master"></a>\n	</div>\n</div>');
		});
	});
});
