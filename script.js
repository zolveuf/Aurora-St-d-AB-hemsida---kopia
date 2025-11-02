const toggle = document.querySelector('[data-nav-toggle]');
const menu = document.getElementById('primary-nav');
const header = document.querySelector('.site-header');

if (toggle && menu) {
	toggle.addEventListener('click', () => {
		const expanded = toggle.getAttribute('aria-expanded') === 'true';
		toggle.setAttribute('aria-expanded', String(!expanded));
		menu.classList.toggle('is-open');
		document.documentElement.classList.toggle('no-scroll', menu.classList.contains('is-open'));
	});

	// Close on Escape
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && menu.classList.contains('is-open')) {
			toggle.setAttribute('aria-expanded', 'false');
			menu.classList.remove('is-open');
			document.documentElement.classList.remove('no-scroll');
		}
	});

	// Close menu when a link is clicked (mobile)
	menu.addEventListener('click', (e) => {
		const target = e.target;
		if (target instanceof Element && target.closest('a')) {
			toggle.setAttribute('aria-expanded', 'false');
			menu.classList.remove('is-open');
			document.documentElement.classList.remove('no-scroll');
		}
	});
}

// Header shadow on scroll
const onScroll = () => {
	if (!header) return;
	if (window.scrollY > 4) {
		header.classList.add('is-scrolled');
	} else {
		header.classList.remove('is-scrolled');
	}
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


