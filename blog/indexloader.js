    lucide.createIcons();

    let allPosts = [];
    let activeTags = new Set();
    let searchQuery = "";

    function applyFilters() {
      const cards = document.querySelectorAll(".post-card");
      cards.forEach(card => {
        const cardTags = card.dataset.tags ? card.dataset.tags.split(",").filter(Boolean) : [];
        const title = card.dataset.title || "";
        const matchesSearch = !searchQuery || title.toLowerCase().includes(searchQuery);
        const matchesTags = activeTags.size === 0 || [...activeTags].every(t => cardTags.includes(t));
        card.style.display = matchesSearch && matchesTags ? "" : "none";

        card.querySelectorAll(".post-tag-btn").forEach(btn => {
          btn.classList.toggle("active", activeTags.has(btn.textContent));
        });
      });
    }

    function buildTagDropdown(tags) {
      const menu = document.getElementById("tag-dropdown-menu");
      const btn = document.getElementById("tag-dropdown-btn");
      const wrap = document.getElementById("tag-dropdown-wrap");

      if (!tags.length) { wrap.style.display = "none"; return; }

      tags.forEach(tag => {
        const opt = document.createElement("div");
        opt.className = "tag-option";
        opt.dataset.tag = tag;
        opt.innerHTML = `<span class="check"></span>${tag}`;
        opt.addEventListener("click", () => {
          if (activeTags.has(tag)) activeTags.delete(tag);
          else activeTags.add(tag);
          opt.classList.toggle("selected", activeTags.has(tag));
          btn.classList.toggle("has-selection", activeTags.size > 0);
          const label = activeTags.size > 0 ? `tags (${activeTags.size})` : "tags";
          btn.childNodes[0].textContent = label + " ";
          applyFilters();
        });
        menu.appendChild(opt);
      });

      const clear = document.createElement("div");
      clear.className = "tag-dropdown-clear";
      clear.textContent = "clear all";
      clear.addEventListener("click", () => {
        activeTags.clear();
        menu.querySelectorAll(".tag-option").forEach(o => o.classList.remove("selected"));
        btn.classList.remove("has-selection");
        btn.childNodes[0].textContent = "tags ";
        applyFilters();
      });
      menu.appendChild(clear);

      // Toggle open/close
      btn.addEventListener("click", () => {
        btn.classList.toggle("open");
        menu.classList.toggle("open");
      });

      // Close on outside click
      document.addEventListener("click", (e) => {
        if (!wrap.contains(e.target)) {
          btn.classList.remove("open");
          menu.classList.remove("open");
        }
      });
    }

    async function loadIndex() {
      const list = document.getElementById("post-list");

      try {
        const indexRes = await fetch("posts/index.json");
        if (!indexRes.ok) throw new Error();
        const ids = await indexRes.json();

        if (!ids.length) {
          list.innerHTML = `<p class="empty-msg">No posts yet.</p>`;
          return;
        }

        const posts = await Promise.all(
          ids.map(async (id) => {
            try {
              const res = await fetch(`posts/${id}/metadata.json`);
              if (!res.ok) return null;
              const meta = await res.json();
              return { id, ...meta };
            } catch { return null; }
          })
        );

        allPosts = posts
          .filter(Boolean)
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        if (!allPosts.length) {
          list.innerHTML = `<p class="empty-msg">No posts found.</p>`;
          return;
        }

        const tagSet = new Set();
        allPosts.forEach(p => (p.tags || []).forEach(t => tagSet.add(t)));
        const allTags = [...tagSet].sort();
        buildTagDropdown(allTags);

        // Wire search input
        document.getElementById("search-input").addEventListener("input", (e) => {
          searchQuery = e.target.value.trim().toLowerCase();
          applyFilters();
        });

        // Render cards
        list.innerHTML = allPosts.map((post) => {
          const date = new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric"
          });
          const tags = post.tags || [];
          const tagsHtml = tags.length
            ? `<div class="post-card-tags">${tags.map(t =>
                `<button class="post-tag-btn" data-tag="${t}">${t}</button>`
              ).join("")}</div>`
            : "";

          return `
            <a class="post-card" href="post.html?id=${post.id}" data-tags="${tags.join(",")}" data-title="${post.title.toLowerCase()}">
              <div class="post-card-left">
                <span class="post-card-title">${post.title}</span>
                <span class="post-card-desc">${post.description}</span>
                ${tagsHtml}
              </div>
              <span class="post-card-date">${date}</span>
            </a>
          `;
        }).join("");

        // Wire up inline tag buttons — stop propagation so card link doesn't fire
        list.querySelectorAll(".post-tag-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const tag = btn.dataset.tag;
            setActiveTag(activeTag === tag ? null : tag);
          });
        });

      } catch {
        list.innerHTML = `<p class="empty-msg">Could not load posts.</p>`;
      }
    }

    loadIndex();