let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');
menu.onclick =()=>{
    menu.classList.toggle('fa-times');
   navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll =()=>{
    menu.classList.remove('fa-times');
   navbar.classList.remove('active');

   section.forEach(sec=>{
       let top = window.scrollY;
       let height = sec.offsetHeight;
       let offset = sec.offsetTop - 150;
       let id= sec.getAttribute('id');

       if(top=> offset && top <offset+ height){
        navLinks.forEach(links =>{
            links.classList.remove('active');
            let navLinks = document.querySelectorAll('header .navbar a[href*='+id+']').classList.add('active');

        });
       };


   });
}

document.querySelector('#search-icon').onclick =() =>{
    document.querySelector('#search').classList.toggle('active');
}
document.querySelector('#close').onclick =() =>{
    document.querySelector('#search').classList.remove('active');
}
var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
   loop:true,
  });

  function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');

  }
  function fadeOut(){
    setInterval(loader, 3000);
  }
  window.onload=fadeOut;



  // review start
  var swiper = new Swiper(".review-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const loaderContainer = document.getElementById("loader-container");
    
    // Function to show loader
    function showLoader() {
      loaderContainer.style.display = "flex";
    }
  
    // Function to hide loader
    function hideLoader() {
      loaderContainer.style.display = "none";
    }
  
    // Simulating loading process (setTimeout)
    showLoader();
    setTimeout(function () {
      hideLoader();
    }, 5000); // Adjust the time as needed
  });