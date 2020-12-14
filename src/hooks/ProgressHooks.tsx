import { useState } from 'react';

const useProgress = () => {
  const [showProgress, setShowProgress] = useState(false);
  const displayProgress = () => {
    setShowProgress(() => true);
  };
  const hideProgress = () => {
    setShowProgress(() => false);
  };
  return [showProgress, displayProgress, hideProgress] as const;
};
export default useProgress;
