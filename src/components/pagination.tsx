import { HTMLAttributes, ReactNode, forwardRef, useCallback } from 'react';
import { usePagination } from '../hooks';
import { PaginationContext, usePaginationContext } from './pagination-context';
import { PaginationA11yOptions, PaginationItemValue } from '../types';
import { Slot, SlotProps } from '@radix-ui/react-slot';

export interface PaginationNavigationProps
  extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Merges its props onto its immediate child
   */
  asChild?: boolean;
  addDisabledAttribute?: boolean;
}

const PaginationPrev = forwardRef<HTMLButtonElement, PaginationNavigationProps>(
  (props, ref) => {
    const { asChild, addDisabledAttribute, ...rest } = props;
    const { activePage, paginationA11yOptions, onPageChange } =
      usePaginationContext();

    const Comp = asChild ? Slot : 'button';
    const isDisabled = activePage <= 1;

    const goToPrevPage = useCallback(() => {
      if (isDisabled) return;
      onPageChange(activePage - 1);
    }, [isDisabled, onPageChange, activePage]);

    return (
      <Comp
        ref={ref}
        role='button'
        disabled={addDisabledAttribute ? isDisabled : undefined}
        data-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        aria-label={paginationA11yOptions.prevMessage}
        onClick={goToPrevPage}
        data-ui='prev'
        {...rest}
      />
    );
  }
);
PaginationPrev.displayName = 'PaginationPrev';

const PaginationNext = forwardRef<HTMLButtonElement, PaginationNavigationProps>(
  (props, ref) => {
    const { asChild, addDisabledAttribute, ...rest } = props;
    const { activePage, total, paginationA11yOptions, onPageChange } =
      usePaginationContext();

    const Comp = asChild ? Slot : 'button';
    const isDisabled = activePage === total;

    const goToNextPage = useCallback(() => {
      if (isDisabled) return;
      onPageChange(activePage + 1);
    }, [isDisabled, onPageChange, activePage]);

    return (
      <Comp
        ref={ref}
        role='button'
        disabled={addDisabledAttribute ? isDisabled : undefined}
        data-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        onClick={goToNextPage}
        aria-label={paginationA11yOptions.nextMessage}
        data-ui='next'
        {...rest}
      />
    );
  }
);
PaginationNext.displayName = 'PaginationNext';

export interface PaginationListProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Display text of dot element (default ...)
   */
  truncateText?: string;
  /**
   * The pagination item render function.
   * @param item: { value, isActive, ariaLabel }
   * @returns
   */
  renderItem?: (item: {
    value: PaginationItemValue | string;
    isActive: boolean;
    ariaLabel: string | undefined;
  }) => ReactNode;
}

interface PageProps extends SlotProps {
  'data-active': boolean;
  'data-ui': 'page' | 'dot';
}

const PaginationList = (props: PaginationListProps) => {
  const { renderItem, truncateText = '...', ...rest } = props;
  const { activePage, range, paginationA11yOptions, onPageChange } =
    usePaginationContext();

  const renderListItem = useCallback(
    (value: PaginationItemValue, index: number) => {
      const key = index;
      const isDot = value === 'dots';
      const pageValue = isDot ? truncateText : value;
      const ariaLabel = isDot
        ? paginationA11yOptions.dotsMessage
        : paginationA11yOptions.pageMessage + ' ' + pageValue;
      const isActive = value === activePage;

      const goToPage = (page: number) => {
        if (isDot) return;
        onPageChange(page);
      };

      const pageProps: PageProps = {
        onClick: () => goToPage(+value),
        tabIndex: isDot ? -1 : 0,
        'aria-current': isActive ? 'page' : undefined,
        'aria-hidden': isDot ? 'true' : undefined,
        'aria-label': ariaLabel,
        'data-active': isActive,
        'data-ui': isDot ? 'dot' : 'page',
      };

      if (renderItem && typeof renderItem === 'function') {
        return (
          <Slot key={key} {...pageProps} {...rest}>
            {renderItem({ value: pageValue, isActive, ariaLabel })}
          </Slot>
        );
      }

      return (
        <button key={key} {...pageProps} {...rest}>
          {pageValue}
        </button>
      );
    },
    [
      activePage,
      onPageChange,
      renderItem,
      truncateText,
      paginationA11yOptions.dotsMessage,
      paginationA11yOptions.pageMessage,
      rest,
    ]
  );

  return <>{range.map(renderListItem)}</>;
};

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  /**
   *  Current page, start from 1 (can be controlled)
   */
  page: number;
  /**
   *  Total pages of pagination
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
  /**
   * Callback fired when page is changed
   * @param page the active page
   * @returns void
   */
  onPageChange?: (page: number) => void;
  /**
   * Options to change pagination items aria-label
   */
  paginationA11yOptions?: PaginationA11yOptions;
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (props: PaginationProps, ref) => {
    const {
      page = 1,
      total = 10,
      boundaries = 1,
      siblings = 1,
      onPageChange = () => {},
      paginationA11yOptions = {
        dotsMessage: 'see more...',
        prevMessage: 'to previous page',
        nextMessage: 'to next page',
        pageMessage: 'to page',
      },
      ...rest
    } = props;

    const { activePage, range } = usePagination({
      page,
      total,
      boundaries,
      siblings,
    });

    return (
      <PaginationContext.Provider
        value={{
          activePage,
          range,
          total,
          onPageChange,
          paginationA11yOptions,
        }}
      >
        <nav ref={ref} aria-label='pagination navigation' {...rest} />
      </PaginationContext.Provider>
    );
  }
);
Pagination.displayName = 'Pagination';

export { Pagination, PaginationPrev, PaginationNext, PaginationList };
