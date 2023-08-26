import { ENV_CONFIG } from "@/config/env.config";

export class RouterPath {
  private _apiPrefix: string = ENV_CONFIG.API_PREFIX;
  private _apiVersion: string = ENV_CONFIG.API_VERSION;

  public getApiPath(route: string): string {
    if (route === undefined || route === null) {
      throw new Error("Route not provided");
    }
    const apiRoute = `/${this._apiPrefix}/${this._apiVersion}/${route}`;
    console.info(apiRoute);
    return apiRoute;
  }
}