import firebase from './firebase'
import 'firebase/auth';
import 'firebase/firestore';
import { makeid } from './component/Module';

const db = firebase.firestore();
const storageRef = firebase.storage().ref();
let fileUrl = []
// Upload file and metadata to the object 'images/mountains.jpg'
// let firebase_images=[];
//        const putStorageItem = (url) => {
//            const id = makeid()
//             return firebase.storage().ref('Post/' + id).putFile(url)
//             .then((snapshot) => {
//                 console.log(snapshot)
//                 firebase_images.push(snapshot.downloadURL)        
//             }).catch((error) => {
//                 console.log('One failed:', error.message)
//             });
//         }


const putStorageItem = (file) => {

    return fileUrl;
}


//  initial value 
export const initalState = {
    usedata: [],
    Post: {
        img: [],
        data: {}
    },
    Comment: [],
    Status: false,
    data: {
        city: { id: 0, name: "", coord: { lat: 0, lon: 0 }, country: "", population: 0 },
        cnt: 0,
        cod: "",
        list: [
            {
                clouds: { all: 0 },
                dt: 0,
                dt_txt: "",
                main: { temp: 0, feels_like: 0, temp: 0 },
                rain: { 0: 0 },
                visibility: 0,
                weather: [{ dt_txt: '' }],
                wind: { speed: 0, deg: 0, gust: 0 }
            }
        ]
    }
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'useData':
            const useData = action.data
            return { ...state, ...useData }
        case 'POST':
            let Status;

            const ref = action.data.type === "from" ? db.collection("from").doc(makeid()) : db.collection("post").doc(makeid())
            ref.set({ ...action.data, img: [], likes: [], timestamp: new Date().getTime() })
                .then(() => {
                    Status = false
                    const promises =
                        action.files.forEach((file) => {
                            const uploadTask = storageRef.child('Post/' + makeid()).put(file, { contentType: 'image/jpeg' })
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
                                }, error => {
                                    // A full list of error codes is available at
                                    alert(error.code)
                                    console.log(error.message);
                                }, () => {
                                    const downloadURL = uploadTask.snapshot.ref.getDownloadURL();
                                    downloadURL.then(url => {
                                        ref.update({ img: firebase.firestore.FieldValue.arrayUnion(url) })
                                    })
                                }
                            )
                        })
                    Promise.all(promises)
                        .then(() => alert('All files uploaded'))
                        .catch(err => console.log(err.code));
                    console.log("Document successfully written!");
                    window.localStorage.windowStatus = 'Close'
                    alert('successfully');
                    fileUrl = []
                }).catch((error) => {
                    Status = true
                    alert(error.code)
                    console.log(error.message);
                });
            return { ...state, Status: Status }
        case "StatusOpen":
            return { ...state, Status: true }
        case "StatusClose":
            return { ...state, Status: false }
        case "weather":
            const data = action.weather
            return { ...state, data }
        case "formAnswer":
            const formPost = action.formPost
            const qid = action.qid 
            return { ...state, qid, formPost }
        case "comment":
            const Post = action.post
            const PostId = action.PostId
            return { ...state, PostId, Post }
        default:
            return { ...state.data, ...action.id }
    }
};
export default reducer
