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

    if (!options.hook) {
      options.hook = {
        enabled: true,
        path: '/tml/upgrade'
      }
    }

    if (options.hook.enabled) {
      if (req.path == options.hook.path) {
        var authorized = false;

        if (typeof req.auth === "function") {
          authorized = req.auth();
        } else {
          authorized = (req.param('access_token') == token);
        }

        if (authorized) {
          // remove cache version
          config.getCache().del('current_version', function () {
            res.send([
              "<p>Tml has been upgraded</p>",
              "<script>",
              "   setTimeout(function() {",
              "      location = '/'; ",
              "   }, 1000);",
              "</script>"
            ].join('\n'));
          });
          return;
        }
      }
    }

    // Application must be initialized for each request -
    // the internal app cache must be removed after each request
    var app = new Application({
      access_token  : token,
      host          : options.host
    });

    var current_source = null;

    // current_source can be a function, hash or a string
    if (options.current_source) {
      if (typeof options.current_source === "function") {
        current_source = options.current_source(req);
      } else if (typeof options.current_source === "object") {
        current_source = (function(path, map) {
          for (var key in map) {
            if (path.match(new RegExp(key))) return map[key];
          }
          return null;
        })(req.originalUrl, options.current_source);
      } else {
        current_source = options.current_source;
      }
    }
    if (!current_source) {
      current_source = utils.normalizeSource(req.url);
    }

    var current_user = null;
    if (options.current_user) {
      if (typeof options.current_user === "function") {
        current_user = options.current_user(req);
      } else {
        current_user = req.user;
      }
    }

    var current_locale      = null;
    var language_changed    = false;

    if (req.query.locale) {
      current_locale = req.query.locale;
      language_changed = true;
    }

    req.tml_block_options = [];

    // normalize parameters: tr(label, tokens), tr(label, description), etc...
    var normalizeParams = function(label, description, tokens, options) {
      if (typeof description !== "string") {
        options     = tokens || {};
        tokens      = description || {};
        description = "";
      }

      options = options || {};

      return {
        label: label,
        description: description,
        tokens: tokens,
        options: options
      };
    };

    // main translation function
    req.tr = res.locals.tr = function(label, description, tokens, options) {
      var params = normalizeParams(label, description, tokens, options);

      if (params.options.secure) {
        params.label = params.label
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      }

      params.tokens = utils.extend({}, {
        viewing_user: current_user
      }, params.tokens);

      params.options = utils.extend({}, {
        current_locale      : app.current_locale,
        current_source      : app.current_source,
        current_translator  : app.current_translator,
        block_options       : req.tml_block_options || []
      }, params.options);

      return app.getCurrentLanguage().translate(params.label, params.description, params.tokens, params.options);
    };

    // translation of labels
    req.trl = res.locals.trl = function(label, description, tokens, options) {
      var params = normalizeParams(label, description, tokens, options);
      params.options.skip_decorations = true;
      return req.tr(params.label, params.description, params.tokens, params.options);
    };

    // translation of dynamic data
    req.trs = res.locals.trs = function(label, description, tokens, options) {
      var params = normalizeParams(label, description, tokens, options);
      params.options.secure = true;
      return req.tr(params.label, params.description, params.tokens, params.options);
    };

    // script for adding an agent
    req.tml_current_language = res.locals.tml_current_language = function() {
      return app.getCurrentLanguage();
    };

    // directional stylesheet tag
    res.locals.tml_link = function(options) {
      if (utils.isString(options)) {
        return "<link href='" + options + "' rel='stylesheet' />";
      }

      if (utils.isArray(options)) {
        if (app.getCurrentLanguage().isRightToLeft())
          return "<link href='" + options[1] + "' rel='stylesheet' />";
        return "<link href='" + options[0] + "' rel='stylesheet' />";
      }

      if (utils.isObject(options)) {
        if (app.getCurrentLanguage().isRightToLeft())
          return "<link href='" + options.rtl + "' rel='stylesheet' />";
        return "<link href='" + options.ltr + "' rel='stylesheet' />";
      }

      return "";
    };

    // directional javascript tag
    res.locals.tml_script = function(options) {
      if (utils.isString(options)) {
        return "<script src='" + options + "' rel='javascript'></script>";
      }

      if (utils.isArray(options)) {
        if (app.getCurrentLanguage().isRightToLeft())
          return "<script src='" + options[1] + "' rel='javascript'></script>";
        return "<script src='" + options[0] + "' rel='javascript'></script>";
      }

      if (utils.isObject(options)) {
        if (app.getCurrentLanguage().isRightToLeft())
          return "<script src='" + options.rtl + "' rel='javascript'></script>";
        return "<script src='" + options.ltr + "' rel='javascript'></script>";
      }

      return "";
    };

    // script for adding an agent
    res.locals.tml_scripts = function() {
      return tml.scripts.header(app, {
        current_language: app.getCurrentLanguage()
      });
    };

    // language selector script
    res.locals.tml_language_selector = function(type, options) {
      return tml.scripts.language_selector(app, type, utils.extend({}, options, {
        current_language: app.getCurrentLanguage()
      }));
    };

    // logical key grouping
    res.locals.tml_block = function(options, callback) {
      req.tml_block_options.unshift(options);
      callback();
      req.tml_block_options.pop();
    };

    // key grouping for html
    res.locals.tml_begin_block = function(options) {
      options = options || {};
      req.tml_block_options.unshift(options);
    };

    res.locals.tml_end_block = function() {
      if (!req.tml_block_options) return;
      req.tml_block_options.pop();
    };

    res.locals.tml_begin_source = function(source) {
      res.locals.tml_begin_block({source: source});
    };

    res.locals.tml_end_source = function() {
      res.locals.tml_end_block();
    };

    var finishRequest = function() {
      res.removeListener('finish', finishRequest);
      // res.removeListener('close', finishRequest);

      app.submitMissingTranslationKeys(function() {
        if (config.getCache()) {
          // reset request cache version so next request can pull/check it from cache again
          config.getCache().resetVersion();
        }
      });
    };

    res.on("finish",  finishRequest);
    // res.on("close",   finishRequest);

    app.init({

      // There may be more locales based on fallback
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
  };
};