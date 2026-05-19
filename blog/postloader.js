    lucide.createIcons();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    async function loadPost(id) {
      const container = document.getElementById("post-content");

      if (!id) {
        container.innerHTML = `<p class="error-msg">No post specified.</p>`;
        return;
      }

      try {
        const [mdRes, metaRes] = await Promise.all([
          fetch(`posts/${id}/markdown.md`),
          fetch(`posts/${id}/metadata.json`)
        ]);

        if (!mdRes.ok || !metaRes.ok) throw new Error("Not found");

        const [md, meta] = await Promise.all([mdRes.text(), metaRes.json()]);

        // Update page title
        document.title = `${meta.title} | tboyj`;

        // Update navbar breadcrumb
        const date = new Date(meta.date).toLocaleDateString("en-US", {
          year: "numeric", month: "long", day: "numeric", timeZone: "UTC"
        });
        
        const tagsHtml = (meta.tags || []).length
          ? `<div class="post-card-tags" style="margin: 0 0 2em; display: flex; gap: 6px;">
              ${meta.tags.map(t => `<span class="post-tag-btn">${t}</span>`).join("")}
            </div>`
          : "";

        container.innerHTML = `
          <h1 class="post-title">${meta.title}</h1>
          <p class="post-description">${meta.description}</p>
          ${tagsHtml}
          <div class="post-meta">
            <span>${date}</span>
            <span class="dot">·</span>
            <span>${meta.author}</span>
          </div>
          <hr class="post-divider">
          <div class="md-body">${marked.parse(md)}</div>
        `;
      } catch (e) {
        container.innerHTML = `<p class="error-msg">Post not found.</p>`;
      }
    }

    loadPost(id);