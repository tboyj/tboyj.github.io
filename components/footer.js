class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            .foot
            {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 5px 0;
                background: var(--base-black);
                color: white;
                font-family: var(--font-datatype);
            }
        </style>
        <div class="foot">
            <p>&copy; 2026 Jackson Philips</p>
        </div>
        `
    }
}

customElements.define('site-footer', Footer);