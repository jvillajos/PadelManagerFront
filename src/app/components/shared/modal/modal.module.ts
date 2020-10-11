import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { ModalFooterComponent } from './components/modal-footer/modal-footer.component';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        ModalComponent,
        ModalHeaderComponent,
        ModalContentComponent,
        ModalFooterComponent
    ],
    exports: [
        ModalComponent,
        ModalHeaderComponent,
        ModalContentComponent,
        ModalFooterComponent
    ]
})
export class ModalModule {
}
