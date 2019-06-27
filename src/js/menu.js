const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
  //Toggle Nav
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

  //Animate Links
    navLinks.forEach((links,index)=>{
      if(links.style.animation){
        links.style.animation = '';
      }else{
        links.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .5}s`;
      }
    });
    //Burger Animtion
    burger.classList.toggle('switch');
  });
}
navSlide();