import type { Meta, Story } from '@storybook/react';
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPrev,
  PaginationProps,
} from '../src';
import React from 'react';
import './Pagination.css';

const meta: Meta = {
  title: 'Pagination',
  component: Pagination,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const DefaultPagination: Story<PaginationProps> = (props) => {
  return (
    <Pagination className='pagination' {...props}>
      <PaginationPrev className='pagination-next pagination-item' asChild>
        <a>{'<'}</a>
      </PaginationPrev>
      <PaginationList
        renderItem={({ value }) => (
          <a href={'/?page=' + value} className='pagination-item'>
            {value}
          </a>
        )}
      />
      <PaginationNext className='pagination-prev pagination-item' asChild>
        <a>{'>'}</a>
      </PaginationNext>
    </Pagination>
  );
};

export const PaginationRenderProps = DefaultPagination.bind({});

PaginationRenderProps.args = {
  page: 1,
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
