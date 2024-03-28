export class FetchException extends Error {
  constructor(public status: number, public response: any) {
    super();
  }
}
