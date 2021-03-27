import React from 'react';
//import user from '../../../../../assets/images/user.jpg'
import user from '../../../../assets/images/author2.png'
import classes from './Project.module.scss';
//import TextTruncate from 'react-text-truncate'; // recommend
//import { NavLink } from 'react-router-dom'



const project = (props) => (

    <div className={[classes.container].join(' ')}  onClick={props.clicked}>
        {props.btn      
            ? <div className={classes.btn}><a href={props.link}><h4>{props.btn}</h4></a></div>
            : null}
        <figure className={classes.CardThumbnail}>
            {props.pic      ? <img src={props.pic} alt="user"/>  : null}
            {props.vid      ? <iframe 
                src={props.vid}
                style={{minHeight: '100%', maxWidth: '605px', minWidth: '325px'}} 
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='YouTube video player'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                />
            : null}
            {props.tik      ? <blockquote 
                class="tiktok-embed" 
                cite="https://www.tiktok.com/@uriza86/video/6911530527170252038" 
                data-video-id="6911530527170252038" 
                style={{minHeight: '100%', maxWidth: '605px', minWidth: '325px'}} > 
                <section> 
                    <a 
                        target="_blank" 
                        title="@uriza86" 
                        href="https://www.tiktok.com/@uriza86">@uriza86
                    </a> 
                    <p>Sweet child of mine solo 
                        <a  title="guitarsolo" 
                            target="_blank" 
                            href="https://www.tiktok.com/tag/guitarsolo">##guitarsolo</a> 
                        <a  title="gunsnroses" 
                            target="_blank" 
                            href="https://www.tiktok.com/tag/gunsnroses">##gunsnroses</a> 
                        <a  title="sweetchildofmine" 
                            target="_blank" 
                            href="https://www.tiktok.com/tag/sweetchildofmine">##sweetchildofmine</a>
                    </p> 
                    <a  target="_blank" 
                        title="♬ original sound - Uriel Zacarias" 
                        href="https://www.tiktok.com/music/original-sound-6911530511630387974">♬ original sound - Uriel Zacarias</a> 
                </section> 
            </blockquote> 
            : null}

        </figure>
        {props.description
        ?<div className={classes.description} >
            <p>{props.description}</p>
        </div>
        :null}
    </div>
    )


export default project;