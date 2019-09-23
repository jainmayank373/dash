import ACTIONS from '../Rdux_Const.js'
import store from '../store.js';

export const load_unverified_partner = (data) => {
    return {
        type: ACTIONS.LOADING_UNVERIFIED_PARTNER,
        payload: data,
        fetching: false
    }
}

export const verify_partner = () => {
    return {
        type: ACTIONS.VERIFYING_PARTNER
    }
}
export const verifying_partner = (data) => {
    return {
        type: ACTIONS.VERIFIED_PARTNER,
        payload: data
    }
}
export const dialogOpen = () => {
    return {
        type: ACTIONS.DIALOG_OPEN
    }
}

export const dropDownClose = () => {
    return {
        type: ACTIONS.DROPDOWN_CLOSE
    }
}


export const dropDownOpen = () => {
    return {
        type: ACTIONS.DROPDOWN_OPEN
    }
}

export const dialogClose = () => {
    return {
        type: ACTIONS.DIALOG_CLOSE
    }


}
export const load_partner = (data) => {
    return {
        type: ACTIONS.LOAD_PARTNER,
        payload: data,
        fetching: false
    }
}


export const loading_partner = () => {

    return {
        type: ACTIONS.LOADING_PARTNER,
        fetching: true
    }
}

export const loading_harmonized = () => {
    return {
        type: ACTIONS.LOADING_HARMONIZED

    }
}

export const loaded_harmonized = (data) => {
    return {
        type: ACTIONS.LOADED_HARMONIZED,
        payload: data
    }
}

export const loading_unharmonized = (data) => {
    return {
        type: ACTIONS.LOADING_UNHARMONIZED
    }
}

export const loaded_unharmonized = (data) => {
    return {
        type: ACTIONS.LOADED_UNHARMONIZED,
        payload: data
    }
}

export const on_decline = () => {
    return {
        type: ACTIONS.DECLINE_REQUEST
    }
}
export const loaded_image = (data) => {
    return {
        type: ACTIONS.LOADED_IMAGE,
        payload: data
    }
}
export const populatingForm = (data) => {
    return {
        type: ACTIONS.POPULATING_FORM,
        payload: data
    }
}
export const unPopulatingForm = () => {
    return {
        type: ACTIONS.UNPOPULATING_FORM,
        payload: null
    }
}

export const on_fetching_suggestion = (data) => {
    return {
        type: ACTIONS.FETCHING_SUGGESTION,
        payload: data
    }
}
export const adding_medicines = (data) => {
    return {
        type: ACTIONS.ADDING_MEDICINES,
        payload: data
    }
}

export const uploading_file_done = (data) => {
    return {
        type: ACTIONS.UPLOADING_FILES,
        payload: data.data
    }
}

export const fetching_users = (data)=>{
    return  {
        type:ACTIONS.FETCHING_USERS,
        payload:data.data.usr_org
    }
}

export function edit_user(userInfo){

    return {
        type:ACTIONS.EDIT_USER,
        payload:userInfo
    }
}

export const delete_user  = ()=>{
    return  {
        type:ACTIONS.DELETE_USER
    }
}

export const add_user =  (data)=>{
    return {
        type:ACTIONS.ADD_USER,
        payload:data.payload
    }
}

export const user_add_success = ()=>{
    return {
        type:ACTIONS.USER_ADDED
    }
}
export const user_deleted_done = ()=>{
    return {
        type:ACTIONS.USER_DELETED_DONE
    }
}

export const upload_done = (data)=>{
    return {
        type:ACTIONS.UPLOAD_DONE,
        payload:data
    }
}
export const close_dialog = ()=>{
    return {
        type:ACTIONS.CLOSE_FULL_SCREEB_DIALOG
    }
}

export const LoadingPartnerInfo = (actionType) => {

    store.dispatch(loading_partner())
    return () => {


        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:8080/v1/graphql", {

            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ "query": "{\n  org(where: {is_verified: {_eq: \"true\"}}) {\n    created\n    usr_orgs {\n   m_number\n }\n  addresses {\n      city\n      locality\n      org_id\n      pincode\n  }\n      is_active\n    org_id\n    org_name\n    is_verified\n  }\n}\n", "variables": null })
        })
            .then((res) => res.json())
            .then(res => store.dispatch(load_partner(res)))
            .catch((err) => console.log(err))
    }
}

export const LoadingUnverifiedPartner = (actionType) => {

    store.dispatch(loading_partner())
    return () => {


        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:8080/v1/graphql", {

            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ "query": "\n{\n  org(where: {is_verified: {_eq: \"false\"}}) {\n    gstin\n    org_name\n    drug_licenses {\n      image_identifier\n  drug_license_no\n  valid_till\n  license_type\n      modified\n      org_id\n      user_id\n      valid_till\n    }\n    usr_orgs {\n  email\n  f_name\n  m_number\n }\n    is_active\n    is_verified\n    org_id\n    org_type\n    created\n    addresses {\n      city\n      locality\n      org_id\n      pincode\n  }\n  }\n}\n", "variables": null })
        })
            .then((res) => res.json())
            .then(res => { console.log("RESPONSE", res); return res })
            .then(res => store.dispatch(load_unverified_partner(res)))
            .catch((err) => console.log(err))
    }
}

export const VerifyingPartner = (org_id, drug_license_no, license_type, valid_till) => {

    store.dispatch(verify_partner());
    return () => {
        console.log(org_id);

        var URL = { "query": "mutation {\n  update_org(where: {org_id: {_eq: " + org_id + "}, _set: {is_verified: true}) {\n    returning {\n      is_verified\n    }\n  }\n}\n", "variables": null }
        console.log(URL);
        //     {"query":"mutation {\n  update_org(where: {org_id: {_eq: 10}}, _set: {is_verified: true}) {\n    returning {\n      is_verified\n    }\n  }\n  update_drug_license(where: {org_id: {_eq: 10}}, _set: {drug_license_no: \"\", license_type: \"Retail\", valid_till: \"wqqwqw\"}) {\n    returning {\n      license_type\n      drug_license_no\n      valid_till\n    }\n  }\n}\n","variables":null}

        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:8080/v1/graphql", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ "query": "mutation {\n  update_org(where: {org_id: {_eq: " + org_id + " }}, _set: {is_verified: true}) {\n    returning {\n      is_verified\n      is_active\n    }\n  }\n  update_drug_license(where: {org_id: {_eq: " + org_id + " }}, _set: {drug_license_no: \"" + drug_license_no + "\", license_type: \"" + license_type + "\" , valid_till: \"" + valid_till + "\"}) {\n    returning {\n      license_type\n      drug_license_no\n    }\n  }\n}\n", "variables": null })

        })
            .then((res) => res.json())
            .then(res => { console.log("Verifying User", res); return res })
            .then(res => store.dispatch(verifying_partner(res)))
            .catch((err) => console.log(err))
    }
}

export const loadingHarmonized = () => {

    store.dispatch(loading_harmonized);

    return () => {

        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:8080/v1/graphql", {

            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ "query": "{\n  med_master_list {\n    brand_name\n    composition\n    hsn_code\n    is_banned\n    med_form\n    pres_type\n    primary_pack\n    secondary_pack\n    manufacturer\n  }\n}\n", "variables": null })
        })
            .then((res) => res.json())
            .then(res => { console.log("Loaded harmonised medicines", res); return res })
            .then(res => store.dispatch(loaded_harmonized(res)))
            .catch((err) => console.log(err))
    }

}

export const loadingUnHarmonized = () => {

    store.dispatch(loading_unharmonized);
    return () => {

        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:8080/v1/graphql", {

            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ "query": "{\n  unharmonized_medicines {\n    brand_name\n   created\n   is_declined\n    med_form\n    manufacturer\n    unhar_med_id\n   primary_pack\n   modified\n    inventories(distinct_on: inventory_id) {\n      org {\n        org_name\n      }\n    }\n  }\n}\n", "variables": null })
        })
            .then((res) => res.json())
            .then(res => { console.log("Loaded Unharmonised medicines", res); return res })
            .then(res => store.dispatch(loaded_unharmonized(res)))
            .catch((err) => console.log(err))
    }


}

export const onDecline = (org_id) => {

    return () => {
        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:8080/v1/graphql", {

            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ "query": "mutation {\n  update_unharmonized_medicines(where: {unhar_med_id: {_eq: " + org_id + "}}, _set: {is_declined: true}) {\n    returning {\n      is_declined\n      unhar_med_id\n    }\n  }\n}\n", "variables": null })
        })
            .then((res) => res.json())
            .then(res => { console.log("Loaded Unharmonised medicines", res); return res })
            .then(res => store.dispatch(on_decline(res)))
            .catch((err) => console.log(err))
    }
}

export const loadedImage = (image_identifier) => {
    return () => {
        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:3000/download?image_identifier=1dced081-aa2a-427b-b527-63abb29ad9b3", {

            method: "GET"
        })
            .then((res) => { console.log(res); return res.json() })
            .then(res => { console.log("IMAGE IDENTIYING", res); return res })
            .then(res => store.dispatch(loaded_image(res)))
            .catch((err) => console.log(err))
    }
}

export const fetchingSuggestion = (value) => {

    return () => {

        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:8080/v1/graphql", {

            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzAxNzU3MDQsImlhdCI6MTU2NzU4MzcwNCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIn19.uoPdXjFlF57njVczLWIXB-6kcWdBGdJBQzgJf96YlRM"
                            
            },
            body: JSON.stringify({ "query": "{\n  med_master_list(where: {composition: {_ilike: \"%" + value + "%\"}}) {\n    composition\n    brand_name\n  }\n}\n", "variables": null })
        })
            .then((res) => res.json())
            .then(res => { console.log("fetching suggestion", res); return res })
            .then(res => store.dispatch(on_fetching_suggestion(res)))
            .catch((err) => console.log(err))
    }


}


export const onAddingMedicine = (data) => {

    console.log("data", data);
    return () => {
        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:8080/v1/graphql", {

            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzAxNzU3MDQsImlhdCI6MTU2NzU4MzcwNCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIn19.uoPdXjFlF57njVczLWIXB-6kcWdBGdJBQzgJf96YlRM"
                            
            },
            //  {"query":"mutation {\n  insert_med_master_list(objects: {brand_name: \"brand1\", composition: \"comp1\", hsn_code: 1234, is_banned: false, is_prescribed: false, manufacturer: \"vicks\", med_form: \"Tab\", primary_pack: 10}) {\n    returning {\n      brand_name\n      composition\n      hsn_code\n      med_form\n    }\n  }\n  delete_unharmonized_medicines(where: {unhar_med_id: {_eq: 2}}) {\n    returning {\n      brand_name\n      created\n      hsn_code\n    }\n  }\n}\n","variables":null}
            body: JSON.stringify({ "query": "mutation {\n  insert_med_master_list(objects: {brand_name: \"" + data.brand_name + "\", composition: \"" + data.composition + "\", hsn_code: " + data.hsn_code + ", med_form: \"" + data.medicine_form[0].name + "\",  created:\"now()\",  primary_pack: " + data.primary_pack + ", manufacturer: \"" + data.value + "\"}) {\n    returning {\n      brand_name\n      composition\n      med_id\n    }\n  }\n  delete_unharmonized_medicines(where: {unhar_med_id: {_eq: " + data.unhar_med_id + "}}) {\n    returning {\n      brand_name\n      created\n      hsn_code\n    }\n  }\n}\n", "variables": null })
        })
            .then((res) => res.json())
            .then(res => { console.log("fetching suggestion", res); return res })
            .then(res => store.dispatch(adding_medicines(res)))
            .catch((err) => console.log(err))
    }


}

export function onUploading(formData) {

    return () => {

        fetch("http://localhost:4000/csv",
            {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzAxNzU3MDQsImlhdCI6MTU2NzU4MzcwNCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIn19.uoPdXjFlF57njVczLWIXB-6kcWdBGdJBQzgJf96YlRM"
                },
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {

                if (data.errors) {
                    console.log("Error");
                }
                else {


                    console.log("Hello", (data));

                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].match_master.length > 0) {
                            data.data[i].newMatch = data.data[i].match_master[0].brand_name;
                            data.data[i].med_id = data.data[i].match_master[0].med_id;
                            data.data[i].manufacturer_id = data.data[i].match_master[0].manufacturer_id;

                        }
                        else {
                            data.data[i].newMatch = "";
                        }

                    }
                    console.log("data", data);
                    store.dispatch(uploading_file_done(data));
                }
            })
            .catch(err => { console.log("Printing error ", err); })
    }
}

export function fetchingUsers() {

    return () => {
        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:8080/v1/graphql", {

            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzAxNzU3MDQsImlhdCI6MTU2NzU4MzcwNCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIn19.uoPdXjFlF57njVczLWIXB-6kcWdBGdJBQzgJf96YlRM"
                            
            },
            //  {"query":"mutation {\n  insert_med_master_list(objects: {brand_name: \"brand1\", composition: \"comp1\", hsn_code: 1234, is_banned: false, is_prescribed: false, manufacturer: \"vicks\", med_form: \"Tab\", primary_pack: 10}) {\n    returning {\n      brand_name\n      composition\n      hsn_code\n      med_form\n    }\n  }\n  delete_unharmonized_medicines(where: {unhar_med_id: {_eq: 2}}) {\n    returning {\n      brand_name\n      created\n      hsn_code\n    }\n  }\n}\n","variables":null}
            body: JSON.stringify({"query":"{\n  usr_org(where: {org_id: {_eq: null}}) {\n    f_name\n    email\n    l_name\n    user_id\n   m_number\n  }\n}\n","variables":null})
        })
            .then((res) => res.json())
            .then(res => { console.log("fetching Users", res); return res })
            .then(res => store.dispatch(fetching_users(res)))
            .catch((err) => console.log(err))
    }
}

export function deleteUser(user_id){
    return () =>{
        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:8080/v1/graphql", {

            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzAxNzU3MDQsImlhdCI6MTU2NzU4MzcwNCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIn19.uoPdXjFlF57njVczLWIXB-6kcWdBGdJBQzgJf96YlRM"
                            
            },
            //  {"query":"mutation {\n  insert_med_master_list(objects: {brand_name: \"brand1\", composition: \"comp1\", hsn_code: 1234, is_banned: false, is_prescribed: false, manufacturer: \"vicks\", med_form: \"Tab\", primary_pack: 10}) {\n    returning {\n      brand_name\n      composition\n      hsn_code\n      med_form\n    }\n  }\n  delete_unharmonized_medicines(where: {unhar_med_id: {_eq: 2}}) {\n    returning {\n      brand_name\n      created\n      hsn_code\n    }\n  }\n}\n","variables":null}
            body: JSON.stringify({"query":"mutation {\n  delete_usr_org(where: {user_id: {_eq: "+user_id+"}}) {\n    returning {\n      user_id\n    }\n  }\n}\n","variables":null})
        })
            .then((res) => res.json())
            .then(res => { console.log("deleting User", res); return res })
            .then(res =>{
                 store.dispatch(delete_user(res));
                 setTimeout(()=>{
                    store.dispatch(user_deleted_done());
                 },2000)
                }
            )
            .catch((err) => console.log(err))

    }
}




export const addUser = (data) => {

    console.log("data", data);
    return () => {
        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:8080/v1/graphql", {

            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzAxNzU3MDQsImlhdCI6MTU2NzU4MzcwNCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIn19.uoPdXjFlF57njVczLWIXB-6kcWdBGdJBQzgJf96YlRM"
                            
            },
            //  {"query":"mutation {\n  insert_med_master_list(objects: {brand_name: \"brand1\", composition: \"comp1\", hsn_code: 1234, is_banned: false, is_prescribed: false, manufacturer: \"vicks\", med_form: \"Tab\", primary_pack: 10}) {\n    returning {\n      brand_name\n      composition\n      hsn_code\n      med_form\n    }\n  }\n  delete_unharmonized_medicines(where: {unhar_med_id: {_eq: 2}}) {\n    returning {\n      brand_name\n      created\n      hsn_code\n    }\n  }\n}\n","variables":null}
            body: JSON.stringify({"query":"mutation {\n  insert_usr_org(objects: {email: \""+data.email+"\", f_name: \""+data.f_name+"\", is_admin: false, m_number: \""+data.m_number+"\"}) {\n    returning {\n      created\n    }\n  }\n}\n","variables":null})
        })
            .then((res) => res.json())
            .then(res => { console.log("fetching suggestion", res); return res })
            .then(res =>{
                store.dispatch(add_user(res))
                setTimeout(()=>{
                    store.dispatch(user_add_success());
                },3000)
            })
            .catch((err) => console.log(err))
    }


}

export const editUser = (userId,f_name,m_number)=>{
    console.log("PRINTING VALUE",userId,f_name,m_number)
    return () => {
        fetch("http://ec2-34-227-149-17.compute-1.amazonaws.com:8080/v1/graphql", {

            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzAxNzU3MDQsImlhdCI6MTU2NzU4MzcwNCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIn19.uoPdXjFlF57njVczLWIXB-6kcWdBGdJBQzgJf96YlRM"
                            
            },
            //  {"query":"mutation {\n  insert_med_master_list(objects: {brand_name: \"brand1\", composition: \"comp1\", hsn_code: 1234, is_banned: false, is_prescribed: false, manufacturer: \"vicks\", med_form: \"Tab\", primary_pack: 10}) {\n    returning {\n      brand_name\n      composition\n      hsn_code\n      med_form\n    }\n  }\n  delete_unharmonized_medicines(where: {unhar_med_id: {_eq: 2}}) {\n    returning {\n      brand_name\n      created\n      hsn_code\n    }\n  }\n}\n","variables":null}
            body: JSON.stringify({"query":"mutation {\n  update_usr_org(where: {user_id: {_eq: "+userId+"}}, _set: {f_name: \""+f_name+"\", m_number: \""+m_number+"\", modified: \"\\\"Now()\\\"\"}) {\n    returning {\n      modified\n    }\n  }\n}\n","variables":null})
        })
            .then((res) => res.json())
            .then(res => { console.log("fetching suggestion", res); return res })
            .then(res =>{
                store.dispatch(edit_user(res))
                setTimeout(()=>{
                    store.dispatch(user_add_success());
                },3000)
            })
            .catch((err) => console.log(err))
    }
}

/*
export function onUploading(formData) {

    console.log(formData);
   // Store.dispatch(uploading_running_with_formdat(formData));
    return () => {

        fetch("http://localhost:4000/csv",
            {
                headers:{
                    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzAxNzU3MDQsImlhdCI6MTU2NzU4MzcwNCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIn19.uoPdXjFlF57njVczLWIXB-6kcWdBGdJBQzgJf96YlRM"
                },
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    Store.dispatch(upload_error())
                }
                else {


                    console.log("Hello", (data));
                    
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].match_master.length > 0) {
                            data.data[i].newMatch = data.data[i].match_master[0].brand_name;
                            data.data[i].med_id = data.data[i].match_master[0].med_id;
                            data.data[i].manufacturer_id =  data.data[i].match_master[0].manufacturer_id;

                        }
                        else {
                            data.data[i].newMatch = "";
                        }

                    }

                    var hsn_code = {};
                    var OverallDiscount = 1173.65;
                    var cgst = [];
                    var sgst = [];
                    var invoiceAmount = 0;
                    var sum = 0;
                    var amount = []
                    console.log("DATA", data);
            
                    
                    //  console.log(this.state.fileds);
            
            
                    for (var i = 0; i < 9; i++) {
            
                        console.log(parseFloat(data.data[i]["Price-to-Retailer (Rs)"]), parseFloat(data.data[i]["Quantity Purchased #"]))
                        amount.push(parseFloat(data.data[i]["Price-to-Retailer (Rs)"]) * parseFloat(data.data[i]["Quantity Purchased #"]));
                        amount[i] = amount[i] - amount[i] * (parseFloat(data.data[i]["Discount (Rs)"]) / 100);
                        console.log("AMOUNT", amount[i]);
            
                        sum += amount[i];
                    }
            
                    console.log(sum);
            
            
                    for (var i = 0; i < 9; i++) {
                        amount[i] = (amount[i] - (amount[i] * OverallDiscount) / sum);

                        data.data[i].amount =  amount[i].toFixed(4);
                        
                        if (data.data[i]["Brand Name"] === "STRECHMIN OINT") {
                            console.log(data.data[i]["Brand Name"], 18);
                            var gstAmount = (amount[i] * 18 /*data["GST RATE"] / 100)
                        }
                        
                        else
                            var gstAmount = (amount[i] * 12 /*data["GST RATE"] / 100)
            
                        amount[i] = amount[i] + gstAmount;

                        data.data[i].total =  amount[i].toFixed(4);
                        data.data[i].cgst = (gstAmount / 2).toFixed(4);
                        data.data[i].sgst = (gstAmount / 2).toFixed(4);
                        
                        cgst.push(gstAmount / 2);
                        sgst.push(gstAmount / 2);
                        invoiceAmount = invoiceAmount + amount[i];
                    }
            
                    console.log("invoice amount", invoiceAmount);
                    data.data.amount = amount;
                    console.log("data",data);
                    Store.dispatch(upload_done(data));
                }
            })
            .catch(err => { console.log("Printing error ", err); Store.dispatch(upload_error()) })
    }
}*/