import React from 'react';
import Selector from './Selector';

interface IProps {
  count: number;
  handleSelectCount: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  countList: { name: string; value: number }[];
  readOnly: boolean;
}

function AlertsPeriodSelector(props: IProps): React.ReactElement {
  const { count, handleSelectCount, countList, readOnly } = props;
  return (
    <Selector
      readOnly={readOnly}
      title={readOnly ? 'Period와 함께 사용할 수 없습니다.' : 'Count'}
      value={count}
      handleSelect={handleSelectCount}
      menuList={countList}
    />
  );
}

export default AlertsPeriodSelector;
