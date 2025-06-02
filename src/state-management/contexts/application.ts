import { ApplicationContextActions } from "../actions-types/application-actions";
import { ApplicationContextState } from "../states/application";

export interface ApplicationContextType {
  state: ApplicationContextState;
  dispatch: React.Dispatch<ApplicationContextActions>;
}