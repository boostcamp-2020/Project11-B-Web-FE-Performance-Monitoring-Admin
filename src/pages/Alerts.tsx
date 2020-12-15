import React, { useEffect, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import { initializeProjects } from '../modules/filters';
import { RootState } from '../modules';
import AlertsProjectSelector from '../components/Alerts/AlertsProjectSelector';
import AlertsPeriodSelector from '../components/Alerts/AlertsPeriodSelector';
import AlertsCountSelector from '../components/Alerts/AlertCountSelector';
import AlertsConfig from '../components/Alerts/AlertsConfig';
import { IAlertsUserProfile } from '../types';
import AlertList from '../components/Alerts/AlertList';
import useAlert, { AlertState } from '../hooks/AlertHooks';
import service from '../service';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '10vh',
  },
  paper: {
    padding: '32px 32px',
  },
}));

function Alerts(): React.ReactElement {
  const user = useSelector((state: RootState) => state.user);
  const projectList = useSelector((state: RootState) => {
    return state.projects.projects.filter((project) => project.owner.nickname === user.nickname);
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const [alertState, useAlertSelector, setAlertState] = useAlert();
  const periodList = [
    { name: '1 day', value: '1d' },
    { name: '3 day', value: '3d' },
    { name: '1 week', value: '1w' },
  ];
  const countList = [
    { name: '1 issue', value: 1 },
    { name: '10 issues', value: 10 },
    { name: '100 issues', value: 100 },
  ];
  useEffect(() => {
    dispatch(initializeProjects());
  }, [dispatch]);

  const handleSelectProject = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ): void => {
    const nextProjectId = event.target.value as string;
    const selectProject = projectList.find((proj) => {
      return proj._id === nextProjectId;
    });
    if (selectProject) {
      setAlertState({ project: selectProject });
      const owner: IAlertsUserProfile = {
        _id: selectProject.owner._id,
        email: selectProject.owner.email,
        isSelected: false,
      };
      const newUserList = [];
      if (owner.email) newUserList.push(owner);
      newUserList.push(
        ...selectProject.users
          .filter(({ email }) => email)
          .map((member) => ({ _id: member._id, email: member.email, isSelected: false })),
      );
      setAlertState({ userList: newUserList });
    } else {
      setAlertState({
        project: undefined,
        userList: [],
        period: '',
        count: 0,
      });
    }
  };

  const handleSelectPeriod = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ): void => {
    const nextPeriod = event.target.value as string;
    setAlertState({
      period: nextPeriod,
      count: 0,
    });
  };

  const handleSelectCount = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
    const nextCount = event.target.value as number;
    setAlertState({
      period: '',
      count: nextCount,
    });
  };

  const handleUserlist = (email: string) => {
    setAlertState(
      (prevState: AlertState): AlertState => {
        if (prevState.userList) {
          const newUserList = prevState.userList.map((member) => {
            if (member.email === email) {
              return { ...member, isSelected: !member.isSelected };
            }
            return member;
          });
          return { ...prevState, userList: newUserList };
        }
        return prevState;
      },
    );
  };

  const handleSubmit = (users: string[]) => async (): Promise<void> => {
    const { period, count } = alertState;
    if (alertState.project && users.length) {
      setAlertState({ userList: [], project: undefined, period: '', count: 0 });
      await service.addAlert({ projectId: alertState.project._id, users, period, count });
    }
  };

  return (
    <Container className={classes.container}>
      <Box display="flex">
        <Box flex="1" px={2}>
          <Paper className={classes.paper}>
            <Box display="flex" flexDirection="column" gridGap={15}>
              <AlertsProjectSelector
                project={alertState.project}
                handleSelectProject={handleSelectProject}
                projectList={projectList}
              />
              {alertState.project && (
                <>
                  <AlertsPeriodSelector
                    period={alertState.period}
                    readOnly={!!alertState.count}
                    handleSelectPeriod={handleSelectPeriod}
                    periodList={periodList}
                  />
                  <AlertsCountSelector
                    count={alertState.count}
                    readOnly={!!alertState.period}
                    handleSelectCount={handleSelectCount}
                    countList={countList}
                  />
                </>
              )}

              {alertState.project && (
                <AlertsConfig
                  selector={useAlertSelector}
                  userList={alertState.userList}
                  handleUserList={handleUserlist}
                  handleSubmit={handleSubmit}
                />
              )}
            </Box>
          </Paper>
        </Box>
        <AlertList />
      </Box>
    </Container>
  );
}

export default Alerts;
