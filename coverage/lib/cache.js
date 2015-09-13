if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/cache.js'] === 'undefined'){_$jscoverage['lib/cache.js']=[];
_$jscoverage['lib/cache.js'].source=['/**',
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
'var utils         = tml.utils;',
'var config        = tml.config;',
'var logger        = tml.logger;',
'',
'module.exports = {',
'',
'  isInvalidationRequested: function(req, options) {',
'',
'    if (!options.hook) {',
'      options.hook = {',
'        enabled: true,',
'        path: \'/tml/upgrade\'',
'      };',
'    }',
'',
'    if (options.hook.enabled) {',
'      if (req.path == options.hook.path) {',
'        logger.debug("Resetting cache version...");',
'',
'        var authorized = false;',
'',
'        if (utils.isFunction(req.auth)) {',
'          authorized = req.auth();',
'        } else {',
'          authorized = (req.query.access_token == options.token);',
'        }',
'',
'        if (authorized) {',
'          // remove cache version',
'          config.getCache().del(\'current_version\', function () {',
'            if (req.query.silent) {',
'              res.send("Ok");',
'            } else {',
'              res.send([',
'                "<p>Tml has been upgraded</p>",',
'                "<script>",',
'                "   setTimeout(function() {",',
'                "      location = \'/\'; ",',
'                "   }, 1000);",',
'                "</script>"',
'              ].join(\'\\n\'));',
'            }',
'          });',
'          return true;',
'        }',
'      }',
'    }',
'',
'    return false;',
'  }',
'',
'};'];
_$jscoverage['lib/cache.js'][54]=0;
_$jscoverage['lib/cache.js'][32]=0;
_$jscoverage['lib/cache.js'][64]=0;
_$jscoverage['lib/cache.js'][34]=0;
_$jscoverage['lib/cache.js'][33]=0;
_$jscoverage['lib/cache.js'][63]=0;
_$jscoverage['lib/cache.js'][37]=0;
_$jscoverage['lib/cache.js'][35]=0;
_$jscoverage['lib/cache.js'][62]=0;
_$jscoverage['lib/cache.js'][41]=0;
_$jscoverage['lib/cache.js'][76]=0;
_$jscoverage['lib/cache.js'][42]=0;
_$jscoverage['lib/cache.js'][48]=0;
_$jscoverage['lib/cache.js'][49]=0;
_$jscoverage['lib/cache.js'][50]=0;
_$jscoverage['lib/cache.js'][52]=0;
_$jscoverage['lib/cache.js'][55]=0;
_$jscoverage['lib/cache.js'][57]=0;
_$jscoverage['lib/cache.js'][60]=0;
_$jscoverage['lib/cache.js'][66]=0;
_$jscoverage['lib/cache.js'][81]=0;
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

_$jscoverage['lib/cache.js'][32]++;
var tml           = require('tml-js');
_$jscoverage['lib/cache.js'][33]++;
var utils         = tml.utils;
_$jscoverage['lib/cache.js'][34]++;
var config        = tml.config;
_$jscoverage['lib/cache.js'][35]++;
var logger        = tml.logger;

_$jscoverage['lib/cache.js'][37]++;
module.exports = {

  isInvalidationRequested: function(req, options) {

    _$jscoverage['lib/cache.js'][41]++;
if (!options.hook) {
      _$jscoverage['lib/cache.js'][42]++;
options.hook = {
        enabled: true,
        path: '/tml/upgrade'
      };
    }

    _$jscoverage['lib/cache.js'][48]++;
if (options.hook.enabled) {
      _$jscoverage['lib/cache.js'][49]++;
if (req.path == options.hook.path) {
        _$jscoverage['lib/cache.js'][50]++;
logger.debug("Resetting cache version...");

        _$jscoverage['lib/cache.js'][52]++;
var authorized = false;

        _$jscoverage['lib/cache.js'][54]++;
if (utils.isFunction(req.auth)) {
          _$jscoverage['lib/cache.js'][55]++;
authorized = req.auth();
        } else {
          _$jscoverage['lib/cache.js'][57]++;
authorized = (req.query.access_token == options.token);
        }

        _$jscoverage['lib/cache.js'][60]++;
if (authorized) {
          // remove cache version
          _$jscoverage['lib/cache.js'][62]++;
config.getCache().del('current_version', function () {
            _$jscoverage['lib/cache.js'][63]++;
if (req.query.silent) {
              _$jscoverage['lib/cache.js'][64]++;
res.send("Ok");
            } else {
              _$jscoverage['lib/cache.js'][66]++;
res.send([
                "<p>Tml has been upgraded</p>",
                "<script>",
                "   setTimeout(function() {",
                "      location = '/'; ",
                "   }, 1000);",
                "</script>"
              ].join('\n'));
            }
          });
          _$jscoverage['lib/cache.js'][76]++;
return true;
        }
      }
    }

    _$jscoverage['lib/cache.js'][81]++;
return false;
  }

};