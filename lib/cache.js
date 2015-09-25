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

var tml = require('tml-server');

module.exports = {

  /**
   * Provides support for cache invalidation
   *
   * @param req
   * @param options
   * @returns {boolean}
   */
  isInvalidationRequested: function(req, options) {

    if (!options.hook) {
      options.hook = {
        enabled: true,
        path: '/tml/upgrade'
      };
    }

    if (options.hook.enabled) {
      if (req.path == options.hook.path) {
        tml.logger.debug("Resetting cache version...");

        var authorized = false;

        if (tml.utils.isFunction(req.auth)) {
          authorized = req.auth();
        } else {
          authorized = (req.query.access_token == options.token);
        }

        if (authorized) {
          // remove cache version
          tml.config.getCache().del('current_version', function () {
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
          return true;
        }
      }
    }

    return false;
  }

};