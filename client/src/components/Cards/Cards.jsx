import React from 'react';
import { Link } from 'react-router-dom';
import style from "./cards.module.css";

function Cards({name, image, dietType, id, created}) {
    return (
        <div className = {style.card_container}>
            <div className = { style.card_card }>
                <Link 
                to={'/recipes/' + id} 
                className={style.card_name} 
                activeClassName={style.card_name_i} >
                    { name }
                </Link>

                <Link 
                to={'/recipes/' + id} >
                    <img 
                    alt="card imgn" 
                    src={ image ? image : 'notfound' }
                    className={style.card_img}/></Link>

                <h5 className={style.card_dt}>Diet-types:</h5>
                
                <h6 className={style.card_diets}>{ `  • ${ !created
                                                        ? 
                                                        dietType.map((e) => e).join(', ') 
                                                        : 
                                                        dietType.map((e) => e.name).join(', ') }   ` }
                </h6>
            </div>
        </div>
    )
}

export default Cards
