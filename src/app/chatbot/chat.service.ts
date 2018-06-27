import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ChatService {
	private URL : string = 'http://3d233487.ngrok.io/parse?q=';
	private EXCEPTION_URL : string = 'http://e93ba22b.ngrok.io/exceptionHub/fetch?exception=';
	private SAVE_EXCEPTION_URL : string = 'http://e93ba22b.ngrok.io/exceptionHub/save';


	constructor(private http : HttpClient){

	}
	
	sendMessage(message : string) : Observable<any> {
		return this.http.get(this.URL + message);
	}

	sendDetailException(exception : string) : Observable<any> {
		return this.http.get(this.EXCEPTION_URL + exception);
	}

	saveNewException(exception : any) : Observable<any> {
		let options : any = {
			headers : {
				"Content-Type" : "application/json"
			}
		}
		return this.http.post(this.SAVE_EXCEPTION_URL, exception, options);
	}

}