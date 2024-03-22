export abstract class RevisionAbstract {
  public id!: number;
  public revisionTime!: Date;

  public singleCoins!: number;
  public tenCoins!: number;
  public twenties!: number;
  public fifties!: number;
  public hundreds!: number;
  public twoHundreds!: number;
  public fiveHundreds!: number;

  public total?: number;
  public totalSale?: number;
  public totalSpent?: number;
  public result?: number;
}
