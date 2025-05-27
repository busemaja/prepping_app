document.addEventListener('DOMContentLoaded', function () {
  const appBase = document.body.dataset.appBase || ''
  const path = window.location.pathname.replace(appBase, '').replace(/^\/+/, '')

  document.querySelectorAll('.main-navigation a').forEach(link => {
    const href = link.getAttribute('href')

    if (
      path === href ||
      path.startsWith(href + '/') ||
      (href === '' && path === '')
    ) {
      link.classList.add('active')
    }
  })
})
