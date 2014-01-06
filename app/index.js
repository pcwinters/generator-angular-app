'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AngularAppGenerator = module.exports = function AngularAppGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AngularAppGenerator, yeoman.generators.Base);

AngularAppGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [
		{      
			name: 'moduleName',
			message: 'What would you like to name this app?' 
		},
		{
			name: 'authorName',
			message: 'What is your full name?'
		}
	];

	this.prompt(prompts, function (props) {
		this.moduleName = props.moduleName;
		this.authorName = props.authorName;
		cb();
	}.bind(this));
};

AngularAppGenerator.prototype.app = function app() {
	this.mkdir('app');
	this.mkdir('app/assets');
	this.mkdir('app/src');
	this.mkdir('app/src/scripts');
	this.mkdir('app/src/views');
	this.mkdir('app/src/stylesheets');

	this.copy('Gruntfile.coffee', 'Gruntfile.coffee');
	this.copy('app/index.jade', 'app/index.jade');

	this.template('_package.json', 'package.json');
	this.template('_bower.json', 'bower.json');
	this.copy('.bowerrc', '.bowerrc');
	
	this.template('karma.conf.js', 'karma.conf.js');
	this.template('app/src/scripts/app.coffee', 'app/src/scripts/app.coffee');
	this.template('app/test/app_spec.coffee', 'app/test/app_spec.coffee');
};

AngularAppGenerator.prototype.projectfiles = function projectfiles() {
	this.copy('editorconfig', '.editorconfig');
	this.copy('jshintrc', '.jshintrc');
};
