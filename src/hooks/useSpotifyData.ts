/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from 'react';
import Axios, { AxiosRequestConfig } from 'axios';
import useAppState from './useAppState';

export const ERROR = 'ERROR';
export const STARTED = 'STARTED';
export const SUCCESS = 'SUCCESS';

export interface State {
  items: any[];
  status: string;
}

const initialState: State = {
  items: [],
  status: 'idle',
};

export type Action =
  | { type: typeof ERROR }
  | { type: typeof STARTED }
  | { type: typeof SUCCESS; payload: { items: any[] } };

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        status: 'rejected',
      };
    case STARTED:
      return {
        ...state,
        status: 'pending',
      };

    case SUCCESS:
      return {
        ...state,
        items: [...action.payload.items],
        status: 'resolved',
      };

    default:
      throw new Error(`Unhandled action type.`);
  }
};

const useSpotifyData = (url: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { accessToken } = useAppState();

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    try {
      dispatch({ type: STARTED });
      const { data } = await Axios(url, config);
      const resItems = data.items[0].track ? data.items.map((item: any) => item.track) : data.items;
      dispatch({ type: SUCCESS, payload: { items: resItems } });
    } catch (error) {
      dispatch({ type: ERROR });
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);
  return state;
};

export default useSpotifyData;
