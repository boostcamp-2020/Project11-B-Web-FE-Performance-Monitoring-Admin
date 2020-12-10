import { Dispatch } from 'redux';
import _ from 'lodash';
import { IVisits, IMonthlyVisit, IDailyVisit } from '../types';

import service from '../service';

const INITIALIZE_VISITS = 'visits/INITIALIZE_VISITS' as const;
const SET_MONTHLY_VISITS = 'visits/SET_MONTHLY_VISITS' as const;
const SET_DAILY_VISITS = 'visits/SET_DAILY_VISITS' as const;

export const initializeVisitsAction = (newVisits: IVisits) => ({
  type: INITIALIZE_VISITS,
  newVisits,
});

export const setMonthlyVisitsAction = (newMonthlyVisits: IMonthlyVisit[]) => ({
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

export const setDailyVisitsAction = (newDailyVisits: IDailyVisit[]) => ({
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
  dailyVisits: [],
  monthlyVisits: [],
};

function visits(state: IVisits = visitsDummy, action: VisitsAction): IVisits {
  switch (action.type) {
    case INITIALIZE_VISITS: {
      return action.newVisits;
    }
    case SET_MONTHLY_VISITS: {
      const newMonthlyVisits: IMonthlyVisit[] = action.monthlyVisits;
      const newVisits = _.cloneDeep(state);
      newVisits.monthlyVisits = newMonthlyVisits;
      return newVisits;
    }
    case SET_DAILY_VISITS: {
      const newDailyVisits: IDailyVisit[] = action.dailyVisits;
      const newVisits = _.cloneDeep(state);
      newVisits.dailyVisits = newDailyVisits;
      return newVisits;
    }
    default:
      return state;
  }
}

export default visits;
