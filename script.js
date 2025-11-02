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

// Accordion functionality
const accordionButtons = document.querySelectorAll('.accordion__button');
accordionButtons.forEach(button => {
	button.addEventListener('click', () => {
		const expanded = button.getAttribute('aria-expanded') === 'true';
		button.setAttribute('aria-expanded', String(!expanded));
	});
});

// Contact form - update subject based on topic selection
const subjectSelect = document.getElementById('subject-select');
const contactSubjectField = document.querySelector('#contact-form input[name="subject"]');
if (subjectSelect && contactSubjectField) {
	subjectSelect.addEventListener('change', () => {
		const topic = subjectSelect.value;
		if (topic) {
			contactSubjectField.value = `Kontakt från Aurora Städ hemsida - ${topic}`;
		} else {
			contactSubjectField.value = 'Kontakt från Aurora Städ hemsida';
		}
	});
}

// Booking form - update subject based on service selection
const serviceSelect = document.getElementById('service-select');
const bookingSubjectField = document.querySelector('#booking-form input[name="subject"]');
if (serviceSelect && bookingSubjectField) {
	serviceSelect.addEventListener('change', () => {
		const service = serviceSelect.value;
		if (service) {
			bookingSubjectField.value = `Bokning från Aurora Städ hemsida - ${service}`;
		} else {
			bookingSubjectField.value = 'Bokning från Aurora Städ hemsida';
		}
	});
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const href = this.getAttribute('href');
		if (href !== '#' && href.length > 1) {
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				const headerOffset = 100;
				const elementPosition = target.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		}
	});
});

// Form submission handling with feedback
function handleFormSubmission(formId, submitButtonId, messageId) {
	const form = document.getElementById(formId);
	const submitButton = document.getElementById(submitButtonId);
	const messageDiv = document.getElementById(messageId);
	
	if (!form || !submitButton || !messageDiv) return;
	
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		
		// Hide previous messages
		messageDiv.style.display = 'none';
		messageDiv.className = 'form-message';
		
		// Show loading state
		submitButton.classList.add('is-loading');
		submitButton.disabled = true;
		
		try {
			const formData = new FormData(form);
			const response = await fetch(form.action, {
				method: 'POST',
				body: formData
			});
			
			const data = await response.json();
			
			if (data.success) {
				// Success message
				messageDiv.textContent = 'Tack för ditt meddelande! Vi återkommer så snart som möjligt.';
				messageDiv.classList.add('form-message--success');
				messageDiv.style.display = 'block';
				
				// Reset form
				form.reset();
				
				// Scroll to message
				messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			} else {
				// Error message
				messageDiv.textContent = 'Ett fel uppstod när meddelandet skickades. Vänligen försök igen eller kontakta oss direkt via telefon.';
				messageDiv.classList.add('form-message--error');
				messageDiv.style.display = 'block';
				
				// Scroll to message
				messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			}
		} catch (error) {
			// Network or other error
			messageDiv.textContent = 'Ett fel uppstod när meddelandet skickades. Vänligen kontrollera din internetanslutning och försök igen.';
			messageDiv.classList.add('form-message--error');
			messageDiv.style.display = 'block';
			
			// Scroll to message
			messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		} finally {
			// Remove loading state
			submitButton.classList.remove('is-loading');
			submitButton.disabled = false;
		}
	});
}

// Initialize form handlers
handleFormSubmission('contact-form', 'contact-submit', 'contact-message');
handleFormSubmission('booking-form', 'booking-submit', 'booking-message');


