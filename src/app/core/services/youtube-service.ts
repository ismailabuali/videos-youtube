import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

import {YoutubeChanelList} from '../models';

@Injectable({providedIn: 'root'})
export class YoutubeService {
  constructor(
      private apiService: ApiService
  ) {
  }

  getChannelById(id, pageToken?): Observable<YoutubeChanelList> {
    let queryParams = {
      part: 'snippet,contentDetails',
      maxResult: 10,
      key: environment.youtubeApiKey,
      channelId: id
    };
    if (pageToken) {
      queryParams['pageToken'] = pageToken;
    }
    return this.apiService.get(queryParams)

  }

}
