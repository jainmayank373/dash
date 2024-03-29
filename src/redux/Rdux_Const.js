
const  ACTIONS = {
    LOAD_PARTNER :"LOAD_PARTNER",
    LOADING_PARTNER:"LOADING_PARTNER",
    LOADING_UNVERIFIED_PARTNER:"LOADING_UNVERIFIED_PARTNER",
    DIALOG_OPEN:"DIALOG_OPEN",
    DIALOG_CLOSE:"DIALOG_CLOSE",
    DROPDOWN_OPEN:"DROPDOWN_OPEN",
    DROPDOWN_CLOSE:"DROPDOWN_CLOSE",
    VERIFYING_PARTNER:"VERIFYING_PARTNER",
    VERIFIED_PARTNER:"VERIFIED_PARTNER",
    LOADING_HARMONIZED :"LOADING_HARMONIZED",
    LOADED_HARMONIZED:"LOADED_HARMONIZED",
    LOADED_UNHARMONIZED:"LOADING_UNHARMONIZED",
    LOADING_UNHARMONIZED:"LOADED_UNHARMONIZED",
    DECLINE_REQUEST:"DECLINE_REQUEST",
    LOADED_IMAGE:"LOADED_IMAGE",
    POPULATING_FORM:"POPULATING_FORM",
    FETCHING_SUGGESTION:"FETCHING_SUGGESTION",
    UNPOPULATING_FORM:"UNPOPULATING_FORM",
    ADDING_MEDICINES:"ADDING_MEDICINES",

    UPLOADING_FILES:"UPLOADING_FILES",
    FETCHING_USERS:"FETCHING_USERS",
    DELETE_USER:"DELETE_USER",
    EDIT_USER:"EDIT_USER",

    ADD_USER:"ADD_USER",
    USER_ADDED:"USER_ADDED",
    USER_DELETED_DONE:"USER_DELETED_DONE",
    CLOSE_FULL_SCREEB_DIALOG:"CLOSE_DIALOG",    
    UPLOAD_DONE:"UPLOAD_DONE"
}

export default ACTIONS;
/*
mutation {
  update_org(where: {org_id: {_eq: 10}}, _set: {is_verified: true}) {
    returning {
      is_verified
    }
  }
  update_drug_license(where: {org_id: {_eq: 10}}, _set: {drug_license_no: "", license_type: "Wholesale"}) {
    returning {
      license_type
      drug_license_no
    }
  }
}
*/