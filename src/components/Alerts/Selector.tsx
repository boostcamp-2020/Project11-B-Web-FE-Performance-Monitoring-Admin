import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
}));

interface IProps {
  title: string;
  readOnly: boolean;
  value: string | number;
  menuList: { name: string; value: string | number }[];
  handleSelect: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

function Selector(props: IProps): React.ReactElement {
  const { title, value, menuList, handleSelect, readOnly } = props;
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id={`${title}-label`}>{title}</InputLabel>
      <Select
        labelId={`${title}-label`}
        value={value}
        onChange={handleSelect}
        disabled={readOnly}
        label={title}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        <MenuItem key="none" value={typeof value === 'string' ? '' : 0}>
          None
        </MenuItem>
        {menuList.map((menu) => (
          <MenuItem key={menu.value} value={menu.value}>
            {menu.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Selector;
