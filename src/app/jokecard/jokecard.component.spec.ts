import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokecardComponent } from './jokecard.component';

describe('JokecardComponent', () => {
  let component: JokecardComponent;
  let fixture: ComponentFixture<JokecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JokecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
