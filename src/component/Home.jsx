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
    const [state, dispatch] = useStateValue()
    const [postData, setPostData] = useState([])
    useEffect(() => {
        // [START fs_geo_query_hashes]
        // Find cities within 50km of London
        if (state.data !== undefined) {
            const center = [state.data.coord.lat, state.data.coord.lon];
            const radiusInM = 50 * 1000;
            // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
            // a separate query for each pair. There can be up to 9 pairs of bounds
            // depending on overlap, but in most cases there are 4.
            const bounds = geofire.geohashQueryBounds(center, radiusInM);
            const promises = [];
            const collection = "Animal"
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
                            data.pid=doc.id;
                            data.collection=collection;
                            data.distance=distanceInKm.toFixed(1)
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

    const db = firebase.firestore();
    return (
        <div>
            <Header />
            <Leftheader />
            <section className="postContainer">
                <WeatherComponent />
                <div className="PostContainer">
                    {postData.map((post)=>(<PostProduct data={post}/>))}
                </div>
            </section>
        </div>
    )
}

export default Home

// Array.from(Array(10).keys()).map((id) => ({
//     id,
//     url: `https://picsum.photos/1000?random=${id}`
// }))