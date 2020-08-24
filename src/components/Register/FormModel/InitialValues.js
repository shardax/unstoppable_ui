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

export default {
    [activity_ids.name]: '',
    [other_favorite_activities.name]: '',
    [virtual_partner.name]: false,
    [fitness_level.name]: '',
    [exercise_reason_ids.name]: '',
    [prefered_exercise_location.name]: '',
    [prefered_exercise_time.name]: '',
    [reason_for_match.name]: '',
    [personality.name]: '',
    [work_status.name]: '',
    [details_about_self.name]: '',
    [cancer_location.name]: '',
    [other_cancer_location.name]: '',
    [treatment_status.name]: '',
    [treatment_description.name]: '',
    [part_of_wellness_program.name]: false,
    [part_of_wellness_string.name]: '',
    [which_wellness_program.name]: ''
  };