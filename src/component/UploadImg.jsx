let fileUrl = [];
const putStorageItem = (file) => {
    const metadata = { contentType: 'image/jpeg' };
    const uploadTask = storageRef.child('Post/' + makeid()).put(file, metadata)
    uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress)
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default:
                    break;
            }
        }, (error) => { // A full list of error codes is available at
            switch (error.code) {
                case 'storage/unauthorized':
                    alert('access problam'); // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    alert('canceled'); // User canceled the upload
                    break;
                case 'storage/unknown':
                    console.log('occurred');  // Unknown error occurred, inspect error.serverResponse
                    break;
                default:
                    break;
            }
        },
        // Upload completed successfully, now we can get the download URL
        () => uploadTask.snapshot.ref.getDownloadURL().then((URL) =>!fileUrl.includes(URL)? fileUrl.push(URL):fileUrl)
    );
}

Promise.all()
action.files.map(async (file) => {
    await putStorageItem(file)
})
    .then(()=>{
        const ref = action.data;
        ref['Img']= fileUrl;
        db.collection("Post").doc(makeid()).set([action.data,fileUrl]).then(() => {
            console.log("Document successfully written!");
            alert('successfully');
        }).catch((error) => {
            alert(error.code)
            console.log(error.message);
        });
    })
    .catch((error) => {
        alert(error.code);
        console.log(error.message);
    })