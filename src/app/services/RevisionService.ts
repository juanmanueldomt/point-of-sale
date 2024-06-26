import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";
import {RevisionTotal} from "../models/RevisionTotal";

@Injectable({providedIn: 'root'})
export class RevisionService {
  constructor(
    private http: HttpClient
  ) {
  }

  public getRevisions(): Observable<RevisionTotal[]> {
    return this.http.get(`${environment.serverUrl}/revision/`) as Observable<RevisionTotal[]>
  }

  public getLastRevision(): Observable<RevisionTotal> {
    return this.http.get(`${environment.serverUrl}/revision/last`) as Observable<RevisionTotal>
  }

  public create(revision: RevisionTotal): Observable<RevisionTotal> {
    return this.http.post(`${environment.serverUrl}/revision`, revision) as Observable<RevisionTotal>
  }

  public getNextRevision(originalRevision : number): Observable<RevisionTotal> {
    return this.http.get(`${environment.serverUrl}/revision/next`, {params: { revisionId: originalRevision}}) as Observable<RevisionTotal>
  }
}
