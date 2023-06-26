import type { Meta, Story } from '@storybook/react';
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPrev,
  PaginationProps,
} from '../src';
import React, { useState } from 'react';
import './Pagination.css';

const meta: Meta = {
  title: 'Controlled Pagination',
  component: Pagination,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const DefaultPagination: Story<PaginationProps> = (props) => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      {...props}
      page={page}
      onPageChange={setPage}
      paginationA11yOptions={{
        dotsMessage: 'dots message',
        nextMessage: 'next button',
        prevMessage: 'prev button',
        pageMessage: 'page',
      }}
      className='pagination'
    >
      <PaginationPrev className='pagination-next pagination-item'>
        {`<`}
      </PaginationPrev>
      <PaginationList className='pagination-item' truncateText='...' />
      <PaginationNext className='pagination-prev pagination-item'>
        {`>`}
      </PaginationNext>
    </Pagination>
  );
};

export const PaginationRenderProps = DefaultPagination.bind({});

PaginationRenderProps.args = {
  total: 10,
  siblings: 1,
  boundaries: 1,
  paginationA11yOptions: {
    dotsMessage: 'dots message',
    nextMessage: 'next button',
    prevMessage: 'prev button',
    pageMessage: 'page',
  },
};
