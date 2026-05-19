class SiteNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        nav {
          position: fixed;
          top: 12px;

          left: 50%;
          transform: translateX(-50%);

          width: fit-content;

          height: 48px;

          padding-left: 1em;
          padding-right: 1em;

          box-sizing: border-box;

          display: flex;
          justify-content: space-between;
          align-items: center;

          font-size: 1em;

          z-index: 100;

          background: var(--base-black);

          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
          color: white;
        }

        /* ── Important links ── */

        .important-links a {
          color: var(--base-white);
          text-decoration: none;
          font-size: 1em;
        }

        .important-links a:hover {
          color: var(--base-wh-compl);
        }

        /* ── Directory dropdown ── */

        .directory-dropdown {
          position: relative;
          display: inline-block;
          cursor: pointer;

        }


        .dir-trigger {
          font-family: var(--font-bricolage);
          font-size: 1rem;
          color: var(--base-white);
          user-select: none;
          height: 48px;
          background: transparent;
          border: none;
        }

        .dir-trigger:hover {
          color: var(--base-wh-compl);
        }

        .directory-menu {
            position: absolute;
            top: 100%;
            right: 0;
            min-width: 180px;
            display: flex;
            flex-direction: column;
            background: var(--base-black);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-top: 1px solid var(--base-black);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            opacity: 0;
            /* transform: translateY(-12px); */
            pointer-events: none;
            transition: 0.15s ease;
            padding: 8px 0;
        }

        .directory-dropdown:hover .directory-menu {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .directory-menu a {
          padding: 8px 12px;
          text-decoration: none;
          color: var(--base-white);
          font-size: 0.95rem;
          white-space: nowrap;
          transition: 0.15s ease;
        }

        .directory-menu span, .contact-menu span {
          padding: 4px 12px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.25);
        }

        .directory-menu a:hover {
          background: var(--base-black);
          color: var(--base-wh-compl);
        }

        /* ── Contact dropdown ── */

        .contact-dropdown {
          position: relative;
          display: inline-block;
          cursor: pointer;
          font-size: 1em;

        }

        .cont-drp {
          font-family: var(--font-bricolage);
          color: var(--base-white);
          font-size: 1rem;
          user-select: none;
          height: 48px;
          background: transparent;
          border: none;
        }
        .cont-drp:hover {
          color: var(--base-wh-compl);
        }

        .contact-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: auto;
          display: flex;
          flex-direction: column;
          min-width: 160px;
          background: var(--base-black);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1px solid var(--base-black);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          opacity: 0;
          padding: 8px 0;
          // transform: translateY(-12px);
          pointer-events: none;
          transition: 0.15s ease;
        }

        .contact-dropdown:hover .contact-menu {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .contact-menu a {
          padding: 8px 12px;
          text-decoration: none;
          color: var(--base-white);
          font-size: 0.95rem;
          transition: 0.15s ease;
        }

        .contact-menu a:hover {
          background: var(--base-black);
          color: var(--base-wh-compl);
        }

        /* ── Sidebar ── */

        .sidebar {
          position: fixed;
          top: 0;
          right: -280px;
          width: 280px;
          height: 100vh;
          background: var(--base-black);
          transition: right 0.175s ease;
          z-index: 200;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sidebar.open {
          right: 0;
        }

        .overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 150;
        }

        .overlay.open {
          display: block;
        }

        .close-btn {
          font-size: 1.25rem;
          width: 32px;
          height: 32px;
          align-self: flex-end;
          margin: 16px;
          float: right;
          cursor: pointer;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .close-btn:hover {
          color: var(--accent-1);
        }

        /* ── Mobile brand ── */

        .mobile-brand {
          font-family: var(--font-bricolage);
          color: var(--base-white);
          text-decoration: none;
          font-size: 1rem;
          user-select: none;
          display: none;
          padding: 8px;
          
        }


        .mobile-brand:hover {
          color: var(--base-wh-compl);
        }

        /* ── Menu button ── */

        .menu-btn {
          font-size: 1rem;
          width: 32px;
          height: 32px;
          cursor: pointer;
          text-align: center;
          display: none;
          justify-content: center;
          align-items: center;
          background: none;
          border: none;
          color: var(--base-white);
          padding: 0;
        }

        /* ── Responsive ── */

        .important-links {
          margin-left:auto;
          margin-right:auto;
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .desktop-links {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        @media (max-width: 768px) {

          .directory-menu {
            position: absolute;
            top: 48px;
            left:0;
            
            }
          
          .contact-menu {            
            position: absolute;
            top: 48px;
            right:0;
            left:auto;
          }
        }

        @media (max-width: 480px) {
          .desktop-links {
            display: none;
          }
            .important-links {
              gap:6px;
            }
          .dir-trigger, .cont-drp {

            width: 92px;
          }
          .dir-trigger:focus, .cont-drp:focus {
          color: var(--base-wh-compl);
          }
          .dir-trigger button, .cont-drp button {
          }
          .directory-menu {
            position: absolute;
            top: 48px;
            left:0;
            
            }
          
          .contact-menu {            
            position: absolute;
            top: 48px;
            right:0;  
            left:-100%;
          }


        }

        .dir-label {
          font-family: var(--font-dm);
          font-size: 0.75rem;
          letter-spacing: 0px;
          cursor: default;
        }


      </style>

      <nav>
        <div class="important-links">
          <div class="directory-dropdown">
            <button class="dir-trigger cutoff-br"><a href="/">tboyj</a></button>
            <div class="directory-menu">
            <span class="dir-label">main links</span>
              <a href="/blog">blog</a>
              <a href="/projects">projects</a>
            <span class="dir-label">ways to reach out</span>
              <a href="/#contact">contact</a>
              <a href="/documents" target="_blank" rel="noreferrer">resume + cv</a>
            <span class="dir-label">other</span>
              <a href="/assignments" class="archive">assignments</a>
            </div>
          </div>
          <div class="desktop-links">
            <a href="/blog">blog</a>
            <a href="/projects">projects</a>
          </div>
          <div class="contact-dropdown">
            <button class="cont-drp cutoff-tr"><a href="/#contact">contact</a></button>
            <div class="contact-menu">
            <span class="dir-label">contact me!</span>
              <a href="mailto:jphilips.dev@gmail.com">email</a>
              <a href="https://www.linkedin.com/in/jackson-philips/" target="_blank" rel="noreferrer">linkedin</a>
              <a href="https://github.com/tboyj" target="_blank" rel="noreferrer">github</a>
            </div>
          </div>
          
        </div>

        <a class="mobile-brand" href="/">tboyj</a>



        <button class="menu-btn"><i data-lucide="menu"></i></button>
      </nav>

      <div class="overlay"></div>

      <div class="sidebar">
        <div class="links">
          <button class="close-btn dashed-transition-btn"><i data-lucide="x"></i></button>
          <a href="/#about">about</a>
          <a href="/projects">projects</a>
          <a class="archive" href="/assignments">assignments</a>
          <hr>
          <a href="/documents" target="_blank" rel="noreferrer">resume + cv</a>
          <hr>
          <a href="/blog">blog</a>
        </div>
      </div>
    `;

    const menuBtn = this.querySelector(".menu-btn");
    const sidebar = this.querySelector(".sidebar");
    const overlay = this.querySelector(".overlay");
    const closeBtn = this.querySelector(".close-btn");

    const toggle = () => {
      sidebar.classList.toggle("open");
      overlay.classList.toggle("open");
    };

    menuBtn.addEventListener("click", toggle);
    closeBtn.addEventListener("click", toggle);
    overlay.addEventListener("click", toggle);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        sidebar.classList.remove("open");
        overlay.classList.remove("open");
      }
    });
  }
}

customElements.define("site-navbar", SiteNavbar);