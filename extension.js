// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
var path = require('path');

var highlightLocations;
var taintedLines = [];

const decorationType = vscode.window.createTextEditorDecorationType({
	backgroundColor: "red",
	border: "0.5px solid white"
  });

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "flowtracker" is now active!');

	let timeout = undefined;
	

	let activeEditor = vscode.window.activeTextEditor;
	
	let disposable = vscode.commands.registerCommand('flowtracker.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from flowtracker!');
	});

	let basicHighlight = vscode.commands.registerCommand('flowtracker.showFlow', function()
	{
		decorate();	
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(basicHighlight);
}
function updateLines()
{
	let activeEditor = vscode.window.activeTextEditor;

	const flowLines = [];
	taintedLines.sort(function(a,b){return a-b});
	let min = taintedLines[0];
	let max = taintedLines[taintedLines.length - 1];
	let i = min + 1;
	while (i < max)
	{
		const found = taintedLines.find(element => element == i);
		if(found == undefined)
		{
			const startPos = new vscode.Position(i, 0);
			const endPos = new vscode.Position(i, 0);
			let decoration = new vscode.Range(startPos, endPos);
			highlightLocations.push(decoration);
		}
		i++;
	}
	activeEditor.setDecorations(decorationType, highlightLocations);
}

function decorate() {
	let activeEditor = vscode.window.activeTextEditor;
	if(!activeEditor)
	{	
		return;
	}
	let text = activeEditor.document.getText();
	//vscode.window.showInformationMessage(text);

	const lnclfl = [];

	let regEx = new RegExp(/[0-9]+\s[0-9]+/g);
	let match;

	while(match = regEx.exec(text))
	{
		let lncl = match.toString();
		let ln = lncl.split(" ")[0];
		let cl = lncl.split(" ")[1];
		
		const startPos = new vscode.Position(parseInt(ln)-1, parseInt(cl)-1);
		const endPos = new vscode.Position(parseInt(ln)-1, parseInt(cl)+200);
		taintedLines.push(parseInt(ln)-1);
		let decoration = new vscode.Range(startPos, endPos);
		lnclfl.push(decoration);
	}
	
	// let test = vscode.workspace.findFiles('*.c', null, 2);
	// let targetUri = test.then[0];
	// vscode.workspace.openTextDocument(targetUri).then(doc => {
	// 	vscode.window.showTextDocument(doc);
	// });
	highlightLocations = lnclfl
	vscode.window.showInformationMessage('Flow Saved');
	activeEditor.setDecorations(decorationType, highlightLocations);
	updateLines();
	//activeEditor.setDecorations(decorationType, lnclfl);
}

vscode.workspace.onWillSaveTextDocument(event => {
	const openEditor = vscode.window.visibleTextEditors.filter(
	  editor => editor.document.uri === event.document.uri
	)[0]
	decorate();
})

vscode.workspace.onDidOpenTextDocument(event => {
	let activeEditor = vscode.window.activeTextEditor;
	//activeEditor.setDecorations(decorationType, highlightLocations);
})

  // this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
