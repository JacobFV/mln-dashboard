import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { appname } from '../common/constants';

export default function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
            {appname}
        </Link>
        {' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}