if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/helpers.js'] === 'undefined'){_$jscoverage['lib/helpers.js']=[];
_$jscoverage['lib/helpers.js'].source=['/**',
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
'var Translator    = tml.Translator;',
'',
'module.exports = {',
'',
'  getCookie: function(req, key) {',
'    var cookie_name = utils.getCookieName(key);',
'    var cookie = utils.decode(req.cookies[cookie_name]);',
'    return cookie || {};',
'  },',
'',
'  getCurrentLocale: function(req, res, cookie, options) {',
'    var current_locale = null;',
'',
'    if (options.current_locale) {',
'      if (utils.isFunction(options.current_locale)) {',
'        current_locale = options.current_locale(req);',
'      } else {',
'        current_locale = options.current_locale;',
'      }',
'    } else {',
'      if (req.query.locale) {',
'        cookie.locale = req.query.locale;',
'        res.cookie(utils.getCookieName(options.key), utils.encode(cookie));',
'      }',
'      current_locale = cookie.locale;',
'    }',
'',
'    return current_locale;',
'  },',
'',
'  getAcceptedLocales: function(req) {',
'    return (req.headers[\'accept-language\'] || \'\').match(/[a-zA-z\\-]{2,10}/g) || [];',
'  },',
'',
'  getCurrentTranslator: function(cookie) {',
'    return cookie.translator ? new Translator(cookie.translator) : null;',
'  },',
'',
'  getCurrentUser: function(req, options) {',
'    var current_user = null;',
'    if (options.current_user) {',
'      if (utils.isFunction(options.current_user)) {',
'        current_user = options.current_user(req);',
'      } else {',
'        current_user = req.user;',
'      }',
'    }',
'    return current_user;',
'  },',
'',
'  getCurrentSource: function(req, options) {',
'    var current_source_method = options.current_source || options.source;',
'    var current_source = null;',
'',
'    // current_source can be a function, hash or a string',
'    if (current_source_method) {',
'      if (utils.isFunction(current_source_method)) {',
'        current_source = current_source_method(req);',
'      } else if (utils.isObject(current_source_method)) {',
'        current_source = (function(path, map) {',
'          for (var key in map) {',
'            if (path.match(new RegExp(key))) return map[key];',
'          }',
'          return null;',
'        })(req.originalUrl, current_source_method);',
'      } else {',
'        current_source = current_source_method;',
'      }',
'    }',
'',
'    if (!current_source) {',
'      current_source = utils.normalizeSource(req.url);',
'    }',
'',
'    if (current_source == \'/\') current_source = "index";',
'',
'    return current_source;',
'  },',
'',
'  onFinishRequest: function(res, app, callback) {',
'',
'    var finishRequest = function() {',
'      res.removeListener(\'finish\', finishRequest);',
'      app.submitMissingTranslationKeys(function() {',
'        if (config.getCache()) {',
'          config.getCache().resetVersion();',
'        }',
'        if (callback) callback();',
'      });',
'    };',
'',
'    res.on("finish",  finishRequest);',
'  }',
'',
'};'];
_$jscoverage['lib/helpers.js'][86]=0;
_$jscoverage['lib/helpers.js'][32]=0;
_$jscoverage['lib/helpers.js'][87]=0;
_$jscoverage['lib/helpers.js'][34]=0;
_$jscoverage['lib/helpers.js'][33]=0;
_$jscoverage['lib/helpers.js'][96]=0;
_$jscoverage['lib/helpers.js'][37]=0;
_$jscoverage['lib/helpers.js'][35]=0;
_$jscoverage['lib/helpers.js'][96]=0;
_$jscoverage['lib/helpers.js'][41]=0;
_$jscoverage['lib/helpers.js'][40]=0;
_$jscoverage['lib/helpers.js'][98]=0;
_$jscoverage['lib/helpers.js'][50]=0;
_$jscoverage['lib/helpers.js'][42]=0;
_$jscoverage['lib/helpers.js'][46]=0;
_$jscoverage['lib/helpers.js'][48]=0;
_$jscoverage['lib/helpers.js'][49]=0;
_$jscoverage['lib/helpers.js'][93]=0;
_$jscoverage['lib/helpers.js'][56]=0;
_$jscoverage['lib/helpers.js'][52]=0;
_$jscoverage['lib/helpers.js'][55]=0;
_$jscoverage['lib/helpers.js'][90]=0;
_$jscoverage['lib/helpers.js'][66]=0;
_$jscoverage['lib/helpers.js'][57]=0;
_$jscoverage['lib/helpers.js'][59]=0;
_$jscoverage['lib/helpers.js'][62]=0;
_$jscoverage['lib/helpers.js'][105]=0;
_$jscoverage['lib/helpers.js'][79]=0;
_$jscoverage['lib/helpers.js'][77]=0;
_$jscoverage['lib/helpers.js'][74]=0;
_$jscoverage['lib/helpers.js'][76]=0;
_$jscoverage['lib/helpers.js'][75]=0;
_$jscoverage['lib/helpers.js'][70]=0;
_$jscoverage['lib/helpers.js'][117]=0;
_$jscoverage['lib/helpers.js'][82]=0;
_$jscoverage['lib/helpers.js'][120]=0;
_$jscoverage['lib/helpers.js'][91]=0;
_$jscoverage['lib/helpers.js'][119]=0;
_$jscoverage['lib/helpers.js'][101]=0;
_$jscoverage['lib/helpers.js'][92]=0;
_$jscoverage['lib/helpers.js'][95]=0;
_$jscoverage['lib/helpers.js'][94]=0;
_$jscoverage['lib/helpers.js'][106]=0;
_$jscoverage['lib/helpers.js'][109]=0;
_$jscoverage['lib/helpers.js'][109]=0;
_$jscoverage['lib/helpers.js'][111]=0;
_$jscoverage['lib/helpers.js'][116]=0;
_$jscoverage['lib/helpers.js'][118]=0;
_$jscoverage['lib/helpers.js'][122]=0;
_$jscoverage['lib/helpers.js'][122]=0;
_$jscoverage['lib/helpers.js'][126]=0;
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

_$jscoverage['lib/helpers.js'][32]++;
var tml           = require('tml-js');
_$jscoverage['lib/helpers.js'][33]++;
var utils         = tml.utils;
_$jscoverage['lib/helpers.js'][34]++;
var config        = tml.config;
_$jscoverage['lib/helpers.js'][35]++;
var Translator    = tml.Translator;

_$jscoverage['lib/helpers.js'][37]++;
module.exports = {

  getCookie: function(req, key) {
    _$jscoverage['lib/helpers.js'][40]++;
var cookie_name = utils.getCookieName(key);
    _$jscoverage['lib/helpers.js'][41]++;
var cookie = utils.decode(req.cookies[cookie_name]);
    _$jscoverage['lib/helpers.js'][42]++;
return cookie || {};
  },

  getCurrentLocale: function(req, res, cookie, options) {
    _$jscoverage['lib/helpers.js'][46]++;
var current_locale = null;

    _$jscoverage['lib/helpers.js'][48]++;
if (options.current_locale) {
      _$jscoverage['lib/helpers.js'][49]++;
if (utils.isFunction(options.current_locale)) {
        _$jscoverage['lib/helpers.js'][50]++;
current_locale = options.current_locale(req);
      } else {
        _$jscoverage['lib/helpers.js'][52]++;
current_locale = options.current_locale;
      }
    } else {
      _$jscoverage['lib/helpers.js'][55]++;
if (req.query.locale) {
        _$jscoverage['lib/helpers.js'][56]++;
cookie.locale = req.query.locale;
        _$jscoverage['lib/helpers.js'][57]++;
res.cookie(utils.getCookieName(options.key), utils.encode(cookie));
      }
      _$jscoverage['lib/helpers.js'][59]++;
current_locale = cookie.locale;
    }

    _$jscoverage['lib/helpers.js'][62]++;
return current_locale;
  },

  getAcceptedLocales: function(req) {
    _$jscoverage['lib/helpers.js'][66]++;
return (req.headers['accept-language'] || '').match(/[a-zA-z\-]{2,10}/g) || [];
  },

  getCurrentTranslator: function(cookie) {
    _$jscoverage['lib/helpers.js'][70]++;
return cookie.translator ? new Translator(cookie.translator) : null;
  },

  getCurrentUser: function(req, options) {
    _$jscoverage['lib/helpers.js'][74]++;
var current_user = null;
    _$jscoverage['lib/helpers.js'][75]++;
if (options.current_user) {
      _$jscoverage['lib/helpers.js'][76]++;
if (utils.isFunction(options.current_user)) {
        _$jscoverage['lib/helpers.js'][77]++;
current_user = options.current_user(req);
      } else {
        _$jscoverage['lib/helpers.js'][79]++;
current_user = req.user;
      }
    }
    _$jscoverage['lib/helpers.js'][82]++;
return current_user;
  },

  getCurrentSource: function(req, options) {
    _$jscoverage['lib/helpers.js'][86]++;
var current_source_method = options.current_source || options.source;
    _$jscoverage['lib/helpers.js'][87]++;
var current_source = null;

    // current_source can be a function, hash or a string
    _$jscoverage['lib/helpers.js'][90]++;
if (current_source_method) {
      _$jscoverage['lib/helpers.js'][91]++;
if (utils.isFunction(current_source_method)) {
        _$jscoverage['lib/helpers.js'][92]++;
current_source = current_source_method(req);
      } else {
_$jscoverage['lib/helpers.js'][93]++;
if (utils.isObject(current_source_method)) {
        _$jscoverage['lib/helpers.js'][94]++;
current_source = (function(path, map) {
          _$jscoverage['lib/helpers.js'][95]++;
for (var key in map) {
            _$jscoverage['lib/helpers.js'][96]++;
if (path.match(new RegExp(key))) {
_$jscoverage['lib/helpers.js'][96]++;
return map[key];}

          }
          _$jscoverage['lib/helpers.js'][98]++;
return null;
        })(req.originalUrl, current_source_method);
      } else {
        _$jscoverage['lib/helpers.js'][101]++;
current_source = current_source_method;
      }}

    }

    _$jscoverage['lib/helpers.js'][105]++;
if (!current_source) {
      _$jscoverage['lib/helpers.js'][106]++;
current_source = utils.normalizeSource(req.url);
    }

    _$jscoverage['lib/helpers.js'][109]++;
if (current_source == '/') {
_$jscoverage['lib/helpers.js'][109]++;
current_source = "index";}


    _$jscoverage['lib/helpers.js'][111]++;
return current_source;
  },

  onFinishRequest: function(res, app, callback) {

    _$jscoverage['lib/helpers.js'][116]++;
var finishRequest = function() {
      _$jscoverage['lib/helpers.js'][117]++;
res.removeListener('finish', finishRequest);
      _$jscoverage['lib/helpers.js'][118]++;
app.submitMissingTranslationKeys(function() {
        _$jscoverage['lib/helpers.js'][119]++;
if (config.getCache()) {
          _$jscoverage['lib/helpers.js'][120]++;
config.getCache().resetVersion();
        }
        _$jscoverage['lib/helpers.js'][122]++;
if (callback) {
_$jscoverage['lib/helpers.js'][122]++;
callback();}

      });
    };

    _$jscoverage['lib/helpers.js'][126]++;
res.on("finish",  finishRequest);
  }

};