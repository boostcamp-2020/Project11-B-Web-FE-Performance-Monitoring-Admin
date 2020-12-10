import React, { useState, useEffect } from 'react';
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

interface IProps {
  filterQuery: Record<string, string[] | undefined>;
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
    const newQuery = {
      browser: stringToArray(browserFilter),
      os: stringToArray(osFilter),
      url: stringToArray(urlFilter),
    };
    setFilterQuery(newQuery);
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
