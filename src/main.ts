interface CompanyProfile {
  name: string;
  sector: string;
  founders: string;
  description: string;
  url: string;
}

const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const menuPanel = document.querySelector<HTMLElement>(".menu-panel");
const siteHeader = document.querySelector<HTMLElement>(".site-header");
const headerSections = [...document.querySelectorAll<HTMLElement>("main > section, .site-footer")];
const headerControls = siteHeader
  ? [...siteHeader.querySelectorAll<HTMLElement>(".wordmark, .header-link, .menu-toggle")]
  : [];

function updateHeaderControlContrast(section: HTMLElement, headerHeight: number): void {
  const images = [...section.querySelectorAll<HTMLImageElement>("img")]
    .map((image) => image.getBoundingClientRect());

  headerControls.forEach((control) => {
    const bounds = control.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = headerHeight / 2;
    const overlapsImage = images.some((image) => (
      centerX >= image.left && centerX <= image.right && centerY >= image.top && centerY <= image.bottom
    ));
    control.classList.toggle("is-on-image", overlapsImage);
  });
}

function updateHeaderOnScroll(): void {
  if (!siteHeader) return;

  const isScrolled = window.scrollY > 40;
  siteHeader.classList.toggle("is-scrolled", isScrolled);
  siteHeader.classList.remove("is-over-image");

  if (!isScrolled) {
    siteHeader.style.removeProperty("--header-surface");
    siteHeader.style.removeProperty("--header-ink");
    return;
  }

  const headerBounds = siteHeader.getBoundingClientRect();
  const section = headerSections.find((item) => {
    const bounds = item.getBoundingClientRect();
    return bounds.top <= headerBounds.height / 2 && bounds.bottom > headerBounds.height / 2;
  });

  if (!section) return;

  const crossesImage = [...section.querySelectorAll<HTMLImageElement>("img")].some((image) => {
    const bounds = image.getBoundingClientRect();
    return bounds.top < headerBounds.height && bounds.bottom > 0 && bounds.right > 0 && bounds.left < window.innerWidth;
  });

  if (crossesImage) {
    siteHeader.classList.add("is-over-image");
    updateHeaderControlContrast(section, headerBounds.height);
    return;
  }

  headerControls.forEach((control) => control.classList.remove("is-on-image"));

  let surface: HTMLElement | null = section;
  let background = getComputedStyle(surface).backgroundColor;
  while (surface && (background === "rgba(0, 0, 0, 0)" || background === "transparent")) {
    surface = surface.parentElement;
    background = surface ? getComputedStyle(surface).backgroundColor : "rgb(247, 248, 244)";
  }

  const channels = background.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [247, 248, 244];
  const luminance = channels.reduce((total, channel, index) => {
    return total + (channel / 255) * [0.2126, 0.7152, 0.0722][index];
  }, 0);

  siteHeader.style.setProperty("--header-surface", background);
  siteHeader.style.setProperty("--header-ink", luminance > 0.45 ? "#111412" : "#ffffff");
}

window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
window.addEventListener("resize", updateHeaderOnScroll);
updateHeaderOnScroll();

if (menuToggle && menuPanel) {
  function setMenuOpen(open: boolean): void {
    menuToggle?.setAttribute("aria-expanded", String(open));
    if (menuPanel) menuPanel.hidden = !open;
  }

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  menuPanel.addEventListener("click", (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest("a")) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  document.addEventListener("click", (event: MouseEvent) => {
    if (!menuPanel.hidden && event.target instanceof Element && !event.target.closest(".site-header")) {
      setMenuOpen(false);
    }
  });
}

const companies: Record<string, CompanyProfile> = {
  ebank: {
    name: "EBANX",
    sector: "Fintech",
    founders: "Alphonse Voigt, João Del Valle e Wagner Ruiz",
    description: "Uma fintech de pagamentos cross-border que conecta empresas globais à América Latina, permitindo métodos locais de pagamento e facilitando a expansão internacional.",
    url: "https://www.ebanx.com/pt-br/",
  },
  delend: {
    name: "Delend",
    sector: "Fintech",
    founders: "Aurimar Santana (Harry), Fernando Steler e Lício Carvalho",
    description: "Fintech brasileira que usa IA e Open Finance para ajudar PMEs a acessar crédito e gerir finanças. Integra dados, Pix e recebíveis para otimizar fluxo de caixa e decisões.",
    url: "https://delend.com.br/",
  },
  oneskin: {
    name: "OneSkin",
    sector: "Healthcare",
    founders: "Carolina Reis Oliveira e Alessandra Zonari",
    description: "Empresa de biotecnologia que pesquisa o envelhecimento da pele em nível celular e desenvolve soluções com foco em saúde e longevidade.",
    url: "https://www.oneskin.co/",
  },
  livance: {
    name: "Livance",
    sector: "Healthcare",
    founders: "Claudio Mifano, Fábio Medaglia Soccol e Gustavo Köpke",
    description: "Consultórios sob demanda para profissionais de saúde, com agendamento, recepção e prontuário digital, reduzindo custos fixos e simplificando a gestão clínica.",
    url: "https://livance.com.br/",
  },
  vtex: {
    name: "VTEX",
    sector: "Enterprise Software & Services",
    founders: "Mariano Gomide de Faria e Geraldo Thomaz Jr.",
    description: "Plataforma global de ecommerce que integra catálogo, pedidos, pagamentos e marketplaces em um sistema cloud nativo para operações mais rápidas e escaláveis.",
    url: "https://www.vtex.com/pt-br/",
  },
  insider: {
    name: "Insider",
    sector: "Retail & Consumer Tech",
    founders: "Carol Matsuse e Yuri Gricheno",
    description: "Marca de roupas com tecidos tecnológicos que oferecem conforto, controle de odor e respirabilidade em peças essenciais, duráveis e funcionais.",
    url: "https://www.insiderstore.com.br/",
  },
};

const companyTabs = [...document.querySelectorAll<HTMLButtonElement>(".company-tab")];
const companyFields = {
  name: document.querySelector<HTMLElement>("#company-name"),
  sector: document.querySelector<HTMLElement>("#company-sector"),
  founders: document.querySelector<HTMLElement>("#company-founders"),
  description: document.querySelector<HTMLElement>("#company-description"),
  link: document.querySelector<HTMLAnchorElement>("#company-link"),
  number: document.querySelector<HTMLElement>("#company-number"),
};

function selectCompany(tab: HTMLButtonElement): void {
  const company = companies[tab.dataset.company ?? ""];
  if (!company || !companyFields.name || !companyFields.sector || !companyFields.founders
    || !companyFields.description || !companyFields.link || !companyFields.number) return;

  companyTabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  companyFields.name.textContent = company.name;
  companyFields.sector.textContent = company.sector;
  companyFields.founders.textContent = company.founders;
  companyFields.description.textContent = company.description;
  companyFields.link.href = company.url;
  companyFields.number.textContent = `${String(companyTabs.indexOf(tab) + 1).padStart(2, "0")} / 06`;
}

companyTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectCompany(tab));
  tab.addEventListener("keydown", (event: KeyboardEvent) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();
    const offset = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
    const nextTab = companyTabs[(index + offset + companyTabs.length) % companyTabs.length];
    if (!nextTab) return;
    selectCompany(nextTab);
    nextTab.focus();
  });
});