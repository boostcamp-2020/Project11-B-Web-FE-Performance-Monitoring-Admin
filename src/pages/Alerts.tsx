import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import { initializeProjects } from '../modules/filters';
import { RootState } from '../modules';
import AlertsProjectSelector from '../components/Alerts/AlertsProjectSelector';
import AlertsConfig from '../components/Alerts/AlertsConfig';
import { IProjectCardProps, IAlertsUserProfile } from '../types';
import AlertsPeriodSelector from '../components/Alerts/AlertsPeriodSelector';
import AlertList from '../components/Alerts/AlertList';

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
  const [projectId, setProjectId] = useState('');
  const [project, setProject] = useState<IProjectCardProps>();
  const [period, setPeriod] = useState('');
  const [userList, setUserList] = useState<IAlertsUserProfile[]>();
  const periodList = [
    { name: '1 day', value: '1d' },
    { name: '3 day', value: '3d' },
    { name: '1 week', value: '1w' },
  ];
  useEffect(() => {
    dispatch(initializeProjects());
  }, [dispatch]);

  const handleSelectProject = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ): void => {
    const nextProjectId = event.target.value as string;
    setProjectId(nextProjectId);
    setPeriod(periodList[0].value);
    const selectProject = projectList.find((proj) => {
      return proj._id === nextProjectId;
    });
    if (selectProject) {
      setProject(selectProject);
      const owner: IAlertsUserProfile = { email: selectProject.owner.email, isSelected: false };
      const newUserList = [];
      if (owner.email) newUserList.push(owner);
      newUserList.push(
        ...selectProject.users
          .filter(({ email }) => email)
          .map((member) => ({ email: member.email, isSelected: false })),
      );
      setUserList(newUserList);
    } else {
      setUserList(undefined);
      setProject(undefined);
      setPeriod('');
      setProjectId('');
    }
  };

  const handleSelectPeriod = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ): void => {
    const nextPeriod = event.target.value as string;
    setPeriod(nextPeriod);
  };

  const handleUserlist = (email: string) => {
    setUserList((prevUserList) => {
      if (prevUserList) {
        return prevUserList.map((member) => {
          if (member.email === email) {
            return { ...member, isSelected: !member.isSelected };
          }
          return member;
        });
      }
      return undefined;
    });
  };

  return (
    <Container className={classes.container}>
      <Box display="flex">
        <Box flex="1" px={2}>
          <Paper className={classes.paper}>
            <Box display="flex" flexDirection="column" gridGap={15}>
              <AlertsProjectSelector
                projectId={projectId}
                handleSelectProject={handleSelectProject}
                projectList={projectList}
              />
              <AlertsPeriodSelector
                period={period}
                handleSelectPeriod={handleSelectPeriod}
                periodList={periodList}
              />
              {project && <AlertsConfig userList={userList} handleUserList={handleUserlist} />}
            </Box>
          </Paper>
        </Box>
        <AlertList />
      </Box>
    </Container>
  );
}

export default Alerts;
