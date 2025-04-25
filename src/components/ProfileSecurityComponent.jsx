import ChangePasswordComponent from "./ChangePasswordComponent.jsx";
import MultiFactorComponent from "./MultiFactorComponent.jsx";
import {Stack} from "@mui/material";

function ProfileSecurityComponent() {

    return (
        <>
            <Stack spacing={2}>
                <ChangePasswordComponent/>
                <MultiFactorComponent/>
            </Stack>
        </>

    );
}

export default ProfileSecurityComponent;
