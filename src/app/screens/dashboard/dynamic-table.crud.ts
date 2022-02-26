import {AbstractRestService} from '../../services/genericservice';
interface Option {
    headers: object;
    params: object | null;
}
export class DynamicTableCrud<T> {
    data !: T[];
    numberItems !: number;
    protected options !: Option;

    constructor(protected service: AbstractRestService<T>, protected actionUrl: string) {
    }

    async getData(): Promise<void> {
        this.data = await this.service.list(this.actionUrl, this.options);
        this.numberItems = this.data.length;
    }

    delete(id: number | undefined, index: number): void {
        if (id !== undefined) {
            this.service.delete(this.actionUrl, id, this.options).then(async (response: void) => {
                this.data.splice(index, 1);
                this.numberItems--;
            });
        }
    }
}
