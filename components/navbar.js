class SiteNavbar extends HTMLElement {
  static get observedAttributes() {
    return ["path", "labels"];
  }

  attributeChangedCallback() {
    // this._renderBreadcrumb();
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          box-sizing: border-box;

          display: flex;
          justify-content: space-between;
          align-items: center;

          height: 64px;
          padding-left: 1em;
          padding-right: 1em;
          font-size: 1em;

          z-index: 100;

          /* Frost effect */
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);

          box-shadow: 0 2px 10px rgba(0,0,0,0.25);
          color: white;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          text-overflow: clip;
          overflow: hidden;
          font-size: 1em;

        }

        .brand {
          text-decoration: none;
          color: white;
          font-family: var(--font-bricolage);
          white-space: nowrap;
          user-select:none;
          font-size: 1em;
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

        .contact-dropdown {
          position: relative;
          display: inline-block;
          cursor: pointer;
          font-size: 1em;
          padding: 8px; 
        }

        .cont-drp {
          font-family: var(--font-bricolage);
          color: var(--base-white);
          font-size: 1rem;
          user-select: none;
        }

        /* hidden menu */
        .contact-menu {
          position: absolute;
          top: 120%;
          right: 0;

          display: flex;
          flex-direction: column;
          min-width: 160px;

          background: rgba(10, 10, 10, 0.35);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);

          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;

          box-shadow: 0 10px 30px rgba(0,0,0,0.3);

          opacity: 0;
          transform: translateY(-6px);
          pointer-events: none;
          transition: 0.15s ease;
        }

        /* show on hover */
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
          background: rgba(255,255,255,0.08);
          color: var(--accent-1);
        }

        nav {
          font-size:1em !important;
        }

        .important-links a {
          color: var(--base-white);
          text-decoration:none;
          padding: 8px;
          font-size: 1em;
        }
        
        .important-links a:hover {
          color: var(--base-wh-compl);
        }

        .directory-dropdown {
          position: relative;
          display: inline-block;
          margin-left: 12px;
          cursor: pointer;
        }

        .dir-trigger {
          font-family: var(--font-bricolage);
          font-size: 1rem;
          color: var(--base-white);
          user-select: none;
          padding: 8px;
        }

        /* dropdown panel */
        .directory-menu {
          position: absolute;
          top: 120%;
          left: 0;

          min-width: 180px;
          display: flex;
          flex-direction: column;

          padding: 8px 0;

          background: rgba(10, 10, 10, 0.35);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);

          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;

          box-shadow: 0 10px 30px rgba(0,0,0,0.3);

          opacity: 0;
          transform: translateY(-6px);
          pointer-events: none;
          transition: 0.15s ease;
        }

        /* show on hover */
        .directory-dropdown:hover .directory-menu {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* links */
        .directory-menu a {
          padding: 8px 12px;
          text-decoration: none;
          color: var(--base-white);
          font-size: 0.95rem;
          transition: 0.15s ease;
          white-space: nowrap;
        }

        .directory-menu a:hover {
          background: rgba(255,255,255,0.08);
          color: var(--accent-1);
        }

      </style>

      <nav>
          <div class="important-links">
          <div class="directory-dropdown">
          <span class="dir-trigger">tboyj</span>

          <div class="directory-menu">
            <a href="/">home</a>
            <a href="/projects">projects</a>
            <a href="/assignments" class="archive">assignments</a>
            <a href="/awards">awards</a>
            <a href="/blog">blog</a>
            <a href="/documents" target="_blank" rel="noreferrer">resume + cv</a>
          </div>
        </div>
          <a href="/#about">about</a>
          <a href="/blog">blog</a>
          <a href="/projects">projects</a>
          </div>
          <div class="contact-dropdown">
            <span class="cont-drp">contact</span>

            <div class="contact-menu">
              <a href="mailto:you@example.com">email</a>
              <a href="https://linkedin.com" target="_blank">linkedin</a>
              <a href="https://github.com" target="_blank">github</a>
            </div>
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

    // this._renderBreadcrumb();
  }

  // _renderBreadcrumb() {
  //   const bc = this.querySelector("#bc");
  //   if (!bc) return;

  //   const rawPath = this.getAttribute("path") || window.location.pathname;
  //   const segments = rawPath.replace(/^\/|\/$/g, "").split("/").filter(s => Boolean(s) && s !== 'index.html');

  //   if (segments.length === 0) {
  //     bc.innerHTML = "";
  //     return;
  //   }

  //   let labelMap = {};
  //   try {
  //     labelMap = JSON.parse(this.getAttribute("labels") || "{}");
  //   } catch (_) {}

  //   let accumulated = "";
  //   const crumbs = segments.map((seg) => {
  //     accumulated += `/${seg}`;
  //     return {
  //       label: labelMap[seg] ?? seg.replace(/-/g, " "),
  //       href: accumulated,
  //     };
  //   });

  //   bc.innerHTML = crumbs
  //     .map((crumb, i) => {
  //       const isLast = i === crumbs.length - 1;
  //       return `
  //         <span class="bc-sep" aria-hidden="true">›</span>
  //         ${
  //           isLast
  //             ? `<a class="bc-crumb current" href="${crumb.href}" aria-current="page">${crumb.label}</a>`
  //             : `<a class="bc-crumb" href="${crumb.href}">${crumb.label}</a>`
  //         }
  //       `;
  //     })
  //     .join("");
  // }
}

customElements.define("site-navbar", SiteNavbar);