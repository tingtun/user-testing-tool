requirejs.config({
  shim: {
    'backbone': {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    }
  }
});

require(['jquery', 'underscore', 'backbone', 'tests', 'test-run', 'views/home', 'views/test'], function($, _, Backbone, Tests, TestRun, HomeView, TestView) {
  _.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g
  };

  function _t(id, obj) {
    return _.template($(id).html(), obj === undefined ? {} : obj)
  }

  var testRun = new TestRun(
    new Tests([
      {
        title: 'Title appropriate for web page',
        question: 'Is the title “European Commission” appropriate for this web page?',
      },
      {
        title: 'Web page looks attractive',
        question: 'Does this web page look attractive to you?',
      },
      {
        title: 'Does the title “Ireland in the driving seat” describe the section it belongs to?',
        question: 'Does the title “Ireland in the driving seat” describe the section it belongs to?'
      },
      {
        title: 'Baz',
        question: 'Baz',
        'template': '#test-case-template2',
      },
      {
        title: 'Does the language English correspond to the language used on the site?',
        question: 'Does the language English correspond to the language used on the site?',
      }
    ])
  );

  var ResultView = Backbone.View.extend({
    el: '.page',
    render: function () {
      this.$el.html(_t('#result-template'));
    }
  });

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
      'test': 'test',
      'result': 'result'
    }
  });

  var appRouter = new AppRouter();

  appRouter.on('route:home', function () {
    new HomeView().render();
    $('#test-nav-button').removeClass('active');
    $('#result-nav-button').removeClass('active');
    $('.page-extra').html('');
  });
  appRouter.on('route:test', function () {
    new TestView({model: testRun}).render();
    $('#result-nav-button').removeClass('active');
    $('#test-nav-button').addClass('active');
    $('.page-extra').html('<iframe src="http://ec.europa.eu/index_en.htm" sandbox="allow-forms allow-scripts"></iframe>');
  });
  appRouter.on('route:result', function () {
    new ResultView().render();
    $('#test-nav-button').removeClass('active');
    $('#result-nav-button').addClass('active');
    $('.page-extra').html('');
  });

  Backbone.history.start();
});
