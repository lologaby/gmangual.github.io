(function () {
    // --- Datos para el árbol jerárquico ---
    const data = {
        name: "Proxmox VE Host", type: "proxmox", imageUrl: "https://images.seeklogo.com/logo-png/49/1/proxmox-logo-png_seeklogo-498509.png", info: "Hypervisor",
        children: [
            {
                name: "Ubuntu Server", type: "vm", imageUrl: "https://cdn.worldvectorlogo.com/logos/ubuntu-4.svg", info: "Virtual Machine",
                children: [
                    {
                        name: "Docker", type: "docker", imageUrl: "https://cdn.worldvectorlogo.com/logos/docker.svg", info: "Container Engine",
                        children: [
                            { name: "Jellyfin", type: "app-media", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/41/Jellyfin_-_icon-transparent.svg", info: "Media Server" },
                            { name: "Overseerr", type: "app-media", imageUrl: "https://coolify.io/docs/images/services/overseerr.svg", info: "Request Manager" },
                            { name: "Sonarr", type: "app-media", imageUrl: "https://getumbrel.github.io/umbrel-apps-gallery/sonarr/icon.svg", info: "PVR for TV Shows" },
                            { name: "Radarr", type: "app-media", imageUrl: "https://coolify.io/docs/images/services/radarr.svg", info: "Movie Collection Manager" },
                        ]
                    }
                ]
            },
            {
                name: "RHEL", type: "vm", imageUrl: "https://cdn.worldvectorlogo.com/logos/red-hat-1.svg", info: "Virtual Machine",
                children: [
                     {
                        name: "Docker", type: "docker", imageUrl: "https://cdn.worldvectorlogo.com/logos/docker.svg", info: "Container Engine",
                        children: [
                            { name: "Traefik", type: "app-networking", imageUrl: "https://cdn.worldvectorlogo.com/logos/traefik-1.svg", info: "Reverse Proxy" },
                            { name: "Homepage", type: "app-monitoring", imageUrl: "https://avatars.githubusercontent.com/u/122929872?s=200&v=4", info: "Dashboard" },
                            { name: "Pterodactyl Panel", type: "app-gaming", imageUrl: "https://avatars.githubusercontent.com/u/16179146?s=200&v=4", info: "Game Server Control Panel" },
                        ]
                    }
                ]
            },
            {
                name: "Pterodactyl Wings", type: "vm", imageUrl: "https://avatars.githubusercontent.com/u/16179146?s=200&v=4", info: "Game Server Node",
                children: [
                     { name: "Minecraft Server", type: "app-gaming", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Minecraft_cube.svg", info: "Fabric Modded Server" },
                     { name: "Ark: Survival Server", type: "app-gaming", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQdAkMnbW1BfOYeYjYu7t0ChgWICPCdKG2w&usqp=CAU", info: "Survival Game Server" },
                ]
            },
            { name: "TrueNAS", type: "vm", imageUrl: "https://www.svgrepo.com/show/331613/truenas.svg", info: "NFS Storage" },
            { name: "AdGuard Home (LXC)", type: "vm", imageUrl: "https://user-images.githubusercontent.com/4099637/55673106-3aa5bd80-5871-11e9-96c8-9b88054df84e.png", info: "LXC - Network-wide Ad-blocker" },
        ]
    };

    // Mapa de colores para los nodos
    const colorMap = {
        proxmox: "#9ca3af", vm: "#00BCD4", docker: "#2196F3", 
        "app-media": "#f97316", "app-networking": "#ef4444", 
        "app-monitoring": "#eab308", "app-gaming": "#8b5cf6",
    };

    const container = document.getElementById('infographic-container');
    const nodeWidth = 220, nodeHeight = 60, verticalSpacing = 150, horizontalSpacing = 120;
    const margin = {top: 20, right: 20, bottom: 20, left: 20};

    const svg = d3.select(container).append("svg");
    const g = svg.append("g");
    const tooltip = d3.select("body").append("div").attr("class", "tooltip");

    const root = d3.hierarchy(data);
    root.x0 = 0;
    root.y0 = 0;
    
    // Función para colapsar nodos
    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }
    
    // Función para expandir/contraer un nodo
    function toggle(d) {
        if (d.children) {
            collapse(d);
        } else {
            d.children = d._children;
            d._children = null;
        }
    }
    
    // Colapsar todos los hijos del nodo raíz inicialmente
    root.children.forEach(collapse);

    // Función principal para actualizar el árbol
    function update(source) {
        const duration = 500;
        const treeLayout = d3.tree().nodeSize([horizontalSpacing, verticalSpacing]);
        treeLayout(root);

        const nodes = root.descendants();
        const links = root.links();
        
        let minX = 0, maxX = 0, maxY = 0;
        nodes.forEach(d => {
            d.y = d.depth * verticalSpacing;
            if (d.x < minX) minX = d.x;
            if (d.x > maxX) maxX = d.x;
            if (d.y > maxY) maxY = d.y;
        });

        const newHeight = maxY + nodeHeight * 2;
        const newWidth = maxX - minX + nodeWidth * 2;

        svg.transition().duration(duration).ease(d3.easeCubicOut)
            .attr("width", container.clientWidth)
            .attr("height", newHeight)
            .attr("viewBox", [minX - nodeWidth / 2, -margin.top, newWidth, newHeight]);
        
        g.transition().duration(duration).ease(d3.easeCubicOut)
            .attr("transform", `translate(${root.x0},${margin.top})`);

        const node = g.selectAll("g.node").data(nodes, d => d.id || (d.id = crypto.randomUUID()));

        const nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", `translate(${source.x0},${source.y0})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0)
            .on("click", (event, d) => {
                if (d._children || d.children) {
                    toggle(d);
                    update(d);
                }
            })
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", .9);
                tooltip.html(`<strong>${d.data.name}</strong><br/>${d.data.info || `Type: ${d.data.type}`}`)
                    .style("left", (event.pageX + 15) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => tooltip.style("opacity", 0));

        nodeEnter.append("rect")
            .attr("class", "node-rect")
            .attr("width", nodeWidth)
            .attr("height", nodeHeight)
            .attr("x", -nodeWidth / 2)
            .attr("y", -nodeHeight / 2)
            .attr("stroke", d => colorMap[d.data.type] || "#4b5563");

        nodeEnter.append("image")
            .attr("xlink:href", d => d.data.imageUrl)
            .attr("x", -nodeWidth / 2 + 8)
            .attr("y", -16)
            .attr("width", 32)
            .attr("height", 32);

        nodeEnter.append("text")
            .attr("class", "node-text")
            .attr("x", -nodeWidth / 2 + 48)
            .attr("y", 0)
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .text(d => d.data.name);
        
        nodeEnter.append("title").text(d => `${d.data.name} - ${d.data.info}`);
        nodeEnter.attr("aria-label", d => `${d.data.name} - ${d.data.info}`);

        nodeEnter.append("text")
            .attr("class", "node-text expand-indicator")
            .attr("x", nodeWidth / 2 - 15)
            .attr("y", 0)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .style("font-size", "24px")
            .text(d => d._children ? "[+]" : (d.children ? "[-]" : ""));

        node.merge(nodeEnter).transition().duration(duration).ease(d3.easeCubicOut)
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 1);
        
        node.merge(nodeEnter).select(".expand-indicator")
             .text(d => d._children ? "[+]" : (d.children ? "[-]" : ""));

        node.exit().transition().duration(duration).ease(d3.easeCubicOut).remove()
            .attr("transform", `translate(${source.x},${source.y})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0);

        const link = g.selectAll("path.link").data(links, d => d.target.id);

        const linkEnter = link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", () => {
                const o = { x: source.x0, y: source.y0 };
                return d3.linkVertical().x(d => d.x).y(d => d.y)({ source: o, target: o });
            });

        link.merge(linkEnter).transition().duration(duration).ease(d3.easeCubicOut)
            .attr("d", d3.linkVertical().x(d => d.x).y(d => d.y));

        link.exit().transition().duration(duration).ease(d3.easeCubicOut).remove()
            .attr("d", () => {
                const o = { x: source.x, y: source.y };
                return d3.linkVertical()({ source: o, target: o });
            });

        root.eachBefore(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    // Centrar el nodo raíz inicialmente
    root.x0 = container.clientWidth / 2;
    root.y0 = 0;
    
    update(root);

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const nodeElement = entry.target;
                    const nodeData = d3.select(nodeElement).datum();
                    if (nodeData && nodeData._children) {
                        toggle(nodeData);
                        update(nodeData);
                    }
                    observer.unobserve(nodeElement);
                }
            });
        }, { rootMargin: "0px 0px -200px 0px" });
        
        setTimeout(() => {
            document.querySelectorAll('g.node').forEach(el => {
                if (el) observer.observe(el);
            });
        }, 1000);
    }

     window.addEventListener('resize', () => {
        update(root);
    });
})();
