import {Component, HostListener,OnDestroy, OnInit} from '@angular/core';
import {YoutubeService} from "../../core/services";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy  {

  submitted : boolean = false;
  notFound  : boolean = false;
  isOneLoading : boolean = false;
  screenSize : string = '';
  destroyed$ = new Subject<void>();
  next : string = '';
  searchID : string = '';
  draggingIndex? : number;
  items;
  channel;
  constructor(private youtubeService: YoutubeService) {
  }

  @HostListener('window:scroll', [])

  onWindowScroll() {
    if (this.next) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-1) {
          this.loadMore();
      }
    }
  }

  @HostListener('window:resize', ['$event'])

  getScreenSize() {
    this.getSize()
  }

  ngOnInit(): void {
    this.getSize();
    // if last searched channel start
    try {
      this.searchID = localStorage.getItem('lastSearchedChannel') as string;
      if (this.searchID) {
        this.getDataFromLocalStorage()
      }

    }
    catch(e) {
      console.log(e);
    }
  }

  getDateFromApi() {
    this.youtubeService.getChannelById(this.searchID)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(
            data => {
              this.channel=data;
            }, (error) => {
              this.submitted = false;
              this.notFound = true;
            }, () => {
              this.items = this.channel['items'];
              this.next = this.channel['nextPageToken'];
              this.submitted = false;
              this.saveChannelInfo();
            }
        );
  }

  getDataFromLocalStorage() {
    try {
      localStorage.setItem('lastSearchedChannel', this.searchID);
      let obj = localStorage.getItem(this.searchID);
      if (obj) {
        this.channel = JSON.parse(obj);
        this.items = this.channel['videos'];
        this.next = this.channel['next'];
        this.submitted = false;
      } else {
        this.getDateFromApi()
      }
    } catch(e) {
      this.getDateFromApi();
    }
  }

  search() {
    this.submitted = true;
    this.notFound = false;
    this.emptyData();
    this.getDataFromLocalStorage();
  }

  private _reorderItem(fromIndex: number, toIndex: number): void {
    const itemToBeReordered = this.items.splice(fromIndex, 1)[0];
    this.items.splice(toIndex, 0, itemToBeReordered);
    this.draggingIndex = toIndex;
  }

  onDragStart(index: number): void {
    this.draggingIndex = index;
  }

  onDragEnter(index: number): void {
    if (this.draggingIndex !== index) {
      this._reorderItem(this.draggingIndex!, index);
    }
  }

  onDragEnd(): void {
    this.draggingIndex = undefined;
    this.saveChannelInfo();
  }

  saveChannelInfo() {
    try {
      localStorage.setItem(this.searchID, JSON.stringify({videos: this.items, next: this.next}));
    }
    catch(e) {
      console.log(e);
    }
  }

  updateNote(val, ind) {
    this.items[ind]['snippet'] = val;
    this.saveChannelInfo();
  }

  loadMore() {
    this.isOneLoading = true;
    let extraData;
    this.youtubeService.getChannelById(this.searchID, this.next).subscribe(
        data => {
          extraData = data;
        }, (error) => {
          this.isOneLoading = false;

        }, () => {
          this.items = [...this.items, ...extraData['items']];
          this.next = extraData['nextPageToken'];
          this.saveChannelInfo();
          this.isOneLoading = false;

        }
    );
  }

  refreshVideos() {
    this.emptyData();
    window.document.body.scrollTop = 0;
    window.document.documentElement.scrollTop = 0;
    this.getDataFromLocalStorage();
  }

  getSize() {
    let wid = window.innerWidth;
    if (wid > 991) {
      this.screenSize = "high";
    } else if (wid > 767) {
      this.screenSize = "medium";
    } else
      this.screenSize = "default";

  }

  emptyData() {
    this.channel = [];
    this.items = null;
    this.next = '';
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
