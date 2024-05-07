import { Pagination as BPagination } from "react-bootstrap";

export type PaginationOptions = {
  className?: string;
  currentPage: number;
  total: number;
  max: number;
  onClick: (page: number) => void;
};

function makePaginationItem (page: number, current: number, onClick: (page: number) => void) {
  if (page === current) {
    return <BPagination.Item key={page} active>{page}</BPagination.Item>
  }

  return <BPagination.Item key={page} onClick={() => onClick(page)}>{page}</BPagination.Item>
}

export const Pagination: React.FC<PaginationOptions> = ({ className, currentPage: current, total, max, onClick }) => {
  const halfMax = Math.floor(max / 2);
  const first = Math.min(Math.max(current - halfMax, 1), total - max + 1);

  return (
    <BPagination className={className}>
      <BPagination.Item key={'<<'} disabled={current === 1} onClick={() => onClick(1)}>{'<<'}</BPagination.Item>
      <BPagination.Item key={'<'} disabled={current === 1} onClick={() => onClick(Math.max(current - 1, 1))}>{'<'}</BPagination.Item>
      {Array.from({ length: max }, (_, ipage) => makePaginationItem(ipage + first, current, onClick))}
      <BPagination.Item key={'>'} disabled={current === total} onClick={() => onClick(Math.min(current + 1, total))}>{'>'}</BPagination.Item>
      <BPagination.Item key={'>>'} disabled={current === total} onClick={() => onClick(total)}>{'>>'}</BPagination.Item>
    </BPagination>
  );
}