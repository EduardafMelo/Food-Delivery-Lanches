$(document).ready(function() {

    // MENU MOBILE
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-bars fa-x');
    });

    $('#mobile_menu a').on('click', function () {
        $('#mobile_menu').removeClass('active');
        $('#mobile_btn').find('i').addClass('fa-bars').removeClass('fa-x');
    });

    // SCROLL NAV ACTIVE (só para páginas com âncoras)
    const sections = $('section');
    const navItems = $('.nav-item');

    const hasAnchorNav = navItems.find('a[href^="#"]').length > 0;

    if (hasAnchorNav) {
        $(window).on('scroll', function () {

            const header = $('header');
            const headerHeight = header.outerHeight();
            const scrollPosition = $(window).scrollTop();

            let activeSectionId = sections.first().attr('id');

            if (scrollPosition <= 0) {
                header.css('box-shadow', 'none');
            } else {
                header.css('box-shadow', '0 10px 30px rgba(0, 0, 0, 0.08)');
            }

            sections.each(function() {
                const section = $(this);
                const sectionTop = section.offset().top - headerHeight - 20;
                const sectionBottom = sectionTop + section.outerHeight();

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    activeSectionId = section.attr('id');
                    return false;
                }
            });

            const match = navItems.filter(function () {
                return $(this).find('a').attr('href') === `#${activeSectionId}`;
            });

            if (match.length) {
                navItems.removeClass('active');
                match.addClass('active');
            }
        });
    } else {
        const path = window.location.pathname.replaceAll('\\', '/');
        const currentFile = path.split('/').pop() || 'index.html';

        navItems.removeClass('active');
        navItems
            .filter(function () {
                const href = $(this).find('a').attr('href');
                return href === currentFile;
            })
            .addClass('active');
    }

    // ====== ABAS DO CARDÁPIO (CORRIGIDO) ======
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-items .dish');

    menuTabs.forEach(tab => {

        tab.addEventListener('click', () => {

            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            menuItems.forEach(item => {

                const itemCategory = item.getAttribute('data-category');

                if (category === 'all' || category === itemCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }

            });

        });

    });

    // FORMULÁRIO DE CONTATO
    const contactForm = $('#contact_form');
    const contactNotice = $('#contact_notice');

    if (contactForm.length) {
        contactForm.on('submit', function (e) {
            e.preventDefault();

            const name = $('#contact_name').val()?.toString().trim() || '';
            const phone = $('#contact_phone').val()?.toString().trim() || '';
            const message = $('#contact_message').val()?.toString().trim() || '';

            if (!name || !message) {
                contactNotice
                    .html('<strong>Preencha os campos obrigatórios.</strong> Nome e mensagem são necessários para enviar.')
                    .show();
                return;
            }

            const subject = `Contato - Food (${name})`;
            const body = [
                `Nome: ${name}`,
                phone ? `Telefone: ${phone}` : 'Telefone: -',
                '',
                message
            ].join('\n');

            contactNotice
                .html('<strong>Pronto.</strong> Abrindo seu e-mail para enviar a mensagem.')
                .show();

            window.location.href = `mailto:contato@food.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }

    // ANIMAÇÕES
    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.step', {
        origin: 'bottom',
        duration: 1200,
        distance: '16%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    });

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    });

});
