import React from 'react';
import Layout from '../../Layout/Layout';
//import Header from '../../Layout/Header/Header';
import myClasses from './About.module.scss';
//import background2 from '../../../assets/images/background2.jpg'
import user from '../../../assets/images/me.jpg'
const about = () => {
    return(
    <Layout grid="one">
        <div className={myClasses.About}>
            <figure className={myClasses.figure}>
                <img src={user} alt='user image' />
            </figure>
            <br />
            <h1>Hello, I'm Uriel Zacarias</h1><br />
            <div className={myClasses.bio}>
                <p>
                    I am a full stack web developer currently looking for an entry level position. 
                    I have been developing full stack web applications since May 2019. I have prior experience from
                    working on websites, blogs, and side projects. My first website was a prebuilt gaming site with a forum that was used by a 
                    group of online friends. This sparked my curiosity in code. It was too expensive to maintain at the time so the site is gone now, It made me appreciate the value in
                    writing my own code. I've also worked on my own gaming and tech blog 
                    but I began keeping track and working almost daily since then. I've worked on websites and blogs as side projects for a long time.
                    But it was July 2018 when i began working on certificates and making it a daily habbit.
                </p>
            </div>
            
            <br />
            <br />
            <br />
            <h2>Top Skills</h2>
            <br />
            <div className={myClasses.column}>

                <div >
                    <div>
                        <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
                        <h5 className="center">Speeds up development</h5>

                        <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
                    </div>
                </div>

                <div className="col s12 m4">
                    <div>
                        <h2 className="center brown-text"><i className="material-icons">group</i></h2>
                        <h5 className="center">User Experience Focused</h5>

                        <p className="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
                    </div>
                </div>

                <div className="col s12 m4">
                    <div>
                        <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
                        <h5 className="center">Easy to work with</h5>

                        <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
                    </div>
                </div>

            </div>
                        {/*  Icon Section   */}
                     
                   
        </div>

    </Layout>
    )
}
export default about;