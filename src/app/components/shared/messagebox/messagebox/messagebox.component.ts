import { Component, Input, OnChanges, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.scss']
})
export class MessageboxComponent implements OnInit {

  @Input()
  Title: string;

  @Input()
  Message: string;

  @Output()
  dialogClosed = new EventEmitter<boolean>();

  constructor() { }
  @ViewChild('myModal') myModal;

  ngOnInit(): void {
  }

  public Open(){
    this.myModal.open();
  }

  ok() {
    this.dialogClosed.emit(true);
    this.myModal.close();
  }

  cancel(){
    this.dialogClosed.emit(true);
    this.myModal.close();
  }


}
