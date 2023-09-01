export interface PaginateData<T> {
  total: number
  totalPages: number
  currentPage: number
  data: T[]
}