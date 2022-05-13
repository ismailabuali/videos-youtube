export interface Video {
  id: string,
  snippet: {
    localized: {
      title: string,
      description: string,
    },
    channelId:string,
    channelTitle:string,
    thumbnails: {
      default: {
        url: string,
        width: number,
        height: number,
      },
      high: {
        url: string,
        width: number,
        height: number,
      },
      maxres: {
        url: string,
        width: number,
        height: number,
      },
      medium: {
        url: string,
        width: number,
        height: number,
      },
      standard: {
        url: string,
        width: number,
        height: number,
      }
    }
  }
}
