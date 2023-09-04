export default class WixRequestBody {
  collectionName: string | undefined;
  dataQuery?: {
    filter?: {};
    paging?: {
      offset: number;
      limit: number;
    };
    sort?: [
      {
        fieldName: string;
        order: string; //"ASC", "DESC"
      }
    ];
  };
  filter?: {
    $and?: any[];
  };
  items?: [];
  entries?: [
    {
      itemId: string;
    }
  ];
  options?: {};
  include?: [];
  segment?: string;
  appId?: string;
}
