export const REGISTER_URL = "/api/auth/v1/register";
export const LOG_URL = "/api/auth/v1/authenticate";
export const LOST_PASS_URL = "/api/auth/v1/lostpassword";
export const RESET_PASS_URL = "/api/auth/v1/resetpassword";
export const REFRESH_TOKEN_URL = "/api/auth/v1/refresh-token";
export const MFA_CODE_URL = "/api/auth/v1/mfacode";
export const HEALTH_CONTROLER_URL = "/health";
export const DEMO_CONTROLER_URL = "/api/v1/demo-controller";
export const PATIENT_CONTROLER_URL = "/patient";
export const PATIENT_CONTROLER_URL_ID = "/patient/get/";
export const PATIENT_DOCUMENTS_CONTROLER_URL = "/document";
export const PATIENT_DOCUMENTS_UPLOAD = "/document/upload";
export const PATIENT_DOCUMENTS_CONTROLER_URL_ID = "/document/get/";
export const PATIENT_DOCUMENTS_GET_BY_PATIENT_ID = "/document/getbypatientid/";
export const PRACTCE_DETAILS_CONTROLER_URL = "/practicedetails";
export const STAFF_MEMBERS_CONTROLER_URL = "/staffmember";
export const STAFF_MEMBERS_DELETE_URL = "/staffmember/delete";
export const CONSULTATION_NOTE_DELETE_URL = "/consultationnote/delete";

export const STAFF_MEMBERS_CONTROLER_URL_ID = "/staffmember/get/";
export const STAFF_MEMBERS_CONTROLER_URL_ID_DISABLE = "/staffmember/disable";
export const STAFF_MEMBERS_CONTROLER_URL_STAFF_ID =
  "/api/practice/v1/{tenant}/staffpermission/getbystaffmemberid/{staffMemberIdValue}";
export const PRACTICE_SERVICE_CONTROLER_URL = "/practiceservice";
export const PRACTICE_SERVICE_DELETE_URL = "/practiceservice/delete";
export const PRACTICE_SERVICE_CONTROLER_URL_ID = "practiceservice/get/";
export const PRACTICE_SERVICE_DISABLE_CONTROLER_URL = "/practiceservice/disable";
export const PRACTICE_HOURS_CONTROLER_URL = "/practicehours";
export const PRACTICE_HOURS_DISABLE_CONTROLER_URL = "/practicehours/disable";
export const PRACTICE_HOURS_CONTROLER_URL_List = "/practicehours/list";
export const PRACTICE_HOURS_CONTROLER_URL_ID = "/practicehours/get/";
export const SMS_TEMPLATE_CONTROLLER = "/smstemplate";
export const SMS_TEMPLATE_CONTROLLER_ID = "smstemplate/get/";
export const SMS_TEMPLATE_CONTROLLER_ID_REMOVE = "/smstemplate/delete";
export const TASK_CONTROLER_URL = "/task";
export const TASK_CONTROLER_URL_ID = "/task/get/";
export const TASK_CONTROLER_URL_OPEN_USER = "/task/get/open";
export const TASK_CONTROLER_URL_CLOSED_USER = "/task/get/closed";
export const TASK_CONTROLER_CLOSE = "/task/close/{taskId}"
export const DELETE_TASK = "/task/delete";
export const TASK_CONTROLLER_URL_USERID = "/task/getbyassignedtostaffid/{assignedToStaffIdValue}"
export const DELETE_DOCUMENT = "/document/delete";
export const MESSAGE_CONTROLER_URL = "/smsmessage";
export const PATIENT_SEARCH_AUTOCOMPLETE_URL = '/patient/getbysurname';
export const APPOINMENT_CONTROLER_URL =
  "/api/practice/v1/{tenant}/appointment/getbystaffid/{staffIdValue}";
export const APPOINMENT_ADD_URL = '/appointment';
export const GET_ALL_STAFF = '/staffmember/getbyroster/true';
export const PATIENT_SIGN_UP = "/api/practice/v1/{tenant}/patient";
export const GET_BY_STAFF_MEMBER_ID = "/appointment/getbystaffmemberid/{staffIdValue}/dates";
export const GET_APPOINTMENTS_HOME_PAGE = "/appointment/getbystaffmemberid/dates";
export const DELETE_APPOINTMENT = "/appointment/delete";
export const WHO_AM_I = "/api/v1/whoami";
export const GET_NOTIFICATION = "/notificationsettings";
export const UPDATE_NOTIFICATION = "/notificationsettings";
export const GET_BY_PRACTICE_ID = "/appointment/getbypracticeid/dates/";
export const GET_BY_STAFF_MEMBER = "/appointment/getbystaffmemberid/dates";
export const SAVE_CLINICAL_NOTE = '/consultationnote';
export const GET_CLINICAL_NOTE = '/consultationnote/getbyappointmentid/';
export const GET_VISIT_HISTORY = '/consultation/getbypatientid/';
export const GET_PATIENT_TASKS = '/task/getbypatientid/';
export const GET_ALL_DOCUMENT_TYPES = '/documenttypes';
export const GET_PATIENT_NOTES = '/consultationnote/getbypatientid/';
export const ADD_PATIENT_PAYMENT = '/consultationpayment'
export const GET_PATIENT_PAYMENT = '/consultationpayment/getbypaidby/{paidByValue}'
export const CHECK_PATIENT_PAYMENT = '/consultationpayment/getbyconsultation/{consultationId}'
export const GET_APPOINTMENTS = '/appointment/getbydates'
export const START_CONSULTATION = '/consultation/start';
export const GET_CONSULTATION_ID = '/consultation/getbyappointmentid/'
export const GET_PATIENT_PAYMENT_ID = '/consultationpaymentdue/getbypatientid/{patientIdValue}'
export const DOWNLOAD_DOCUMENT = '/document/download/{documentId}/patient/{patientId}'
export const DOCTOR_DETAILS = '/doctordetails'