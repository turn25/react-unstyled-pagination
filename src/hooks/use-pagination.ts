import { useMemo } from 'react';
import { range } from '../utils';
import { PaginationItemValue } from '../types';

export interface UsePaginationProps {
  /**
   * Current active page
   */
  page: number;
  /**
   * Total pages of pagination
   */
  total: number;
  /**
   * Number of visible pages at the start and end of pagination
   */
  boundaries?: number;
  /**
   * Number of visible pages before and after the current page.
   */
  siblings?: number;
}

const usePagination = (props: UsePaginationProps) => {
  const { page, total, siblings = 1, boundaries = 1 } = props;

  const paginationRange = useMemo((): PaginationItemValue[] => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;

    if (totalPageNumbers >= total) {
      return range(1, total);
    }

    const siblingStart = Math.max(page - siblings, boundaries);
    const siblingEnd = Math.min(page + siblings, total - boundaries);

    const showLeftDot = siblingStart > boundaries + 2;
    const showRightDot = siblingEnd < total - (boundaries + 1);

    if (!showLeftDot && showRightDot) {
      const leftItemCount = siblings * 2 + boundaries + 2;

      return [
        ...range(1, leftItemCount),
        'dots',
        ...range(total - (boundaries - 1), total),
      ];
    }

    if (showLeftDot && !showRightDot) {
      const rightItemCount = boundaries + 1 + 2 * siblings;

      return [
        ...range(1, boundaries),
        'dots',
        ...range(total - rightItemCount, total),
      ];
    }

    return [
      ...range(1, boundaries),
      'dots',
      ...range(siblingStart, siblingEnd),
      'dots',
      ...range(total - boundaries + 1, total),
    ];
  }, [total, page, siblings, boundaries]);

  return {
    activePage: page,
    range: paginationRange,
  };
};

export { usePagination };
