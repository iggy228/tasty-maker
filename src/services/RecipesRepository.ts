import type { RecipeListRequestParams } from '@/interfaces/paramsBodys.interfaces'
import { axiosInstance } from './axios'
import type { ListResponse } from '@/interfaces/recipes.interfaces'
import type { SuggestionResults } from '@/interfaces/suggestions.interface'

export class RecipesRepository {
  static async getRecipesList(requestParams: RecipeListRequestParams): Promise<ListResponse> {
    const result = await axiosInstance.get('recipes/list', {
      params: requestParams
    })
    return result.data
  }
  static async getAutoCompleteSuggestions(prefix: string): Promise<SuggestionResults> {
    const result = await axiosInstance.get('recipes/auto-complete', {
      params: {
        prefix: prefix
      }
    })
    return result.data
  }
}
