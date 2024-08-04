import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    limit: Yup.number().required('Limit is required').positive('Limit must be positive'),
    type: Yup.string(),
    link: Yup.string().required('Link is required'),
});