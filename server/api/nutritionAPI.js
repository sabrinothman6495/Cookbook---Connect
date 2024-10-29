import { get } from 'axios';
import getAccessToken from '../utils/auth';

async function searchRecipe(query) {
  const token = await getAccessToken();
  const response = await get('https://platform.fatsecret.com/rest/server.api', {
    params: { method: 'recipe.search', format: 'json', search_expression: query },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export default searchRecipe;

