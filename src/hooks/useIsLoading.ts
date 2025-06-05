import { APPLICATION_ACTIONS_CONSTS } from "../state-management/action-constants/application";
import { useApplicationContext } from "../state-management/providers/AdminContextProvider";

export const useIsLoading = () => {
  const { dispatch } = useApplicationContext();

  const setIsLoading = (isLoading: boolean) => {
    dispatch({
      type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING,
      payload: isLoading,
    });
  }

  return {
    setIsLoading
  };
}