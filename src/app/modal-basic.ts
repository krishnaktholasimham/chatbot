import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './modal-basic.html'
})
export class NgbdModalBasic {
  closeResult: string;

  constructor(private modalService: NgbModal, private router : Router) {}

  open(content:any) {
    this.router.navigate(['./chat']);
    /*this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });*/
  }

   open1(content:any) {
    this.router.navigate(['./chat/exception']);
  }
}