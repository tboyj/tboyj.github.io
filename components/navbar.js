class SiteNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    
      <style>
        nav {
          position: sticky;
          top: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 64px;
          padding: 0 16px;
          background: var(--base-black);
          color: white;
          z-index: 100;
        }

        .brand {
          font-weight: 600;
          font-size: 1.25rem;
          text-decoration: none;
          color: white;
        }

        .menu-btn {
            font-size: 1.25rem;
            width: 32px;
            height: 32px;
            cursor: pointer;
            text-align: center;
            justify-content: center;
            display: flex;
            align-items: center;
        }

        .sidebar {
          position: fixed;
          top: 0;
          right: -280px;
          width: 280px;
          height: 100vh;
          background: var(--base-black);
          transition: right 0.3s ease;
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
          background: rgba(0,0,0,0.4);
          z-index: 150;
        }

        .overlay.open {
          display: block;
        }

        .links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .links a {
          color: white;
          text-decoration: none;
          margin: 0 16px;
          padding: 12px;
          border-radius: 8px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          position: relative;
        }
        .links a::after {
        content: "...";
        display: inline-block;
        opacity: 0;
        transform: translateY(2px);
        }

        .links a:hover::after {
        animation: showDots 0.3s ease forwards;
        }

        @keyframes showDots {
        0%   { opacity: 0; transform: translateY(2px); }
        100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes dots {
        0%   { content: ""; }
        33%  { content: "."; }
        66%  { content: ".."; }
        100% { content: "..."; }
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
            justify-content: center;
            display: flex;
            align-items: center;
        }
            .close-btn:hover {
            color: var(--accent-1);
  }
      </style>
    
      <nav>
        <a href="/" class="brand">tboyj</a>
        <button class="menu-btn dashed-transition-btn"><i data-lucide="menu"></i></button>
      </nav>

      <div class="overlay"></div>

      <div class="sidebar">
        <div class="links">
        <button class="close-btn dashed-transition-btn"><i data-lucide="x"></i></button>
          <a href="#about">about</a>
          <a href="#projects">projects</a>
          <a class="archive" href="#assignments">assignments</a>
          <hr>
          <a href="/blog">blog</a>
          <a href="../documents/" target="_blank">resume + cv</a>
          <hr>
        </div>
        <div class="contact-icons">
            <a href="mailto:jphilips.dev@gmail.com">
                <i class="fas fa-envelope"></i>
            </a>

            <a href="https://www.linkedin.com/in/jackson-philips" target="_blank">
                <i class="fab fa-linkedin"></i>
            </a>

            <a href="https://github.com/tboyj" target="_blank">
                <i class="fab fa-github"></i>
            </a>
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