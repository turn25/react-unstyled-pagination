import { createContext, useContext } from 'react';
import { PaginationItemValue, PaginationA11yOptions } from '../types';

export interface PaginationContextProps {
  /**
   * Current active page
   */
  activePage: number;
  /**
   * Display range of pagination (eg: 1,2,3,4,5,...,10 or 1,...,6,7,8,9,10)
   */
  range: PaginationItemValue[];
  /**
   *  Total pages of pagination
   */
  total: number;
  /**
   * Callback fired when page is changed
   * @param page the active page
   * @returns void
   */
  onPageChange: (page: number) => void;
  /**
   * Options to change pagination items aria-label
   */
  paginationA11yOptions: PaginationA11yOptions;
}

const PaginationContext = createContext<PaginationContextProps | null>(null);

const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(
      'Pagination.* component must be rendered as child of PaginationRoot component'
    );
  }

  return context;
};

export { PaginationContext, usePaginationContext };
