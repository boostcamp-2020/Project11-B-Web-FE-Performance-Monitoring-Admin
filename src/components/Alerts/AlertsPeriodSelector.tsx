import React from 'react';
import Selector from './Selector';

interface IProps {
  period: string;
  handleSelectPeriod: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  periodList: { name: string; value: string }[];
}

function AlertsPeriodSelector(props: IProps): React.ReactElement {
  const { period, handleSelectPeriod, periodList } = props;
  return (
    <Selector
      title="Period"
      value={period}
      handleSelect={handleSelectPeriod}
      menuList={periodList}
    />
  );
}

export default AlertsPeriodSelector;
