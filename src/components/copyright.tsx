import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import appinfo from '../common/misc/appInfo';

export default function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
            {appinfo.name}
        </Link>
        {' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}