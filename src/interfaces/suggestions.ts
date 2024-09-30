export interface SuggestionResults {
  results: Suggestion[];
}

export interface Suggestion {
  display: string;
  search_value: string;
  type: string;
}

export interface SearchBarSuggestion {
  display_text: string;
  search_value: string;
}
