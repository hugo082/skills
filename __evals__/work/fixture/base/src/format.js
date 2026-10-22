export function formatProgress(pagesRead, pages) {
  if (!pages) return "0%";
  return `${Math.round((pagesRead / pages) * 100)}%`;
}

export function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
