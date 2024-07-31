export interface Filter {
  search?: string;
}

export interface Sort {
  field?: string;
  order?: 'ASC' | 'DESC';
}

export interface Pagination {
  page?: number;
  perPage?: number;
}
