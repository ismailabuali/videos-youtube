import {Video} from './video';

export interface YoutubeChanelList {
  items: Video[],
  nextPageToken: string
}
