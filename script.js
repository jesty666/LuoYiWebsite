document.documentElement.classList.add('js-motion')

const header = document.querySelector('[data-header]')
const menuToggle = document.querySelector('[data-menu-toggle]')
const nav = document.querySelector('.main-nav')
const friendsMenu = document.querySelector('.friends-menu')
const friendsToggle = document.querySelector('[data-friends-toggle]')
const revealItems = document.querySelectorAll('.reveal')

function syncHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 24)
}

window.addEventListener('scroll', syncHeader, { passive: true })
syncHeader()

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open')
  menuToggle.setAttribute('aria-expanded', String(isOpen))
}
)

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open')
  menuToggle?.setAttribute('aria-expanded', 'false')
}))

friendsToggle?.addEventListener('click', (event) => {
  event.stopPropagation()
  const isOpen = friendsMenu.classList.toggle('is-open')
  friendsToggle.setAttribute('aria-expanded', String(isOpen))
})

document.addEventListener('click', () => {
  friendsMenu?.classList.remove('is-open')
  friendsToggle?.setAttribute('aria-expanded', 'false')
})

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return
  friendsMenu?.classList.remove('is-open')
  friendsToggle?.setAttribute('aria-expanded', 'false')
})

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    entry.target.classList.add('is-visible')
    observer.unobserve(entry.target)
  })
}, { threshold: .12 })

revealItems.forEach((item) => revealObserver.observe(item))

const tabs = document.querySelectorAll('[data-tab]')
const panels = document.querySelectorAll('[data-panel]')
const tabImage = document.querySelector('[data-tab-image]')
const tabStatus = document.querySelector('[data-tab-status]')
const tabContent = {
  battle: {
    image: '/assets/luoyi-screens/tools-overview.jpg',
    alt: '洛弈工具页面，展示玩家对战和常驻任务入口',
    status: 'TEAM / READY'
  },
  pet: {
    image: '/assets/luoyi-screens/pet-storage.jpg',
    alt: '洛弈宠物仓库页面，展示宠物资料',
    status: 'PET / ORGANIZED'
  },
  daily: {
    image: '/assets/luoyi-screens/daily-tools.jpg',
    alt: '洛弈每日工具页面，展示日常任务入口',
    status: 'DAILY / SYNCED'
  }
}

tabs.forEach((tab) => tab.addEventListener('click', () => {
  const target = tab.dataset.tab
  tabs.forEach((item) => {
    const active = item === tab
    item.classList.toggle('is-active', active)
    item.setAttribute('aria-selected', String(active))
  })
  panels.forEach((panel) => { panel.hidden = panel.dataset.panel !== target })
  const content = tabContent[target]
  if (!content || !tabImage) return
  tabImage.parentElement?.classList.add('is-changing')
  window.setTimeout(() => {
    tabImage.src = content.image
    tabImage.alt = content.alt
    tabStatus.textContent = content.status
    tabImage.parentElement?.classList.remove('is-changing')
  }, 160)
}))
