'use client'
import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { STORAGE } from '@/Firebase';
import { getBase64 } from '../myCodes/Util';


export async function useUploader(file, folder) {
    let URL;
         const storage = STORAGE;
    const storageRef = ref(storage, `images/${folder}/${file.name}`);

    const uploadTask = await uploadBytesResumable(storageRef, file);
    await getDownloadURL(storageRef).then((downloadURL) => {
        URL = downloadURL;
            });

    
    
   

    return URL
}

