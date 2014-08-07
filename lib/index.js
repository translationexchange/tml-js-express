var fs      = require("fs");
var path    = require('path');
var tr8n    = require('tr8n');


exports.init = function (key, secret, options) {  
  options = options || {};
  
  tr8n.init(options);

  var config      = tr8n.config;
  var utils       = tr8n.utils;
  var Application = tr8n.Application;
  var Translator  = tr8n.Translator;


  return function (req, res, next) {    
    var cookie  = (req.cookies) ? req.cookies["tr8n_" + key] : undefined;
    var data    = utils.decodeAndVerifyParams(cookie, secret) || {};

    // Application must be initialized for each request - 
    // the internal app cache must be removed after each request
    var app = new Application({
      key     : key,
      secret  : secret,
      host    : options.host
    });

    var current_translator  = data.translator ? new Translator(data.translator) : null;
    var current_source      = utils.normalizeSource(req.url);
    var current_locale      = data.locale;

    if (!current_locale) {
      if (req.query.locale) {
        current_locale = req.query.locale;
        if (req.session) req.session.locale = current_locale;
      } else if (req.session && req.session.locale) {
        current_locale = req.session.locale;
      }
    }

    req.tr8n_block_options = [];


    var translate = function(label, description, tokens, options) {
      if (typeof description !== "string") {
        options     = tokens || {};
        tokens      = description || {};
        description = "";
      }

      tokens = utils.extend({}, {
        viewing_user:req.user
      }, tokens);
      options = utils.extend({},{
        current_locale      : current_locale,
        current_source      : current_source,
        current_translator  : current_translator,
        block_options       : req.tr8n_block_options || []
      }, options);

      return app.getLanguage(current_locale).translate(label, description, tokens, options);
    };

    var translate_label = function(label, description, tokens, options) {
      options = options || {};
      options.skip_decorations = true;
      return translate(label, description, tokens, options);
    };





    // translation functions
    req.tr          = translate;
    req.trl         = translate_label;
    res.locals.tr   = translate;
    res.locals.trl  = translate_label;


    res.locals.tr8n_scripts = function() {
      return tr8n.scripts.header(app, {
        current_language: app.getLanguage(current_locale) || app.getLanguage(app.default_locale)
      });
    };
    
    res.locals.tr8n_language_selector = function() {
      return tr8n.scripts.language_selector(app, {
        current_language: app.getLanguage(current_locale) || app.getLanguage(app.default_locale)
      });
    };
    
    res.locals.tr8n_block = function(options, callback) {
      req.tr8n_block_options.unshift(options);
      callback();
      req.tr8n_block_options.pop();
    };

    res.locals.tr8n_begin_block = function(options) {
      options = options || {};
      req.tr8n_block_options.unshift(options);
    };

    res.locals.tr8n_end_block = function() {
      req.tr8n_block_options.pop();
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


    var locales = [app.default_locale];
    if (current_locale) {
      locales.push(current_locale);
    } else {
      current_locale = app.default_locale;
    }

    config.getCache().getVersion(function(version) {
      app.init({
        // There may be more locales based on fallbacks
        current_locale  : current_locale,
        locales         : locales,
        sources         : [current_source],
        translator      : current_translator

      }, function(err) {

        res.locals.tr8n_application       = app;
        res.locals.tr8n_default_language  = app.getLanguage(app.default_locale);
        res.locals.tr8n_current_language  = app.getLanguage(current_locale);

        next();
      });
    });
  };
};