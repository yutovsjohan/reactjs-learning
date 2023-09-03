import IWixService from "./IWixService";
import axios from "axios";

abstract class WixBaseService implements IWixService {
  baseUrl =
    "https://yutovsjohan.wixsite.com/_api/cloud-data/v1/wix-data/collections/";
  url = {
    query: this.baseUrl + "query",
    save: this.baseUrl + "bulk-save",
    delete: this.baseUrl + "bulk-remove",
  };

  get(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(
          this.url.query,
          {
            collectionName: this.getCollectionName(),
          },
          this.buildDefaultHeaders(this.getAuthorization())
        )
        .then((rs) => {
          resolve(rs);
        })
        .catch((error) => {
          {
            reject(error);
          }
        });
    });
  }

  save(items: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(
          this.url.save,
          {
            collectionName: this.getCollectionName(),
            items: items,
          },
          this.buildDefaultHeaders(this.getAuthorization())
        )
        .then((rs) => {
          resolve(rs);
        })
        .catch((error) => {
          {
            reject(error);
          }
        });
    });
  }

  delete(entries: [{ itemId: string }]) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          this.url.delete,
          {
            collectionName: this.getCollectionName(),
            entries: entries,
          },
          this.buildDefaultHeaders(this.getAuthorization())
        )
        .then((rs) => {
          resolve(rs);
        })
        .catch((error) => {
          {
            reject(error);
          }
        });
    });
  }

  buildDefaultHeaders(authorization: string): { headers: {} } {
    return {
      headers: {
        "Content-Type": "application/json",
        authorization: authorization,
      },
    };
  }

  abstract getCollectionName(): string;
  abstract getAuthorization(): string;
}

export default WixBaseService;
