export abstract class BaseDatabaseService {
  db: any;

  public getData(selector: string): Promise<[] | Error> {
    return new Promise(() => []);
  }

  public addData(selector: string, data: {}): Promise<{} | Error> {
    return new Promise(() => ({}));
  }

  public findData(selector: string, query: object): Promise<{} | Error> {
    return new Promise(() => ({}));
  }
}

export default BaseDatabaseService;
