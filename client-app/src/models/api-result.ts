export class ApiResult<T> {

    public results!: Array<T>;
    public page!: number;
    public pageSize!: number;
    public totalPages!: number;
    public totalCount!: number;

}