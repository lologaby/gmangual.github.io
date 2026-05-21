const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const typewriterTarget = document.querySelector("[data-typewriter]");
const canvas = document.querySelector("#network-canvas");

const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuButton?.addEventListener("click", () => {
    const isOpen = mobileNav?.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        menuButton?.setAttribute("aria-expanded", "false");
    });
});

const typeText = async (text, element) => {
    if (!element) return;
    element.textContent = "";

    for (let i = 0; i < text.length; i += 1) {
        element.textContent += text[i];
        await new Promise((resolve) => setTimeout(resolve, 72));
    }
};

typeText("whoami", typewriterTarget);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

if (canvas) {
    const ctx = canvas.getContext("2d");
    const pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let particles = [];

    const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        const count = Math.max(26, Math.min(74, Math.floor(width / 24)));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.28,
            vy: (Math.random() - 0.5) * 0.28,
            r: Math.random() * 1.4 + 0.6
        }));
    };

    const draw = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 1;

        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < -20) particle.x = width + 20;
            if (particle.x > width + 20) particle.x = -20;
            if (particle.y < -20) particle.y = height + 20;
            if (particle.y > height + 20) particle.y = -20;

            for (let j = index + 1; j < particles.length; j += 1) {
                const other = particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.hypot(dx, dy);

                if (distance < 120) {
                    ctx.strokeStyle = `rgba(49, 232, 255, ${0.12 * (1 - distance / 120)})`;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            }

            if (pointer.active) {
                const distance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
                if (distance < 170) {
                    ctx.strokeStyle = `rgba(124, 255, 67, ${0.18 * (1 - distance / 170)})`;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(pointer.x, pointer.y);
                    ctx.stroke();
                }
            }

            ctx.fillStyle = "rgba(124, 255, 67, 0.62)";
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", (event) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.active = true;
    }, { passive: true });
    window.addEventListener("pointerleave", () => {
        pointer.active = false;
    }, { passive: true });

    resize();
    draw();
}
