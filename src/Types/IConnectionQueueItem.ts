export interface IConnectionQueueItem
{
  main<T>(something?:T):Promise<any>;
}
