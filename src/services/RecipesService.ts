import { axiosInstance } from './axios';
import type { ListResponse, Recipe, RecipeListRequestParams } from '@/interfaces/recipes';
import type { SuggestionResults } from '@/interfaces/suggestions';

export class RecipesService {
  static async list(requestParams: RecipeListRequestParams): Promise<ListResponse> {
    const result = await axiosInstance.get('recipes/list', {
      params: requestParams
    });
    return result.data;
  }
  static async getAutoCompleteSuggestions(prefix: string): Promise<SuggestionResults> {
    const result = await axiosInstance.get('recipes/auto-complete', {
      params: {
        prefix: prefix
      }
    });
    return result.data;
  }
  static async listSimilarities(recipe_id: number): Promise<SuggestionResults> {
    const result = await axiosInstance.get('recipes/auto-complete', {
      params: {
        recipe_id
      }
    });
    return result.data;
  }
  static async recipeDetail(id: number): Promise<Recipe> {
    const result = await axiosInstance.get('recipes/get-more-info', {
      params: {
        id
      }
    });
    return result.data;
  }
}
