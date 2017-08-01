/**
 * Copyright (c) 2016 Translation Exchange, Inc.
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

var tml = require('tml-server');
var jsdom = require('jsdom');

module.exports = {

  /**
   * Sets up page tags
   *
   * @param req
   * @param res
   * @param app
   * @param current_user
   */
  setup: function (req, res, app, current_user) {

    // main translation function
    req.tr = res.locals.tr = function (label, description, tokens, options) {
      var params = tml.utils.normalizeParams(label, description, tokens, options);

      if (params.options.secure)
        params.label = tml.utils.escapeHtml(params.label);

      params.tokens = tml.utils.extend({}, {
        viewing_user: current_user
      }, params.tokens);

      params.options = tml.utils.extend({}, {
        current_locale: app.current_locale,
        current_source: app.current_source,
        current_translator: app.current_translator,
        block_options: req.tml_block_options || []
      }, params.options);

      return app.getCurrentLanguage().translate(params.label, params.description, params.tokens, params.options);
    };

    // translation of labels
    req.trl = res.locals.trl = function (label, description, tokens, options) {
      var params = tml.utils.normalizeParams(label, description, tokens, options);

      params.options = tml.utils.extend({}, {
        skip_decorations: true
      }, params.options);

      return req.tr(params.label, params.description, params.tokens, params.options);
    };

    // translation of unsecure data
    req.trs = res.locals.trs = function (label, description, tokens, options) {
      var params = tml.utils.normalizeParams(label, description, tokens, options);

      params.options = tml.utils.extend({}, {
        secure: true
      }, params.options);

      return req.tr(params.label, params.description, params.tokens, params.options);
    };

    // translation of dynamic data
    req.trh = res.locals.trh = function (label, description, tokens, options) {
      var params = tml.utils.normalizeParams(label, description, tokens, options);

      console.log("Translating ", label);

      params.options = tml.utils.extend({}, {
        current_language: app.getCurrentLanguage(),
        current_locale: app.current_locale,
        current_source: app.current_source,
        current_translator: app.current_translator,
        block_options: req.tml_block_options || []
      }, params.options);

      var doc = new jsdom.JSDOM(params.label);
      var tokenizer = new tml.DomTokenizer(doc.window.document, params.tokens, params.options);
      return tokenizer.translate();
    };

    // script for adding an agent
    req.tml_current_language = res.locals.tml_current_language = function () {
      return app.getCurrentLanguage();
    };

    // script for adding an agent
    req.tml_current_language_dir = res.locals.tml_current_language_dir = function () {
      return app.getCurrentLanguage().dir;
    };

    // directional stylesheet tag
    res.locals.tml_link = function (options) {
      if (tml.utils.isString(options)) {
        return "<link href='" + options + "' rel='stylesheet' />";
      }

      if (tml.utils.isArray(options)) {
        if (app.getCurrentLanguage().isRightToLeft())
          return "<link href='" + options[1] + "' rel='stylesheet' />";
        return "<link href='" + options[0] + "' rel='stylesheet' />";
      }

      if (tml.utils.isObject(options)) {
        if (app.getCurrentLanguage().isRightToLeft())
          return "<link href='" + options.rtl + "' rel='stylesheet' />";
        return "<link href='" + options.ltr + "' rel='stylesheet' />";
      }

      return "";
    };

    // directional javascript tag
    res.locals.tml_script = function (options) {
      if (tml.utils.isString(options)) {
        return "<script src='" + options + "' rel='javascript'></script>";
      }

      if (tml.utils.isArray(options)) {
        if (app.getCurrentLanguage().isRightToLeft())
          return "<script src='" + options[1] + "' rel='javascript'></script>";
        return "<script src='" + options[0] + "' rel='javascript'></script>";
      }

      if (tml.utils.isObject(options)) {
        if (app.getCurrentLanguage().isRightToLeft())
          return "<script src='" + options.rtl + "' rel='javascript'></script>";
        return "<script src='" + options.ltr + "' rel='javascript'></script>";
      }

      return "";
    };

    // language selector script
    res.locals.tml_language_selector = function (type, options) {
      return tml.scripts.language_selector(app, type, tml.utils.extend({}, options, {
        current_language: app.getCurrentLanguage()
      }));
    };

    // logical key grouping
    res.locals.tml_block = function (options, callback) {
      req.tml_block_options = req.tml_block_options || [];
      req.tml_block_options.unshift(options);
      callback();
      req.tml_block_options.pop();
    };

    // key grouping for html
    res.locals.tml_begin_block = function (options) {
      options = options || {};
      req.tml_block_options = req.tml_block_options || [];
      req.tml_block_options.unshift(options);
    };

    res.locals.tml_end_block = function () {
      if (!req.tml_block_options) return;
      req.tml_block_options.pop();
    };

    res.locals.tml_source = function (source, callback) {
      req.tml_block_options = req.tml_block_options || [];
      req.tml_block_options.unshift({"source": source});
      callback();
      req.tml_block_options.pop();
    };

    res.locals.tml_begin_source = function (source) {
      res.locals.tml_begin_block({source: source});
    };

    res.locals.tml_end_source = function () {
      res.locals.tml_end_block();
    };

  }

};