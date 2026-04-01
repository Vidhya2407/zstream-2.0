import type { MinisApiResponse } from '../../lib/api/contracts';

export type MiniItem = NonNullable<MinisApiResponse['data']>['items'][number];

export interface MiniInteractions {
  appreciated: boolean;
  recycled: boolean;
  saved: boolean;
  shared: boolean;
}


