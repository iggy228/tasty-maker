export interface ListResponse {
  count: number
  results: Recipe[]
}

export interface Recipe {
  id: number
  instructions: Instruction[]
  prep_time_minutes: number
  thumbnail_url: string
  is_one_top: boolean
  user_ratings: UserRating
  description: string
  cook_time_minutes: number
  yields: string
  name: string
  language: string
  num_servings: number
  total_time_minutes: number
  is_shoppable: boolean
}

export interface Instruction {
  id: number
  position: number
  start_time: number
  appliance?: string
  end_time: number
  temperature?: string
  display_text: string
}

export interface UserRating {
  count_negative: number
  count_positive: number
  score: number
}

export interface RecipeListRequestParams {
  from: number
  size: number
  tags?: string
  q?: string
  sort?: string
}
