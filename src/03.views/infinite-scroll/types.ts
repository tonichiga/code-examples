export interface ResponseDataWithPagination<T> {
  data: T[];
  hasNextPage: boolean;
  maximumPages: number;
}
