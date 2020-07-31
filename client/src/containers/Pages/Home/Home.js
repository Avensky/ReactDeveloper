import React, {Component}from 'react';
import './Home.module.scss';
import Layout from '../../Layout/Layout';
import classes from './Home.module.scss';
import background1 from '../../../assets/images/background1.jpg';
import background2 from '../../../assets/images/background2.jpg';
import background3 from '../../../assets/images/background3.jpg';
import Auxiliary from '../../../hoc/Auxiliary';
// import $ from 'jquery'
class Home extends Component {
    componentDidMount(){
            
    const chartWrapper = document.querySelector(".chart-wrapper");
    const scrollDown = document.querySelector(".scroll-down");
    
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    window.addEventListener("scroll", scrollHandler);
    
    function scrollHandler() {
      window.pageYOffset > 0
        ? scrollDown.classList.add("is-hidden")
        : scrollDown.classList.remove("is-hidden");
      if (isElementInViewport(chartWrapper)) chartWrapper.classList.add("in-view");
    }

    }
    
    render() {
        return (
            <Auxiliary>
            <Layout>
                <div className={["container", classes.Home].join(' ')}>
                    <br /><br />
                    <h1>Hello, I'm <span className={classes.highlight}>Uriel Zacarias</span></h1>
                    <div className="row center">                
                        <h4>Full Stack Web Developer</h4>
                        <h5 className="header col s12 light">Welcome to my site! Feel free to look around and signup!</h5>
                    </div>
                    <div className="row center">
                        <a href="#next" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">Get Started</a>
                    </div>
                    <br /><br />
                    <div className="position-absolute scroll-down">Scroll Down</div>
                </div>
                <div id="next" className={classes.Next}></div>
                <div className={["container", classes.vh].join(' ')}>
                    <div className="section">
                        <div className="row">
                            <div className="col s12 center">
                                <h2>Skills</h2>
                            </div>
                        </div>
                        
                        <div className={["d-flex", "section", classes.ParallaxHalf].join(' ')} id="skills">            
                            <div className="position-relative flex-grow-1 bg-img"></div>
                            <div className="d-flex justify-content-center align-items-center flex-grow-1">
                                <div className="position-relative chart-wrapper">
                                <ul className="chart-skills">
                                    <li className="position-relative">
                                    <span>CSS</span>
                                    </li>
                                    <li className="position-relative">
                                    <span>HTML</span>
                                    </li>
                                    <li className="position-relative">
                                    <span>JavaScript</span>
                                    </li>
                                    <li className="position-relative">
                                    <span>Python</span>
                                    </li>
                                    <li className="position-relative">
                                    <span>Ruby</span>
                                    </li>
                                </ul>
                                <ul className="d-flex position-absolute chart-levels">
                                    <li className="flex-grow-1 position-relative">
                                    <span className="position-absolute">Novice</span>
                                    </li>
                                    <li className="flex-grow-1 position-relative">
                                    <span className="position-absolute">Beginner</span>
                                    </li>
                                    <li className="flex-grow-1 position-relative">
                                    <span className="position-absolute">Intermediate</span>
                                    </li>
                                    <li className="flex-grow-1 position-relative">
                                    <span className="position-absolute">Advanced</span>
                                    </li>
                                    <li className="flex-grow-1 position-relative">
                                    <span className="position-absolute">Expert</span>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>
                <div className={classes.vh}>
                    <div id="index-banner" className={["parallax-container", classes.ParallaxContainer].join(' ')}>
                        <div className={["section no-pad-bot", classes.ParallaxSection ].join(' ')}>
                            <div className="container">
                                <br /><br />
                                <h1 className="header center teal-text text-lighten-2">Parallax Template</h1>
                                <div className="row center">
                                    <h5 className="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
                                </div>
                                <div className="row center">
                                    <a href="http://materializecss.com/getting-started.html" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">Get Started</a>
                                </div>
                                <br /><br />
                            </div>
                        </div>
                        <div className="parallax">
                            <img src={background1} alt="Unsplashed background img 1" /></div>
                    </div>

                </div>

                <div className={["container", classes.vh].join(' ')}>
                    <div className="section">
    
                        {/*  Icon Section   */}
                        <div className="row">
                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
                                    <h5 className="center">Speeds up development</h5>
    
                                    <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
                                </div>
                            </div>
    
                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">group</i></h2>
                                    <h5 className="center">User Experience Focused</h5>
    
                                    <p className="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
                                </div>
                            </div>
    
                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
                                    <h5 className="center">Easy to work with</h5>
    
                                    <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={classes.vh}>
                    <div className="parallax-container valign-wrapper">
                        <div className="section no-pad-bot">
                            <div className="container">
                                <div className="row center">
                                    <h5 className="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
                                </div>
                            </div>
                        </div>
                        <div className="parallax"><img src={background2} alt="Unsplashed background img 2" /></div>
                    </div>
                </div>


                <div className={classes.vh}>
                    <div className="container">
                        <div className="section">
        
                        <div className="row">
                            <div className="col s12 center">
                                <h3><i className="mdi-content-send brown-text"></i></h3>
                                <h4>Contact Us</h4>
                                <p className="left-align light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis nisl maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed ipsum ac, gravida ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
                            </div>
                        </div>
        
                        </div>
                    </div>
                </div>
    
                <div className={classes.vh}>
                    <div className="parallax-container valign-wrapper">
                        <div className="section no-pad-bot">
                            <div className="container">
                                <div className="row center">
                                <h5 className="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
                                </div>
                            </div>
                        </div>
                        <div className="parallax"><img src={background3} alt="Unsplashed background img 3" /></div>
                    </div>
                </div>
            </Layout>
                            <footer className="page-footer teal">
                            <div className="container">
                                <div className="row">
                                    <div className="col l6 s12">
                                        <h5 className="white-text">Company Bio</h5>
                                        <p className="grey-text text-lighten-4">We are a team of college students working on this project like it's our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>
                                    </div>
                                    <div className="col l3 s12">
                                        <h5 className="white-text">Settings</h5>
                                        <ul>
                                            <li><a className="white-text" href="#!">Link 1</a></li>
                                            <li><a className="white-text" href="#!">Link 2</a></li>
                                            <li><a className="white-text" href="#!">Link 3</a></li>
                                            <li><a className="white-text" href="#!">Link 4</a></li>
                                        </ul>
                                    </div>
                                    <div className="col l3 s12">
                                        <h5 className="white-text">Connect</h5>
                                        <ul>
                                            <li><a className="white-text" href="#!">Link 1</a></li>
                                            <li><a className="white-text" href="#!">Link 2</a></li>
                                            <li><a className="white-text" href="#!">Link 3</a></li>
                                            <li><a className="white-text" href="#!">Link 4</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-copyright">
                                <div className="container">
                                    Made by <a className="brown-text text-lighten-3" href="http://materializecss.com">Materialize</a>
                                </div>
                            </div>
                        </footer>
                        </Auxiliary>
        )
        
    }
}


export default Home;