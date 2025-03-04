'use strict';
import portafolio from './portafolio-elliot.js';

const { profile, experiencias, proyectos, habilidades, contactos } = portafolio;

const documentReady = () => {
  const headerNavMenu = document.getElementById('headerNavMenu');
  const headerNavLinkItems = [...document.querySelectorAll('.header-nav__link-item')];

  const headerScroll = () => {
    const header = document.getElementById('header');
    const headerNavMenuIcon = document.querySelector('.header-nav__menu-icon');
    const headerNavLinks = [...document.querySelectorAll('.header-nav__link')];

    header.classList.toggle('header--scroll', window.scrollY > 0);
    headerNavMenuIcon.classList.toggle('header-nav__menu-icon--scroll', window.scrollY > 0);
    headerNavLinks.forEach((element) => {
      element.classList.toggle('header-nav__link--scroll', window.scrollY > 0);
    });
  };

  const toggleMenu = () => {
    const headerNavLinkList = document.getElementById('headerNavLinkList');
    headerNavLinkList.classList.toggle('header-nav__link-list--left-0');
  };

  window.addEventListener('scroll', headerScroll);
  headerNavMenu.addEventListener('click', toggleMenu);
  headerNavLinkItems.forEach((element) => {
    element.addEventListener('click', toggleMenu);
  });

  const getInfoPerfil = () => {
    const perfilInfoTitle = document.getElementById('perfilInfoTitle');
    const perfilInfoDescription = document.getElementById('perfilInfoDescription');
    const perfilInfoLinkCv = document.getElementById('perfilInfoLinkCv');
    const perfilImage = document.getElementById('perfilImage');

    perfilInfoTitle.innerHTML = `${profile.shortName} ${profile.slogan}`;
    perfilInfoDescription.innerHTML = profile.description;
    perfilInfoLinkCv.href = profile.urlCv;
    perfilImage.src = profile.urlPhoto;
    perfilImage.alt = profile.name;
  }
  getInfoPerfil();

  const getExperiencias = (experiencias) => {
    const experienciaExperiencias = document.getElementById('experienciaExperiencias');
    [...experiencias].reverse().forEach((element) => {
      if (element.main === 1) {
        experienciaExperiencias.innerHTML += `
        <section class="experiencia__experience">
          <h4 class="experiencia__date">${element.period}</h4>
          <h3 class="experiencia__company">${element.company}</h3>
          <h4 class="experiencia__role">${element.position}</h4>
          <ul class="experiencia__activities">
            <li class="experiencia__activity">${element.activities[0]}</li>
            <li class="experiencia__activity">${element.activities[1]}</li>
          </ul>
        </section>
      `;
      }
    });
  };
  getExperiencias(experiencias);


  const getProyectos = (datos) => {
    const proyectosProyectos = document.getElementById('proyectosProyectos');
    const proyectosPrincipales = datos.filter((element) => {
      return (element.main === 1);
    });
    proyectosPrincipales.reverse().forEach((element) => {
      proyectosProyectos.innerHTML += `
        <article class="projects__project">
          <figure class="projects__project-image-container">
            <img src="${element.image}" alt="${element.title}" class="projects__project-image" />
          </figure>
          <div class="projects__project-data">
            <h2 class="projects__project-data-title">${element.title}</h2>
            <h3 class="projects__project-data-core-technology">Core: ${element.mainTechnology}</h3>
            <h4 class="projects__project-data-technologies">Tecnologías: ${element.technologies}</h4>
            <p class="projects__project-data-about">${element.about}</p>
          </div>
          <div class="projects__project-button-container">
            <a href="${element.urlDemo}" class="projects__project-button projects__project-button--bg-gold">Demo</a>
            <a href="${element.urlCode}" class="projects__project-button">Código</a>
          </div>
        </article>
      `;
    });
  };
  getProyectos(proyectos);

  const habilidadesHabilidadesList = document.getElementById('habilidadesHabilidadesList');

  const getHtmlHabilidades = (datos) => {
    const datosPrincipales = datos.filter((element) => {
      return (element.main === 1);
    });
    let html = '';
    datosPrincipales.forEach((element) => {
      html += `
        <li class="habilidades__habilidad">${element.name}</li>
      `;
    });
    return html;
  };

  let habilidadesHtml = getHtmlHabilidades(habilidades);
  habilidadesHabilidadesList.innerHTML = habilidadesHtml;

  const getHtmlContactos = (datos) => {
    let html = '';

    const datosPrincipales = datos.filter((element) => {
      return (element.main === 1);
    });

    datosPrincipales.forEach((element) => {
      html += `
        <li class="footer-nav__link-item">
          <a href="${element.urlContact}" class="footer-nav__link">
            <img src="${element.urlImage}" alt="${element.name}"
              class="footer-nav__link-image" />
          </a>
        </li>
      `;
    });
    return html;
  };

  const renderHtmlFooterNavLinkList = (contactosHtml) => {
    const footerNavLinkList = document.getElementById('footerNavLinkList');
    footerNavLinkList.innerHTML = contactosHtml;
  };

  const contactosHtml = getHtmlContactos(contactos);
  renderHtmlFooterNavLinkList(contactosHtml);

  const renderHtmlFooterNavCredits = () => {
    const footerNavCredits = document.getElementById('footerNavCredits');
    footerNavCredits.innerHTML = `
    🦄Copyright &copy; ${new Date().getFullYear()}
    <a href="${profile.urlLinkedin}" target="_blank" class="footer-nav__credits-author">${profile.shortName}.</a>
    Todos los derechos reservados.🦄
    `;
  };
  renderHtmlFooterNavCredits();

  const headerNavLinks = [...document.querySelectorAll('.header-nav__link')];
  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`.header-nav__link[href="#${id}"]`);
      if (entry.isIntersecting) {
        document.querySelector('.header-nav__link--focus').classList.remove('header-nav__link--focus');
        navLink.classList.add('header-nav__link--focus');
      }
    });
  }, { rootMargin: '-45% 0px -55% 0px' });
  const intersectionObserverAnimations = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('animate__fadeOut');
        entry.target.classList.add('animate__fadeIn');
      }
    });
  }, { rootMargin: '-80% 0px -20% 0px' });

  headerNavLinks.forEach((element) => {
    const hash = element.getAttribute('href');
    const target = document.querySelector(hash);
    if (target) {
      intersectionObserver.observe(target);
      intersectionObserverAnimations.observe(target)
    }
  });
};

document.addEventListener('DOMContentLoaded', documentReady);