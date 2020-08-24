import * as Yup from 'yup';
import moment from 'moment';
import AboutFormModel from './AboutFormModel';
const {
    formField:{
        activity_ids,
        other_favorite_activities,
        virtual_partner,
        fitness_level,
        exercise_reason_ids,
        prefered_exercise_location,
        prefered_exercise_time,
        reason_for_match,
        personality,
        work_status,
        details_about_self,
        //Cancer History
        cancer_location,
        other_cancer_location,
        treatment_status,
        treatment_description,
        part_of_wellness_program,
        part_of_wellness_string,
        which_wellness_program
    }
} = AboutFormModel;


export default [
  Yup.object().shape({
    [personality.name]: Yup.string()
        .required(`${personality.requiredErrorMsg}`),
    [work_status.name]: Yup.string()
        .required(`${work_status.requiredErrorMsg}`),
    [details_about_self.name]: Yup.string()
        .required(`${details_about_self.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [cancer_location]: Yup.string()
        .required(`${cancer_location.requiredErrorMsg}`),
    [treatment_status.name]: Yup.string()
        .required(`${treatment_status.requiredErrorMsg}`),
    [treatment_description.name]: Yup.string()
        .required(`${treatment_description.requiredErrorMsg}`),
    [part_of_wellness_program.name]: Yup.string()
        .required(`${part_of_wellness_program.requiredErrorMsg}`),
    [which_wellness_program]: Yup.string()
        .min(1, "Too Short!")
        .max(255, "Too Long!")
        .required(`${which_wellness_program.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [activity_ids.name]: Yup.string()
        .required(`${activity_ids.requiredErrorMsg}`),
    [virtual_partner.name]: Yup.string()
        .required(`${virtual_partner.requiredErrorMsg}`),
    [fitness_level.name]: Yup.string()
        .required(`${fitness_level.requiredErrorMsg}`),
    [exercise_reason_ids.name]: Yup.string()
        .required(`${exercise_reason_ids.requiredErrorMsg}`),
    [prefered_exercise_location.name]: Yup.string()
        .required(`${prefered_exercise_location.requiredErrorMsg}`),
    [prefered_exercise_time.name]: Yup.string()
        .required(`${prefered_exercise_time.requiredErrorMsg}`),
  })
];
