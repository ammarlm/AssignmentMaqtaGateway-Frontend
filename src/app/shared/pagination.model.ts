export class PaginationModel<T> {
  constructor(public totalItems: number ,
              public totalPages: number,
              public currentPage: number,
              public items: (T)[]) {
  }

}
