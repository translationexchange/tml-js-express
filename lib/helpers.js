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

var tml           = require('tml-js');
var utils         = tml.utils;
var config        = tml.config;
var Translator    = tml.Translator;

module.exports = {

  getCookie: function(req, key) {
    var cookie_name = utils.getCookieName(key);
    var cookie = utils.decode(req.cookies[cookie_name]);
    return cookie || {};
  },

  getCurrentLocale: function(req, res, cookie, options) {
    var current_locale = null;

    if (options.current_locale) {
      if (utils.isFunction(options.current_locale)) {
        current_locale = options.current_locale(req);
      } else {
        current_locale = options.current_locale;
      }
    } else {
      if (req.query.locale) {
        cookie.locale = req.query.locale;
        res.cookie(utils.getCookieName(options.key), utils.encode(cookie));
      }
      current_locale = cookie.locale;
    }

    return current_locale;
  },

  getAcceptedLocales: function(req) {
    return (req.headers['accept-language'] || '').match(/[a-zA-z\-]{2,10}/g) || [];
  },

  getCurrentTranslator: function(cookie) {
    return cookie.translator ? new Translator(cookie.translator) : null;
  },

  getCurrentUser: function(req, options) {
    var current_user = null;
    if (options.current_user) {
      if (utils.isFunction(options.current_user)) {
        current_user = options.current_user(req);
      } else {
        current_user = req.user;
      }
    }
    return current_user;
  },

  getCurrentSource: function(req, options) {
    var current_source_method = options.current_source || options.source;
    var current_source = null;

    // current_source can be a function, hash or a string
    if (current_source_method) {
      if (utils.isFunction(current_source_method)) {
        current_source = current_source_method(req);
      } else if (utils.isObject(current_source_method)) {
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

    return current_source;
  },

  onFinishRequest: function(res, app, callback) {

    var finishRequest = function() {
      res.removeListener('finish', finishRequest);
      app.submitMissingTranslationKeys(function() {
        if (config.getCache()) {
          config.getCache().resetVersion();
        }
        if (callback) callback();
      });
    };

    res.on("finish",  finishRequest);
  }

};