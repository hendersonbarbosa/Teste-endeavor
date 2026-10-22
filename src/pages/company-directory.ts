import { endeavorCompanies, formatTaxonomy, verticalLabels } from "../data/companies";

const pageSize = 20;
const searchInput = document.querySelector<HTMLInputElement>("#company-search");
const verticalSelect = document.querySelector<HTMLSelectElement>("#vertical-filter");
const subVerticalSelect = document.querySelector<HTMLSelectElement>("#subvertical-filter");
const grid = document.querySelector<HTMLDivElement>("#company-grid");
const detail = document.querySelector<HTMLElement>("#company-detail");
const resultCount = document.querySelector<HTMLElement>("#result-count");
const pageStatus = document.querySelector<HTMLElement>("#page-status");
const previousButton = document.querySelector<HTMLButtonElement>("#page-previous");
const nextButton = document.querySelector<HTMLButtonElement>("#page-next");
const totalLabel = document.querySelector<HTMLElement>("#companies-total");
const clearButton = document.querySelector<HTMLButtonElement>("#clear-filters");
const viewButtons = [...document.querySelectorAll<HTMLButtonElement>(".view-button")];

let currentPage = 1;
let selectedName = "";
let activeView: "grid" | "list" = "grid";

function populateVerticals(): void {
  if (!verticalSelect) return;
  Object.entries(verticalLabels)
    .sort(([, first], [, second]) => first.localeCompare(second, "pt-BR"))
    .forEach(([value, label]) => verticalSelect.add(new Option(label, value)));
}

function filteredCompanies() {
  const search = searchInput?.value.trim().toLocaleLowerCase("pt-BR") ?? "";
  const vertical = verticalSelect?.value ?? "";
  const subVertical = subVerticalSelect?.value ?? "";

  return endeavorCompanies.filter((company) => {
    const matchesSearch = !search || `${company.name} ${company.vertical} ${company.subVertical}`
      .toLocaleLowerCase("pt-BR").includes(search);
    return matchesSearch && (!vertical || company.vertical === vertical)
      && (!subVertical || company.subVertical === subVertical);
  });
}

function updateSubVerticals(): void {
  if (!subVerticalSelect) return;
  const selectedVertical = verticalSelect?.value ?? "";
  const previousValue = subVerticalSelect.value;
  const options = [...new Set(endeavorCompanies
    .filter((company) => !selectedVertical || company.vertical === selectedVertical)
    .map((company) => company.subVertical))]
    .sort((first, second) => formatTaxonomy(first).localeCompare(formatTaxonomy(second), "pt-BR"));

  subVerticalSelect.replaceChildren(new Option("Todas as subverticais", ""));
  options.forEach((value) => subVerticalSelect.add(new Option(formatTaxonomy(value), value)));
  if (options.includes(previousValue)) subVerticalSelect.value = previousValue;
}

function renderDetail(name: string): void {
  if (!detail) return;
  const company = endeavorCompanies.find((item) => item.name === name);
  if (!company) return;

  selectedName = company.name;
  detail.innerHTML = `
    <div class="detail-content">
      <span class="detail-index">EMPRESA DA REDE ENDEAVOR</span>
      <div class="detail-monogram">${company.name.charAt(0).toLocaleUpperCase("pt-BR")}</div>
      <p class="detail-sector">${verticalLabels[company.vertical] ?? formatTaxonomy(company.vertical)}</p>
      <h2>${company.name}</h2>
      <div class="detail-taxonomy"><span>Subvertical</span><strong>${formatTaxonomy(company.subVertical)}</strong></div>
      <p class="detail-note">Parte de uma rede que transforma trajetórias, empresas e economias.</p>
    </div>`;
  renderPage();
}

function renderPage(): void {
  if (!grid || !resultCount || !pageStatus || !previousButton || !nextButton) return;

  const matches = filteredCompanies();
  const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
  currentPage = Math.min(currentPage, pageCount);
  const start = (currentPage - 1) * pageSize;
  const visibleCompanies = matches.slice(start, start + pageSize);

  resultCount.textContent = `${matches.length} ${matches.length === 1 ? "empresa" : "empresas"}`;
  if (totalLabel) totalLabel.textContent = String(matches.length);
  pageStatus.textContent = `Página ${currentPage} de ${pageCount}`;
  previousButton.disabled = currentPage <= 1;
  nextButton.disabled = currentPage >= pageCount;
  grid.classList.toggle("is-list", activeView === "list");

  if (matches.length === 0) {
    grid.innerHTML = '<p class="company-empty">Nenhuma empresa encontrada com esses filtros.</p>';
    return;
  }

  grid.innerHTML = visibleCompanies.map((company, index) => `
    <button class="company-card${company.name === selectedName ? " is-active" : ""}" type="button" data-company="${company.name.replaceAll('"', "&quot;")}" aria-pressed="${company.name === selectedName}">
      <span class="company-card-index">${String(start + index + 1).padStart(3, "0")}</span>
      <span class="company-monogram" aria-hidden="true">${company.name.charAt(0).toLocaleUpperCase("pt-BR")}</span>
      <span class="company-card-copy"><strong>${company.name}</strong><small>${verticalLabels[company.vertical] ?? formatTaxonomy(company.vertical)}</small></span>
      <span class="company-card-arrow" aria-hidden="true">↗</span>
    </button>`).join("");
}

function resetToFirstPage(): void {
  currentPage = 1;
  renderPage();
}

populateVerticals();
updateSubVerticals();
renderPage();

searchInput?.addEventListener("input", resetToFirstPage);
verticalSelect?.addEventListener("change", () => {
  updateSubVerticals();
  resetToFirstPage();
});
subVerticalSelect?.addEventListener("change", resetToFirstPage);
clearButton?.addEventListener("click", (event) => {
  event.preventDefault();
  if (searchInput) searchInput.value = "";
  if (verticalSelect) verticalSelect.value = "";
  updateSubVerticals();
  if (subVerticalSelect) subVerticalSelect.value = "";
  resetToFirstPage();
});

grid?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const card = target.closest<HTMLButtonElement>(".company-card");
  if (card?.dataset.company) renderDetail(card.dataset.company);
});

previousButton?.addEventListener("click", () => {
  currentPage = Math.max(1, currentPage - 1);
  renderPage();
});
nextButton?.addEventListener("click", () => {
  currentPage += 1;
  renderPage();
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.view;
    if (view !== "grid" && view !== "list") return;
    activeView = view;
    viewButtons.forEach((item) => item.classList.toggle("is-selected", item === button));
    renderPage();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !(event.target instanceof HTMLInputElement)) {
    event.preventDefault();
    searchInput?.focus();
  }
  if (event.key === "Escape" && document.activeElement === searchInput && searchInput) {
    searchInput.value = "";
    resetToFirstPage();
    searchInput.blur();
  }
});
