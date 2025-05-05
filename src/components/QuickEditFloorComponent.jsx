import {useDispatch, useSelector} from "react-redux";
import useTranslate from "../hook/useTranslate.jsx";
import {useUpdateFloorMutation} from "../redux/feature/floor/floorApiSlice.js";
import * as Yup from "yup";
import React, {useEffect} from "react";
import {setIsQuickEditFloorOpen} from "../redux/feature/floor/floorSlice.js";
import {setCaptionSnackBar, setIsOpenSnackBar} from "../redux/feature/actions/actionSlice.js";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import {buttonStyleContained, buttonStyleOutlined} from "../assets/style.js";
import {LoadingButton} from "@mui/lab";
import SelectSingleComponent from "./SelectSingleComponent.jsx";
import {useGetAllNameBuildingQuery} from "../redux/feature/building/buildingApiSlice.js";

function QuickEditFloorComponent() {
    const isQuickEditFloorOpen = useSelector((state) => state.floor.isQuickEditFloorOpen);
    const floor = useSelector((state) => state.floor.floorDataForQuickEdit);
    const {t} = useTranslate();
    const dispatch = useDispatch();
    const {data: building} = useGetAllNameBuildingQuery("buildingNameList")

    const [updateFloor, {
        isSuccess: isSuccessUpdateFloor,
        isLoading: isLoadingUpdateFloor,
        isError: isErrorUpdateFloor,
        error: errorUpdateFloor,
    },] = useUpdateFloorMutation();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Floor name is required")
            .min(2, "Floor name must be at least 2 characters!")
            .max(100, "Floor name cannot be more than 100 characters!")
    });

    useEffect(() => {
        if (isSuccessUpdateFloor) {
            dispatch(setIsQuickEditFloorOpen(false))
            dispatch(setIsOpenSnackBar(true));
            dispatch(setCaptionSnackBar(t("createSuccess")));
            setTimeout(() => {
                dispatch(setIsOpenSnackBar(false));
            }, 3000);
        }
    }, [isSuccessUpdateFloor]);

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            await updateFloor({
                id: floor.id, name: values.name, image: floor.image, buildingId: values.buildingId,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    let content;


    content = (<Modal
        open={isQuickEditFloorOpen}
        onClose={() => dispatch(setIsQuickEditFloorOpen(false))}
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
                }}
            >
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{padding: "24px"}}
                >
                    {t('quickUpdate')}
                </Typography>
                <Box>
                    <Formik
                        initialValues={{name: floor.name, buildingId: floor.building?.id}}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({
                              values, touched, errors, handleChange, handleBlur, setFieldValue,
                          }) => {
                            return (<Form>

                                <div className="px-[24px]">
                                    <TextField
                                        label={t("florName")}
                                        variant="outlined"
                                        sx={{
                                            "& .MuiInputBase-input": {
                                                boxShadow: "none",
                                            }, borderRadius: "6px", mb: 3
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
                                        helperText={errors.name && touched.name ? errors.name : null}
                                        size="medium"
                                    />

                                    <SelectSingleComponent
                                        label={t("building")}
                                        options={building}
                                        onChange={(value) => setFieldValue("buildingId", value)}
                                        fullWidth={true}
                                        error={errors.buildingId}
                                        touched={touched.buildingId}
                                        optionLabelKey="name"
                                        selectFistValue={floor.building?.id}
                                    />
                                </div>
                                <Box
                                    sx={{
                                        padding: "24px", display: "flex", justifyContent: "end",
                                    }}
                                >
                                    <Button
                                        onClick={() => dispatch(setIsQuickEditFloorOpen(false))}
                                        sx={{
                                            ...buttonStyleOutlined,
                                        }}
                                    >
                                        {t('cancel')}
                                    </Button>
                                    <LoadingButton
                                        loading={isLoadingUpdateFloor}
                                        variant="contained"
                                        sx={{...buttonStyleContained, ml: 1}}
                                        type="submit"
                                    >
                                        {t('update')}
                                    </LoadingButton>
                                </Box>
                            </Form>);
                        }}
                    </Formik>
                </Box>
            </Box>
        </Box>
    </Modal>)

    return content;
}

export default QuickEditFloorComponent;