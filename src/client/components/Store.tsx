import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { ticketShareReducer } from "./Pages/TicketSharing/reducer";

import { authReducer } from "./Pages/SignIn/reducer";
import {
  IRemoteData,
  IError,
  IOwnerTicketInfo,
  IAuth,
  ITicketReceiveState
} from "../interface/IShareInfo";
import { getPersistData } from "../commons/utils/storePersist";
import { AuthActionTypes } from "./Pages/SignIn/actions";
import {
  IHowItWorksModalState,
  howItWorksModalReducer
} from "./HowItWorksModal/reducer";
import { ticketReceiveReducer } from "./Pages/TicketReceiving/reducer";
import {
  fullscreenLoaderReducer,
  IFullscreenLoaderState
} from "./Ui/ConnectedFullscreenLoader/reducer";
import {
  showLoading,
  IShowLoading,
  IHideLoading,
  hideLoading
} from "./Ui/ConnectedFullscreenLoader/actions";

export interface IStoreState {
  ticketShareData: IRemoteData<IOwnerTicketInfo>;
  ticketReceiveData: ITicketReceiveState;
  authData: IRemoteData<IAuth>;
  howItWorksModal: IHowItWorksModalState;
  fullscreenLoader: IFullscreenLoaderState;
}

export const reducers = combineReducers<IStoreState>({
  ticketShareData: ticketShareReducer,
  ticketReceiveData: ticketReceiveReducer,
  authData: authReducer,
  howItWorksModal: howItWorksModalReducer,
  fullscreenLoader: fullscreenLoaderReducer
});

const storedAuthData: IAuth = getPersistData();

axios.defaults.baseURL = "";
if (process.env.BASE_PROXY_URL && !process.env.APP_MODE) {
  axios.defaults.baseURL = process.env.BASE_PROXY_URL;
}

if (storedAuthData && storedAuthData.token) {
  axios.defaults.headers.common["Authorization"] = storedAuthData.token;
}

const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument(axios))
);

axios.interceptors.request.use(config => {
  store.dispatch<IShowLoading>(showLoading("Loading..."));
  return config;
});

axios.interceptors.response.use(
  response => {
    store.dispatch<IHideLoading>(hideLoading());
    return response;
  },
  error => {
    store.dispatch<IHideLoading>(hideLoading());
    console.warn("axios response error = ", JSON.stringify(error));
    // Ajax request got 401 error, then reset the auth info from the store
    if (error.message && error.message.indexOf(401) >= 0) {
      axios.defaults.headers.common["Authorization"] = "";
      store.dispatch({
        type: AuthActionTypes.SIGN_OUT_SUCCESS
      });
    }
    return Promise.reject(error);
  }
);

(window as { [key: string]: any })["store"] = store;

export { store };
