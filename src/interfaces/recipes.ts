export interface ListResponse {
  count: number;
  results: Recipe[];
}

export interface Instruction {
  id: number;
  position: number;
  start_time: number;
  appliance?: string;
  end_time: number;
  temperature?: string;
  display_text: string;
}

export interface UserRating {
  count_negative: number;
  count_positive: number;
  score: number;
}

export interface RecipeListRequestParams {
  from: number;
  size: number;
  tags?: string;
  q?: string;
  sort?: string;
}

export interface Recipe {
  approved_at: number;
  aspect_ratio: string;
  beaty_url?: string;
  brand?: string;
  brand_id?: string;
  buzz_id?: string;
  canomical_id: string;
  compilations: any[];
  cook_time_minutes: number;
  country: string;
  created_at: number;
  credits: RecipeCredit[];
  description: string;
  draft_status: string;
  id: number;
  inspired_by_url: string;
  instructions: RecipeInstructions[];
  keywords: string;
  language: string;
  prep_time_minutes: number;
  sections: RecipeSection[];
  thumbnail_url: string;
  thumbnail_alt_text: string;
  user_ratings: {
    count_negative: number;
    count_positive: number;
    score: number;
  };

  name: string;
  num_serving: string;
  nutritions: RecipeNutritions;
  total_time_minutes: number;

  video_url: string;
  video_id: number;
}

export interface RecipeCredit {
  name?: string;
  type: string;
}

export interface RecipeInstructions {
  appliance?: string;
  display_text: string;
  end_time: number;
  id: number;
  position: number;
  start_time: number;
  temperature: number;
  hacks?: RecipeInstructionHacks[];
}

export interface RecipeInstructionHacks {
  end_index: number;
  id: number;
  match: string;
  start_index: number;
}

export interface RecipeNutritions {
  calories: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  protein: number;
  sugar: number;
  updated_at: string;
}

export interface RecipeSection {
  components: RecipeSectionComponent[];
  name?: string;
  position: number;
}

export interface RecipeSectionComponent {
  id: number;
  ingredient: RecipeIngredient;
  measurements: RecipeMeasurement[];
  raw_text: string;
}

export interface RecipeIngredient {
  id: number;
  name: string;
}

export interface RecipeMeasurement {
  id: number;
  quantity: string;
  unit: {
    name: string;
    system: 'metric' | 'imperial';
  };
  raw_text: string;
}
