/* Fiilar Help Center — mobile nav toggle, sidebar scrollspy, reveal-on-scroll */
(function () {
  // Mobile nav
  var nav = document.querySelector('aside.nav')
  var toggle = document.querySelector('.topbar button')
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open')
      toggle.textContent = open ? 'Close' : 'Menu'
    })
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open')
        toggle.textContent = 'Menu'
      }
    })
  }

  // Scrollspy — highlight the sidebar link for the section in view
  var sections = Array.prototype.slice.call(document.querySelectorAll('section.sec[id]'))
  var links = {}
  sections.forEach(function (sec) {
    var link = document.querySelector('aside.nav a[href$="#' + sec.id + '"]')
    if (link) links[sec.id] = link
  })
  if (sections.length && 'IntersectionObserver' in window) {
    var current = null
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (current) current.classList.remove('active')
            current = links[entry.target.id] || null
            if (current) current.classList.add('active')
          }
        })
      },
      { rootMargin: '-15% 0px -70% 0px' },
    )
    sections.forEach(function (sec) {
      spy.observe(sec)
    })
  }

  // Reveal on scroll
  var revealables = document.querySelectorAll('.reveal')
  if (revealables.length && 'IntersectionObserver' in window) {
    var reveal = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            reveal.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    revealables.forEach(function (el) {
      reveal.observe(el)
    })
  } else {
    revealables.forEach(function (el) {
      el.classList.add('in')
    })
  }
})()
