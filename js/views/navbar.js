define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  return Backbone.View.extend({
    el: '#navbar-view',
    render: function() {
      this.$el.html(_.template($('#navbar-template').html()));
    }
  });
});
