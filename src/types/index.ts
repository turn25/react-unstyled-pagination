export interface PaginationA11yOptions {
  dotsMessage?: string;
  prevMessage?: string;
  nextMessage?: string;
  pageMessage?: string;
}

export type PaginationItemType = 'dots' | 'next' | 'prev';

export type PaginationItemValue = number | PaginationItemType;
