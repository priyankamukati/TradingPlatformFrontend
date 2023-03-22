import { idText } from "typescript";
import { LoadingState } from "./loadingState";

export class State<T> {
  public error: any;
  public loading: LoadingState = LoadingState.Idle;
  public data: T | undefined = undefined;
}
