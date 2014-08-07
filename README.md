# Tr8n Express

## Tr8n = *Tr*[anslatio]*n*

Tr8n is a powerful and robust framework for internationalization. The technology enables developers to quickly offer their sites in hundreds of different languages and integrates with TranslationExchange.com, a cloud based translation service. Tr8n along with TranslationExchange provide for continuous localization. 

At its core Tr8n removes the need to maintain resource files, and instead uses Translation Markup Language (TML). TML provides a specific syntax for how text should be defined, and is used to identify dynamic data within the text.

Tr8n and TML are currently being used by Microsoft, Yammer and MyHeritage.To learn more about Tr8n and TranslationExchange visit out website.

## What is Tr8n Express

Tr8n Express is the express extension for Tr8n.

## Install

    $ npm install tr8n-express

## Usage

To use Tr8n in express configure it with the required tr8n.init() middleware.

    var express       = require('express');
    var cookieParser  = require('cookie-parser');
    var tr8n          = require('tr8n-express');
    
    var app = express();
    
    app.use(cookieParser());    
    app.use(tr8n.init("<YOUR APP KEY>", "<YOUR APP SECRET>");

Now start using TML in your template files with the `tr` function.

    <%- tr('Hello {user}!', {user: current_user.name}) %>
