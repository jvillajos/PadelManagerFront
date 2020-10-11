import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalFooterComponent } from './modal-footer.component';

describe('shared.components.modal.components.modal-footer.ModalFooterComponent', () => {
  let component: ModalFooterComponent;
  let fixture: ComponentFixture<ModalFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
