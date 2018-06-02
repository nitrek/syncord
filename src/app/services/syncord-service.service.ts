import { Injectable } from '@angular/core';

@Injectable()
export class SyncordService {

  leadBanker = "PartyA";
  baseUrl = "http://abcipl.club:10013/api/syncord";

  public GET_PEERS_URL = this.baseUrl + "/peers";
  public GET_ISSUES_URL = this.baseUrl + "/issues";
  public CREATE_ISSUE_URL = this.baseUrl + "/createIssue"
  
  constructor() { }

  /**
   * Returns the name of the leadBanker for the current node 
   */
  getLeadBanker() {
    return this.leadBanker;
  }



}
