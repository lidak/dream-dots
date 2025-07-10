export const baseUrl = 'https://fermsp2ah6.execute-api.us-west-2.amazonaws.com/Prod';
import { xApiKey } from '../../../env.json';
export const commonHeaders = {
  'x-api-key': xApiKey,
  'Content-Type': 'application/json',
};