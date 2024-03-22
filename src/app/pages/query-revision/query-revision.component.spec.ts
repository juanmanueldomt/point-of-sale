import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryRevisionComponent } from './query-revision.component';

describe('QueryRevisionComponent', () => {
  let component: QueryRevisionComponent;
  let fixture: ComponentFixture<QueryRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryRevisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueryRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
