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

exports.init = function (options) {
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
      };
    }

    if (options.hook.enabled) {
      if (req.path == options.hook.path) {
        console.log("Resetting cache version...");

        var authorized = false;

        if (utils.isFunction(req.auth)) {
          authorized = req.auth();
        } else {
          authorized = (req.query.access_token == options.token);
        }

        if (authorized) {
          // remove cache version
          config.getCache().del('current_version', function () {
            if (req.query.silent) {
              res.send("Ok");
            } else {
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
          return;
        }
      }
    }

    var app = new Application(options);
    var current_source = null;
    var current_source_method = options.current_source || options.source;

    // current_source can be a function, hash or a string
    if (current_source_method) {
      if (typeof current_source_method === "function") {
        current_source = current_source_method(req);
      } else if (typeof current_source_method === "object") {
        current_source = (function(path, map) {
          for (var key in map) {
            if (path.match(new RegExp(key))) return map[key];
          }
          return null;
        })(req.originalUrl, current_source_method);
      } else {
        current_source = current_source_method;
      }
    }

    if (!current_source) {
      current_source = utils.normalizeSource(req.url);
    }
    if (current_source == '/') current_source = "index";

    var current_user = null;
    if (options.current_user) {
      if (typeof options.current_user === "function") {
        current_user = options.current_user(req);
      } else {
        current_user = req.user;
      }
    }

    var cookie_name = utils.getCookieName(options.key);
    var cookie = utils.decode(req.cookies[cookie_name]);
    cookie = cookie || {};

    if (options.current_locale) {
      if (typeof options.current_locale === "function") {
        current_locale = options.current_locale(req);
      } else {
        current_locale = options.current_locale;
      }
    } else {
      if (req.query.locale) {
        cookie.locale = req.query.locale;
        res.cookie(cookie_name, utils.encode(cookie));
      }
      current_locale = cookie.locale;
    }

    req.tml_block_options = [];

    // main translation function
    req.tr = res.locals.tr = function(label, description, tokens, options) {
      var params = utils.normalizeParams(label, description, tokens, options);

      if (params.options.secure) {
        params.label = utils.escapeHtml(params.label);
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
      var params = utils.normalizeParams(label, description, tokens, options);
      params.options.skip_decorations = true;
      return req.tr(params.label, params.description, params.tokens, params.options);
    };

    // translation of dynamic data
    req.trs = res.locals.trs = function(label, description, tokens, options) {
      var params = utils.normalizeParams(label, description, tokens, options);
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
      app.submitMissingTranslationKeys(function() {
        if (config.getCache()) {
          config.getCache().resetVersion();
        }
      });
    };
    res.on("finish",  finishRequest);

    app.init({
      current_locale:     current_locale,
      accepted_locales:   (req.headers['accept-language'] || '').match(/[a-zA-z\-]{2,10}/g) || [],
      current_source:     current_source,
      current_translator: cookie.translator ? new tml.Translator(cookie.translator) : null,
    }, function(err) {

      if (err) console.log(err);
      res.locals.tml_application       = app;
      res.locals.tml_default_language  = app.getLanguage(app.default_locale);
      res.locals.tml_current_language  = app.getLanguage(app.current_locale);

      next();
    });
  };
};