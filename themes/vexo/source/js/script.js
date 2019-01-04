(function ($) {
  var app = $('.app-body')
  var header = $('.header')
  var banner = document.getElementById('article-banner') || false
  var about = document.getElementById('about-banner') || false
  var top = $('.scroll-top')
  var catalog = $('.catalog-container .toc-main')
  var isOpen = false

  $(document).ready(function () {
    NProgress.start()
    $('#nprogress .bar').css({
      'background': '#42b983'
    })
    $('#nprogress .spinner').hide()

    var fade = {
      transform: 'translateY(0)',
      opacity: 1
    }
    if (banner) {
      app.css('transition-delay', '0.15s')
      $('#article-banner').children().css(fade)
    }
    if (about) {
      $('.author').children().css(fade)
    }
    app.css(fade)
  })

  window.onload = function () {
    setTimeout(function () {
      NProgress.done()
    }, 200)
  }

  $('.menu').on('click', function () {
    if (!header.hasClass('fixed-header') || isOpen) {
      header.toggleClass('fixed-header')
      isOpen = !isOpen
    }
    $('.menu-mask').toggleClass('open')
  })

  $('#tag-cloud a').on('click', function () {
    var list = $('.tag-list')
    var name = $(this).data('name')
    var maoH = list.find('#' + name).offset().top

    $('html,body').animate({
      scrollTop: maoH - header.height()
    }, 500)
  })

  $('.reward-btn').on('click', function () {
    $('.money-code').fadeToggle()
  })

  $('.arrow-down').on('click', function () {
    $('html, body').animate({
      scrollTop: banner.offsetHeight - header.height()
    }, 500)
  })

  $('.toc-nav a').on('click', function (e) {
    e.preventDefault()
    var catalogTarget = e.currentTarget
    var scrollTarget = $(catalogTarget.getAttribute('href'))
    var top = scrollTarget.offset().top
    if (top > 0) {
      $('html,body').animate({
        scrollTop: top - 65
      }, 500)
    }
  })

  top.on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 600)
  })

  document.addEventListener('scroll', function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    var headerH = header.height()
    if (banner) {
      if (scrollTop > headerH) {
        header.addClass('fixed-header')
      } else if (scrollTop === 0) {
        header.removeClass('fixed-header')
      }
    }
    if (scrollTop > 100) {
      top.addClass('opacity')
    } else {
      top.removeClass('opacity')
    }
    if (scrollTop > 190) {
      catalog.addClass('fixed-toc')
    } else {
      catalog.removeClass('fixed-toc')
    }
  })
})(jQuery)

console.log(
  "\n%c\u1d21\u1d07\u0299 \u0493\u0280\u1d0f\u0274\u1d1b-\u1d07\u0274\u1d05 \u1d05\u1d07\u1d20\u1d07\u029f\u1d0f\u1d18\u1d07\u0280 \u25c8 \u1d05\u1d07\u1d20\u1d07\u029f\u1d0f\u1d18\u1d07\u1d05 \u0299\u028f \u029f\u1d07\u026a\u1d00 \u029cs\u1d1c %c\n%c %c \u273f \u273f \u1d04\u1d0f\u1d05\u026a\u0274\u0262\u1d21\u026a\u0493\u1d07.\u1d04\u1d0f\u1d0d *\uff65\uff9f\u2727 %c \u25b6 https://codingwife.com/ \u2764 ",
  "padding:10px 0;",
  "background: #577baa; padding:5px 0;",
  "background: #577baa; padding:5px 0;",
  "color: #cddded; background: #151b47; padding:5px 0;margin-bottom:20px;",
  "color:#FFF;background: #577baa; padding:5px 0;"
);