import React, { useEffect } from 'react'

import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/scroll/simplescrollbars.js';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/selection/mark-selection.js';
import 'codemirror/addon/selection/selection-pointer.js';

import 'codemirror/addon/display/autorefresh.js';
import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/display/fullscreen.js';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/css-hint.js';
import 'codemirror/addon/hint/xml-hint.js';
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/hint/sql-hint.js';





const Editor = () => {
  const editororef = useRef(null);

  useEffect   (() => {
    async function init() {
      Codemirror.fromTextArea(document.getElementById('code'), {
        mode: {name: "javascript", json: true},
        theme: 'material',
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        scrollbarStyle: 'overlay',
        styleActiveLine: true,
        markSelection: true,
        placeholder: 'Write your code here...',
        extraKeys: {
          'Ctrl-Space': 'autocomplete',
          'Ctrl-Enter': function(cm) {
            console.log(cm.getValue());
          },
          'Ctrl-Q': function(cm) {
            cm.foldCode(cm.getCursor());
          },
          'F11': function(cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
          },
          'Esc': function(cm) {
            if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false);
          }
        },
        hintOptions: {
          completeSingle: false,
          extraKeys: {
            'Ctrl-Space': 'autocomplete',
            'Ctrl-Enter': function(cm) {
              console.log(cm.getValue());
            },
            'Ctrl-Q': function(cm) {
              cm.foldCode(cm.getCursor());
            },
            'F11': function(cm) {
              cm.setOption('fullScreen', !cm.getOption('fullScreen'));
            },
            'Esc': function(cm) {
              if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false);
            }
          },
          hint: function(cm, options) {
            var list = ['alert', 'prompt', 'console', 'log', 'error', 'info', 'warn', 'dir', 'clear', 'time', 'timeEnd', 'trace', 'assert', 'count', 'countReset', 'group', 'groupCollapsed', 'groupEnd', 'table', 'debug', 'dirxml', 'profile', 'profileEnd', 'timeLog', 'context', 'memory', 'exception', 'select', 'keys', 'values', 'copy', 'open', 'close', 'inspect'];
            return {
              list: list,
              from: Codemirror.Pos(cm.getCursor().line, 0),
              to: Codemirror.Pos(cm.getCursor().line, cm.getCursor().ch),
            };
          }
        },
      });
    }
    init();
    }, []);
  return <textarea name="" id="code"></textarea>

}

export default Editor

