import { institutionalPartners } from "../data/partners";

const searchInput = document.querySelector<HTMLInputElement>("#partner-search");
const yearSelect = document.querySelector<HTMLSelectElement>("#partner-year");
const grid = document.querySelector<HTMLDivElement>("#partner-grid");
const count = document.querySelector<HTMLElement>("#partner-count");
const clearButton = document.querySelector<HTMLButtonElement>("#partner-clear");

function initializeYears(): void {
  if (!yearSelect) return;
  const years = [...new Set(institutionalPartners.map((partner) => partner.year).filter(Boolean))]
    .sort((first, second) => Number(second) - Number(first));
  years.forEach((year) => yearSelect.add(new Option(year, year)));
}

function renderPartners(): void {
  if (!grid || !count) return;
  const search = searchInput?.value.trim().toLocaleLowerCase("pt-BR") ?? "";
  const selectedYear = yearSelect?.value ?? "";
  const matches = institutionalPartners.filter((partner) => {
    const matchesSearch = !search || `${partner.name} ${partner.description}`
      .toLocaleLowerCase("pt-BR").includes(search);
    return matchesSearch && (!selectedYear || partner.year === selectedYear);
  });

  count.textContent = `${matches.length} ${matches.length === 1 ? "parceiro" : "parceiros"}`;
  if (matches.length === 0) {
    grid.innerHTML = '<p class="partners-empty">Nenhum parceiro encontrado com esses filtros.</p>';
    return;
  }

  grid.innerHTML = matches.map((partner, index) => `
    <a class="partner-card" href="${partner.website}" target="_blank" rel="noreferrer" aria-label="${partner.name}: abrir site do parceiro em nova aba">
      <span class="partner-card-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="partner-logo"><img src="${partner.logo}" alt="Logo de ${partner.name}" loading="lazy" /></span>
      <span class="partner-card-info">${partner.year ? `<small>${partner.year}</small>` : "<small>REDE ENDEAVOR</small>"}<strong>${partner.name}</strong><span>${partner.description}</span></span>
      <span class="partner-card-arrow" aria-hidden="true">↗</span>
    </a>`).join("");
}

initializeYears();
renderPartners();
searchInput?.addEventListener("input", renderPartners);
yearSelect?.addEventListener("change", renderPartners);
clearButton?.addEventListener("click", (event) => {
  event.preventDefault();
  if (searchInput) searchInput.value = "";
  if (yearSelect) yearSelect.value = "";
  renderPartners();
});
