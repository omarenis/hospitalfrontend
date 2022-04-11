import {AbstractRestService} from '../../services/genericservice';
import {SecureStorageService} from '../../services/secure-storage.service';
interface Option {
    headers: object;
    params: object | null | undefined;
}
export class DynamicTableCrud<T> {
    data !: T[];
    numberItems !: number;
    protected options !: Option;

    constructor(protected service: AbstractRestService<T>, protected actionUrl: string,
                protected secureStorageService: SecureStorageService) {
    }

    async getData(params?: object): Promise<void> {
        if (this.options === undefined){
        const access = localStorage.getItem('access');
        if (access !== null){
                this.options = {
                    headers: {Authorization : `Bearer ${this.secureStorageService.getToken(access)}`},
                    params: null
                };
            }
        }
        console.log(this.options);
        if (params !== null && params !== undefined){
            this.options.params = params;
        }
        this.data = await this.service.list(this.actionUrl, this.options);
        console.log(this.data);
        this.numberItems = this.data.length;
    }

    delete(id: number | undefined, index: number): void {
        console.log(id);
        if (id !== undefined) {
            this.service.delete(this.actionUrl, id, this.options).then(async () => {
                this.data.splice(index, 1);
                this.numberItems--;
            });
        }
    }
}
