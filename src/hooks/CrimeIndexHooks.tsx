import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { IIssue } from '../types';
import { RootState } from '../modules';
import { setIssue } from '../modules/issue';

interface MatchParams {
  id: string;
}
const useCrimeIndex = () => {
  const issue: IIssue = useSelector((state: RootState) => state.issue);
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState<number>(0);

  const [crimeIndex, setCrimeIndex] = useState(0);
  const handleBack = () => {
    setCrimeIndex((prevIndex) => prevIndex - 1);
  };
  const handleNext = () => {
    setCrimeIndex((prevIndex: number) => prevIndex + 1);
  };
  const setCrimeById = (crimeId: string) => {
    const targetCrimeIndex = issue.crimeIds.indexOf(crimeId);
    setCrimeIndex(targetCrimeIndex);
    setTabIndex(0);
  };
  const match = useRouteMatch<MatchParams>('/issue/:id');
  const handleChangeTab = (event: React.ChangeEvent<any>, newValue: number) => {
    setTabIndex(newValue);
  };
  useEffect(() => {
    dispatch(setIssue(match?.params.id || ''));
  }, [match?.params.id]);

  return [tabIndex, crimeIndex, handleBack, handleNext, setCrimeById, handleChangeTab] as const;
};
export default useCrimeIndex;
