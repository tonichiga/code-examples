import { useAppDispatch } from "@/07.shared/lib/hooks";
import { ResponseDataWithPagination } from "../types";

class InfinityScrollController {
  isLoading: boolean = false;
  data: ResponseDataWithPagination<any> = null;
  observeElement: HTMLElement | null = null;
  queryFn: any;
  params: { page?: number; limit?: number } = { page: 1, limit: 25 };
  observer: IntersectionObserver | null = null;
  responseCallback: (res: any) => Promise<ResponseDataWithPagination<any>> =
    null;
  dispatch: ReturnType<typeof useAppDispatch>;

  constructor(
    queryFn,
    element: HTMLElement,
    options: { page?: number; limit?: number }
  ) {
    this.setupQueryFn = this.setupQueryFn.bind(this);
    this.getDataHandler = this.getDataHandler.bind(this);
    this.params = { ...this.params, ...options };
    this.queryFn = queryFn;
    this.observeElement = element;
    this.initObserver();
  }

  initObserver() {
    this.observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        if (this.data && !this.data?.hasNextPage) {
          return;
        }
        this.intersectionHandler();
      }
    });
  }

  intersectionHandler() {
    this.getDataHandler();
    this._increasePage();
  }

  getInitialData() {
    this.getDataHandler();
  }

  async getDataHandler() {
    const res = this.setupQueryFn();
    this.loading = true;
    this.data = await this.responseCallback(res);
    this.loading = false;
  }

  observe(callback: typeof this.responseCallback) {
    if (!this.observeElement) return;
    this.observer?.observe(this.observeElement);
    this.responseCallback = callback;
    // this.getInitialData();
  }

  disconnect() {
    this.observer?.disconnect();
  }

  setupQueryFn() {
    if (!this.queryFn) return console.error("queryFn is required");
    return this.queryFn(this.params);
  }

  set setData(value: ResponseDataWithPagination<any>) {
    this.data = value;
  }

  set loading(value: boolean) {
    this.isLoading = value;
  }

  get loading() {
    return this.isLoading;
  }

  _increasePage() {
    this.params = { ...this.params, page: this.params.page + 1 };
  }
}

export default InfinityScrollController;
