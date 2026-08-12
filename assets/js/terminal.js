/* -----------------------------------------
   Rahul Kumar Portfolio - Terminal Simulator
-------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('terminal-input');
    const styledInput = document.getElementById('terminal-styled-input');
    const output = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');
    const terminalWindow = document.getElementById('terminal-window');

    if (!input || !output || !terminalBody) return;

    // Supported CLI Commands
    const commandsList = [
        'help', 'about', 'projects', 'skills', 
        'resume', 'github', 'contact', 'blogs', 
        'architecture', 'clear'
    ];

    // Command History
    let history = [];
    let historyIndex = -1;

    // Keep terminal input focused when clicking inside terminal body
    terminalWindow.addEventListener('click', () => {
        input.focus();
    });

    // Copy hidden input value to styled display span
    input.addEventListener('input', () => {
        styledInput.textContent = input.value;
    });

    // Keystroke listener
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawCmd = input.value.trim();
            executeCommand(rawCmd);
            
            // Save history
            if (rawCmd) {
                history.push(rawCmd);
                historyIndex = history.length;
            }
            
            input.value = '';
            styledInput.textContent = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0 && historyIndex > 0) {
                historyIndex--;
                input.value = history[historyIndex];
                styledInput.textContent = history[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                historyIndex++;
                input.value = history[historyIndex];
                styledInput.textContent = history[historyIndex];
            } else {
                historyIndex = history.length;
                input.value = '';
                styledInput.textContent = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            handleAutocomplete();
        }
    });

    // Autocomplete on Tab
    const handleAutocomplete = () => {
        const query = input.value.trim().toLowerCase();
        if (!query) return;

        const matches = commandsList.filter(cmd => cmd.startsWith(query));
        
        if (matches.length === 1) {
            input.value = matches[0];
            styledInput.textContent = matches[0];
        } else if (matches.length > 1) {
            // Print matching possibilities
            writeRow(`guest@rahul-shell:~$ ${input.value}`);
            writeRow(matches.join('   '), 'system');
        }
    };

    // Print to terminal utility
    const writeRow = (text, className = '') => {
        const p = document.createElement('p');
        p.className = `output-row ${className}`;
        p.innerHTML = text;
        output.appendChild(p);
        
        // Auto scroll down
        terminalBody.scrollTop = terminalBody.scrollHeight;
    };

    // Main Executor Command Logic
    const executeCommand = (cmdStr) => {
        // Echo input command
        writeRow(`guest@rahul-shell:~$ ${cmdStr}`);

        const token = cmdStr.toLowerCase().trim();
        if (!token) return;

        switch (token) {
            case 'help':
                writeRow("Available commands:", "system");
                writeRow("  <span class='cmd-highlight'>about</span>         - Details on my professional background");
                writeRow("  <span class='cmd-highlight'>projects</span>      - List of featured software systems built");
                writeRow("  <span class='cmd-highlight'>skills</span>        - Technical skills rated using ASCII bar charts");
                writeRow("  <span class='cmd-highlight'>resume</span>        - Display history and experience log");
                writeRow("  <span class='cmd-highlight'>architecture</span>  - Explains the stack infrastructure flow");
                writeRow("  <span class='cmd-highlight'>github</span>        - Access target repository account link");
                writeRow("  <span class='cmd-highlight'>contact</span>       - Core emails and communication keys");
                writeRow("  <span class='cmd-highlight'>blogs</span>         - Read active engineering drafts");
                writeRow("  <span class='cmd-highlight'>clear</span>         - Flush terminal dashboard");
                writeRow("  <span class='cmd-highlight'>help</span>          - View command specs index");
                break;

            case 'about':
                writeRow("Profile: Rahul Kumar", "system");
                writeRow("Role: Backend Developer (Python, Django, FastAPI, Node.js)");
                writeRow("Exp: 2+ Years engineering scalable web applications and REST APIs");
                writeRow("Summary: Specializing in Django query tuning, third-party integrations (Razorpay), secure authorization models, and backend workflow automation.");
                break;

            case 'projects':
                writeRow("Featured Projects:", "system");
                writeRow("1. <strong class='cmd-highlight'>Full Stack E-Commerce Platform</strong> - Django/React product and cart system.");
                writeRow("   Stack: Python, Django, DRF, React.js, PostgreSQL");
                writeRow("2. <strong class='cmd-highlight'>Real-Time Chat Application</strong> - Node.js/Socket.IO multi-room messaging daemon.");
                writeRow("   Stack: Node.js, Socket.IO, Express, Redis, MongoDB");
                writeRow("Type <span class='cmd-highlight'>projects</span> or visit the graphical section for interactive blueprints.");
                break;

            case 'skills':
                writeRow("Backend Skills Meter (ASCII Chart):", "system");
                writeRow("Python/C++   [████████████████████████████░░] 95%");
                writeRow("Django/DRF   [██████████████████████████░░░░] 90%");
                writeRow("Node.js/JS   [████████████████████████░░░░░░] 85%");
                writeRow("PostgreSQL   [████████████████████████░░░░░░] 88%");
                writeRow("Docker/Tools [████████████████████░░░░░░░░░░] 80%");
                writeRow("PyTest/Test  [██████████████████████░░░░░░░░] 85%");
                break;

            case 'resume':
                writeRow("Resume Experience Log:", "system");
                writeRow("• <strong class='cmd-highlight'>INDIASSETZ (Bangalore)</strong> | Backend Developer");
                writeRow("  Apr 2024 - Present | Built REST APIs, Razorpay hook integrations, query optimizations.");
                writeRow("• <strong class='cmd-highlight'>Zapuza</strong> | Python/Django Developer");
                writeRow("  Feb 2024 - Mar 2024 | Developed REST APIs, auth roles, performance checks.");
                writeRow("• <strong class='cmd-highlight'>Excellence Technology</strong> | Web Development Trainee");
                writeRow("  Aug 2022 - Jan 2023 | Assisted in API debugging, testing, and documentation.");
                break;

            case 'architecture':
                writeRow("Infrastructure Architecture Details:", "system");
                writeRow("ReactJS Front ──> Nginx Proxy (SSL/CORS) ──> Django/DRF Backend API ──> PostgreSQL DB Engine.");
                writeRow("Redis provides sliding-window rate limiters, token blacklists, and caching structures.");
                break;

            case 'github':
                writeRow("Opening GitHub Account profile...", "system");
                writeRow("Link: <a href='https://github.com' target='_blank' class='output-link'>github.com/rahulkumar-dev</a>");
                window.open('https://github.com', '_blank');
                break;

            case 'contact':
                writeRow("Contact Details:", "system");
                writeRow("Email: <a href='mailto:smartyrahul8696@gmail.com' class='output-link'>smartyrahul8696@gmail.com</a>");
                writeRow("Phone: +91 9358547584");
                writeRow("Geographic: Bengaluru, India (UTC +5:30)");
                writeRow("Status: Ready to receive opportunities.");
                break;

            case 'blogs':
                writeRow("Written Journals:", "system");
                writeRow("1. Combating N+1 Query Defects in Django ORM");
                writeRow("2. Sliding Window Rate Limiters via Redis Pipelines");
                writeRow("3. Production Docker Build Multi-Staging Optimization");
                break;

            case 'clear':
                output.innerHTML = '';
                break;

            default:
                writeRow(`bash: command not found: ${token}. Type <span class='cmd-highlight'>help</span> for specs index.`, "error");
                break;
        }
    };
});
