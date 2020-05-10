export interface DatabaseInterface {
  db: any;
  getData(selector: string): Promise<[]>;
  addData(selector: string, data: {}): Promise<any>;
  findData(selector: string, query: object): Promise<any>;
  removeData(selector: string, query: object): Promise<any>;
}
