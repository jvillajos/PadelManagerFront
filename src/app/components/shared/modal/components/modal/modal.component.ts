import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'modal',
    styleUrls: ['modal.component.scss'],
    templateUrl: 'modal.component.html'
})

export class ModalComponent implements OnDestroy {

    @Input() public modalClass: string;

    @Input() public closeOnEscape = true;

    @Input() public closeOnOutsideClick = true;

    @Input() public title: string;

    @Input() public hideCloseButton = false;

    @Input() public cancelButtonLabel: string;

    @Input() public submitButtonLabel: string;

    @Input() public backdrop = true;

    // tslint:disable-next-line:no-output-on-prefix
    @Output() readonly onOpen = new EventEmitter(false);
    // tslint:disable-next-line:no-output-on-prefix
    @Output() readonly onClose = new EventEmitter(false);
    // tslint:disable-next-line:no-output-on-prefix
    @Output() readonly onSubmit = new EventEmitter(false);

    // -------------------------------------------------------------------------
    // Public properties
    // -------------------------------------------------------------------------

    public isOpened = false;

    // -------------------------------------------------------------------------
    // Private properties
    // -------------------------------------------------------------------------

    @ViewChild('modalRoot') public modalRoot: ElementRef;

    // -------------------------------------------------------------------------
    // Lifecycle Methods
    // -------------------------------------------------------------------------

    ngOnDestroy(): void {
        document.body.className = document.body.className.replace(/modal-open\b/, '');
        document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className.replace(/modal-open\b/, '');
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    open(...args: Array<any>): void {
        if (this.isOpened) {
            return;
        }

        this.isOpened = true;
        document.body.className += ' modal-open';
        document.getElementsByTagName('html')[0].className += ' modal-open';

        window.setTimeout(() => {
            if (this.modalRoot) {
                this.modalRoot.nativeElement.scrollTop = 0;
                this.modalRoot.nativeElement.focus();
            }
            this.onOpen.emit(args);
        }, 0);
    }

    close(...args: Array<any>): void {
        if (!this.isOpened) {
            return;
        }
        document.body.className = document.body.className.replace(/modal-open\b/, '');
        document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className.replace(/modal-open\b/, '');
        this.isOpened = false;
        this.onClose.emit(args);
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    public preventClosing(event: MouseEvent): void {
        event.stopPropagation();
    }
}
