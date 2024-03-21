import {RevisionPartial} from "./RevisionPartial";
import {RevisionAbstract} from "./RevisionAbstract";

export class RevisionTotal extends RevisionAbstract {
  public isSetMoney!: boolean;
  public partialRevisions!: RevisionPartial[];
}
