// --- Animación 3D de Fondo ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(15);

const mainGroup = new THREE.Group();
scene.add(mainGroup);

const geometries = [
    new THREE.IcosahedronGeometry(3.5, 0),
    new THREE.DodecahedronGeometry(3.5, 0),
    new THREE.OctahedronGeometry(3.5, 0)
];
let currentGeomIndex = 0;

const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.15 });
const shape = new THREE.Mesh(geometries[currentGeomIndex], material);
mainGroup.add(shape);

const dotColors = ['#00ff99', '#00ffff', '#ff9900', '#ff00ff', '#ffff00', '#99ff00', '#ff6666', '#6666ff'];
const vertexMarkersGroup = new THREE.Group();
mainGroup.add(vertexMarkersGroup);

const logoGroup = new THREE.Group();
mainGroup.add(logoGroup);

const textureLoader = new THREE.TextureLoader();
// --- LISTA DE LOGOS ACTUALIZADA para usar archivos locales ---
const skillLogos = [
    'assets/bash.svg',
    'assets/docker.svg',
    'assets/home-assistant.svg',
    'assets/mikrotik.svg',
    'assets/proxmox.png',
    'assets/red-hat.svg',
    'assets/solarwinds.svg',
    'assets/ubuntu.svg',
    'assets/vmware.svg',
    'assets/windows.svg',
    'assets/zabbix.svg',
];

function createVertexDot(position, color) {
    const dotGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: color });
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.copy(position);
    vertexMarkersGroup.add(dot);
}

function createLogoPlane(url, position) {
    textureLoader.load(url, (texture) => {
        const logoMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.5 });
        const logoGeometry = new THREE.PlaneGeometry(0.9, 0.9);
        const logoPlane = new THREE.Mesh(logoGeometry, logoMaterial);
        logoPlane.position.copy(position);
        logoGroup.add(logoPlane);
    }, undefined, () => {
        console.error(`Error al cargar la imagen: ${url}. Asegúrate de que el archivo exista en la carpeta /assets.`);
    });
}

function updateMarkers() {
    // Clear existing logos and markers
    while(vertexMarkersGroup.children.length > 0){ 
        vertexMarkersGroup.remove(vertexMarkersGroup.children[0]); 
    }
    while(logoGroup.children.length > 0){ 
        logoGroup.remove(logoGroup.children[0]); 
    }

    const currentGeometry = geometries[currentGeomIndex];
    const vertices = currentGeometry.attributes.position.array;
    
    // --- CORRECTED: Robust de-duplication logic ---
    const uniqueVerticesMap = new Map();
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i+1];
        const z = vertices[i+2];
        // Create a key by rounding coordinates to avoid floating point inaccuracies
        const key = `${x.toFixed(4)},${y.toFixed(4)},${z.toFixed(4)}`;
        
        if (!uniqueVerticesMap.has(key)) {
            uniqueVerticesMap.set(key, new THREE.Vector3(x, y, z));
        }
    }
    const uniqueVertices = Array.from(uniqueVerticesMap.values());
    // --- END: Correction ---

    uniqueVertices.forEach((vertex, index) => {
        const color = dotColors[index % dotColors.length];
        createVertexDot(vertex, color);
        
        // Place logos on the vertices
        if (index < skillLogos.length) {
            const logoUrl = skillLogos[index];
            const position = vertex.clone().multiplyScalar(1.15);
            createLogoPlane(logoUrl, position);
        }
    });
}

updateMarkers();

let lastKnownScrollPosition = 0;
let ticking = false;

function moveShape(scrollPos) {
    mainGroup.rotation.y = scrollPos * 0.0003;
    mainGroup.rotation.x = scrollPos * 0.0003;

    const scrollPercent = (scrollPos / (document.body.scrollHeight - window.innerHeight)) * 100;
    let newGeomIndex = 0;
    if (scrollPercent > 66) {
        newGeomIndex = 2;
    } else if (scrollPercent > 33) {
        newGeomIndex = 1;
    }
    
    if (newGeomIndex !== currentGeomIndex) {
        currentGeomIndex = newGeomIndex;
        shape.geometry.dispose();
        shape.geometry = geometries[currentGeomIndex];
        updateMarkers();
    }
}

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    mainGroup.rotation.y += 0.0005;
    logoGroup.children.forEach(logo => {
        logo.lookAt(camera.position);
    });
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Scripts de la Página ---
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lógica de Sonido para Animación de Texto ---
    let isSoundEnabled = true; // Sonido activado por defecto
    let audioStarted = false;
    
    // Crear un sintetizador para el efecto de "decode"
    const textSynth = new Tone.MembraneSynth({
        pitchDecay: 0.01,
        octaves: 6,
        oscillator: { type: 'sine' },
        envelope: {
            attack: 0.001,
            decay: 0.2,
            sustain: 0.01,
            release: 0.2,
            attackCurve: 'exponential'
        }
    }).toDestination();

    const soundBtn = document.getElementById('sound-toggle-btn');
    const iconSoundOn = document.getElementById('icon-sound-on');
    const iconSoundOff = document.getElementById('icon-sound-off');

    // Función para iniciar el audio en la primera interacción del usuario
    const startAudio = async () => {
        if (!audioStarted) {
            await Tone.start();
            audioStarted = true;
            console.log('Audio context started');
        }
    };
    // Añadir listener para la primera interacción en cualquier parte
    document.body.addEventListener('click', startAudio, { once: true });
    document.body.addEventListener('scroll', startAudio, { once: true });


    const updateSoundIcons = () => {
        if (iconSoundOn && iconSoundOff) {
            iconSoundOn.classList.toggle('hidden', !isSoundEnabled);
            iconSoundOff.classList.toggle('hidden', isSoundEnabled);
        }
    };
    
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            isSoundEnabled = !isSoundEnabled;
            updateSoundIcons();
        });
    }
    
    // Actualizar iconos al cargar la página
    updateSoundIcons();
    
    // --- Lógica del Menú Móvil ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Lógica de la Terminal ---
    const terminalCommand = document.getElementById('terminal-command');
    const commandText = "$~: whoami";
    const outputText = "Alex G. Berrios Mangual";
    const cursor = document.getElementById('cursor');

    function typeWriter(text, element, index, callback) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            // Reproducir sonido de escritura
            if (isSoundEnabled && audioStarted) {
                textSynth.triggerAttackRelease("C2", "32n", Tone.now());
            }
            setTimeout(() => typeWriter(text, element, index + 1, callback), 80);
        } else if (callback) {
            callback();
        }
    }

    function startTerminal() {
        if(!terminalCommand || !cursor) return;
        cursor.style.animation = 'none';
        typeWriter(commandText, terminalCommand, 0, () => {
            setTimeout(() => {
                terminalCommand.innerHTML += '<br>';
                typeWriter(outputText, terminalCommand, 0, () => {
                   cursor.style.animation = 'blink 1s step-end infinite';
                });
            }, 500);
        });
    }

    startTerminal();

    // --- Lógica de Revelado al Hacer Scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));

    // --- Animación de la Línea de Tiempo (CON SONIDO) ---
    const typeText = (element) => {
        return new Promise(resolve => {
            const text = element.dataset.text;
            let i = 0;
            element.innerHTML = '';
            element.classList.add('typing');
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    if (isSoundEnabled && audioStarted) {
                        textSynth.triggerAttackRelease("C1", "32n", Tone.now());
                    }
                } else {
                    clearInterval(typingInterval);
                    element.classList.remove('typing');
                    resolve();
                }
            }, 50); // Velocidad de escritura
        });
    };

    const decodeText = (element) => {
        return new Promise(resolve => {
            const originalText = element.dataset.text;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:",./<>?';
            let i = 0;
            element.classList.add('typing');
            const decodingInterval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => (index < i ? originalText[index] : chars[Math.floor(Math.random() * chars.length)]))
                    .join('');

                if (isSoundEnabled && audioStarted) {
                    const note = ['C1', 'E1', 'G1'][Math.floor(Math.random() * 3)];
                    textSynth.triggerAttackRelease(note, "32n", Tone.now());
                }

                if (i >= originalText.length) {
                    clearInterval(decodingInterval);
                    element.textContent = originalText; // Garantiza el texto final
                    element.classList.remove('typing');
                    resolve();
                }
                i += originalText.length / 50; // Ajusta la velocidad
            }, 40);
        });
    };

    const timelineObserver = new IntersectionObserver(async (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                timelineObserver.unobserve(entry.target); // Prevenir re-animación
                entry.target.classList.add('visible');
                const allTextElements = Array.from(entry.target.querySelectorAll('.timeline-text'));
                
                for (const el of allTextElements) {
                    if (el.dataset.effect === 'decode') {
                        await decodeText(el);
                    } else {
                        await typeText(el);
                    }
                    await new Promise(res => setTimeout(res, 50)); // Pequeña pausa
                }
            }
        }
    }, { threshold: 0.6 });

    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });
    
    // --- Llenar Habilidades ---
    const skills = [
         { name: 'Ubuntu', logo: 'https://cdn.worldvectorlogo.com/logos/ubuntu-4.svg', description: 'Proficient in deploying and managing Ubuntu servers for a variety of services in both professional and home lab environments.' },
        { name: 'Red Hat', logo: 'https://cdn.worldvectorlogo.com/logos/red-hat-1.svg', description: 'Experienced with Red Hat Enterprise Linux for building stable, secure, and high-performance server infrastructure.' },
        { name: 'Bash', logo: 'https://cdn.worldvectorlogo.com/logos/bash-1.svg', description: 'Skilled in writing Bash scripts for automating system administration tasks, managing files, and streamlining workflows.' },
        { name: 'Android', logo: 'https://cdn.worldvectorlogo.com/logos/android-logomark.svg', description: 'Familiar with the Android ecosystem, including device management and app integration for smart home control.' },
        { name: 'macOS', logo: 'https://cdn.worldvectorlogo.com/logos/macos.svg', description: 'Comfortable working in macOS environments for development, daily use, and system integration.' },
        { name: 'Home Assistant', logo: 'https://cdn.worldvectorlogo.com/logos/home-assistant.svg', description: 'My experience evolved from a Raspberry Pi experiment to creating sophisticated automations, including custom hardware and firmware modifications.' },
        { name: 'VMware', logo: 'https://cdn.worldvectorlogo.com/logos/vmware.svg', description: 'Experienced in deploying and managing VMware vSphere environments for enterprise-level server virtualization.' },
        { name: 'Docker', logo: 'https://cdn.worldvectorlogo.com/logos/docker.svg', description: 'I use Docker in my personal home lab for containerizing applications to streamline development, testing, and deployment workflows.' },
    ];

    const skillsSlider = document.getElementById('skills-slider');
    if (skillsSlider) {
        skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item flex-shrink-0 flex flex-col items-center justify-center space-y-3 p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl w-32 h-32 md:w-40 md:h-40 transition-transform hover:scale-105 cursor-pointer';
            skillElement.dataset.name = skill.name;
            skillElement.dataset.description = skill.description;
            
            const img = document.createElement('img');
            img.src = skill.logo;
            img.alt = skill.name;
            img.className = 'h-12 w-12 md:h-16 md-w-16 object-contain pointer-events-none';
            img.onerror = function() {
                this.onerror=null;
                const placeholder = document.createElement('div');
                placeholder.className = 'h-12 w-12 md:h-16 md-w-16 bg-gray-700 rounded-full flex items-center justify-center pointer-events-none';
                placeholder.innerHTML = `<span class="text-white text-xs font-bold">${skill.name.substring(0, 2)}</span>`;
                this.parentNode.replaceChild(placeholder, this);
            };

            const name = document.createElement('p');
            name.textContent = skill.name;
            name.className = 'text-white text-sm md:text-base font-medium text-center pointer-events-none';

            skillElement.appendChild(img);
            skillElement.appendChild(name);
            skillsSlider.appendChild(skillElement);
        });
    }
    
    // --- Lógica del Modal de Habilidades ---
    const modal = document.getElementById('skill-modal');
    let isDragging = false;
    let isDown = false;
    if (skillsSlider) {
        skillsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
        });
        skillsSlider.addEventListener('mousemove', () => { if (isDown) isDragging = true; });
        skillsSlider.addEventListener('mouseup', () => isDown = false);
        skillsSlider.addEventListener('mouseleave', () => isDown = false);
        skillsSlider.addEventListener('touchstart', (e) => {
            isDown = true;
            isDragging = false;
        });
        skillsSlider.addEventListener('touchmove', () => { if (isDown) isDragging = true; });
        skillsSlider.addEventListener('touchend', () => isDown = false);

        skillsSlider.addEventListener('click', (e) => {
            if (isDragging) return;
            const skillItem = e.target.closest('.skill-item');
            if (skillItem) {
                openModal(skillItem.dataset.name, skillItem.dataset.description);
            }
        });
    }

    const openModal = (name, description) => {
        if(!modal) return;
        modal.innerHTML = `
            <div class="modal-content bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto p-8 text-white relative">
                <button id="modal-close-btn" class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h3 class="text-2xl font-bold mb-4">${name}</h3>
                <p class="text-gray-300">${description}</p>
            </div>`;
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
        modal.querySelector('#modal-close-btn').addEventListener('click', closeModal);
    };

    const closeModal = () => {
        if(!modal) return;
        modal.classList.remove('visible');
        document.body.style.overflow = '';
    };

    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});
