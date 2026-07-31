/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if(window.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}

/*==================== SWIPER DISCOVER ====================*/
let swiper = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})

/*==================== VIDEO ====================*/
const videoFile = document.getElementById('video-file'),
      videoButton = document.getElementById('video-button'),
      videoIcon = document.getElementById('video-icon')

function playPause(){ 
    if (videoFile.paused){
        // Play video
        videoFile.play()
        // We change the icon
        videoIcon.classList.add('ri-pause-line')
        videoIcon.classList.remove('ri-play-line')
    }
    else {
        // Pause video
        videoFile.pause(); 
        // We change the icon
        videoIcon.classList.remove('ri-pause-line')
        videoIcon.classList.add('ri-play-line')

    }
}
if(videoButton) videoButton.addEventListener('click', playPause)

function finalVideo(){
    // Video ends, icon change
    if (videoIcon) {
        videoIcon.classList.remove('ri-pause-line')
        videoIcon.classList.add('ri-play-line')
    }
}
if(videoFile) {
    videoFile.addEventListener('ended', finalVideo)
    if (!videoFile.paused && videoIcon) {
        videoIcon.classList.add('ri-pause-line')
        videoIcon.classList.remove('ri-play-line')
    }
}


/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(window.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')

        const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if (link) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                link.classList.add('active-link')
            }else{
                link.classList.remove('active-link')
            }
        }
    })
}

/*==================== UNIFIED THROTTLED SCROLL HANDLER ====================*/
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress')
    if (!scrollProgress) return
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = (window.scrollY / totalHeight) * 100
    scrollProgress.style.width = `${progress}%`
}

function parallaxHero() {
    const heroImg = document.querySelector('.home__img')
    if (heroImg && window.scrollY <= window.innerHeight) {
        heroImg.style.transform = `translateY(${window.scrollY * 0.25}px)`
    }
}

let isScrolling = false
function handleScroll() {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            scrollHeader()
            scrollUp()
            scrollActive()
            updateScrollProgress()
            parallaxHero()
            isScrolling = false
        })
        isScrolling = true
    }
}
window.addEventListener('scroll', handleScroll, { passive: true })

/*==================== STATS COUNTER ANIMATION ====================*/
const counterElements = document.querySelectorAll('.experience__number[data-target]')

if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target
                const target = parseInt(el.getAttribute('data-target'), 10)
                const suffix = el.getAttribute('data-suffix') || ''
                let current = 0
                const stepCount = 50
                const increment = Math.ceil(target / stepCount) || 1
                const timer = setInterval(() => {
                    current += increment
                    if (current >= target) {
                        current = target
                        clearInterval(timer)
                    }
                    el.innerText = current + suffix
                }, 25)

                observer.unobserve(el)
            }
        })
    }, { threshold: 0.4 })

    counterElements.forEach(el => counterObserver.observe(el))
}

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '35px',
    duration: 1200,
    scale: 0.96,
    opacity: 0,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    viewFactor: 0.2,
    // reset: false
})

sr.reveal(`.home__data, .home__social-link, .home__info,
           .discover__container,
           .experience__data, .experience__overlay,
           .place__card,
           .sponsor__content,
           .footer__data, .footer__rights`,{
    origin: 'top',
    interval: 90,
})

sr.reveal(`.about__data, 
           .video__description,
           .subscribe__description`,{
    origin: 'left',
    interval: 90,
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .subscribe__form`,{
    origin: 'right',
    interval: 90,
})

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})