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
const putStorageItem = async (file) => {
    const metadata = { contentType: 'image/jpeg' };
    const uploadTask = storageRef.child('Post/' + makeid()).put(file, metadata)
    await uploadTask.on(
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
        }, error => {
            // A full list of error codes is available at
            alert(error.code)
            console.log(error.message);
        }, async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            fileUrl.push(downloadURL)
        }
    )
}


//  initial value 
export const initalState = {
    usedata: [],
    Post: { img: [] },
    Comment: [],
    Status: false
}


const reducer = (state, action) => {
    console.log("hello i am reducer")
    switch (action.type) {
        case 'useData':
            const useData = action.data
            console.log(useData)
            return {...state, ...useData}
        case 'POST':
            let Status;
            Promise.all(action.files.map(async (file) => {

                await putStorageItem(file)
            }))
                .then(async () => {
                    const ref = db.collection("Post").doc(makeid())
                    await ref.set({ ...action.data, img: fileUrl,likes:[]}).then(() => {
                        Status = false
                        console.log("Document successfully written!");
                        window.localStorage.windowStatus = 'Close'
                        alert('successfully');
                        fileUrl = []
                    }).catch((error) => {
                        Status = true
                        alert(error.code)
                        console.log(error.message);
                    });
                }).catch((error) => {
                    Status = true
                    alert(error.code);
                    console.log(error.message);
                })
            return { ...state, Status: Status }
        case "StatusOpen":
            return { ...state, Status: true }
        case "StatusClose":
            return { ...state, Status: false }
        case "weather":
            const data = action.weather
            return { ...state, data }
        case "comment":
            const Post = action.post
            const Comment = action.comment
            return { ...state, Comment, Post }
        default:
            return { ...state.data, ...action.id }
    }
};
export default reducer
