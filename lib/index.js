/**
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

var tml = require('tml-js');

exports.init = function (token, options) {
  options = options || {};
  
  tml.init(options);

  var config      = tml.config;
  var utils       = tml.utils;
  var Application = tml.Application;

  return function (req, res, next) {    
    // Application must be initialized for each request -
    // the internal app cache must be removed after each request
    var app = new Application({
      access_token  : token,
      host          : options.host
    });

    var current_source      = utils.normalizeSource(req.url);
    var current_locale      = null;
    var language_changed    = false;

    if (req.query.locale) {
      current_locale = req.query.locale;
      language_changed = true;
    }

    req.tml_block_options = [];

    var translate = function(label, description, tokens, options) {
      if (typeof description !== "string") {
        options     = tokens || {};
        tokens      = description || {};
        description = "";
      }

      tokens = utils.extend({}, {
        viewing_user: req.user
      }, tokens);

      options = utils.extend({}, {
        current_locale      : app.current_locale,
        current_source      : app.current_source,
        current_translator  : app.current_translator,
        block_options       : req.tml_block_options || []
      }, options);

      return app.getCurrentLanguage().translate(label, description, tokens, options);
    };

    var translate_label = function(label, description, tokens, options) {
      if (typeof description !== "string") {
        options     = tokens || {};
        tokens      = description || {};
        description = "";
      }

      options = options || {};
      options.skip_decorations = true;
      return translate(label, description, tokens, options);
    };

    // translation functions
    req.tr          = translate;
    req.trl         = translate_label;
    res.locals.tr   = translate;
    res.locals.trl  = translate_label;

    res.locals.tml_scripts = function() {
      return tml.scripts.header(app, {
        current_language: app.getCurrentLanguage()
      });
    };
    
    res.locals.tml_language_selector = function(type, options) {
      return tml.scripts.language_selector(app, type, utils.extend({}, options, {
        current_language: app.getCurrentLanguage()
      }));
    };
    
    res.locals.tml_block = function(options, callback) {
      req.tml_block_options.unshift(options);
      callback();
      req.tml_block_options.pop();
    };

    res.locals.tml_begin_block = function(options) {
      options = options || {};
      req.tml_block_options.unshift(options);
    };

    res.locals.tml_end_block = function() {
      if (!req.tml_block_options) return;
      req.tml_block_options.pop();
    };

    var finishRequest = function() {
      res.removeListener('finish', finishRequest);
      res.removeListener('close', finishRequest);

      if (config.getCache()) {
        config.getCache().resetVersion();
      }

      app.submitMissingTranslationKeys(function(){
        // tr8n finished
      });
    };

    res.on("finish",  finishRequest);
    res.on("close",   finishRequest);

    config.getCache().getVersion(function(version) {
      app.init({

        // There may be more locales based on fallbacks
        cookies         : req.cookies,
        current_locale  : current_locale,
        current_source  : current_source,
        language_changed: language_changed

      }, function(err) {

        res.locals.tml_application       = app;
        res.locals.tml_default_language  = app.getLanguage(app.default_locale);
        res.locals.tml_current_language  = app.getLanguage(app.current_locale);

        next();
      });
    });
  };
};