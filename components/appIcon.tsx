import { Box, IconButton } from "@mui/material";
import appinfo from "../common/appInfo";

export default function AppIcon(props: any) {
    return (
        <IconButton href="/">
            <Box component="img" sx={{ m: 1 }}  src='icon.svg' />
        </IconButton>
    );
}