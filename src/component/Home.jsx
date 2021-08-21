import React from 'react'
import Header from './Header';
import Leftheader from './Leftheader';
import WeatherComponent from './WeatherComponent';
import { useEffect, useState } from "react";
import PostProduct from './Post/PostProduct';
import { useStateValue } from "../Stateprovider"
import firebase from '../firebase';
const geofire = require('geofire-common');



function Home() {
    const [state,dispatch] = useStateValue()
    const [postData, setPostData] = useState([])

    useEffect(() => {
        // [START fs_geo_query_hashes]
        // Find cities within 50km of London
        const coordData = state.data;
        if (state.data !== undefined) {
            const center = [state.data.city.coord.lat, state.data.city.coord.lon];
            const radiusInM = 50 * 1000;
            const bounds = geofire.geohashQueryBounds(center, radiusInM);
            const promises = [];
            const collection = "post"
            for (const b of bounds) {
                const q = db.collection(collection)
                    .orderBy('Geohash')
                    .startAt(b[0])
                    .endAt(b[1]);

                promises.push(q.get());
            }

            // Collect all the query results together into a single list
            Promise.all(promises).then((snapshots) => {
                const matchingDocs = [];
                const dist = [];
                for (const snap of snapshots) {
                    for (const doc of snap.docs) {
                        //   We have to filter out a few false positives due to GeoHash
                        //   accuracy, but most will match
                        const distanceInKm = geofire.distanceBetween(doc.data().geopoint, center);
                        const distanceInM = distanceInKm * 1000;
                        if (distanceInM <= radiusInM) {
                            dist.push(distanceInKm.toFixed(1))
                            let data = doc.data();
                            data.pid = doc.id;
                            data.collection = collection;
                            data.distance = distanceInKm.toFixed(1)
                            matchingDocs.push(data);
                        }
                    }
                }

                return matchingDocs;
            }).then((matchingDocs) => {
                // Process the matching documents
                setPostData(matchingDocs)

            });

        }

        // // [END fs_geo_query_hashes]
    }, []);
    console.log()

    const back = (Status) => {
        console.log(Status)
      }
    const db = firebase.firestore();
    return (
        <div >
            <Header  back={back}/>
            <Leftheader />
            <section className="postContainer">
                <WeatherComponent />
                <div>
                    <div className="PostContainer">
                        {postData.map((post) => (<PostProduct data={post} />))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
