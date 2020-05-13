export interface DatabaseInterface {
  findAll(selector: string): Promise<[]>;
  add(selector: string, data: {}): Promise<any>;
  find(selector: string, query: object): Promise<any>;
  remove(selector: string, query: object): Promise<any>;
}
