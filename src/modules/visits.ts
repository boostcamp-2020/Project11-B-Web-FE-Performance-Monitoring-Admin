import { Dispatch } from 'redux';
import _ from 'lodash';
import { IVisits, IMonthlyVisits, IDailyVisits } from '../types';

import service from '../service';

const INITIALIZE_VISITS = 'visits/INITIALIZE_VISITS' as const;
const SET_MONTHLY_VISITS = 'visits/SET_MONTHLY_VISITS' as const;
const SET_DAILY_VISITS = 'visits/SET_DAILY_VISITS' as const;

const initializeVisitsAction = (newVisits: IVisits) => ({
  type: INITIALIZE_VISITS,
  newVisits,
});

export const initializeVisits = (projectId: string) => async (
  dispatch: Dispatch,
): Promise<void> => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const monthlyRes = await service.getMonthlyVisits(projectId, year);
  const dailyRes = await service.getDailyVisits(projectId, year, month);

  const monthlyVisits: IMonthlyVisits = monthlyRes.data;
  const dailyVisits: IDailyVisits = dailyRes.data;

  const newVisits: IVisits = { monthlyVisits, dailyVisits };
  dispatch(initializeVisitsAction(newVisits));
};

const setMonthlyVisitsAction = (newMonthlyVisits: IMonthlyVisits) => ({
  type: SET_MONTHLY_VISITS,
  monthlyVisits: newMonthlyVisits,
});

export const setMonthlyVisits = (projectId: string, year: number) => async (
  dispatch: Dispatch,
): Promise<void> => {
  const res = await service.getMonthlyVisits(projectId, year);
  const newMonthlyVisits = res.data;
  dispatch(setMonthlyVisitsAction(newMonthlyVisits));
};

const setDailyVisitsAction = (newDailyVisits: IDailyVisits) => ({
  type: SET_DAILY_VISITS,
  dailyVisits: newDailyVisits,
});

export const setDailyVisits = (projectId: string, year: number, month: number) => async (
  dispatch: Dispatch,
): Promise<void> => {
  const res = await service.getDailyVisits(projectId, year, month);
  const newDailyVisits = res.data;
  dispatch(setDailyVisitsAction(newDailyVisits));
};

type VisitsAction =
  | ReturnType<typeof initializeVisitsAction>
  | ReturnType<typeof setMonthlyVisitsAction>
  | ReturnType<typeof setDailyVisitsAction>;

/**
 * @TODO
 * dummy data를 어떻게 하지....???
 */
const visitsDummy: IVisits = {
  dailyVisits: {
    _id: {
      year: 1970,
      month: 1,
      date: 1,
    },
    count: 0,
  },
  monthlyVisits: {
    _id: {
      year: 1970,
      month: 1,
    },
    count: 0,
  },
};

function visits(state: IVisits = visitsDummy, action: VisitsAction): IVisits {
  switch (action.type) {
    case INITIALIZE_VISITS: {
      return action.newVisits;
    }
    case SET_MONTHLY_VISITS: {
      const newMonthlyVisits: IMonthlyVisits = action.monthlyVisits;
      const newVisits = _.cloneDeep(state);
      newVisits.monthlyVisits = newMonthlyVisits;
      return newVisits;
    }
    case SET_DAILY_VISITS: {
      const newDailyVisits: IDailyVisits = action.dailyVisits;
      const newVisits = _.cloneDeep(state);
      newVisits.dailyVisits = newDailyVisits;
      return newVisits;
    }
    default:
      return state;
  }
}

export default visits;
