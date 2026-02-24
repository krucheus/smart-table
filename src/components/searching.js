import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  // создаём компаратор, который сначала пропускает пустые значения,
  // а потом ищет по нескольким полям
  const compare = createComparison([
    rules.skipEmptyTargetValues,
    rules.searchMultipleFields(
      searchField,
      ['date', 'customer', 'seller'], // поля, по которым будем искать
      false
    )
  ]);

  return (data, state) => {
    // фильтруем массив данных с помощью компаратора

    if (!state[searchField] || state[searchField].trim() === "") {
      return data;
    }
    return data.filter(item => compare(item, state));
  };
}