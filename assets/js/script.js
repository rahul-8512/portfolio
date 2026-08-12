/* -----------------------------------------
   Rahul Kumar Portfolio - Core Orchestrator
-------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // -----------------------------------------
    // 1. Loading Preloader Animation
    // -----------------------------------------
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('preloader-progress');
    const logLines = document.querySelectorAll('.preloader-log .log-line');
    
    if (preloader && progressBar) {
        let progress = 0;
        let logIndex = 0;

        // Print log lines with spacing
        const printLogsInterval = setInterval(() => {
            if (logIndex < logLines.length) {
                logLines[logIndex].style.opacity = '1';
                logLines[logIndex].style.transform = 'translateY(0)';
                logIndex++;
            } else {
                clearInterval(printLogsInterval);
            }
        }, 300);

        // Progress bar speed
        const progressInterval = setInterval(() => {
            progress += Math.random() * 8;
            if (progress >= 100) {
                progress = 100;
                progressBar.style.width = `${progress}%`;
                clearInterval(progressInterval);
                
                // Fade out preloader
                setTimeout(() => {
                    preloader.style.transition = 'opacity 0.6s ease';
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 600);
                }, 400);
            } else {
                progressBar.style.width = `${progress}%`;
            }
        }, 100);
    }


    // -----------------------------------------
    // 2. Responsive Mobile Navbar Menu
    // -----------------------------------------
    const hamburger = document.getElementById('hamburger-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMobileMenu = () => {
        hamburger.classList.toggle('active');
        mobileOverlay.classList.toggle('open');
        document.body.classList.toggle('overflow-hidden');
    };

    if (hamburger && mobileOverlay) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Smooth closing
                toggleMobileMenu();
            });
        });
    }


    // -----------------------------------------
    // 3. Theme Toggle (Dark & Light)
    // -----------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // Apply initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }


    // -----------------------------------------
    // 4. Skills Section Interaction (Expand & Filter)
    // -----------------------------------------
    const skillCards = document.querySelectorAll('.skill-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Click cards to expand description
    skillCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Avoid closing if clicking links inside expanded block
            if (e.target.closest('a')) return;
            
            const isExpanded = card.classList.contains('expanded');
            
            // Collapse all others
            skillCards.forEach(c => c.classList.remove('expanded'));
            
            if (!isExpanded) {
                card.classList.add('expanded');
                
                // Animate progress bar inside
                const progressBar = card.querySelector('.skill-progress-bar');
                if (progressBar) {
                    // Set width from initial hardcoded percent styles
                    progressBar.style.width = progressBar.style.width; 
                }
            }
        });
    });

    // Filtering cards
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            
            skillCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    // -----------------------------------------
    // 5. Featured Projects Data and Drawer detail pages
    // -----------------------------------------
    const projectsDatabase = {
        ecommerce: {
            title: "Full Stack E-Commerce Platform",
            tag: "E-Commerce Web Application",
            metaTime: "Independent Work",
            metaLoc: "Personal Project Showcase",
            metaRole: "Full Stack Developer",
            desc: "Developed a responsive e-commerce application using Django REST Framework and React.js. Created clean relational schemas, transaction controls, product searches, paginations, and cart filters.",
            challenges: "Optimizing database query lookups for product variants with dynamic pricing attributes while avoiding N+1 serialization execution paths.",
            solutions: "Engineered database query operations using select_related and prefetch_related and created unified indexes on search fields.",
            metrics: "Maintained instant search response latency under 100ms and achieved consistent cart rendering validation speed.",
            tech: ["Python", "Django", "Django REST Framework", "React.js", "PostgreSQL", "CSS3"],
            archSteps: [
                { title: "React.js Frontend SPA", desc: "Handles user interactions, filters products locally, and queries the backend endpoints asynchronously." },
                { title: "DRF Resource Router", desc: "Performs payload sanitization and handles roles/permissions checking on orders submissions." },
                { title: "Database Transaction Manager", desc: "Ensures data consistency and atomic rollback parameters during stock counts reservation." },
                { title: "PostgreSQL Database Engine", desc: "Coordinates dynamic relational data tables, schemas indices, and search parameters." }
            ]
        },
        chat: {
            title: "Real-Time Chat Application",
            tag: "High-Throughput Socket Server",
            metaTime: "Independent Work",
            metaLoc: "Personal Project Showcase",
            metaRole: "Backend Developer",
            desc: "Built a multi-room real-time messaging console backed by Node.js web-socket channels. Tracks active connections, controls user sessions storage, and streams broadcasts.",
            challenges: "Scaling active connection handling and preventing system memory crashes during message broadcasts spike.",
            solutions: "Leveraged Node.js asynchronous event channels, Socket.IO adapters, and Redis cache store to serialize session footprints.",
            metrics: "Maintained active concurrency metrics up to 1,000+ simultaneous connections without packet losses.",
            tech: ["Node.js", "Socket.IO", "Express.js", "Redis", "MongoDB", "JavaScript (ES6)"],
            archSteps: [
                { title: "Socket.IO Gateway", desc: "Establishes long-polling connection triggers and handles real-time handshake protocols." },
                { title: "Node.js Event Broker", desc: "Parses chat channel events and publishes notifications to targeted sockets lists." },
                { title: "Redis Cache Store", desc: "Saves state configurations of active users and distributes messages across socket nodes." },
                { title: "MongoDB Data Cluster", desc: "Maintains chronological message history collections with quick index lookups." }
            ]
        }
    };

    const projectCards = document.querySelectorAll('.project-card');
    const projectDrawer = document.getElementById('project-drawer');
    const drawerCloseBtn = document.getElementById('drawer-close');
    const drawerContent = document.getElementById('drawer-content');
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');

    // Open project detail drawer page
    projectCards.forEach(card => {
        const detailBtn = card.querySelector('.btn-project-detail');
        if (!detailBtn) return;

        detailBtn.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            const data = projectsDatabase[projectId];
            
            if (data) {
                populateDrawer(data);
                projectDrawer.classList.add('open');
                document.body.classList.add('overflow-hidden');
            }
        });
    });

    const populateDrawer = (data) => {
        let archStepsHtml = '';
        data.archSteps.forEach((step, idx) => {
            archStepsHtml += `
                <div class="arch-step-box">
                    <span class="arch-step-num">${idx + 1}</span>
                    <div class="arch-step-txt">
                        <strong>${step.title}</strong>
                        <p>${step.desc}</p>
                    </div>
                </div>
            `;
        });

        let techHtml = '';
        data.tech.forEach(t => {
            techHtml += `<span>${t}</span>`;
        });

        drawerContent.innerHTML = `
            <div class="drawer-header">
                <span class="drawer-tag">${data.tag}</span>
                <h2 class="drawer-title">${data.title}</h2>
            </div>
            
            <div class="drawer-stats-row">
                <div class="drawer-stat-col">
                    <h4>TIMELINE</h4>
                    <p>${data.metaTime}</p>
                </div>
                <div class="drawer-stat-col">
                    <h4>ENVIRONMENT</h4>
                    <p>${data.metaLoc}</p>
                </div>
                <div class="drawer-stat-col">
                    <h4>ROLE</h4>
                    <p>${data.metaRole}</p>
                </div>
            </div>

            <div class="drawer-body-sec">
                <h3>System Description</h3>
                <p>${data.desc}</p>
            </div>

            <div class="drawer-body-sec">
                <h3>Technical Challenges</h3>
                <p>${data.challenges}</p>
            </div>

            <div class="drawer-body-sec">
                <h3>Solutions Engineered</h3>
                <p>${data.solutions}</p>
            </div>

            <div class="drawer-body-sec">
                <h3>Performance Architecture</h3>
                <p>${data.metrics}</p>
                <div class="arch-chart-mock">
                    <h4 class="panel-sub-hdr" style="margin-bottom: 15px;">System Process Flow</h4>
                    ${archStepsHtml}
                </div>
            </div>

            <div class="drawer-body-sec">
                <h3>Stack Composition</h3>
                <div class="project-card-tech">${techHtml}</div>
            </div>

            <div class="drawer-links">
                <a href="https://github.com" target="_blank" class="btn btn-primary">
                    <span>View Repository</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="#" class="btn btn-secondary">
                    <span>Live Console API</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon"><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line></svg>
                </a>
            </div>
        `;
    };

    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', () => {
            projectDrawer.classList.remove('open');
            document.body.classList.remove('overflow-hidden');
        });
    }

    // Dynamic filtering for projects list
    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');

                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    // -----------------------------------------
    // 6. Interactive Architecture Topology Viewer
    // -----------------------------------------
    const nodesDatabase = {
        nextjs: {
            title: "Next.js Web Client",
            desc: "Client interfaces rendered statically as single page applications. Hosted on high performance CDN nodes for minimal DOM paint delays, query backend REST gateways asynchronously.",
            code: `// fetch telemetry data from Django server
const fetchTelemetry = async () => {
    const res = await fetch('https://api.rahulkumar.dev/v1/dispatch/');
    const data = await res.json();
    return data;
};`
        },
        nginx: {
            title: "Nginx Reverse Proxy",
            desc: "Handles incoming HTTP requests. Terminates SSL using Certbot keys, manages CORS mappings, serves static files, and proxy transfers queries to backend socket locations.",
            code: `server {
    listen 443 ssl http2;
    server_name api.rahulkumar.dev;
    
    location / {
        proxy_pass http://django_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`
        },
        django: {
            title: "Django Core Web Framework",
            desc: "Houses the core python logic, middleware processing components, user validations, database transactions, signals handling, and dynamic migrations management scripts.",
            code: `class DispatchMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        
    def __call__(self, request):
        # Validate custom request security keys
        if not request.headers.get("X-Gateway-Auth"):
            return JsonResponse({"err": "Invalid Auth Key"}, status=403)
        return self.get_response(request)`
        },
        drf: {
            title: "Django REST Framework Controllers",
            desc: "Generates semantic API endpoints. Controls routing mappings, sanitizes inputs using serializers validation, matches permission credentials, and configures pagination parameters.",
            code: `class DispatchViewSet(viewsets.ModelViewSet):
    queryset = DispatchRecord.objects.all()
    serializer_class = DispatchSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        # Trigger quick cache write to Redis
        record = serializer.save()
        cache.set(f"dispatch_{record.id}", record.data, timeout=300)`
        },
        redis: {
            title: "Redis Key-Value Cache Store",
            desc: "Fast, in-memory cluster storing user security blacklists, API response values, rate-limiting counters, and task queue brokers for Celery workers.",
            code: `REDIS_CACHE_URL = "redis://127.0.0.1:6379/1"
# Cache response for 5 minutes
cache.set("recent_dispatches_key", data_payload, timeout=300)`
        },
        postgres: {
            title: "PostgreSQL Database Engine",
            desc: "Primary relational database store. Holds schema tables structures, optimized indices (B-Tree, GIN on JSONB columns) and custom transaction triggers.",
            code: `-- Optimized GIN Index on JSON payload column
CREATE INDEX idx_dispatch_data_gin 
ON logistics_dispatchRecord USING gin (data);`
        },
        docker: {
            title: "Docker Engine Containers",
            desc: "Isolates application binaries. Uses multi-stage Dockerfiles to build small Alpine / Debian slim containers, orchestrated using Docker Compose configurations.",
            code: `version: '3.8'
services:
  web:
    build: .
    command: gunicorn core.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - .:/code
    environment:
      - DEBUG=0`
        },
        cicd: {
            title: "GitLab CI / CD Pipelines",
            desc: "Automates testing scripts execution and builds distribution images. Automatically runs lint triggers, pytest coverage suite, and deploys images to production VPS layers.",
            code: `stages:
  - test
  - deploy

run_tests:
  stage: test
  script:
    - pip install -r requirements.txt
    - pytest --cov`
        }
    };

    const archNodes = document.querySelectorAll('.arch-node');
    const panelPlaceholder = document.getElementById('panel-placeholder');
    const panelContent = document.getElementById('panel-content');
    const panelTitle = document.getElementById('panel-title');
    const panelDesc = document.getElementById('panel-desc');
    const panelCode = document.getElementById('panel-code');
    const svgContainer = document.getElementById('arch-lines-svg');

    // Click nodes to show specifications
    archNodes.forEach(node => {
        node.addEventListener('click', () => {
            archNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            const nodeKey = node.getAttribute('data-node');
            const data = nodesDatabase[nodeKey];

            if (data) {
                panelPlaceholder.classList.add('hidden');
                panelContent.classList.remove('hidden');
                
                panelTitle.textContent = data.title;
                panelDesc.textContent = data.desc;
                panelCode.textContent = data.code;
            }

            // Glow paths matching active node connections
            updateLinesGlow(nodeKey);
        });
    });

    // Draw connection lines inside SVG dynamically
    const drawArchitectureLines = () => {
        if (!svgContainer) return;
        svgContainer.innerHTML = ''; // Reset SVG

        // Define hardcoded connection paths
        const connections = [
            { from: 'nextjs', to: 'nginx' },
            { from: 'nginx', to: 'django' },
            { from: 'django', to: 'drf' },
            { from: 'drf', to: 'redis' },
            { from: 'drf', to: 'postgres' },
            { from: 'redis', to: 'postgres' },
            { from: 'docker', to: 'django' },
            { from: 'cicd', to: 'docker' }
        ];

        const containerRect = svgContainer.getBoundingClientRect();

        connections.forEach(conn => {
            const fromEl = document.getElementById(`node-${conn.from}`);
            const toEl = document.getElementById(`node-${conn.to}`);

            if (fromEl && toEl) {
                const fromRect = fromEl.getBoundingClientRect();
                const toRect = toEl.getBoundingClientRect();

                // Calculate center coords relative to the SVG container
                const x1 = (fromRect.left + fromRect.width / 2) - containerRect.left;
                const y1 = (fromRect.top + fromRect.height / 2) - containerRect.top;
                const x2 = (toRect.left + toRect.width / 2) - containerRect.left;
                const y2 = (toRect.top + toRect.height / 2) - containerRect.top;

                // Create SVG path element representing connections
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                
                // Draw bezier curve paths
                const dx = x2 - x1;
                const dy = y2 - y1;
                const adx = Math.abs(dx);
                const ady = Math.abs(dy);
                
                let d = '';
                if (adx > ady) {
                    // Curved horizontally
                    d = `M ${x1} ${y1} C ${x1 + dx/2} ${y1}, ${x2 - dx/2} ${y2}, ${x2} ${y2}`;
                } else {
                    // Curved vertically
                    d = `M ${x1} ${y1} C ${x1} ${y1 + dy/2}, ${x2} ${y2 - dy/2}, ${x2} ${y2}`;
                }

                path.setAttribute('d', d);
                path.setAttribute('class', 'arch-line');
                path.setAttribute('data-from', conn.from);
                path.setAttribute('data-to', conn.to);
                
                svgContainer.appendChild(path);
            }
        });
    };

    const updateLinesGlow = (activeNodeKey) => {
        const lines = svgContainer.querySelectorAll('.arch-line');
        lines.forEach(line => {
            const from = line.getAttribute('data-from');
            const to = line.getAttribute('data-to');
            
            if (from === activeNodeKey || to === activeNodeKey) {
                line.classList.add('glowing');
            } else {
                line.classList.remove('glowing');
            }
        });
    };

    window.addEventListener('resize', drawArchitectureLines);
    
    // Slight delay to allow DOM calculations to yield correct width sizes
    setTimeout(drawArchitectureLines, 500);


    // -----------------------------------------
    // 7. API Playground Sandbox Panel
    // -----------------------------------------
    const apiRouteBtns = document.querySelectorAll('.api-route-btn');
    const explorerMethod = document.getElementById('explorer-method');
    const explorerUrl = document.getElementById('explorer-url');
    const bodyParams = document.getElementById('explorer-body-params');
    const btnSend = document.getElementById('btn-send-api');
    const resStatus = document.getElementById('response-status');
    const resTime = document.getElementById('response-time');
    const resCode = document.getElementById('response-code');

    const apiEndpointsData = {
        '/projects': {
            status: "200 OK",
            time: "14ms",
            body: {
                status: "success",
                data: [
                    {
                        id: "ecommerce",
                        name: "Full Stack E-Commerce Platform",
                        status: "SUCCESS"
                    },
                    {
                        id: "chat",
                        name: "Real-Time Chat Application",
                        status: "ACTIVE"
                    }
                ]
            }
        },
        '/experience': {
            status: "200 OK",
            time: "18ms",
            body: {
                status: "success",
                data: [
                    {
                        company: "INDIASSETZ",
                        role: "Backend Developer (Python, Django, FastAPI, Node.js)",
                        period: "April 2024 - Present"
                    },
                    {
                        company: "Zapuza",
                        role: "Python/Django Developer",
                        period: "Feb 2024 - Mar 2024"
                    },
                    {
                        company: "Excellence Technology",
                        role: "Web Development Trainee",
                        period: "Aug 2022 - Jan 2023"
                    }
                ]
            }
        },
        '/skills': {
            status: "200 OK",
            time: "8ms",
            body: {
                status: "success",
                data: {
                    languages: ["Python", "JavaScript", "C++", "Java"],
                    frontend: ["React.js", "HTML5", "CSS3", "Bootstrap"],
                    backend: ["Django", "Django REST Framework", "FastAPI", "Node.js"],
                    databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
                    tools: ["Git", "GitHub", "Docker", "PyTest", "Selenium"]
                }
            }
        },
        '/contact': {
            status: "201 Created",
            time: "240ms",
            body: {
                status: "success",
                message: "Message payload successfully cataloged inside PostgreSQL. Notification dispatched.",
                payload_received: {
                    name: "Recruiter Name",
                    email: "hiring@company.com",
                    message: "Let's set up an interview!"
                }
            }
        }
    };

    apiRouteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            apiRouteBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const method = btn.getAttribute('data-method');
            const endpoint = btn.getAttribute('data-endpoint');

            explorerMethod.textContent = method;
            explorerMethod.className = `method-tag method ${method.toLowerCase()}`;
            explorerUrl.value = `https://api.rahulkumar.dev/v1${endpoint}`;

            if (method === 'POST') {
                bodyParams.classList.remove('hidden');
            } else {
                bodyParams.classList.add('hidden');
            }
        });
    });

    if (btnSend) {
        btnSend.addEventListener('click', () => {
            btnSend.textContent = 'Querying...';
            btnSend.disabled = true;

            const activeBtn = document.querySelector('.api-route-btn.active');
            const endpoint = activeBtn.getAttribute('data-endpoint');
            const data = apiEndpointsData[endpoint];

            setTimeout(() => {
                resStatus.textContent = data.status;
                resTime.textContent = data.time;

                if (endpoint === '/contact') {
                    // Hydrate mock email from text box
                    try {
                        const userParams = JSON.parse(document.getElementById('params-textarea').value);
                        data.body.payload_received = userParams;
                    } catch (e) {
                        resStatus.textContent = "400 Bad Request";
                        resCode.textContent = JSON.stringify({ error: "Invalid JSON syntax" }, null, 2);
                        btnSend.textContent = 'Send Request';
                        btnSend.disabled = false;
                        return;
                    }
                }

                resCode.textContent = JSON.stringify(data.body, null, 2);

                btnSend.textContent = 'Send Request';
                btnSend.disabled = false;
            }, 500); // Small delay to feel realistic
        });
    }

    // Initialize display with /projects load
    if (resCode) {
        resCode.textContent = JSON.stringify(apiEndpointsData['/projects'].body, null, 2);
    }


    // -----------------------------------------
    // 8. Contact Form Mock Dispatch handler
    // -----------------------------------------
    const contactForm = document.getElementById('portfolio-contact-form');
    const formAlert = document.getElementById('form-status-alert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const msg = document.getElementById('form-msg').value;
            const submitBtn = document.getElementById('btn-submit-contact');

            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Connecting DRF API...';

            formAlert.textContent = 'POSTing parameters payload...';
            formAlert.className = 'form-status-alert system';

            setTimeout(() => {
                formAlert.textContent = 'HTTP 201 Created - Contact record saved to DB successfully!';
                formAlert.className = 'form-status-alert success';
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = 'Dispatch Payload';

                // Reset form
                contactForm.reset();
            }, 1200); // Latency simulator
        });
    }

});
