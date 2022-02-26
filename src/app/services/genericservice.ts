import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export abstract class AbstractRestService<T> {
    protected constructor(protected http: HttpClient) {
    }

    list(url: string, options ?: object): Promise<T[]> {
        return this.http.get<T[]>(url, options).toPromise();
    }

    get(url: string, id: number, options ?: object): Promise<T> {
        return this.http.get<T>(`${url}/${id}`, options).toPromise();
    }

    create(url: string, object: T, options ?: object): Promise<T> {
        return this.http.post<T>(url, object, options).toPromise();
    }

    put(url: string, id: number, object: T, options ?: object): Promise<T> {
        return this.http.put<T>(`${url}/${id}`, object, options).toPromise();
    }

    delete(url: string, id: number, options ?: object): Promise<void> {
        return this.http.delete<void>(`${url}/${id}`, options).toPromise();
    }
}

export function saveDataToLocalhost(data: any): void {
    const keys = Object.keys(data);
    keys.forEach((key: string) => {
        localStorage.setItem(key, data[key]);
    });
}
