import IWixService from "./IWixService";
import axios from "axios";
import WixRequestBody from "../model/WixRequestBody";

abstract class WixBaseService implements IWixService {
  baseUrl =
    "https://yutovsjohan.wixsite.com/_api/cloud-data/v1/wix-data/collections/";
  url = {
    getAll: this.baseUrl + "query",
    get: this.baseUrl + "get",
    save: this.baseUrl + "bulk-save",
    delete: this.baseUrl + "bulk-remove",
  };

  getAll(body?: WixRequestBody): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(
          this.url.getAll,
          body ? body : this.buildDefaultRequestBody(this.getCollectionName()),
          this.buildDefaultHeaders(this.getAuthorization())
        )
        .then((rs) => {
          resolve(rs);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getById(id: string | undefined): Promise<any> {
    const body: WixRequestBody = new WixRequestBody();
    body.collectionName = this.getCollectionName();

    body.dataQuery = {
      filter: {
        _id: id,
      },
      paging: {
        offset: 0,
        limit: 1000,
      },
    };

    return this.getAll(body);
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
          reject(error);
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
          reject(error);
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

  buildDefaultRequestBody(collectionName: string): WixRequestBody {
    const body: WixRequestBody = new WixRequestBody();
    body.collectionName = collectionName;

    body.dataQuery = {
      filter: {},
      paging: {
        offset: 0,
        limit: 1000,
      },
    };

    return body;
  }

  abstract getCollectionName(): string;
  abstract getAuthorization(): string;
}

export default WixBaseService;
