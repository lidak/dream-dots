const isProd = process.env.NODE_ENV === 'production';

export const baseUrl = isProd ? 'https://hns7ojtqxj.execute-api.us-west-2.amazonaws.com/Prod/': 'https://4czhygoo62.execute-api.us-west-2.amazonaws.com/Dev';

import { xApiKey } from '../../../env.json';
export const commonHeaders = {
  'x-api-key': isProd? xApiKey.prod : xApiKey.dev,
  'Content-Type': 'application/json',
};