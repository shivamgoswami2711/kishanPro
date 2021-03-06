import React, { useState } from 'react'
import CowPost from './fromComponent/CowPost';
import CowBullPost from './fromComponent/CowBullPost';
import FormQuestion from './fromComponent/FormQuestion';
import Tector from './fromComponent/Tector';
import Equipment from './fromComponent/Equipment';
import Vegetables from './fromComponent/Vegetables';
import Pesticide from "./fromComponent/Pesticide"
import BuffaloPost from './fromComponent/BuffaloPost';
import BuffaloBullPost from './fromComponent/BuffaloBullPost';
import GoatPost from "./fromComponent/GoatPost"
import GoatBullPost from "./fromComponent/GoatBullPost"
import DogPost from "./fromComponent/DogPost"
import HenBullPost from "./fromComponent/HenBullPost"
import OtherPostType from './fromComponent/OtherPostType';
import SeedForm from './fromComponent/SeedForm'
import Images from './asset/Index'
import { useStateValue } from "../Stateprovider"
import firebase from '../firebase'
import { Link } from "react-router-dom";
import 'firebase/auth';

function Leftheader() {
    const [windowName, setWindowName] = useState([]);

    const [state, dispatch] = useStateValue()
    const [windowOpenCloce, setWindowOpenCloce] = useState(state.Status)

    // firebase 
    const auth = firebase.auth();
    const db = firebase.firestore();
    const user = auth.currentUser;

    const popupSection = () => {
        if(!state.Status){
            setWindowOpenCloce(false)
        }
        switch (windowName[windowName.length - 1]) {
            case 'CreatePost':
                return <CreatePost />
            case 'marketSell':
                return <MarketSell />;
            case 'AnimalType':
                return <AnimalType />;
            case 'formQuestion':
                return <FormQuestion />;
            case 'SeedForm':
                return <SeedForm/>;
            case 'tectorPost':
                return <Tector />;
            case 'equipment':
                return <Equipment />
            case 'Vegetables':
                return <Vegetables />;
            case 'Pesticide':
                return <Pesticide />;
            case 'other':
                return <OtherPostType type='product'/>;
            case 'otherPostType':
                return <OtherPostType type='animal' />;
            case 'cowPost':
                return <CowPost />;
            case 'cowBullPost':
                return <CowBullPost />;
            case 'BuffaloPost':
                return <BuffaloPost />;
            case 'BuffaloBullPost':
                return <BuffaloBullPost />
            case 'goatPost':
                return <GoatPost />;
            case 'goatMalePost':
                return <GoatBullPost />
            case 'henPost':
                return <HenBullPost />;
            case 'dogPost':
                return <DogPost/>;
            default:
                break;
        }
    }

    // select animaltype 
    function AnimalType() {
        return (
            <div className="postType marketSellType">
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "cowPost"])}>
                    <div><img src={Images.cowSell} alt="" />
                        <h4>cow/calf</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "cowBullPost"])}>
                    <div><img src={Images.bull} alt="" />
                        <h4>Bull/calf</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "BuffaloPost"])}>
                    <div><img src={Images.Buffalo} alt="" />
                        <h4>buffalo</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "BuffaloBullPost"])}>
                    <div><img src={Images.buffaloBull} alt="" />
                        <h4>Buffalo Bull</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "goatPost"])}>
                    <div><img src={Images.Goat} alt="" />
                        <h4>goat</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "goatMalePost"])}>
                    <div><img src={Images.goatMale} alt="" />
                        <h4>bucks/billys</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "henPost"])}>
                    <div><img src={Images.Hen} alt="" />
                        <h4>hen</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "dogPost"])}>
                    <div><img src={Images.Dog} alt="" />
                        <h4>dog</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "otherPostType"])}>
                    <div><img src={Images.LightBulb} alt="" />
                        <h4>Other</h4>
                    </div>
                </div>
            </div>
        )
    }

    // sell other prodect (market sell)
    function MarketSell() {
        return (
            <div className="postType marketSellType">
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "AnimalType"])}>
                    <div><img src={Images.Cow} alt="" />
                        <h4>animal</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "tectorPost"])}>
                    <div><img src={Images.Tractor} alt="" />
                        <h4>Tractor</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "equipment"])}>
                    <div><img src={Images.Cultivator} alt="" />
                        <h4>equipment</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "Vegetables"])}>
                    <div><img src={Images.Vegetables} alt="" />
                        <h4>Vegetables</h4>
                    </div>
                </div>
                <div className="postTypeContainer Fertilizer" onClick={() => setWindowName([...windowName, "Pesticide"])}>
                    <div><img src={Images.Pesticide} alt="" />
                        <h4>Pesticide<br />Fertilizer</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "other"])}>
                    <div><img src={Images.LightBulb} alt="" />
                        <h4>other</h4>
                    </div>
                </div>
            </div>
        )
    }

    // show type of post selection 
    function CreatePost() {
        return (

            <div className="postType">
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "marketSell"])}>
                    <div><img src={Images.Market} alt="" />
                        <h4>Market sell</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "formQuestion"])}>
                    <div><img src={Images.Form} alt="" />
                        <h4>form</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "newPricePost"])}>
                    <div><img src={Images.information} alt="" />
                        <h4>information</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "SeedForm"])}>
                    <div><img src={Images.SeedIcon} alt="" />
                        <h4>seed Sell</h4>
                    </div>
                </div>
                <div className="postTypeContainer" onClick={() => setWindowName([...windowName, "newPricePost"])}>
                    <div><img src={Images.Warehouse} alt="" />
                        <h4>wearhouse</h4>
                    </div>
                </div>
            </div>

        )
    }
    function newOpenWindow(){
        dispatch({type: "StatusOpen"})
        setWindowOpenCloce(true); setWindowName(['CreatePost']);
    }
    function newCloseWindow(){ 
        setWindowName(windowName.slice(0, windowName.length - 1)); 
        if(windowName.length === 1 ) {
            setWindowOpenCloce(false);
            dispatch({type: "StatusClose"})
        }}
    return (
        <>
            <section>
                <div className="leftheaderButton">
                    <div className="button filterbtn">Filter</div>
                    <div className="button newPrice" onClick={() => newOpenWindow()}>New price</div>
                </div>
                <div className="leftheader">
                    <span className="cencelLeftHeader" onClick={() => setWindowName(windowName.slice(0, windowName.length - 1))}>X</span>
                    <div>
                        <div className="button newPrice" onClick={() => newOpenWindow()}>new price</div>
                    </div>
                    <div>
                        <Link to='/' ><div className='laftHeaderTab'><div><img src={Images.Market} alt="" /></div><div><h1>Market</h1></div></div></Link>
                        <Link to='/form' ><div className='laftHeaderTab'><div><img src={Images.Form} alt="" /></div><div><h1>form</h1></div></div></Link>
                        <Link to='/' ><div className='laftHeaderTab'><div><img src={Images.information} alt="" /></div><div><h1>Knowledge</h1></div></div></Link>
                        <Link to='/' ><div className='laftHeaderTab'><div><img src={Images.hashtag} alt="" /></div><div><h1>Follew</h1></div></div></Link>
                        <Link to='/' ><div className='laftHeaderTab'><div><img src={Images.Warehouse} alt="" /></div><div><h1>Warehouse</h1></div></div></Link>
                    </div>
                </div>
            </section>
            <section className="popupSection">
                {windowOpenCloce ? (<div className="popup">
                    <div className="window">
                        <span className="cencel" onClick={() => newCloseWindow()}>X</span>
                        {popupSection()}
                    </div>
                </div>) : (<></>)}
            </section>
        </>
    )
}

export default React.memo(Leftheader)