import { useState, useCallback } from 'react';
import _ from 'lodash';
import { IProjectCardProps, IAlertsUserProfile, IAlert } from '../types';

export type AlertState = {
  projectList: IProjectCardProps[];
  project?: IProjectCardProps;
  period: string;
  count: number;
  userList: IAlertsUserProfile[];
  alerts?: IAlert[];
};

export type UserAlertSelector = (fn: UseAlertSelectorFunction) => SetAlertStateParams;

type SetAlertStateParams = {
  projectList?: IProjectCardProps[];
  project?: IProjectCardProps;
  period?: string;
  count?: number;
  userList?: IAlertsUserProfile[];
  alerts?: IAlert[];
};

type SetAlertStateCallback = (prev: AlertState) => AlertState;

type UseAlertSelectorFunction = (state: AlertState) => SetAlertStateParams;

type SetAlertState = (params: SetAlertStateParams | SetAlertStateCallback) => void;
type UseAlertReturn = [AlertState, UserAlertSelector, SetAlertState];

const useAlert = (): UseAlertReturn => {
  const initialState: AlertState = {
    projectList: [],
    project: undefined,
    period: '',
    count: 0,
    userList: [],
    alerts: [],
  };

  const [alertState, setState] = useState<AlertState>(initialState);

  const useAlertSelector = (fn: UseAlertSelectorFunction) => {
    return fn(alertState);
  };
  const setAlertState = useCallback((params: SetAlertStateParams | SetAlertStateCallback) => {
    if (typeof params === 'function') {
      setState((prev) => params(_.cloneDeep(prev)));
      return;
    }
    setState((prev) => {
      const copied = _.cloneDeep(prev);
      return { ...copied, ...params };
    });
  }, []);
  return [alertState, useAlertSelector, setAlertState];
};

export default useAlert;
