import React from 'react';
import style from "./paged.module.css"

function Paged({recipesLength, recipesPerPage, Page}) {
    
    const pageNumber = [];

    for (let i = 0; i <  Math.ceil(recipesLength/recipesPerPage); i++) {
        pageNumber.push(i + 1);
    }
    
    return (
        <nav className={style.pagination_nav} >
            <ul>
                {
                    pageNumber && pageNumber.map(num => (
                        <button onClick={()=> Page(num)} key={num} className={style.pagination_button} >
                            {num}
                        </button>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Paged
