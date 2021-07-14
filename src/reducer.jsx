import firebase from './firebase'
import 'firebase/auth';
import 'firebase/firestore';


const db = firebase.firestore();
const storageRef = firebase.storage().ref();
let fileUrl = [];
function makeid() {
    const length = 5
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result + new Date().getTime().toString();
}
// Upload file and metadata to the object 'images/mountains.jpg'
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
        }, error => { // A full list of error codes is available at
            alert(error.code)
            console.log(error.message);
        },
        // Upload completed successfully, now we can get the download URL
        // () => uploadTask.snapshot.ref.getDownloadURL().then((URL) => !fileUrl.includes(URL) ? fileUrl.push(URL) : fileUrl))
        async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            fileUrl.push(downloadURL)
        }
    )
}


//  initial value 
export const initalState = {
    usedata: []
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'POST': Promise.all(action.files.map(async (file) => {
            await putStorageItem(file)
        }))
            .then(async () => {
                await db.collection("Post").doc(makeid()).set({ ...action.data, img: fileUrl }).then(() => {
                    console.log("Document successfully written!");
                    alert('successfully');
                    fileUrl = []
                }).catch((error) => {
                    alert(error.code)
                    console.log(error.message);
                });
            }).catch((error) => {
                alert(error.code);
                console.log(error.message);
            })
            return
        // case 'ADD_TO_CART':
        //     return {
        //         ...state,
        //         user: [...state.data, ...action.id],
        //     };
        default:
            return { ...state.data, ...action.id }
    }
};
export default reducer
