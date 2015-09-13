if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/tags.js'] === 'undefined'){_$jscoverage['lib/tags.js']=[];
_$jscoverage['lib/tags.js'].source=['/**',
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
'var jsdom         = require(\'node-jsdom\');',
'var utils         = tml.utils;',
'var DomTokenizer  = tml.DomTokenizer;',
'var scripts       = tml.scripts;',
'',
'module.exports = {',
'',
'  setup: function(req, res, app, current_user) {',
'',
'    // main translation function',
'    req.tr = res.locals.tr = function(label, description, tokens, options) {',
'      var params = utils.normalizeParams(label, description, tokens, options);',
'',
'      if (params.options.secure)',
'        params.label = utils.escapeHtml(params.label);',
'',
'      params.tokens = utils.extend({}, {',
'        viewing_user: current_user',
'      }, params.tokens);',
'',
'      params.options = utils.extend({}, {',
'        current_locale      : app.current_locale,',
'        current_source      : app.current_source,',
'        current_translator  : app.current_translator,',
'        block_options       : req.tml_block_options || []',
'      }, params.options);',
'',
'      return app.getCurrentLanguage().translate(params.label, params.description, params.tokens, params.options);',
'    };',
'',
'    // translation of labels',
'    req.trl = res.locals.trl = function(label, description, tokens, options) {',
'      var params = utils.normalizeParams(label, description, tokens, options);',
'',
'      params.options = utils.extend({}, {',
'        skip_decorations: true',
'      }, params.options);',
'',
'      return req.tr(params.label, params.description, params.tokens, params.options);',
'    };',
'',
'    // translation of unsecure data',
'    req.trs = res.locals.trs = function(label, description, tokens, options) {',
'      var params = utils.normalizeParams(label, description, tokens, options);',
'',
'      params.options = utils.extend({}, {',
'        secure: true',
'      }, params.options);',
'',
'      return req.tr(params.label, params.description, params.tokens, params.options);',
'    };',
'',
'    // translation of dynamic data',
'    req.trh = res.locals.trh = function(label, description, tokens, options) {',
'      var params = utils.normalizeParams(label, description, tokens, options);',
'',
'      params.options = utils.extend({}, {',
'        current_language: app.getCurrentLanguage()',
'      }, params.options);',
'',
'      var tokenizer = new DomTokenizer(jsdom.jsdom(params.label), params.tokens, params.options);',
'      return tokenizer.translate();',
'    };',
'',
'    // script for adding an agent',
'    req.tml_current_language = res.locals.tml_current_language = function() {',
'      return app.getCurrentLanguage();',
'    };',
'',
'    // directional stylesheet tag',
'    res.locals.tml_link = function(options) {',
'      if (utils.isString(options)) {',
'        return "<link href=\'" + options + "\' rel=\'stylesheet\' />";',
'      }',
'',
'      if (utils.isArray(options)) {',
'        if (app.getCurrentLanguage().isRightToLeft())',
'          return "<link href=\'" + options[1] + "\' rel=\'stylesheet\' />";',
'        return "<link href=\'" + options[0] + "\' rel=\'stylesheet\' />";',
'      }',
'',
'      if (utils.isObject(options)) {',
'        if (app.getCurrentLanguage().isRightToLeft())',
'          return "<link href=\'" + options.rtl + "\' rel=\'stylesheet\' />";',
'        return "<link href=\'" + options.ltr + "\' rel=\'stylesheet\' />";',
'      }',
'',
'      return "";',
'    };',
'',
'    // directional javascript tag',
'    res.locals.tml_script = function(options) {',
'      if (utils.isString(options)) {',
'        return "<script src=\'" + options + "\' rel=\'javascript\'></script>";',
'      }',
'',
'      if (utils.isArray(options)) {',
'        if (app.getCurrentLanguage().isRightToLeft())',
'          return "<script src=\'" + options[1] + "\' rel=\'javascript\'></script>";',
'        return "<script src=\'" + options[0] + "\' rel=\'javascript\'></script>";',
'      }',
'',
'      if (utils.isObject(options)) {',
'        if (app.getCurrentLanguage().isRightToLeft())',
'          return "<script src=\'" + options.rtl + "\' rel=\'javascript\'></script>";',
'        return "<script src=\'" + options.ltr + "\' rel=\'javascript\'></script>";',
'      }',
'',
'      return "";',
'    };',
'',
'    // language selector script',
'    res.locals.tml_language_selector = function(type, options) {',
'      return scripts.language_selector(app, type, utils.extend({}, options, {',
'        current_language: app.getCurrentLanguage()',
'      }));',
'    };',
'',
'    // logical key grouping',
'    res.locals.tml_block = function(options, callback) {',
'      req.tml_block_options = req.tml_block_options || [];',
'      req.tml_block_options.unshift(options);',
'      callback();',
'      req.tml_block_options.pop();',
'    };',
'',
'    // key grouping for html',
'    res.locals.tml_begin_block = function(options) {',
'      options = options || {};',
'      req.tml_block_options = req.tml_block_options || [];',
'      req.tml_block_options.unshift(options);',
'    };',
'',
'    res.locals.tml_end_block = function() {',
'      if (!req.tml_block_options) return;',
'      req.tml_block_options.pop();',
'    };',
'',
'    res.locals.tml_source = function(source, callback) {',
'      req.tml_block_options = req.tml_block_options || [];',
'      req.tml_block_options.unshift({"source": source});',
'      callback();',
'      req.tml_block_options.pop();',
'    };',
'',
'    res.locals.tml_begin_source = function(source) {',
'      res.locals.tml_begin_block({source: source});',
'    };',
'',
'    res.locals.tml_end_source = function() {',
'      res.locals.tml_end_block();',
'    };',
'',
'  }',
'',
'};'];
_$jscoverage['lib/tags.js'][103]=0;
_$jscoverage['lib/tags.js'][32]=0;
_$jscoverage['lib/tags.js'][126]=0;
_$jscoverage['lib/tags.js'][34]=0;
_$jscoverage['lib/tags.js'][33]=0;
_$jscoverage['lib/tags.js'][125]=0;
_$jscoverage['lib/tags.js'][38]=0;
_$jscoverage['lib/tags.js'][35]=0;
_$jscoverage['lib/tags.js'][36]=0;
_$jscoverage['lib/tags.js'][130]=0;
_$jscoverage['lib/tags.js'][44]=0;
_$jscoverage['lib/tags.js'][43]=0;
_$jscoverage['lib/tags.js'][129]=0;
_$jscoverage['lib/tags.js'][53]=0;
_$jscoverage['lib/tags.js'][47]=0;
_$jscoverage['lib/tags.js'][46]=0;
_$jscoverage['lib/tags.js'][49]=0;
_$jscoverage['lib/tags.js'][136]=0;
_$jscoverage['lib/tags.js'][65]=0;
_$jscoverage['lib/tags.js'][60]=0;
_$jscoverage['lib/tags.js'][64]=0;
_$jscoverage['lib/tags.js'][135]=0;
_$jscoverage['lib/tags.js'][78]=0;
_$jscoverage['lib/tags.js'][67]=0;
_$jscoverage['lib/tags.js'][75]=0;
_$jscoverage['lib/tags.js'][71]=0;
_$jscoverage['lib/tags.js'][76]=0;
_$jscoverage['lib/tags.js'][146]=0;
_$jscoverage['lib/tags.js'][89]=0;
_$jscoverage['lib/tags.js'][82]=0;
_$jscoverage['lib/tags.js'][86]=0;
_$jscoverage['lib/tags.js'][87]=0;
_$jscoverage['lib/tags.js'][154]=0;
_$jscoverage['lib/tags.js'][105]=0;
_$jscoverage['lib/tags.js'][104]=0;
_$jscoverage['lib/tags.js'][93]=0;
_$jscoverage['lib/tags.js'][94]=0;
_$jscoverage['lib/tags.js'][99]=0;
_$jscoverage['lib/tags.js'][98]=0;
_$jscoverage['lib/tags.js'][152]=0;
_$jscoverage['lib/tags.js'][108]=0;
_$jscoverage['lib/tags.js'][161]=0;
_$jscoverage['lib/tags.js'][111]=0;
_$jscoverage['lib/tags.js'][109]=0;
_$jscoverage['lib/tags.js'][110]=0;
_$jscoverage['lib/tags.js'][163]=0;
_$jscoverage['lib/tags.js'][131]=0;
_$jscoverage['lib/tags.js'][114]=0;
_$jscoverage['lib/tags.js'][117]=0;
_$jscoverage['lib/tags.js'][120]=0;
_$jscoverage['lib/tags.js'][124]=0;
_$jscoverage['lib/tags.js'][115]=0;
_$jscoverage['lib/tags.js'][116]=0;
_$jscoverage['lib/tags.js'][168]=0;
_$jscoverage['lib/tags.js'][137]=0;
_$jscoverage['lib/tags.js'][132]=0;
_$jscoverage['lib/tags.js'][172]=0;
_$jscoverage['lib/tags.js'][153]=0;
_$jscoverage['lib/tags.js'][141]=0;
_$jscoverage['lib/tags.js'][145]=0;
_$jscoverage['lib/tags.js'][138]=0;
_$jscoverage['lib/tags.js'][174]=0;
_$jscoverage['lib/tags.js'][156]=0;
_$jscoverage['lib/tags.js'][155]=0;
_$jscoverage['lib/tags.js'][171]=0;
_$jscoverage['lib/tags.js'][160]=0;
_$jscoverage['lib/tags.js'][162]=0;
_$jscoverage['lib/tags.js'][166]=0;
_$jscoverage['lib/tags.js'][167]=0;
_$jscoverage['lib/tags.js'][167]=0;
_$jscoverage['lib/tags.js'][173]=0;
_$jscoverage['lib/tags.js'][175]=0;
_$jscoverage['lib/tags.js'][178]=0;
_$jscoverage['lib/tags.js'][179]=0;
_$jscoverage['lib/tags.js'][182]=0;
_$jscoverage['lib/tags.js'][183]=0;
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

_$jscoverage['lib/tags.js'][32]++;
var tml           = require('tml-js');
_$jscoverage['lib/tags.js'][33]++;
var jsdom         = require('node-jsdom');
_$jscoverage['lib/tags.js'][34]++;
var utils         = tml.utils;
_$jscoverage['lib/tags.js'][35]++;
var DomTokenizer  = tml.DomTokenizer;
_$jscoverage['lib/tags.js'][36]++;
var scripts       = tml.scripts;

_$jscoverage['lib/tags.js'][38]++;
module.exports = {

  setup: function(req, res, app, current_user) {

    // main translation function
    _$jscoverage['lib/tags.js'][43]++;
req.tr = res.locals.tr = function(label, description, tokens, options) {
      _$jscoverage['lib/tags.js'][44]++;
var params = utils.normalizeParams(label, description, tokens, options);

      _$jscoverage['lib/tags.js'][46]++;
if (params.options.secure)
        {
_$jscoverage['lib/tags.js'][47]++;
params.label = utils.escapeHtml(params.label);}


      _$jscoverage['lib/tags.js'][49]++;
params.tokens = utils.extend({}, {
        viewing_user: current_user
      }, params.tokens);

      _$jscoverage['lib/tags.js'][53]++;
params.options = utils.extend({}, {
        current_locale      : app.current_locale,
        current_source      : app.current_source,
        current_translator  : app.current_translator,
        block_options       : req.tml_block_options || []
      }, params.options);

      _$jscoverage['lib/tags.js'][60]++;
return app.getCurrentLanguage().translate(params.label, params.description, params.tokens, params.options);
    };

    // translation of labels
    _$jscoverage['lib/tags.js'][64]++;
req.trl = res.locals.trl = function(label, description, tokens, options) {
      _$jscoverage['lib/tags.js'][65]++;
var params = utils.normalizeParams(label, description, tokens, options);

      _$jscoverage['lib/tags.js'][67]++;
params.options = utils.extend({}, {
        skip_decorations: true
      }, params.options);

      _$jscoverage['lib/tags.js'][71]++;
return req.tr(params.label, params.description, params.tokens, params.options);
    };

    // translation of unsecure data
    _$jscoverage['lib/tags.js'][75]++;
req.trs = res.locals.trs = function(label, description, tokens, options) {
      _$jscoverage['lib/tags.js'][76]++;
var params = utils.normalizeParams(label, description, tokens, options);

      _$jscoverage['lib/tags.js'][78]++;
params.options = utils.extend({}, {
        secure: true
      }, params.options);

      _$jscoverage['lib/tags.js'][82]++;
return req.tr(params.label, params.description, params.tokens, params.options);
    };

    // translation of dynamic data
    _$jscoverage['lib/tags.js'][86]++;
req.trh = res.locals.trh = function(label, description, tokens, options) {
      _$jscoverage['lib/tags.js'][87]++;
var params = utils.normalizeParams(label, description, tokens, options);

      _$jscoverage['lib/tags.js'][89]++;
params.options = utils.extend({}, {
        current_language: app.getCurrentLanguage()
      }, params.options);

      _$jscoverage['lib/tags.js'][93]++;
var tokenizer = new DomTokenizer(jsdom.jsdom(params.label), params.tokens, params.options);
      _$jscoverage['lib/tags.js'][94]++;
return tokenizer.translate();
    };

    // script for adding an agent
    _$jscoverage['lib/tags.js'][98]++;
req.tml_current_language = res.locals.tml_current_language = function() {
      _$jscoverage['lib/tags.js'][99]++;
return app.getCurrentLanguage();
    };

    // directional stylesheet tag
    _$jscoverage['lib/tags.js'][103]++;
res.locals.tml_link = function(options) {
      _$jscoverage['lib/tags.js'][104]++;
if (utils.isString(options)) {
        _$jscoverage['lib/tags.js'][105]++;
return "<link href='" + options + "' rel='stylesheet' />";
      }

      _$jscoverage['lib/tags.js'][108]++;
if (utils.isArray(options)) {
        _$jscoverage['lib/tags.js'][109]++;
if (app.getCurrentLanguage().isRightToLeft())
          {
_$jscoverage['lib/tags.js'][110]++;
return "<link href='" + options[1] + "' rel='stylesheet' />";}

        _$jscoverage['lib/tags.js'][111]++;
return "<link href='" + options[0] + "' rel='stylesheet' />";
      }

      _$jscoverage['lib/tags.js'][114]++;
if (utils.isObject(options)) {
        _$jscoverage['lib/tags.js'][115]++;
if (app.getCurrentLanguage().isRightToLeft())
          {
_$jscoverage['lib/tags.js'][116]++;
return "<link href='" + options.rtl + "' rel='stylesheet' />";}

        _$jscoverage['lib/tags.js'][117]++;
return "<link href='" + options.ltr + "' rel='stylesheet' />";
      }

      _$jscoverage['lib/tags.js'][120]++;
return "";
    };

    // directional javascript tag
    _$jscoverage['lib/tags.js'][124]++;
res.locals.tml_script = function(options) {
      _$jscoverage['lib/tags.js'][125]++;
if (utils.isString(options)) {
        _$jscoverage['lib/tags.js'][126]++;
return "<script src='" + options + "' rel='javascript'></script>";
      }

      _$jscoverage['lib/tags.js'][129]++;
if (utils.isArray(options)) {
        _$jscoverage['lib/tags.js'][130]++;
if (app.getCurrentLanguage().isRightToLeft())
          {
_$jscoverage['lib/tags.js'][131]++;
return "<script src='" + options[1] + "' rel='javascript'></script>";}

        _$jscoverage['lib/tags.js'][132]++;
return "<script src='" + options[0] + "' rel='javascript'></script>";
      }

      _$jscoverage['lib/tags.js'][135]++;
if (utils.isObject(options)) {
        _$jscoverage['lib/tags.js'][136]++;
if (app.getCurrentLanguage().isRightToLeft())
          {
_$jscoverage['lib/tags.js'][137]++;
return "<script src='" + options.rtl + "' rel='javascript'></script>";}

        _$jscoverage['lib/tags.js'][138]++;
return "<script src='" + options.ltr + "' rel='javascript'></script>";
      }

      _$jscoverage['lib/tags.js'][141]++;
return "";
    };

    // language selector script
    _$jscoverage['lib/tags.js'][145]++;
res.locals.tml_language_selector = function(type, options) {
      _$jscoverage['lib/tags.js'][146]++;
return scripts.language_selector(app, type, utils.extend({}, options, {
        current_language: app.getCurrentLanguage()
      }));
    };

    // logical key grouping
    _$jscoverage['lib/tags.js'][152]++;
res.locals.tml_block = function(options, callback) {
      _$jscoverage['lib/tags.js'][153]++;
req.tml_block_options = req.tml_block_options || [];
      _$jscoverage['lib/tags.js'][154]++;
req.tml_block_options.unshift(options);
      _$jscoverage['lib/tags.js'][155]++;
callback();
      _$jscoverage['lib/tags.js'][156]++;
req.tml_block_options.pop();
    };

    // key grouping for html
    _$jscoverage['lib/tags.js'][160]++;
res.locals.tml_begin_block = function(options) {
      _$jscoverage['lib/tags.js'][161]++;
options = options || {};
      _$jscoverage['lib/tags.js'][162]++;
req.tml_block_options = req.tml_block_options || [];
      _$jscoverage['lib/tags.js'][163]++;
req.tml_block_options.unshift(options);
    };

    _$jscoverage['lib/tags.js'][166]++;
res.locals.tml_end_block = function() {
      _$jscoverage['lib/tags.js'][167]++;
if (!req.tml_block_options) {
_$jscoverage['lib/tags.js'][167]++;
return;}

      _$jscoverage['lib/tags.js'][168]++;
req.tml_block_options.pop();
    };

    _$jscoverage['lib/tags.js'][171]++;
res.locals.tml_source = function(source, callback) {
      _$jscoverage['lib/tags.js'][172]++;
req.tml_block_options = req.tml_block_options || [];
      _$jscoverage['lib/tags.js'][173]++;
req.tml_block_options.unshift({"source": source});
      _$jscoverage['lib/tags.js'][174]++;
callback();
      _$jscoverage['lib/tags.js'][175]++;
req.tml_block_options.pop();
    };

    _$jscoverage['lib/tags.js'][178]++;
res.locals.tml_begin_source = function(source) {
      _$jscoverage['lib/tags.js'][179]++;
res.locals.tml_begin_block({source: source});
    };

    _$jscoverage['lib/tags.js'][182]++;
res.locals.tml_end_source = function() {
      _$jscoverage['lib/tags.js'][183]++;
res.locals.tml_end_block();
    };

  }

};