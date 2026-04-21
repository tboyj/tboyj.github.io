class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            footer 
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
        <footer>
            <p>&copy; 2026 Jackson Philips. All rights reserved.</p>
        </footer>
        `
    }
}

customElements.define('site-footer', Footer);