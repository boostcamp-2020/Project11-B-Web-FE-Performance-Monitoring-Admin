import { useState } from 'react';
import _ from 'lodash';
import { IProjectCardProps, IAlertsUserProfile } from '../types';

export type AlertState = {
  project?: IProjectCardProps;
  period: string;
  count: number;
  userList: IAlertsUserProfile[];
};

export type UserAlertSelector = (fn: UseAlertSelectorFunction) => SetAlertStateParams;

type SetAlertStateParams = {
  project?: IProjectCardProps;
  period?: string;
  count?: number;
  userList?: IAlertsUserProfile[];
};

type SetAlertStateCallback = (prev: AlertState) => AlertState;

type UseAlertSelectorFunction = (state: AlertState) => SetAlertStateParams;

type SetAlertState = (params: SetAlertStateParams | SetAlertStateCallback) => void;
type UseAlertReturn = [AlertState, UserAlertSelector, SetAlertState];

const useAlert = (): UseAlertReturn => {
  const initialState: AlertState = {
    project: undefined,
    period: '',
    count: 0,
    userList: [],
  };

  const [alertState, setState] = useState<AlertState>(initialState);

  const useAlertSelector = (fn: UseAlertSelectorFunction) => {
    return fn(alertState);
  };
  const setAlertState = (params: SetAlertStateParams | SetAlertStateCallback) => {
    if (typeof params === 'function') {
      setState((prev) => params(_.cloneDeep(prev)));
      return;
    }
    setState((prev) => {
      const copied = _.cloneDeep(prev);
      return { ...copied, ...params };
    });
  };
  return [alertState, useAlertSelector, setAlertState];
};

export default useAlert;
