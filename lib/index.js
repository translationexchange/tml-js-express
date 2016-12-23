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
var tags = require('./tags');
var helpers = require('./helpers');

exports.init = function (options) {
  options = options || {};

  tml.init(options);

  return function (req, res, next) {
    var t0 = new Date();

    tml.logger.debug("Processing URL: " + req.url);

    if (helpers.isIgnoredRequest(options, req)) {
      next();
      return;
    }

    var cookie = helpers.getCookie(req, options.key);
    // console.log(cookie);

    var app = new tml.Application({
      key: options.key,
      token: cookie.oauth ? cookie.oauth.token : null,
      host: options.host,
      cdn_host: options.cdn_host
    });

    tags.setup(req, res, app, helpers.getCurrentUser(req, options));

    helpers.onFinishRequest(res, app, function () {
      var t1 = new Date();
      tml.logger.debug("Request took " + (t1 - t0) + " mls");
    });

    app.init({
      current_locale: helpers.getCurrentLocale(req, res, cookie, options),
      current_source: helpers.getCurrentSource(req, options),
      accepted_locales: helpers.getAcceptedLocales(req),
      current_translator: helpers.getCurrentTranslator(cookie)
    }, function (err) {
      if (err) console.log(err);

      res.locals.tml_application = app;
      res.locals.tml_default_language = app.getDefaultLanguage();
      res.locals.tml_current_language = app.getLanguage(app.current_locale) || res.locals.tml_default_language;

      options.agent = options.agent || {};
      options.agent.sdk = 'tml-js-express v0.4.5';
      options.agent.source = app.current_source;
      options.agent.locale = app.current_locale;

      res.locals.tml_scripts = function () {
        return tml.scripts.agent_tag(app, options.agent);
      };

      next();
    });
  };
};