import { makeStyles, createStyles, Theme } from '@material-ui/core'

export default makeStyles<Theme>(theme =>createStyles({
  container: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70vh'
  },
  title: {
    marginBottom: theme.spacing(1)
  }
}))
