'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  //Configurations will be loaded here.
  //Ask for user input
  prompting: function() {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      //Defaults to the project's folder name if the input is skipped
      default: this.appname
    }
    this.prompt({
      type: 'input',
      name: 'safetyMessageTitle',
      message: 'Safety Message Title',
      //Defaults to the project's folder name if the input is skipped
      default: 'Safety Message Title'
    }
    this.prompt({
      type: 'input',
      name: 'safetyMessageBody',
      message: 'Safety Message Body',
      //Defaults to the project's folder name if the input is skipped
      default: 'Safety Message Body'
    }
    this.prompt({
      type: 'input',
      name: 'safetyMessageSignature',
      message: 'Safety Message Signature',
      //Defaults to the project's folder name if the input is skipped
      default: 'Safety Message Signature'
    }
    this.prompt({
      type: 'input',
      name: 'fontFamily',
      message: 'Font Family',
      //Defaults to the project's folder name if the input is skipped
      default: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
    this.prompt({
      type: 'input',
      name: 'primaryColor',
      message: 'Primary Color (Main buttons etc)',
      //Defaults to the project's folder name if the input is skipped
      default: '$blue'
    }
    this.prompt({
      type: 'input',
      name: 'secondaryColor',
      message: 'Secondary Color (Checkout button etc)',
      //Defaults to the project's folder name if the input is skipped
      default: '$red'
    }
    this.prompt({
      type: 'input',
      name: 'bodyBackgroundColor',
      message: 'Body Background Color',
      //Defaults to the project's folder name if the input is skipped
      default: '#FFF'
    }
    this.prompt({
      type: 'input',
      name: 'bodyFontColor',
      message: 'Body Font Color',
      //Defaults to the project's folder name if the input is skipped
      default: '$gray-800'
    }
    this.prompt({
      type: 'input',
      name: 'navbarBackgroundColor',
      message: 'Navbar Background Color',
      //Defaults to the project's folder name if the input is skipped
      default: '#FFF'
    }
    this.prompt({
      type: 'input',
      name: 'navbarFontColor',
      message: 'Navbar Font Color',
      //Defaults to the project's folder name if the input is skipped
      default: '$gray-800'
    }
    , function(answers) {
      this.props = answers;
      this.log(answers.name);
      done();
    }.bind(this));
  },
  //Writing Logic here
  writing: {
    //Copy the configuration files
    config: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name
        }
      );
    },

    //Copy application files
    app: function() {
      //index
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'),
        this.destinationPath('/index.html'), {
          name: this.props.name,
          safetyMessageTitle: this.props.safetyMessageTitle,
          safetyMessageBody: this.props.safetyMessageBody,
          safetyMessageSignature: this.props.safetyMessageSignature
        }
      );

      //catalog
      this.fs.copyTpl(
        this.templatePath('_catalog/_catalog.html'),
        this.destinationPath('catalog/catalog.html'),
        this.destinationPath('/catalog/catalog.html'), {
          name: this.props.name,
        }
      );

      //scss
      this.fs.copyTpl(
        this.templatePath('_scss/_custom.scss'),
        this.destinationPath('scss/custom.scss'),
        this.destinationPath('/scss/custom.scss'), {
          fontFamily: this.props.fontFamily,
          primaryColor: this.props.primaryColor,
          secondaryColor: this.props.secondaryColor,
          bodyBackgroundColor: this.props.bodyBackgroundColor,
          bodyFontColor: this.props.bodyFontColor,
          navbarBackgroundColor: this.props.navbarBackgroundColor,
          navbarFontColor: this.props.navbarFontColor
        }
      );

      // css
      this.fs.copyTpl(
        this.templatePath('_css/_custom.css'),
        this.destinationPath('/css/custom.css')
      );

      // images
      this.fs.copy(
        this.templatePath('_images/*.*'),
        this.destinationPath('/images/')
      );
    }
  },
  install: function() {
    this.installDependencies();
  }
});
