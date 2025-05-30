import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import {buttonStyleContained, buttonStyleOutlined} from "../assets/style.js";
import * as Yup from "yup";
import useTranslate from "../hook/useTranslate.jsx";
import {useUpdateBuildingMutation} from "../redux/feature/building/buildingApiSlice.js";
import {setIsQuickEditBuildingOpen} from "../redux/feature/building/buildingSlice.js";
import {useEffect} from "react";
import {LoadingButton} from "@mui/lab";
import {Slide, toast} from "react-toastify";

function QuickEditBuildingComponent() {
    const isQuickEditBuildingOpen = useSelector((state) => state.building.isQuickEditBuildingOpen);
    const building = useSelector((state) => state.building.buildingDataForQuickEdit);
    const { t } = useTranslate();
    const dispatch = useDispatch();

    const [
        updateBuilding,
        {
            isSuccess: isSuccessUpdateBuilding,
            isLoading: isLoadingUpdateBuilding,
            isError: isErrorUpdateBuilding,
            error: errorUpdateBuilding,
        },
    ] = useUpdateBuildingMutation();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Building name is required")
            .min(2, "Building name must be at least 2 characters!")
            .max(100, "Building name cannot be more than 100 characters!")
    });

    useEffect(() => {
        if (isSuccessUpdateBuilding) {
            toast.success(t("updateSuccess"), {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                transition: Slide,
            });
            dispatch(setIsQuickEditBuildingOpen(false))
        }
    }, [isSuccessUpdateBuilding]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateBuilding({
                id: building.id,
                name: values.name,
                image: building.image
            });
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    let content;

    content = (
        <Modal
            open={isQuickEditBuildingOpen}
            onClose={() => dispatch(setIsQuickEditBuildingOpen(false))}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        >
            <Box>
                <Box
                    sx={{
                        backgroundColor: "background.paper",
                        borderRadius: "16px",
                        width: "95%",
                        maxWidth: "720px",
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        overflow: "auto",
                        maxHeight: "90vh",
                        boxShadow: "0px 10px 15px -3px rgb(0 0 0 / 20%), 0px 4px 6px -2px rgb(0 0 0 / 15%)",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant = "h6"
                        component = "h6"
                        m = {3}
                    >
                        {t('quickUpdate')}
                    </Typography>
                    <Box>
                        <Formik
                            initialValues={{
                                name: building.name
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({
                                  values,
                                  touched,
                                  errors,
                                  handleChange,
                                  handleBlur,
                              }) => {

                                return (
                                    <Form>
                                        <div className="px-[24px]">
                                            <TextField
                                                label={t("name")}
                                                variant="outlined"
                                                sx={{
                                                    "& .MuiInputBase-input": {
                                                        boxShadow: "none",
                                                    },
                                                    borderRadius: "6px",
                                                }}
                                                type="text"
                                                id="name"
                                                name="name"
                                                fullWidth
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete="off"
                                                error={errors.name && touched.name}
                                                helperText={
                                                    errors.name && touched.name
                                                        ? errors.name
                                                        : null
                                                }
                                                size="medium"
                                            />

                                        </div>

                                        <Box
                                            sx={{
                                                padding: "24px",
                                                display: "flex",
                                                justifyContent: "end",
                                            }}
                                        >
                                            <Button
                                                onClick={() => dispatch(setIsQuickEditBuildingOpen(false))}
                                                sx={{
                                                    ...buttonStyleOutlined,
                                                }}
                                            >
                                                {t('cancel')}
                                            </Button>
                                            <LoadingButton
                                                loading={isLoadingUpdateBuilding}
                                                variant="contained"
                                                sx={{ ...buttonStyleContained, ml: 1 }}
                                                type="submit"
                                            >
                                                {t('update')}
                                            </LoadingButton>
                                        </Box>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )

    return content;
}

export default QuickEditBuildingComponent;