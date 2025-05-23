// Generated by CoffeeScript 1.8.0
(function() {
  define(["jquery", "underscore", "backbone", "js/memorial/models/articleModel", "js/memorial/models/pressModel", "js/memorial/views/paginatedListView", "js/memorial/views/articleView", "text!partials/memorial/_articlepreview.tpl.html", "text!partials/memorial/_press.tpl.html", "text!partials/memorial/_news.html"], function($, _, Backbone, ArticleModel, PressModel, ListView, ArticleView, articleTemplate, pressTemplate, html) {
    return Backbone.View.extend({
      className: "page-news-view",
      initialize: function(args) {
        var collection, limit, model, params, self;
        this.model.on("change:params", this._onParamsChange, this);
        this.$el.html(html);
        limit = 4;
        params = this.model.get("params") || {};
        self = this;
        collection = new Backbone.Collection();
        collection.model = ArticleModel;
        collection.url = this.model.get("api")["news"];
        collection.on("reset", function(collection) {
          self.newsReady = true;
          return self.onComplete(collection);
        });
        this.newsListView = new ListView({
          collection: collection,
          offset: (params["newsp"] ? parseInt(params["newsp"]) * limit : 0),
          limit: limit,
          template: articleTemplate
        });
        this.newsListView.pagination.model.on("change:offset", this._onOffsetChanged, this);
        this.newsListView.updateCollection(this.newsListView.pagination.model);
        this.$el.children(".news").children(".article-list").html(this.newsListView.el);
        collection = new Backbone.Collection();
        collection.model = PressModel;
        collection.url = this.model.get("api")["press"];
        collection.on("reset", function(collection) {
          self.pressReady = true;
          return self.onComplete(collection);
        });
        this.pressListView = new ListView({
          collection: collection,
          offset: (params["pressp"] ? parseInt(params["pressp"]) * limit : 0),
          limit: limit,
          template: pressTemplate
        });
        this.pressListView.pagination.model.on("change:offset", this._onOffsetChanged, this);
        this.pressListView.updateCollection(this.pressListView.pagination.model);
        this.$el.children(".press").children(".article-list").html(this.pressListView.el);
        model = new ArticleModel();
        model.url = this.model.get("api")["news"];
        this.article = new ArticleView({
          model: model
        });
        this.$(".article").html(this.article.el);
        return this._onParamsChange(this.model);
      },
      onComplete: function(collection) {
        collection.off("reset");
        if (this.newsReady && this.pressReady) {
          return this.trigger("ready", this);
        }
      },
      _enableArticleDisplay: function(value) {
        if (value === undefined) {
          value = true;
        }
        if (value) {
          this.$el.children(".news").hide();
          this.$el.children(".press").hide();
          return this.article.$el.show();
        } else {
          this.$el.children(".news").show();
          this.$el.children(".press").show();
          return this.article.$el.hide();
        }
      },
      _onParamsChange: function(model) {
        var params;
        params = model.get("params") || {};
        if (params["nid"]) {
          this.article.load(params["nid"]);
          return this._enableArticleDisplay(true);
        } else {
          if (params["newsp"]) {
            this.newsListView.pagination.model.set({
              offset: parseInt(params["newsp"]) * this.newsListView.pagination.model.get("limit")
            });
          }
          if (params["pressp"]) {
            this.pressListView.pagination.model.set({
              offset: parseInt(params["pressp"]) * this.pressListView.pagination.model.get("limit")
            });
          }
          return this._enableArticleDisplay(false);
        }
      },
      _onOffsetChanged: function(model) {
        var p, params;
        params = _.extend({}, this.model.get("params"));
        p = parseInt(model.get("offset") / model.get("limit"));
        if (model === this.newsListView.pagination.model) {
          params["newsp"] = p;
        } else {
          if (model === this.pressListView.pagination.model) {
            params["pressp"] = p;
          }
        }
        return this.model.set("params", params);
      },
      destroy: function() {
        if (this.newsListView.destroy !== undefined) {
          this.newsListView.destroy();
        }
        if (this.pressListView.destroy !== undefined) {
          this.pressListView.destroy();
        }
        if (this.article.destroy !== undefined) {
          this.article.destroy();
        }
        return this.remove();
      }
    });
  });

}).call(this);
