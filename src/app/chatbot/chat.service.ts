import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
	private URL: string = 'http://27defd08.ngrok.io/parse?q=';
	private EXCEPTION_URL: string = 'http://08b36b68.ngrok.io/exceptionHub/fetch?exceptionKey={1}&exceptionValue={2}';
	private SAVE_EXCEPTION_URL: string = 'http://08b36b68.ngrok.io/exceptionHub/save';


	constructor(private http: HttpClient) {

	}

	sendMessage(message: string): Observable<any> {
		return this.http.get(this.URL + message);
	}

	sendDetailException(exception: string, value : string): Observable<any> {
		let params: Map<string, any> = new Map();
		params.set('1', exception);
		params.set('2', value);
		return this.http.get(this.substituteParams(this.EXCEPTION_URL, params));
	}

	saveNewException(request: any): Observable<any> {
		let options: any = {
			headers: {
				"Content-Type": "application/json"
			}
		}
		return this.http.post(this.SAVE_EXCEPTION_URL, request, options);
	}

	substituteParams(str: string, params: Map<string, string>): string {
		params.forEach((value: string, key: string) => {
			str = str.replace('{' + key + '}', value);
		});
		return str;
	}

}