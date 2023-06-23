import { DataLoaderStatus } from './data-loader-status';

export class DataLoaderData<T> {
  data?: T;
  status: DataLoaderStatus = DataLoaderStatus.IDLE;
  error?: Error;
  errorMsg?: string;
  onRetryFn?: () => void;

  setOnRetryFn(fn: () => void) {
    this.onRetryFn = fn;
  }

  setIdle(data?: T) {
    this.status = DataLoaderStatus.IDLE;

    this.data = data;
  }

  setLoading() {
    this.status = DataLoaderStatus.LOADING;
  }

  setFail(msg: string, err?: Error) {
    this.status = DataLoaderStatus.FAIL;

    this.errorMsg = msg;
    this.error = err;
  }
}
