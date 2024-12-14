import { useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import decodeJWT from "jwt-decode";

import { ActionWithPayload, RootState } from ".";

export enum ActionTypes {
  Login = "[Authenticate Login]",
  Logout = "[Authenticate Logout]",
}

export interface IAuthState {
  accessToken?: string;
  isAdmin?: boolean;
}

export const reducer = persistReducer(
  {
    storage,
    key: "rematic-voter-auth",
    whitelist: ["accessToken", "isAdmin"],
  },
  (
    state: IAuthState = {},
    { type, payload }: ActionWithPayload<IAuthState>
  ) => {
    switch (type) {
      case ActionTypes.Login:
        const { isAdmin } = decodeJWT(payload?.accessToken || "") as any;
        return { ...state, accessToken: payload?.accessToken, isAdmin };

      case ActionTypes.Logout:
        return { ...state, accessToken: undefined, isAdmin: undefined };

      default:
        return state;
    }
  }
);

export const actions = {
  login: (accessToken: string) => ({
    type: ActionTypes.Login,
    payload: { accessToken },
  }),
  logout: () => ({ type: ActionTypes.Logout }),
};

export const useAuth: () => IAuthState & {
  login: (accessToken: string) => void;
  logout: () => void;
} = () => {
  const auth = useSelector<RootState>(({ auth }) => auth) as IAuthState;

  const dispatch = useDispatch();
  const login = (accessToken: string) => dispatch(actions.login(accessToken));
  const logout = () => dispatch(actions.logout());

  return { ...auth, login, logout };
};
