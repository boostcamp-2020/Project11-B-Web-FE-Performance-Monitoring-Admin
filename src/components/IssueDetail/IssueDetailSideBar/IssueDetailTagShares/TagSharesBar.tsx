import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  meta: { name: string; count: number }[];
  title: string;
  totalCount: number;
}

function Tag(props: IProps): React.ReactElement {
  const { meta, title, totalCount } = props;
  const colors = ['#283593', '#3f51b5', '#5c6bc0', '#7986cb', '#9fa8da', '#c5cae9', '#e8eaf6'];
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box>{title}</Box>
        <Box fontSize="12px" color>
          {meta[0].name} {`${((meta[0].count / totalCount) * 100).toFixed(0)}%`}
        </Box>
      </Box>
      <Box>
        {meta.map((info, i) => {
          return (
            <Span
              name={info.name}
              count={info.count}
              color={colors[i]}
              percent={`${((info.count / totalCount) * 100).toFixed(1)}%`}
            />
          );
        })}
      </Box>
    </Box>
  );
}

interface ISpanProps {
  name: string;
  count: number;
  percent: string;
  color: string;
}

const useStyles = makeStyles({
  tooltip: {
    '&:hover': {
      '&:before': {
        fontSize: '12px',
        padding: '5px',
        whiteSpace: 'pre-wrap',
        content: (props: any) => `"${props.name} ${props.percent}"`,
        color: 'white',
        position: 'absolute',
        right: 0,
        top: '-30px',
        borderRadius: '3px',
        backgroundColor: 'black',
        zIndex: 999,
      },
    },
  },
});

function Span(props: ISpanProps): React.ReactElement {
  const { name, count, percent, color } = props;
  const classes = useStyles({ name, count, percent });
  return (
    <Box
      className={classes.tooltip}
      position="relative"
      display="inline-block"
      height="20px"
      width={percent}
      bgcolor={color}
    />
  );
}

export default Tag;
/*

*/
