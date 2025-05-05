import {Box, Modal, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setOpenUtilSearch} from "../redux/feature/app/appSlice.js";

function ModalUtilSearchComponent() {
    const open = useSelector((state) => state.app.isOpenUtilSearch);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setOpenUtilSearch(false));
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return(
        <Modal
            open={open}
            onClose={(handleClose)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>

        </Modal>
    );

}

export default ModalUtilSearchComponent;