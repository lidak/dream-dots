export const baseUrl = 'https://bvvzj4c6gl.execute-api.us-west-2.amazonaws.com/Prod';
import { xApiKey } from '../../../env.json';
export const commonHeaders = {
  'x-api-key': xApiKey,
  'Content-Type': 'application/json',
};