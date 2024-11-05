import { IPaginationReq, IPaginationRes } from '../interface/common.interface';

export const convertPaginationPrisma = (
  p: IPaginationReq,
): {
  skip: number;
  take: number;
} => {
  let skip = 0;
  if (p.page != 1) {
    skip = p.rowsPerPage * (p.page - 1);
  }
  return {
    skip,
    take: p.rowsPerPage,
  };
};

type TConvertPaginationRes = {
  count: number;
  page: number;
  rowsPerPage: number;
};
export const convertPaginationRes = <T>(
  { count, page, rowsPerPage }: TConvertPaginationRes,
  data: T,
): IPaginationRes<T> => {
  return {
    pagination: { count, page, rowsPerPage, totalPage: Math.ceil(count / rowsPerPage) },
    data: data,
  };
};
