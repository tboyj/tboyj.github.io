class SiteNavbar extends HTMLElement {
  static get observedAttributes() {
    return ["path", "labels"];
  }

  attributeChangedCallback() {
    this._renderBreadcrumb();
  }

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
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          text-overflow: clip;
          overflow: hidden;
          margin-left: 8px;
        }

        .brand {
          font-weight: 400;
          text-decoration: none;
          color: white;
          font-size: 1.25rem;
          font-family: var(--font-bricolage);
          transition: color 0.2s ease;
          white-space: nowrap;
          user-select:none;
        }

        .brand:hover {
          color: var(--base-wh-compl);
        }

        .brand img {
          width: 48px;
          height: 48px;
          display: flex;
          vertical-align: middle;
          opacity: 1;
          transition: opacity 0.2s ease;
        }

        .brand img:hover {
          opacity: 0.8;
        }

        .breadcrumb-inline {
          display: flex;
          align-items: center;
          font-size: 1rem;
          font-weight: 400;
          gap: 8px;
        }

        .bc-sep {
          font-family: var(--font-dm, sans-serif);
          font-weight: 900;
          color: var(--accent-1);
          user-select: none;
          font-size: 2rem;
        }

        .bc-crumb {
          font-family: var(--font-bricolage, sans-serif);
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--base-white);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .bc-crumb:hover {
          color: var(--accent-1);
        }

        a.bc-crumb.current {
          color: var(--base-white);
          cursor: pointer;
          font-size: 1.25rem;
          font-weight: 400;
          transition: color 0.2s ease;
        }

        a.bc-crumb.current:hover {
          color: var(--base-wh-compl);
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
          margin-left: 16px;
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
          justify-content: center;
          display: flex;
          align-items: center;
        }

        .close-btn:hover {
          color: var(--accent-1);
        }

        site-navbar nav .bc-crumb {
          color: var(--base-white) !important;
        }

        site-navbar nav .bc-crumb:hover {
          color: var(--base-wh-compl) !important;
        }
        site-navbar nav .bc-crumb.current {
          pointer-events: none !important;

        }
          

      </style>

      <nav>
        <div class="nav-left">
          <a href="/" class="brand">tboyj</a>
          <div class="breadcrumb-inline" id="bc"></div>
        </div>
        <button class="menu-btn dashed-transition-btn"><i data-lucide="menu"></i></button>
      </nav>

      <div class="overlay"></div>

      <div class="sidebar">
        <div class="links">
          <button class="close-btn dashed-transition-btn"><i data-lucide="x"></i></button>
          <a href="/#about">about</a>
          <a href="/projects">projects</a>
          <a class="archive" href="/assignments">assignments</a>
          <hr>
          <a href="/awards">awards</a>
          <a href="/documents" target="_blank" rel="noreferrer">resume + cv</a>
          <hr>
          <a class="redbtn" href="/blog">blog</a>
        </div>
        <div class="contact-icons">
          <a href="mailto:jphilips.dev@gmail.com">
            <i class="fas fa-envelope"></i>
          </a>
          <a href="https://www.linkedin.com/in/jackson-philips" target="_blank" rel="noreferrer">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/tboyj" target="_blank" rel="noreferrer">
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

    this._renderBreadcrumb();
  }

  _renderBreadcrumb() {
    const bc = this.querySelector("#bc");
    if (!bc) return;

    const rawPath = this.getAttribute("path") || window.location.pathname;
    const segments = rawPath.replace(/^\/|\/$/g, "").split("/").filter(s => Boolean(s) && s !== 'index.html');

    if (segments.length === 0) {
      bc.innerHTML = "";
      return;
    }

    let labelMap = {};
    try {
      labelMap = JSON.parse(this.getAttribute("labels") || "{}");
    } catch (_) {}

    let accumulated = "";
    const crumbs = segments.map((seg) => {
      accumulated += `/${seg}`;
      return {
        label: labelMap[seg] ?? seg.replace(/-/g, " "),
        href: accumulated,
      };
    });

    bc.innerHTML = crumbs
      .map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return `
          <span class="bc-sep" aria-hidden="true">›</span>
          ${
            isLast
              ? `<a class="bc-crumb current" href="${crumb.href}" aria-current="page">${crumb.label}</a>`
              : `<a class="bc-crumb" href="${crumb.href}">${crumb.label}</a>`
          }
        `;
      })
      .join("");
  }
}

customElements.define("site-navbar", SiteNavbar);