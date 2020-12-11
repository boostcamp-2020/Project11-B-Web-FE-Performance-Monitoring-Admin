import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Popover, List, ListItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [browserFilter, setBrowserFilter] = useState('');
  const [osFilter, setOsFilter] = useState('');
  const [urlFilter, setUrlFilter] = useState('');

  useEffect(() => {
    setBrowserFilter(arrayToString(filterQuery.browser));
    setOsFilter(arrayToString(filterQuery.os));
    setUrlFilter(arrayToString(filterQuery.url));
  }, [filterQuery]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const handleChange = (event: any) => {
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

  const open = Boolean(anchorEl);
  const id = open ? 'discover-filter' : undefined;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button className={classes.button} onClick={handleClick}>
        Filters
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List component="nav" className={classes.list}>
          <ListItem>
            <TextField
              id="browser-filter"
              label="Browsers"
              value={browserFilter}
              onChange={handleChange}
            />
          </ListItem>
          <ListItem>
            <TextField
              id="os-filter"
              label="Operating Systems"
              value={osFilter}
              onChange={handleChange}
            />
          </ListItem>
          <ListItem>
            <TextField id="url-filter" label="URLs" value={urlFilter} onChange={handleChange} />
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}

export default Filters;
