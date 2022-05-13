import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  @Input() video;
  @Input() screenSize;
  @Output('noteUpdated') noteUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor() {


  }

  ngOnInit(): void {
  }

  videoNoteChange() {

    this.noteUpdated.emit(this.video);
  }


}
