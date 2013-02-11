// Generated by CoffeeScript 1.3.3
(function() {
  var requestUrl;

  requirejs.config({
    baseUrl: 'js/deps',
    paths: {
      collections: '../collections',
      views: '../views',
      models: '../models'
    },
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

  requestUrl = function(webPageUrl) {
    return 'http://accessibility.egovmon.no/en/pagecheck2.0/?url=' + encodeURIComponent(webPageUrl) + '&export=json';
  };

  require(['jquery', 'underscore', 'backbone', 'collections/tests', 'models/test-run', 'views/navbar', 'views/home', 'views/test', 'views/iframe', 'views/result'], function($, _, Backbone, Tests, TestRun, NavbarView, HomeView, TestView, IframeView, ResultView) {
    var AppRouter, activateView, appRouter, homeView, iframeView, navbarView, resultView, testRun, testView;
    _.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };
    testRun = new TestRun(new Tests([
      {
        title: 'Title appropriate for web page',
        question: 'Is the title “European Commission” appropriate for this web page?'
      }, {
        title: 'Web page looks attractive',
        question: 'Does this web page look attractive to you?'
      }, {
        title: 'Does the title “Ireland in the driving seat” describe the section it belongs to?',
        question: 'Does the title “Ireland in the driving seat” describe the section it belongs to?'
      }, {
        title: 'Baz',
        question: 'Baz',
        template: '#test-case-template2'
      }, {
        title: 'Does the language English correspond to the language used on the site?',
        question: 'Does the language English correspond to the language used on the site?'
      }
    ]));
    console.log(requestUrl(testRun.get('webPage')));
    $.get(requestUrl(testRun.get('webPage')), function(data) {
      return console.log(data);
    });
    AppRouter = Backbone.Router.extend({
      routes: {
        '': 'home',
        'test': 'test',
        'test/:id': 'test',
        'result': 'result'
      }
    });
    appRouter = new AppRouter();
    navbarView = new NavbarView({
      model: testRun
    });
    homeView = new HomeView();
    testView = new TestView({
      model: testRun
    });
    iframeView = new IframeView({
      model: testRun
    });
    resultView = new ResultView({
      model: testRun
    });
    navbarView.render();
    iframeView.render();
    activateView = function(name) {
      switch (name) {
        case 'home':
          $('#test-nav-button').removeClass('active');
          $('#result-nav-button').removeClass('active');
          $('#iframe-view').stop(false, true).hide();
          $('#test-view').hide();
          $('#result-view').hide();
          return $('#home-view').fadeIn('fast');
        case 'test':
          $('#result-nav-button').removeClass('active');
          $('#test-nav-button').addClass('active');
          $('#home-view').hide();
          $('#result-view').hide();
          if (testRun.get('currentTest') === 0) {
            return $('#iframe-view').fadeIn('slow', function() {
              return $('#test-view').slideDown('fast');
            });
          } else {
            $('#test-view').show();
            return $('#iframe-view').show();
          }
          break;
        case 'result':
          $('#test-nav-button').removeClass('active');
          $('#result-nav-button').addClass('active');
          $('#iframe-view').stop(false, true).hide();
          $('#home-view').hide();
          $('#test-view').slideUp('fast');
          return $('#result-view').fadeIn('fast');
      }
    };
    appRouter.on('route:home', function() {
      homeView.render();
      return activateView('home');
    });
    appRouter.on('route:test', function(id) {
      testRun.set('currentTest', id === void 0 ? 0 : parseInt(id));
      testView.render();
      return activateView('test');
    });
    appRouter.on('route:result', function() {
      resultView.render();
      return activateView('result');
    });
    return Backbone.history.start();
  });

}).call(this);
