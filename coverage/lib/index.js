if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/index.js'] === 'undefined'){_$jscoverage['lib/index.js']=[];
_$jscoverage['lib/index.js'].source=['/**',
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
'var tml         = require(\'tml-js\');',
'var tags        = require(\'./tags\');',
'var agent       = require(\'./agent\');',
'var helpers     = require(\'./helpers\');',
'var cache       = require(\'./cache\');',
'var logger      = tml.logger;',
'var Application = tml.Application;',
'',
'exports.init = function (options) {',
'  options = options || {};',
'  ',
'  tml.init(options);',
'',
'  return function (req, res, next) {',
'    if (cache.isInvalidationRequested(req, options))',
'      return;',
'',
'    var t0 = new Date();',
'    var app = new Application(options);',
'',
'    var cookie = helpers.getCookie(req, options.key);',
'    // console.log(cookie);',
'',
'    agent.setup(req, res, app, options);',
'    tags.setup(req, res, app, helpers.getCurrentUser(req, options));',
'',
'    helpers.onFinishRequest(res, app, function() {',
'      var t1 = new Date();',
'      logger.debug("Request took " + (t1-t0) + " mls");',
'    });',
'',
'    app.init({',
'      current_locale:     helpers.getCurrentLocale(req, res, cookie, options),',
'      accepted_locales:   helpers.getAcceptedLocales(req),',
'      current_source:     helpers.getCurrentSource(req, options),',
'      current_translator: helpers.getCurrentTranslator(cookie)',
'    }, function(err) {',
'',
'      if (err) console.log(err);',
'',
'      res.locals.tml_application       = app;',
'      res.locals.tml_default_language  = app.getLanguage(app.default_locale);',
'      res.locals.tml_current_language  = app.getLanguage(app.current_locale);',
'',
'      next();',
'    });',
'  };',
'};'];
_$jscoverage['lib/index.js'][55]=0;
_$jscoverage['lib/index.js'][32]=0;
_$jscoverage['lib/index.js'][56]=0;
_$jscoverage['lib/index.js'][34]=0;
_$jscoverage['lib/index.js'][33]=0;
_$jscoverage['lib/index.js'][59]=0;
_$jscoverage['lib/index.js'][37]=0;
_$jscoverage['lib/index.js'][35]=0;
_$jscoverage['lib/index.js'][36]=0;
_$jscoverage['lib/index.js'][58]=0;
_$jscoverage['lib/index.js'][40]=0;
_$jscoverage['lib/index.js'][38]=0;
_$jscoverage['lib/index.js'][70]=0;
_$jscoverage['lib/index.js'][47]=0;
_$jscoverage['lib/index.js'][43]=0;
_$jscoverage['lib/index.js'][41]=0;
_$jscoverage['lib/index.js'][45]=0;
_$jscoverage['lib/index.js'][46]=0;
_$jscoverage['lib/index.js'][49]=0;
_$jscoverage['lib/index.js'][50]=0;
_$jscoverage['lib/index.js'][52]=0;
_$jscoverage['lib/index.js'][60]=0;
_$jscoverage['lib/index.js'][63]=0;
_$jscoverage['lib/index.js'][70]=0;
_$jscoverage['lib/index.js'][72]=0;
_$jscoverage['lib/index.js'][73]=0;
_$jscoverage['lib/index.js'][74]=0;
_$jscoverage['lib/index.js'][76]=0;
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

_$jscoverage['lib/index.js'][32]++;
var tml         = require('tml-js');
_$jscoverage['lib/index.js'][33]++;
var tags        = require('./tags');
_$jscoverage['lib/index.js'][34]++;
var agent       = require('./agent');
_$jscoverage['lib/index.js'][35]++;
var helpers     = require('./helpers');
_$jscoverage['lib/index.js'][36]++;
var cache       = require('./cache');
_$jscoverage['lib/index.js'][37]++;
var logger      = tml.logger;
_$jscoverage['lib/index.js'][38]++;
var Application = tml.Application;

_$jscoverage['lib/index.js'][40]++;
exports.init = function (options) {
  _$jscoverage['lib/index.js'][41]++;
options = options || {};
  
  _$jscoverage['lib/index.js'][43]++;
tml.init(options);

  _$jscoverage['lib/index.js'][45]++;
return function (req, res, next) {
    _$jscoverage['lib/index.js'][46]++;
if (cache.isInvalidationRequested(req, options))
      {
_$jscoverage['lib/index.js'][47]++;
return;}


    _$jscoverage['lib/index.js'][49]++;
var t0 = new Date();
    _$jscoverage['lib/index.js'][50]++;
var app = new Application(options);

    _$jscoverage['lib/index.js'][52]++;
var cookie = helpers.getCookie(req, options.key);
    // console.log(cookie);

    _$jscoverage['lib/index.js'][55]++;
agent.setup(req, res, app, options);
    _$jscoverage['lib/index.js'][56]++;
tags.setup(req, res, app, helpers.getCurrentUser(req, options));

    _$jscoverage['lib/index.js'][58]++;
helpers.onFinishRequest(res, app, function() {
      _$jscoverage['lib/index.js'][59]++;
var t1 = new Date();
      _$jscoverage['lib/index.js'][60]++;
logger.debug("Request took " + (t1-t0) + " mls");
    });

    _$jscoverage['lib/index.js'][63]++;
app.init({
      current_locale:     helpers.getCurrentLocale(req, res, cookie, options),
      accepted_locales:   helpers.getAcceptedLocales(req),
      current_source:     helpers.getCurrentSource(req, options),
      current_translator: helpers.getCurrentTranslator(cookie)
    }, function(err) {

      _$jscoverage['lib/index.js'][70]++;
if (err) {
_$jscoverage['lib/index.js'][70]++;
console.log(err);}


      _$jscoverage['lib/index.js'][72]++;
res.locals.tml_application       = app;
      _$jscoverage['lib/index.js'][73]++;
res.locals.tml_default_language  = app.getLanguage(app.default_locale);
      _$jscoverage['lib/index.js'][74]++;
res.locals.tml_current_language  = app.getLanguage(app.current_locale);

      _$jscoverage['lib/index.js'][76]++;
next();
    });
  };
};