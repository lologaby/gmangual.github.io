document.addEventListener('DOMContentLoaded', function() {
    // --- Animación de Revelado al Hacer Scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    revealElements.forEach(el => observer.observe(el));

    // --- Datos de las Herramientas ---
    const tools = [
        { name: 'Jellyfin', logo: 'https://cdn.worldvectorlogo.com/logos/jellyfin.svg', description: 'A Free Software Media System that puts you in control of managing and streaming your media.', url: 'https://jellyfin.org/' },
        { name: 'Overseerr', logo: 'https://raw.githubusercontent.com/sct/overseerr/develop/public/os_logo_filled.svg', description: 'A request management and media discovery tool for your home media server.', url: 'https://overseerr.dev/' },
        { name: 'Radarr', logo: 'https://radarr.video/img/logo.svg', description: 'A movie collection manager for Usenet and BitTorrent users.', url: 'https://radarr.video/' },
        { name: 'Sonarr', logo: 'https://sonarr.tv/img/logo.svg', description: 'A PVR for Usenet and BitTorrent users that can monitor multiple RSS feeds for new episodes of your favorite shows.', url: 'https://sonarr.tv/' },
        { name: 'Lidarr', logo: 'https://lidarr.audio/img/logo.svg', description: 'A music collection manager for Usenet and BitTorrent users.', url: 'https://lidarr.audio/' },
        { name: 'Prowlarr', logo: 'https://prowlarr.com/img/logo.svg', description: 'An indexer manager/proxy built on the popular arr .net/reactjs base stack to integrate with your various PVR apps.', url: 'https://prowlarr.com/' },
        { name: 'Jackett', logo: 'https://raw.githubusercontent.com/Jackett/Jackett/master/src/Jackett.Server/content/logo.svg', description: 'API Support for your favorite private trackers.', url: 'https://github.com/Jackett/Jackett' },
        { name: 'ErsatzTV', logo: 'https://raw.githubusercontent.com/ErsatzTV/ErsatzTV/develop/web/src/assets/logo.svg', description: 'Software for configuring and streaming custom live channels using your own media.', url: 'https://ersatztv.org/' },
        { name: 'DizqueTV', logo: 'https://raw.githubusercontent.com/vexorian/dizquetv/main/web/src/assets/images/dizquetv.png', description: 'Create live TV channels from your Plex Media Server content.', url: 'https://github.com/vexorian/dizquetv' }
    ];

    const slider = document.getElementById('tools-slider');
    tools.forEach(tool => {
        const toolElement = document.createElement('div');
        toolElement.className = 'tool-item flex-shrink-0 flex flex-col items-center justify-center space-y-3 p-4 bg-black rounded-2xl w-32 h-32 md:w-40 md:h-40 transition-transform hover:scale-105 cursor-pointer';
        toolElement.dataset.name = tool.name;
        toolElement.dataset.description = tool.description;
        toolElement.dataset.logo = tool.logo;
        toolElement.dataset.url = tool.url;
        
        const img = document.createElement('img');
        img.src = tool.logo;
        img.alt = tool.name;
        img.className = 'h-12 w-12 md:h-16 md:w-16 object-contain pointer-events-none';
        img.onerror = function() { this.style.display = 'none'; this.nextSibling.style.display = 'flex'; };

        const placeholder = document.createElement('div');
        placeholder.className = 'h-12 w-12 md:h-16 md:w-16 bg-gray-700 rounded-lg flex items-center justify-center pointer-events-none hidden';
        placeholder.innerHTML = `<span class="text-white text-xs font-bold">${tool.name}</span>`;
        
        const name = document.createElement('p');
        name.textContent = tool.name;
        name.className = 'text-white text-sm md:text-base font-medium text-center pointer-events-none';

        toolElement.appendChild(img);
        toolElement.appendChild(placeholder);
        toolElement.appendChild(name);
        slider.appendChild(toolElement);
    });

    // --- Lógica de Interacción del Carrusel ---
    let autoScrollInterval;
    let isPaused = false;

    const startAutoScroll = () => {
        stopAutoScroll(); // Limpiar cualquier intervalo existente
        autoScrollInterval = setInterval(() => {
            if (!isPaused) {
                slider.scrollLeft += 0.5;
                if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
                    slider.scrollLeft = 0;
                }
            }
        }, 25); // Ajustar velocidad aquí
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };
    
    slider.addEventListener('mouseenter', () => isPaused = true);
    slider.addEventListener('mouseleave', () => isPaused = false);
    slider.addEventListener('wheel', (e) => {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
        isPaused = true; // Pausar en scroll manual
    });
    
    startAutoScroll();

    // --- Lógica del Modal ---
    const modal = document.getElementById('tool-modal');
    const modalLogo = document.getElementById('modal-tool-logo');
    const modalName = document.getElementById('modal-tool-name');
    const modalDescription = document.getElementById('modal-tool-description');
    const modalLink = document.getElementById('modal-tool-link');
    const closeBtn = document.getElementById('modal-close-btn');

    const openModal = (data) => {
        modalName.textContent = data.name;
        modalDescription.textContent = data.description;
        modalLogo.src = data.logo;
        modalLink.href = data.url;
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('visible');
        document.body.style.overflow = '';
    };

    slider.addEventListener('click', (e) => {
        const toolItem = e.target.closest('.tool-item');
        if (toolItem) {
            openModal(toolItem.dataset);
        }
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});
