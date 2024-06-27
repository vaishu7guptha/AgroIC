
// mode toggle function
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;

    // Load the saved theme from local storage and apply it
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme === "dark") {
      body.classList.add("dark-theme");
    }

    themeToggle.addEventListener("click", function () {
      body.classList.toggle("dark-theme");

      // Save the current theme in local storage
      if (body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  });

  //adding to cart
  document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const miniCart = document.getElementById('mini-cart');
    const goToTopButton = document.getElementById('go-to-top');
    const dyna=document.getElementById('dyna');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            const image = button.getAttribute('data-image');
            const price = button.getAttribute('data-price');
            addItemToCart(product, image,price);
            updateCart();
            updatePrice();
        });
    });

    function addItemToCart(product, image,price) {
        const existingItem = cartItems.find(item => item.product === product);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ product, image,price, quantity: 1 });
            dyna.innerHTML-=Number(dyna.innerHTML);
        }
    }
    function updatePrice(){
        cartItems.forEach(item=>{
          const itemPrice= Number(item.price);
          console.log(itemPrice);
          console.log(dyna.innerHTML);
          dyna.innerHTML = Number(dyna.innerHTML)+itemPrice;
          console.log(dyna.innerHTML);
        })
    }
    function updateCart() {
        cartItemsList.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.product}">
                <span>${item.product}</span>
                <div class="quantity-controls">
                    <button class="minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="plus">+</button>
                </div>
            `;
            cartItemsList.appendChild(li);
            // dyna.innerHTML='';
            const minusButton = li.querySelector('.minus');
            const plusButton = li.querySelector('.plus');
            minusButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    item.quantity=0;
                    cartItems.splice(cartItems.indexOf(item), 1);
                }
                const itemSub= Number(item.price);
                dyna.innerHTML = Number(dyna.innerHTML)-itemSub;
                updateCart();
            });
            plusButton.addEventListener('click', () => {
                item.quantity += 1;
                const itemAdd= Number(item.price);
                dyna.innerHTML = Number(dyna.innerHTML)+itemAdd;
                updateCart();
            });
        });

        // Dynamically adjust cart height
        const itemHeight = 60;
        const initialHeight = 100;
        const cartHeight = Math.min(cartItems.length * itemHeight + initialHeight, window.innerHeight * 0.7);
        miniCart.style.height = `${cartHeight}px`;
    }

    // Drag and Drop functionality for mini cart
    let isDragging = false;
    let offsetX, offsetY;

    miniCart.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - miniCart.offsetLeft;
        offsetY = e.clientY - miniCart.offsetTop;
        miniCart.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            miniCart.style.left = (e.clientX - offsetX) + 'px';
            miniCart.style.top = (e.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        miniCart.style.cursor = 'move';
    });

    // Go to Top Button functionality
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            goToTopButton.style.display = "block";
        } else {
            goToTopButton.style.display = "none";
        }
    });

    goToTopButton.addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    });
});

//navbar for small screen
let menuIcon = document.querySelectorAll('#menu-icon');
let navbar = document.querySelectorAll('.navbar');
let Contact = document.querySelectorAll('#contact');
let navContact = document.querySelectorAll('#nav--contact');

const password = document.getElementById('password');

menuIcon.forEach(icon => {
  icon.onclick = () => {
    icon.classList.toggle('bx-x');
    navbar.forEach(nav => nav.classList.toggle('active'));
  }
});

// Add an event listener to navbar links
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    // Remove 'active' class from navbar
    document.querySelectorAll('.navbar').forEach(nav => {
      nav.classList.remove('active');
    });
    // Toggle the menu icon
    document.querySelectorAll('#menu-icon').forEach(icon => {
      icon.classList.remove('bx-x'); // Remove the 'bx-x' class to close the hamburger menu
    });
  });
});

// Add an "active" class to the clicked link
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // Remove any existing "active" class from links
    $('a').removeClass('active');

    // Add "active" class to clicked link
    $(this).addClass('active');
    
    // Smooth scroll to target as before
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 900, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { 
            return false;
          } else {
            $target.attr('tabindex','-1'); 
            $target.focus(); 
          };
        });
      }
    }
  });

// When scroll on any section that section's corresponding hyperlink will be active and
// the previous activated hyperlink will be deactivated
$('section[id]').mouseover(function() {
  var sectionId = $(this).attr('id');
  var correspondingLink = $('a[href="#' + sectionId + '"]');
  // Remove active class from all links
  $('a').removeClass('active');
  // Add active class to the corresponding link
  correspondingLink.addClass('active');
});
  
// Set initial active link based on URL hash
$(document).ready(function() {
  var hash = window.location.hash;
  if (hash) {
    $('a[href="' + hash + '"]').addClass('active');
  }
  // Change this line from selecting all headers to selecting one header
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);
});


ScrollReveal({
    reset:true,
    distance:'80px',
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.home-content, .heading',{ origin:'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form',{ origin:'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img',{ origin:'left' });
ScrollReveal().reveal('.home-content p, .about-content',{ origin:'left' });


const typed=new Typed('.multiple-text',{
    strings:['Sow','Learn','Grow' ],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true

});