import React from 'react';
import { Link } from 'react-router-dom';
import style from  './landing.module.css';

function Landing() {
    return (

        <div className={style.containerLand}>
                <div className={style.cater3MovingBG}>
                
                    <div className={style.flyinTxtCont}>
                            <div className={style.lineOne}>TASTY</div>
                            <div className={style.lineTwo}>everything you </div>
                            <div className={style.lineThree}>are looking for.</div>
                            <Link to="/home">
                                <div className={style.lineFour}>Take me home</div>
                            </Link>
                    </div>
                </div>
            </div>
    )
}

export default Landing
