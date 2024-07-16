import { SearchBarService } from "../services/SearchBar.service";
import { Request, Response } from "express";
import mapStatusHTTP from "../utils/mapHttp";

export class SearchBarController {
  constructor(private _searchBarService = new SearchBarService()) {}

  async requestSearch(req:Request, res: Response) {
    const {filter} = req.query as any
    
    const { status, data } = await this._searchBarService.search(filter);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}