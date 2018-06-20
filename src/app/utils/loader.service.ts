import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
	public pendingRequests: number = 0;
	public showLoading: boolean = false;
	private loaderSubject = new Subject<LoaderState>();
	loaderState = this.loaderSubject.asObservable();

	private _loadingStarted = new EventEmitter<any>();
	private _loadingCompleted = new EventEmitter<any>();

	constructor() { }
	show() {
		/*console.log("Came here");
		setTimeout(() => {
			console.log("Calling here");
			this.loaderSubject.next(<LoaderState>{showLoading: true});
		}, 0)*/
		this.pendingRequests++;
		if (!this.showLoading) {
	  	    this.showLoading = true;
	  	    //$('body').spin("modal", "#FFFFFF", "rgba(51, 51, 51, 0.1)");
	  	    this.startLoading();
	  	}
	  	this.showLoading = true;
    }
	hide() {
		this.pendingRequests--;
		if (this.pendingRequests <= 0) {
	  	  if (this.showLoading) {
	  	    //$('body').spin("modal", "#FFFFFF", "rgba(51, 51, 51, 0.1)");
	  	    this.stopLoading();
	  	  }
	  	  this.showLoading = false;
	  	}
        //this.loaderSubject.next(<LoaderState>{showLoading: false});
        
    }

	public startLoading() {
		this._loadingStarted.emit();
	}

	public stopLoading() {
		this._loadingCompleted.emit();
	}

	get onStartLoading() {
		return this._loadingStarted;
	}

	get onStopLoading() {
		return this._loadingCompleted;
	}

}



export interface LoaderState {
    showLoading: boolean;
}