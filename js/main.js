$(document).ready(function () {

  'use strict'

  var Nexus = {

    initialized: false,

    mainNavAnimated: (document.querySelector('[data-menuAnimated]').dataset.menuanimated === 'true') ? true : false,

    isIE: function(){
      /* detect IE
      * returns version of IE or false, if browser is not Internet Explorer
      */
      var ua = window.navigator.userAgent;
      // IE 11
      // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
      var msie = ua.indexOf('MSIE ');
      if (msie > 0) {
        // IE 10 or older => return version number
        return true;
      }
      var trident = ua.indexOf('Trident/');
      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return true;
      }
      // other browser
      return false;
    },

    globalArgs: {
      mainNav: document.querySelector('.js-main-nav'),
      mainNavList: document.querySelector('.js-main-nav__list'),
      mainNavToggle: document.querySelector('.js-main-nav-toggle')
    },

    initialize: function(){
      if (this.initialized) return;

      this.initialized = true;
      this.build();
    },

    // Building all site functionality
    build: function(){
      this.mainMenuActions();
      this.cardModal();
      this.smoothScroll();
      this.tabs();
      this.validateForm();
      this.setMargins();
    },

    setMargins: function() {
      const mainNavHeight = $('.js-main-nav').outerHeight(),
            mainFooterTop = $('.js-main-footer-top');

      if (!this.isIE()){
        mainFooterTop.css({'min-height': mainNavHeight});
      }
    },

    validateForm: function() {
      if (typeof Array.from === 'undefined') return;
      Array.from(document.querySelectorAll('.js-form-validation .c-form__field')).forEach(function(item){
        item.addEventListener('invalid', function() {
          item.dataset.touched = true
        });
        item.addEventListener('blur', function() {
          if (item.value !== '') item.dataset.touched = true
        });
      });
    },

    tabs: function() {

      var $this = this;
      var tabs = $('.js-tabs');

      function setTabMargin(){
        var tabsHeight = tabs.outerHeight();
        var currentContent = tabs.find('.c-tabs__content:visible');
        var currentContentHeight = currentContent.outerHeight();
        tabs.css({
          'margin-bottom': currentContentHeight
        });
        currentContent.css({
          'top': tabsHeight
        });
      }

      setTabMargin();

      tabs.on('click', function(event){
        setTabMargin();
      });
    },

    mainMenuActions: function() {
      var toggleMenu = this.globalArgs.mainNavToggle,
          mainNavList = this.globalArgs.mainNavList;

      toggleMenu.addEventListener('click', function(event){
        mainNavList.classList.toggle('c-main-nav__list--is-visible');
        toggleMenu.classList.toggle('c-main-nav__bars--is-toggled');
      });
      mainNavList.addEventListener('click', function(event){
        mainNavList.classList.toggle('c-main-nav__list--is-visible');
        toggleMenu.classList.toggle('c-main-nav__bars--is-toggled');
      });
    },

    toggleMainNav: function() {
      this.globalArgs.mainNavList.classList.toggle('c-main-nav__list--is-visible');
      this.globalArgs.mainNavToggle.classList.toggle('c-main-nav__bars--is-toggled');
    },

    cardModal: function() {
      var cardsContainer = $('.js-cards');
      cardsContainer.on('click', '.js-toggle-modal', function(event) {
        var cardItem = $(event.currentTarget);
        var button = cardItem.find('button[type=button]');
        var cardContent = cardItem.find('.js-card-content'),
            cardModal = cardItem.find('.js-card-modal-content');

        button.toggleClass('c-card__button-field--is-active');
        cardItem.toggleClass('c-card__item--modal');
        cardItem.toggleClass('c-card__item');
        cardContent.toggleClass('u-fade-out');
        cardModal.toggleClass('u-fade-in');
      });
    },

    smoothScroll: function() {
      var _this = this;
      $('a[href*="#"]:not([href="#"])').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          _this.toggleMainNav();
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 500);
            return false;
          }
        }
      });
    }
  };

  Nexus.initialize();

  // On resize actions
  window.onresize = function(){
    Nexus.tabs();
  }

});
