if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/agent.js'] === 'undefined'){_$jscoverage['lib/agent.js']=[];
_$jscoverage['lib/agent.js'].source=['/**',
' * Copyright (c) 2015 Translation Exchange, Inc.',
' *',
' *  _______                  _       _   _             ______          _',
' * |__   __|                | |     | | (_)           |  ____|        | |',
' *    | |_ __ __ _ _ __  ___| | __ _| |_ _  ___  _ __ | |__  __  _____| |__   __ _ _ __   __ _  ___',
' *    | | \'__/ _` | \'_ \\/ __| |/ _` | __| |/ _ \\| \'_ \\|  __| \\ \\/ / __| \'_ \\ / _` | \'_ \\ / _` |/ _ \\',
' *    | | | | (_| | | | \\__ \\ | (_| | |_| | (_) | | | | |____ >  < (__| | | | (_| | | | | (_| |  __/',
' *    |_|_|  \\__,_|_| |_|___/_|\\__,_|\\__|_|\\___/|_| |_|______/_/\\_\\___|_| |_|\\__,_|_| |_|\\__, |\\___|',
' *                                                                                        __/ |',
' *                                                                                       |___/',
' * Permission is hereby granted, free of charge, to any person obtaining',
' * a copy of this software and associated documentation files (the',
' * "Software"), to deal in the Software without restriction, including',
' * without limitation the rights to use, copy, modify, merge, publish,',
' * distribute, sublicense, and/or sell copies of the Software, and to',
' * permit persons to whom the Software is furnished to do so, subject to',
' * the following conditions:',
' *',
' * The above copyright notice and this permission notice shall be',
' * included in all copies or substantial portions of the Software.',
' *',
' * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,',
' * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF',
' * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND',
' * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE',
' * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION',
' * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION',
' * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
' */',
'',
'var tml           = require(\'tml-js\');',
'var scripts       = tml.scripts;',
'',
'module.exports = {',
'',
'  setup:  function(req, res, app, options) {',
'    if (!options.agent) {',
'      options.agent = {',
'        enabled: true,',
'        version: "latest",',
'        type:    "agent"',
'      };',
'    }',
'',
'    if (options.agent.enabled) {',
'      if (options.agent.type == "agent") {',
'        res.locals.tml_scripts = function() {',
'          return scripts.header(app, {',
'            current_language: app.getCurrentLanguage(),',
'            agent: {',
'              type:     options.agent.type,',
'              host:     options.agent.host,',
'              version:  options.agent.version || "stable",',
'              domains:  options.agent.domains || {},',
'              locale:   app.getCurrentLanguage().locale,',
'              source:   app.current_source',
'            }',
'          });',
'        };',
'      } else {',
'        res.locals.tml_scripts = function() {',
'          return scripts.header(app, {',
'            current_language: app.getCurrentLanguage()',
'          });',
'        };',
'      }',
'    } else {',
'      res.locals.tml_scripts = function() {',
'        return "";',
'      };',
'    }',
'  }',
'',
'',
'};'];
_$jscoverage['lib/agent.js'][63]=0;
_$jscoverage['lib/agent.js'][32]=0;
_$jscoverage['lib/agent.js'][62]=0;
_$jscoverage['lib/agent.js'][35]=0;
_$jscoverage['lib/agent.js'][33]=0;
_$jscoverage['lib/agent.js'][38]=0;
_$jscoverage['lib/agent.js'][39]=0;
_$jscoverage['lib/agent.js'][46]=0;
_$jscoverage['lib/agent.js'][47]=0;
_$jscoverage['lib/agent.js'][48]=0;
_$jscoverage['lib/agent.js'][49]=0;
_$jscoverage['lib/agent.js'][69]=0;
_$jscoverage['lib/agent.js'][70]=0;
}/**
 * Copyright (c) 2015 Translation Exchange, Inc.
 *
 *  _______                  _       _   _             ______          _
 * |__   __|                | |     | | (_)           |  ____|        | |
 *    | |_ __ __ _ _ __  ___| | __ _| |_ _  ___  _ __ | |__  __  _____| |__   __ _ _ __   __ _  ___
 *    | | '__/ _` | '_ \/ __| |/ _` | __| |/ _ \| '_ \|  __| \ \/ / __| '_ \ / _` | '_ \ / _` |/ _ \
 *    | | | | (_| | | | \__ \ | (_| | |_| | (_) | | | | |____ >  < (__| | | | (_| | | | | (_| |  __/
 *    |_|_|  \__,_|_| |_|___/_|\__,_|\__|_|\___/|_| |_|______/_/\_\___|_| |_|\__,_|_| |_|\__, |\___|
 *                                                                                        __/ |
 *                                                                                       |___/
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

_$jscoverage['lib/agent.js'][32]++;
var tml           = require('tml-js');
_$jscoverage['lib/agent.js'][33]++;
var scripts       = tml.scripts;

_$jscoverage['lib/agent.js'][35]++;
module.exports = {

  setup:  function(req, res, app, options) {
    _$jscoverage['lib/agent.js'][38]++;
if (!options.agent) {
      _$jscoverage['lib/agent.js'][39]++;
options.agent = {
        enabled: true,
        version: "latest",
        type:    "agent"
      };
    }

    _$jscoverage['lib/agent.js'][46]++;
if (options.agent.enabled) {
      _$jscoverage['lib/agent.js'][47]++;
if (options.agent.type == "agent") {
        _$jscoverage['lib/agent.js'][48]++;
res.locals.tml_scripts = function() {
          _$jscoverage['lib/agent.js'][49]++;
return scripts.header(app, {
            current_language: app.getCurrentLanguage(),
            agent: {
              type:     options.agent.type,
              host:     options.agent.host,
              version:  options.agent.version || "stable",
              domains:  options.agent.domains || {},
              locale:   app.getCurrentLanguage().locale,
              source:   app.current_source
            }
          });
        };
      } else {
        _$jscoverage['lib/agent.js'][62]++;
res.locals.tml_scripts = function() {
          _$jscoverage['lib/agent.js'][63]++;
return scripts.header(app, {
            current_language: app.getCurrentLanguage()
          });
        };
      }
    } else {
      _$jscoverage['lib/agent.js'][69]++;
res.locals.tml_scripts = function() {
        _$jscoverage['lib/agent.js'][70]++;
return "";
      };
    }
  }


};