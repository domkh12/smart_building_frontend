import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Grid2, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import {
  PiCalendarDotsThin,
  PiCheckThin,
  PiEnvelopeSimpleThin,
  PiPencilSimpleThin,
  PiPhoneCallThin,
  PiUserThin,
} from "react-icons/pi";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useUpdateUserMutation } from "../../../redux/feature/users/userApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfileDetails() {
  const user = useSelector((state) => state.users.user);
  const [isBtnUpdate, setIsBtnUpdate] = useState(false);

  const [
    updateUser,
    { isSuccess: isUpdateSuccess, isLoading: isUpdateLoading },
  ] = useUpdateUserMutation();

  const validationSchema = Yup.object().shape({});

  const handleSubmit = async (values) => {
    console.log("Form submitted with:", values);
    const formattedDateOfBirth = values.dateOfBirth.format("YYYY-MM-DD");
    await updateUser({
      id: user.uuid,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: formattedDateOfBirth,
      phoneNumber: values.phoneNumber,
    });
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("Updated Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsBtnUpdate(false);
    }
  }, [isUpdateSuccess]);

  return (
    <>     
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: dayjs(user.dateOfBirth),
          phone: user.phoneNumber,
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => {          
          return (
            <Form>
              <Grid2 container sx={{ mt: 4 }} spacing={10}>
                <Grid2
                  size={5}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <PiUserThin className="w-7 h-7" />
                    <Typography variant="h6">First Name</Typography>
                  </Box>
                  {isBtnUpdate ? (
                    <TextField
                      id="firstName"
                      name="firstName"
                      sx={{
                        "& .MuiInputBase-input": {
                          boxShadow: "none",
                        },
                      }}
                      fullWidth
                      autoComplete="off"
                      label={values.firstName ? "" : "Enter First Name"}
                      value={values.firstName}
                      variant="outlined"
                      onChange={handleChange}
                    />
                  ) : (
                    <Typography>{values.firstName || "Unknown"}</Typography>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <PiUserThin className="w-7 h-7" />
                    <Typography variant="h6">Last Name</Typography>
                  </Box>
                  {isBtnUpdate ? (
                    <TextField
                      id="lastName"
                      sx={{
                        "& .MuiInputBase-input": {
                          boxShadow: "none",
                        },
                      }}
                      fullWidth
                      autoComplete="off"
                      label={values.lastName ? "" : "Enter Last Name"}
                      value={values.lastName}
                      variant="outlined"
                      onChange={handleChange}
                    />
                  ) : (
                    <Typography>{values.lastName || "Unknown"}</Typography>
                  )}
                </Grid2>
                <Grid2
                  size={5}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <PiCalendarDotsThin className="w-7 h-7" />
                    <Typography variant="h6">Date of Birth</Typography>
                  </Box>

                  {isBtnUpdate ? (
                    <DatePicker
                      sx={{
                        "& .MuiInputBase-input": {
                          boxShadow: "none",
                        },
                      }}
                      label="Date of Birth"
                      value={values.dateOfBirth}
                      onChange={(value) => setFieldValue("dateOfBirth", value)}
                      format="DD-MMMM-YYYY"
                    />
                  ) : (
                    <Typography>
                      {values.dateOfBirth.format("DD-MMMM-YYYY") || "Unknown"}
                    </Typography>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <PiPhoneCallThin className="w-7 h-7" />
                    <Typography variant="h6">Phone Number</Typography>
                  </Box>

                  {isBtnUpdate ? (
                    <TextField
                      id="phone"
                      sx={{
                        "& .MuiInputBase-input": {
                          boxShadow: "none",
                        },
                      }}
                      fullWidth
                      autoComplete="off"
                      label={values.phone ? "" : "Enter Phone Number"}
                      value={values.phone}
                      variant="outlined"
                      onChange={handleChange}
                    />
                  ) : (
                    <Typography>{values.phone || "Unknown"}</Typography>
                  )}
                </Grid2>
                <Grid2 size={2}>
                  {isBtnUpdate ? (
                    <LoadingButton
                      loading={isUpdateLoading}
                      variant="contained"
                      type="submit"
                      startIcon={<PiCheckThin />}
                      sx={{ borderRadius: "24px", px: 4 }}
                      disabled={!values.firstName || !values.lastName}
                    >
                      Update
                    </LoadingButton>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={(event) => {
                        event.preventDefault();
                        setIsBtnUpdate(true);
                      }}
                      startIcon={<PiPencilSimpleThin />}
                      sx={{ borderRadius: "24px", px: 4 }}
                    >
                      Edit
                    </Button>
                  )}
                </Grid2>
              </Grid2>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
