import { AutoMap } from '@automapper/classes';

export class GenericFindAllDomainResponse<TEntity> {
  @AutoMap()
  data: Array<TEntity>;
  currentPage: number;
  @AutoMap()
  nextPage: number;
  @AutoMap()
  totalCount: number;
  @AutoMap()
  count: number;

  constructor(entity?: TEntity[], currentPage?, nextPage?, totalCount?, count?) {
    this.data = entity;
    this.currentPage = currentPage;
    this.nextPage = nextPage;
    this.totalCount = totalCount;
    this.count = count;
  }
}
