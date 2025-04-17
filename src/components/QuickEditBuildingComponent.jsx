import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import {buttonStyleContained, buttonStyleOutlined} from "../assets/style.js";
import * as Yup from "yup";
import useTranslate from "../hook/useTranslate.jsx";
import {useUpdateBuildingMutation} from "../redux/feature/building/buildingApiSlice.js";
import {setIsQuickEditBuildingOpen} from "../redux/feature/building/buildingSlice.js";
import {useEffect} from "react";
import {setCaptionSnackBar, setIsOpenSnackBar} from "../redux/feature/actions/actionSlice.js";
import {LoadingButton} from "@mui/lab";

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

    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Building name is required")
            .min(2, "Building name must be at least 2 characters!")
            .max(100, "Building name cannot be more than 100 characters!")
    });

    useEffect(() => {
        if (isSuccessUpdateBuilding) {
            dispatch(setIsQuickEditBuildingOpen(false))
            dispatch(setIsOpenSnackBar(true));
            dispatch(setCaptionSnackBar(t("createSuccess")));
            setTimeout(() => {
                dispatch(setIsOpenSnackBar(false));
            }, 3000);
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
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        >
            <Box sx={style}>
                <Box
                    sx={{
                        backgroundColor: "background.paper",
                        borderRadius: "16px",
                        width: "100%",
                        mx: 5,
                        maxWidth: "720px",
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