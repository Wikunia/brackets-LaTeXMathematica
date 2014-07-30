/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */


define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
		EditorManager  = brackets.getModule("editor/EditorManager"),
		AppInit        = brackets.getModule("utils/AppInit"),
		DocumentManager= brackets.getModule("document/DocumentManager");
	var KeyBindingManager = brackets.getModule('command/KeyBindingManager');
	var FileUtils         = brackets.getModule("file/FileUtils");
	var StatusBar = brackets.getModule("widgets/StatusBar");

	var texRelateFiledExtensions = ["sty", "tex", "bib", "cls", "bbl"];

	var loading;
	var dots,dotsDir;
	var editor, insertionPos;

	var statusComponentHtml = '<div id="latex-mathematica">ALT+M uses <a href="http://wolframalpha.com">WolframAlpha</a></div>';
    StatusBar.addIndicator("latex-mathematica", $(statusComponentHtml), false, "", "", "status-indent");


    // Function to run when the menu item is clicked
    function handleLatex() {
	   if (!activeFileIsTexRelated()) {
			return;
	   }



	   // clear number of dots
	   dots = 0;
	   dotsDir = 1; // add a dot (-1 => delete a dot)

       editor = EditorManager.getFocusedEditor();
        if (editor) {
            insertionPos = editor.getCursorPos();
			var rangeStart = {line: 0, ch:0};
			var text = editor.document.getRange(rangeStart,insertionPos);

			// remove '='
			if (text.indexOf("=") > 0) {
				var arrayStartPos = [];
				var lastIndex;
				arrayStartPos.push((lastIndex = text.lastIndexOf('$')) >= 0 ? lastIndex+1 : -1);
				arrayStartPos.push((lastIndex = text.lastIndexOf('\\[')) >= 0 ? lastIndex+2 : -1);
				arrayStartPos.push((lastIndex = text.lastIndexOf('\\begin{equation*}')) >= 0 ? lastIndex+17 : -1);
				arrayStartPos.push((lastIndex = text.lastIndexOf('\\begin{equation}')) >= 0 ? lastIndex+16 : -1);


				var startPos = arrayStartPos.max();
				startPos = (startPos >= 0) ? startPos : false;
				if (startPos) {
					text = text.substring(startPos,text.lastIndexOf("="));
					console.log(text);
					// last = or linebreak
					// replace all text between { }
					var cleanText = text.replace(/(?:{(?:.*?)}|\\begin{(.*?)}(.*?)\\end{(.*?)})/g,
												 function(match,offset,str){
													 console.log(match);
													 return " ".repeatChar(match.length)
												 }
												);

					// last = \implies
					arrayStartPos = [];
					arrayStartPos.push((lastIndex = cleanText.lastIndexOf('=')) >= 0 ? lastIndex+1 : -1);
					arrayStartPos.push((lastIndex = cleanText.lastIndexOf('\\implies')) >= 0 ? lastIndex+8 : -1);
					/*
					arrayStartPos.push((lastIndex = cleanText.lastIndexOf('\\newline')) >= 0 ? lastIndex+8 : -1);
					arrayStartPos.push((lastIndex = cleanText.lastIndexOf('\\linebreak')) >= 0 ? lastIndex+10 : -1);
					*/
					var correctStartPos = arrayStartPos.max();
					startPos = (correctStartPos >= 0) ? correctStartPos : 0;

					// extract the formula (last = or linebreak until = )
					var formula = text.substr(startPos).trim();
					console.log('Formula: '+formula);

					// FullSimplify the formula
					formula = "FullSimplify%20"+encodeURIComponent(formula);
					console.log('Encoded formula: '+formula);


					loading = setInterval(function(){setDot()}, 500);
					$.get("http://github.wikunia.de/LaTeXMathematica/output.php", {in: formula}, function(data) {
						data = data.trim();
						var insertionPosEnd = {line: insertionPos.line, ch: insertionPos.ch+dots};
						editor.document.replaceRange(data, insertionPos, insertionPosEnd);
						clearInterval(loading);
					});
				}
			}
        }

    }

	function setDot() {
		switch(dotsDir) {
			// add a dot
			case 1:
				if (dots == 3) {
					dotsDir = -1;
					removeDot();
				} else { addDot(); }
				break;
			case -1:
				if (dots == 0) {
					dotsDir = 1;
					addDot();
				} else { removeDot(); }
		}
	}

	function addDot() {
		var pos = {line: insertionPos.line, ch: insertionPos.ch+dots};
		console.log(pos);
		editor.document.replaceRange('.', pos);
		dots++;
	}

	function removeDot() {
		var pos = {line: insertionPos.line, ch: insertionPos.ch+dots-1};
		var posEnd = {line: insertionPos.line, ch: insertionPos.ch+dots};
		console.log(pos);
		editor.document.replaceRange('', pos,posEnd);
		dots--;
	}


	/**
	 * Repeat a Char (String)
	 * @param count number of repetitions
	 * @returns repetition
	 */
	String.prototype.repeatChar = function(count) {
		var txt = "";
		for (var i = 0; i < count; i++) {
			txt += this;
		}
		return txt;
	}

	Array.prototype.max = function () {
		var  mx = this[0];
		this.forEach(function (v) {
			if (v > mx) mx = v;
		});
		return mx;
	};


	function activeFileIsTexRelated() {
        var editor = EditorManager.getCurrentFullEditor();
        if (editor) {
            var ext = FileUtils.getFileExtension(editor.document.file.fullPath);
            return texRelateFiledExtensions.indexOf(ext) > -1;
        }
    }

	function _currentDocChangedHandler() {
		if (activeFileIsTexRelated()) {
			StatusBar.updateIndicator("latex-mathematica", true);
		} else {
			StatusBar.updateIndicator("latex-mathematica", false);
		}
	}

    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "latexmathematica.handle";   // package-style naming to avoid collisions
    CommandManager.register("Latex Mathematica", MY_COMMAND_ID, handleLatex);


	 // Add a document change handler
    $(DocumentManager).on("currentDocumentChange", _currentDocChangedHandler);

    // currentDocumentChange is *not* called for the initial document. Use
    // appReady() to set initial state.
    AppInit.appReady(function () {
        _currentDocChangedHandler();
    });


    // We could also add a key binding at the same time:
    KeyBindingManager.addBinding(MY_COMMAND_ID, "Alt-M");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
});
