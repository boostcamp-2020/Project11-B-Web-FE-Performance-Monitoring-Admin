import { Dispatch } from 'redux';
import { ICrime } from '../types';

import service from '../service';

const SET_CRIME = 'crime/SET_CRIME' as const;

const setCrimeAction = (newCrime: ICrime) => ({ type: SET_CRIME, crime: newCrime });

export const setCrime = (crimeId: string, setIsFetching: (flag: boolean) => void) => async (
  dispatch: Dispatch,
): Promise<void> => {
  setIsFetching(true);
  const res = await service.getCrime(crimeId);
  const newCrime: ICrime = res.data;
  dispatch(setCrimeAction(newCrime));
  setIsFetching(false);
};

type CrimeAction = ReturnType<typeof setCrimeAction>;

/**
 * @TODO
 * dummy data를 어떻게 하지....???
 */
const crimeDummy: ICrime = {
  sdk: {
    name: '',
    version: '',
  },
  meta: {
    browser: {
      name: '',
      version: '',
    },
    os: {
      name: '',
      version: '',
    },
    url: '',
    ip: '',
  },
  _id: '',
  message: '',
  type: '',
  stack: [
    {
      _id: '',
      columnNo: '',
      lineNo: '',
      function: '',
      filename: '',
    },
  ],
  occuredAt: '',
  __v: 0,
};

function crime(state: ICrime = crimeDummy, action: CrimeAction): ICrime {
  switch (action.type) {
    case SET_CRIME: {
      const newCrime: ICrime = action.crime;
      return newCrime;
    }
    default:
      return state;
  }
}

export default crime;
