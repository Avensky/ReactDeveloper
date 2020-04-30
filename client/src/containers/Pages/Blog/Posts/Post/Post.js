import React from 'react';
import user from '../../../../../assets/images/user.jpg'
import classes from './Post.module.css';
//import TextTruncate from 'react-text-truncate'; // recommend
//import { NavLink } from 'react-router-dom'

const post = (props) => (

    <article className={[
        classes.Post,
        classes.Card,
        props.clName
      ].join(' ')} onClick={props.clicked}>
        <div className={classes.CardTitle}><h1>{props.title}</h1></div>
        <div className={classes.CardDetails}><h2>By {props.author}</h2> <p> on {props.postDate}</p></div> 
        <div className={classes.CardDescription}>{props.content}</div>
        <figure className={classes.CardThumbnail}>
            <img src={user} alt="user"/>
        </figure>
        <div className={[
            classes.Edit,
            props.klName].join(' ')}>
            <button>Edit</button>
            <button 
                className={classes.Delete}
                onClick={props.click}
            >Delete</button>
        </div>
    </article>
    )


export default post;