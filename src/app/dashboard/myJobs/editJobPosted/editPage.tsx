'use client'
import { useEffect, useState } from "react";

import jobRegistrationForm from "../createJob/forms";
function EditPage({data}){
    const [formData, setFormData] = useState({
        eventid : data['eventid'],
        eventName:data['eventName'],
        createDateStart:data['eventDateStart'],
        createDateEnd:data['eventDateEnd'],
        createJob0:data['createJobCat'],
        createJob1:data['createJobPos'], 
        createLoc0:data['createLoc0'],
        createLoc:data['eventLocation'], 
        createWageType:data['eventWageType'],
        createWageTypeVal:data['eventWageTypeVal'],createDescription:data['eventDescription'],
        eventImageURL : data['eventImageURL'],
        postVisibility: data['postVisibility']
    })
    return(
        <>
       
       <div className="-mt-12">
       {jobRegistrationForm(formData,'edit')}
       </div>
        </>
    )
}

export default EditPage;