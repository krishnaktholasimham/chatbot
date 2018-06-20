import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ChatService {
	private URL : string = 'http://c7c75996.ngrok.io/parse?q=';
	constructor(private http : HttpClient){

	}
	sendMessage(message : string) : Observable<any> {
		return this.http.get(this.URL + message);
	}

}