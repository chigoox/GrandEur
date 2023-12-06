import { updateArrayDatabaseItem } from "./Database"

export const addEmailToList = (email) =>{
//addToDatabase('Admin', 'Emails', 'emails', {email})
updateArrayDatabaseItem('Admin', 'Emails', 'allEmails', email)
} 

export const addUIDToList = (UID) =>{
//addToDatabase('Admin', 'Emails', 'emails', {email})
updateArrayDatabaseItem('Admin', 'Users', 'allUIDs', UID)
} 
    