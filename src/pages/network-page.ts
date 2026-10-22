type NetworkSection = {
  id: string;
  heading: string;
  copy: string[];
  ctaLabel: string;
  ctaUrl: string;
  image: string;
  imageAlt: string;
  note: string;
};

const sections: NetworkSection[] = [
  {
    id: "global",
    heading: "Conhecimento sem fronteiras. Conexões sem distância.",
    copy: [
      "A profundidade do nosso conhecimento geográfico, nossa rede mundial de pares e nosso alcance internacional fazem da Endeavor a principal rede global de empreendedores, para empreendedores e pelos próprios empreendedores.",
      "Conectar-se com pares, time ou mentores em qualquer lugar do planeta está sempre a um e-mail de distância.",
    ],
    ctaLabel: "Confira nossa Rede Global",
    ctaUrl: "https://endeavor.org/global-community/",
    image: "https://brasil.endeavor.org/wp-content/uploads/2026/04/ENDEAVOR-7-SETEMBRO-2025-19-1650x1650.jpg",
    imageAlt: "Comunidade Endeavor em encontro de empreendedores",
    note: "CONEXÕES QUE CRUZAM FRONTEIRAS",
  },
  {
    id: "local",
    heading: "Uma comunidade que faz o crescimento acontecer.",
    copy: [
      "A Endeavor Brasil conta com uma rede local vibrante e em constante crescimento, formada por um time dedicado, um Conselho e um grupo criteriosamente selecionado de mentores e embaixadores.",
      "Todos estão comprometidos em apoiar os melhores empreendedores de alto impacto a escalarem seus negócios no Brasil e no mundo.",
    ],
    ctaLabel: "Conheça os empreendedores da rede",
    ctaUrl: "empreendedores.html",
    image: "",
    imageAlt: "",
    note: "",
  },
];

const root = document.querySelector<HTMLElement>("#network-content");

if (root) {
  root.innerHTML = sections.map((section, index) => {
    const isGlobal = index === 0;

    return `
      <section class="network-${isGlobal ? "global" : "local"}" aria-labelledby="${isGlobal ? "global-title" : "local-title"}">
        ${isGlobal ? `
          <div class="network-global-copy">
            <p class="network-eyebrow network-eyebrow-dark">01 / Alcance global</p>
            <h2 id="global-title">${section.heading}</h2>
            ${section.copy.map((paragraph) => `<p>${paragraph}</p>`).join("")}
            <a class="network-link" href="${section.ctaUrl}" ${section.ctaUrl.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${section.ctaLabel} <span aria-hidden="true">↗</span></a>
          </div>
          <div class="network-global-visual">
            <img src="${section.image}" alt="${section.imageAlt}" loading="lazy" />
            <span class="network-visual-index">${section.note}</span>
          </div>
        ` : `
          <div class="network-local-top">
            <p class="network-eyebrow">02 / Presença local</p>
            <span class="local-coordinate">ENDEAVOR BRASIL</span>
          </div>
          <div class="network-local-body">
            <h2 id="local-title">${section.heading}</h2>
            <div>
              ${section.copy.map((paragraph) => `<p>${paragraph}</p>`).join("")}
              <a class="network-link network-link-light" href="${section.ctaUrl}">${section.ctaLabel} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div class="network-local-bottom"><span>EMPREENDEDORES</span><span>MENTORES</span><span>EMBAIXADORES</span><span>TIME ENDEAVOR</span></div>
        `}
      </section>
    `;
  }).join("");
}
