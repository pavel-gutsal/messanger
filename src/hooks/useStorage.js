import { useState } from 'react';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../firebase/config';

export const useStorage = () => {
  const [progress, setProgress] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageStorageName, setImageStorageName] = useState(null);

  const uploadImage = (image) => {
    try {
      const randomString = Math.floor(Math.random() * (90 * 10 ** 8)) + 10 * 10 ** 8;
      const storageName = `images/${randomString}${image.name}`;
      setImageStorageName(storageName);
      // eslint-disable-next-line no-unused-vars
      const storageRef = ref(storage, storageName);

      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const persantage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.ceil(persantage));

          console.log(`Upload is ${persantage}% done`);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.warn(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setImageUrl(downloadURL);
          });
        },
      );
    } catch (err) {
      console.warn(err);
    }
  };

  const deleteStorageImage = async (imageDIR) => {
    const deleteImageRef = ref(storage, imageDIR);

    await deleteObject(deleteImageRef);
  };

  return {
    progress,
    uploadImage,
    imageUrl,
    imageStorageName,
    deleteStorageImage,
  };
};
