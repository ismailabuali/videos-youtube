import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCardComponent } from './video-card.component';

describe('VidCardComponent', () => {
  let component: VideoCardComponent;
  let fixture: ComponentFixture<VideoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
