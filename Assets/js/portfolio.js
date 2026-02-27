document.addEventListener('DOMContentLoaded', () => {
  injectEnhancementStyles()
  setupThemeToggle()
  setupTypingEffect()
  setupRevealAnimations()
})

function injectEnhancementStyles() {
  const style = document.createElement('style')
  style.textContent = `
    .theme-toggle {
      background: #2563eb;
      color: #f8fafc;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .theme-toggle:hover {
      background: #1d4ed8;
    }

    .js-reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }

    .js-reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    body.theme-light nav {
      background-color: #cbd5e1;
      border-bottom-color: #94a3b8;
    }

    body.theme-light nav ul li a {
      color: #0f172a;
    }

    body.theme-light #background {
      background-color: #e2e8f0;
    }

    body.theme-light #container {
      background-color: #f8fafc;
      box-shadow: 0 0 10px 4px rgba(37, 99, 235, 0.32);
    }

    body.theme-light #container h1,
    body.theme-light .sessoes h2,
    body.theme-light #header h1 {
      color: #1d4ed8;
    }

    body.theme-light #container h2,
    body.theme-light #container h3,
    body.theme-light .sessoes p,
    body.theme-light .sessoes h3,
    body.theme-light .sessoes h4,
    body.theme-light #header p,
    body.theme-light #header h3,
    body.theme-light #container p {
      color: #1e293b;
    }

    body.theme-light .sessoes ul li,
    body.theme-light #container ul li {
      color: #334155;
    }

    body.theme-light #container_buttons a,
    body.theme-light .container_buttons a {
      background-color: #2563eb;
      color: #f8fafc;
    }

    body.theme-light #container_buttons a:hover,
    body.theme-light .container_buttons a:hover {
      background-color: #1d4ed8;
    }

    @media (prefers-reduced-motion: reduce) {
      .js-reveal,
      .js-reveal.is-visible {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
  `

  document.head.appendChild(style)
}

function setupThemeToggle() {
  const navList = document.querySelector('nav ul')
  if (!navList) {
    return
  }

  const toggleItem = document.createElement('li')
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'theme-toggle'

  const storedTheme = localStorage.getItem('portfolio-theme')
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
  let currentTheme = storedTheme || (prefersLight ? 'light' : 'dark')

  applyTheme(currentTheme)

  button.textContent = currentTheme === 'light' ? '🌙 Tema escuro' : '☀️ Tema claro'

  button.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light'
    applyTheme(currentTheme)
    localStorage.setItem('portfolio-theme', currentTheme)
    button.textContent = currentTheme === 'light' ? '🌙 Tema escuro' : '☀️ Tema claro'
  })

  toggleItem.appendChild(button)
  navList.appendChild(toggleItem)
}

function applyTheme(theme) {
  document.body.classList.toggle('theme-light', theme === 'light')
}

function setupTypingEffect() {
  const isHomePage = window.location.pathname.toLowerCase().includes('/home/')
  if (!isHomePage) {
    return
  }

  const subtitle = document.querySelector('#container h2')
  if (!subtitle) {
    return
  }

  const phrases = [
    'Estagiário em desenvolvimento React/Node',
    'Criando sistemas para facilitar o dia a dia',
    'Foco em soluções web modernas'
  ]

  let phraseIndex = 0
  let charIndex = 0
  let deleting = false

  function type() {
    const fullText = phrases[phraseIndex]

    subtitle.textContent = deleting
      ? fullText.substring(0, charIndex--)
      : fullText.substring(0, charIndex++)

    let delay = deleting ? 55 : 85

    if (!deleting && charIndex > fullText.length + 1) {
      deleting = true
      delay = 1500
    }

    if (deleting && charIndex < 0) {
      deleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      delay = 350
    }

    setTimeout(type, delay)
  }

  type()
}

function setupRevealAnimations() {
  const targets = document.querySelectorAll('.sessoes, #container_buttons a, #tecnologias img, #header')

  if (!targets.length) {
    return
  }

  targets.forEach((element) => {
    element.classList.add('js-reveal')
  })

  if (!('IntersectionObserver' in window)) {
    targets.forEach((element) => element.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        entry.target.classList.add('is-visible')
        obs.unobserve(entry.target)
      })
    },
    { threshold: 0.15 }
  )

  targets.forEach((element) => observer.observe(element))
}
