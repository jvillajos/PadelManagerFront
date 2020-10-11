import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalHeaderComponent } from './modal-header.component';

describe('shared.components.modal.components.modal-header.ModalHeaderComponent', () => {
  let component: ModalHeaderComponent;
  let fixture: ComponentFixture<ModalHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
