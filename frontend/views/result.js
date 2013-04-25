// Generated by CoffeeScript 1.6.2
(function() {
  define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    return Backbone.View.extend({
      el: '#result-view',
      initialize: function() {
        this.model.bind('change:state', this.render, this);
        return this.options.router.bind('all', function(route) {
          if (route === 'route:result') {
            this.render();
            return this.$el.show();
          } else {
            return this.$el.hide();
          }
        }, this);
      },
      shouldHideAutomatedCheckerResults: function() {
        return document.getElementById('hideAutomatedCheckerResults') === null || $('#hideAutomatedCheckerResults').is(':checked');
      },
      transformResult: function(result, verifyIndex, verifyCount, that) {
        if (result.line === 0) {
          result.line = '–';
        }
        if (result.column === 0) {
          result.column = '–';
        }
        if (result.category !== 'verify') {
          result.answer = '<em>Auto</em>';
          if (that.shouldHideAutomatedCheckerResults()) {
            result.dimClass = 'dim';
          } else {
            result.dimClass = '';
          }
        }
        if (result.category === 'verify' && verifyIndex < verifyCount) {
          result.testTitle = '<a href="' + window.location.href.split('#')[0] + '#test/' + verifyIndex + '">' + result.testTitle + '</a>';
        }
        result.categoryCapitalized = result.category.charAt(0).toUpperCase() + result.category.slice(1);
        return result;
      },
      render: function() {
        var checked, results, that, verifyIndex;

        that = this;
        if (this.model.get('state') === 'error') {
          return this.$el.html(_.template($('#result-template-error').html(), {
            webPage: this.model.get('webPage')
          }));
        } else if (this.model.get('state') === 'loading') {
          return this.$el.html(_.template($('#result-template-loading').html(), {
            webPage: this.model.get('webPage')
          }));
        } else {
          results = [];
          verifyIndex = 0;
          _.each(this.model.get('tests').models, function(element, index, list) {
            results.push(that.transformResult(element.attributes, verifyIndex, that.model.testCount(), that));
            if (element.attributes.category === 'verify') {
              return verifyIndex++;
            }
          });
          checked = '';
          if (this.shouldHideAutomatedCheckerResults()) {
            checked = 'checked="checked"';
          }
          return this.$el.html(_.template($('#result-template').html(), {
            webPage: this.model.get('webPage'),
            tests: results,
            checked: checked
          }));
        }
      },
      events: {
        'change #hideAutomatedCheckerResults': 'clickDim'
      },
      clickDim: function(el) {
        return this.render();
      }
    });
  });

}).call(this);
