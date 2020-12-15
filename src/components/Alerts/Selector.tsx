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
  value: string;
  menuList: { name: string; value: string }[];
  handleSelect: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

function AlertsProjectSelector(props: IProps): React.ReactElement {
  const { title, value, menuList, handleSelect } = props;
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id={`${title}-label`}>{title}</InputLabel>
      <Select
        labelId={`${title}-label`}
        value={value}
        onChange={handleSelect}
        label={title}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        {menuList.map((menu) => (
          <MenuItem key={menu.value} value={menu.value}>
            {menu.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default AlertsProjectSelector;
