var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    

    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
  
    }

    async prompting() {
      this.answers = await this.prompt([{
        type    : 'input',
        name    : 'model',
        message : 'Your model/folder name',
        default : 'Model'// Default to current folder name
      }]);
    }  

    writing() {

      this.fs.copyTpl(
        this.templatePath('ModelAction.js'),
        this.destinationPath('public/'+this.answers.model+'/'+this.answers.model+'Action.js'),
        { model: this.answers.model }
      );

      this.fs.copyTpl(
        this.templatePath('ModelApi.js'),
        this.destinationPath('public/'+this.answers.model+'/'+this.answers.model+'Api.js'),
        { model: this.answers.model }
      );    

      this.fs.copyTpl(
        this.templatePath('ModelForm.jsx'),
        this.destinationPath('public/'+this.answers.model+'/'+this.answers.model+'Form.jsx'),
        { model: this.answers.model }
      );    

      this.fs.copyTpl(
        this.templatePath('ModelList.jsx'),
        this.destinationPath('public/'+this.answers.model+'/'+this.answers.model+'List.jsx'),
        { model: this.answers.model }
      );  

      this.fs.copyTpl(
        this.templatePath('ModelPage.jsx'),
        this.destinationPath('public/'+this.answers.model+'/'+this.answers.model+'Page.jsx'),
        { model: this.answers.model }
      );  


    }

  };