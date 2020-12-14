import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  textField: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: '100%',
  },
}));

type IFilterQuery = Record<string, string[] | undefined>;
interface IProps {
  filterQuery: IFilterQuery;
  setFilterQuery: (query: Record<string, string[] | undefined>) => void;
}

const arrayToString = (arr: string[] | undefined): string => {
  if (arr === undefined) return '';
  return arr.join(', ');
};

const stringToArray = (str: string): string[] | undefined => {
  if (str.trim() === '') return undefined;
  return str.split(',').map((item) => item.trim());
};

function Filters(props: IProps): React.ReactElement {
  const { filterQuery, setFilterQuery } = props;

  const classes = useStyles();

  const [browserFilter, setBrowserFilter] = useState('');
  const [osFilter, setOsFilter] = useState('');
  const [urlFilter, setUrlFilter] = useState('');

  useEffect(() => {
    setBrowserFilter(arrayToString(filterQuery.browser));
    setOsFilter(arrayToString(filterQuery.os));
    setUrlFilter(arrayToString(filterQuery.url));
  }, [filterQuery]);

  const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFilterQuery: any = {};
    const browsers = stringToArray(browserFilter);
    const oss = stringToArray(osFilter);
    const urls = stringToArray(urlFilter);
    if (browsers !== undefined) newFilterQuery.browser = browsers;
    if (oss !== undefined) newFilterQuery.os = oss;
    if (urls !== undefined) newFilterQuery.url = urls;
    if (!_.isEqual(filterQuery, newFilterQuery)) {
      setFilterQuery(newFilterQuery);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const targetId = event.target.id;
    if (targetId === 'browser-filter') {
      setBrowserFilter(event.target.value);
    }
    if (targetId === 'os-filter') {
      setOsFilter(event.target.value);
    }
    if (targetId === 'url-filter') {
      setUrlFilter(event.target.value);
    }
  };

  return (
    <form onSubmit={(e) => handleInput(e)} className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            className={classes.textField}
            id="browser-filter"
            label="Browsers"
            value={browserFilter}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            className={classes.textField}
            id="os-filter"
            label="Operating Systems"
            value={osFilter}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            className={classes.textField}
            id="url-filter"
            label="URLs"
            value={urlFilter}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            className={classes.button}
            color="primary"
            type="submit"
            size="large"
            variant="contained"
          >
            submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Filters;
