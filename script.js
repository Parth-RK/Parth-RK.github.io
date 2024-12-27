// Menu show
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

// Initial animations
gsap.to(".first", 1.5, {delay: .5, top: "-100%", ease: Expo.easeInOut});
gsap.to(".second", 1.5, {delay: .7, top: "-100%", ease: Expo.easeInOut});
gsap.to(".third", 1.5, {delay: .9, top: "-100%", ease: Expo.easeInOut});

// Home section animations
gsap.from('.home__information', {opacity: 0, duration: 3, delay: 2.3, y: 25})
gsap.from('.anime-text', {opacity: 0, duration: 3, delay: 2.3, y: 25, ease:'expo.out', stagger: .3})
gsap.from('.home__social-icon', {opacity: 0, duration: 3, delay: 4, y: 25, ease:'expo.out', stagger: .2})

// Scroll animations
gsap.registerPlugin(ScrollTrigger);

// About section animations
gsap.from('.about__content', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    duration: 1,
    y: 50
});

gsap.from('.about__img', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    duration: 1,
    x: 50,
    delay: 0.3
});

// Projects section animations
gsap.from('.project__card', {
    scrollTrigger: {
        trigger: '.projects',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    duration: 1,
    y: 50,
    stagger: 0.3
});

// Contact section animations
gsap.from('.contact__content', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    duration: 1,
    y: 25
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form
function sendEmail(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Replace with your email service implementation
  window.location.href = `mailto:katkeparth@gmail.com?subject=Contact Form Message&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${email}`;
}