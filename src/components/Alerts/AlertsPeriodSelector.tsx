import React from 'react';
import Selector from './Selector';

interface IProps {
  period: string;
  handleSelectPeriod: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  periodList: { name: string; value: string }[];
  readOnly: boolean;
}

function AlertsPeriodSelector(props: IProps): React.ReactElement {
  const { period, handleSelectPeriod, periodList, readOnly } = props;
  return (
    <Selector
      readOnly={readOnly}
      title={readOnly ? 'Count와 동시에 사용 할 수 없습니다.' : 'Period'}
      value={period}
      handleSelect={handleSelectPeriod}
      menuList={periodList}
    />
  );
}

export default AlertsPeriodSelector;
