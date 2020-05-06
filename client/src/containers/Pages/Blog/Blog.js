import React, { Component } from 'react';
//import axios from '../../../axios';
import classes from './Blog.module.css';
import Header from '../../Layout/Header/Header';
import Archives from '../../Archives/Archives';
import Post from './Posts/Post/Post';
//import Posts from './Posts/Posts';
//import { Redirect, NavLink } from 'react-router-dom';
//import FullPost from './FullPost/FullPost';
import Layout from '../../Layout/Layout';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Blog extends Component {
    state = {
        selectedPostId: null,
    }

    componentDidMount() {
        console.log(this.props)
        this.props.onFetchPosts()
    }
//
//    componentDidUpdate(){
//        console.log(this.props)
//    }

    postClickedHandler = (id) => {
//        this.setState({selectedPostId: id});
        this.props.onFetchPostsById(id)
        this.props.history.push('fullPost/' + id);
    }

    clearSelectedPost = () =>{
 //       this.props.history.push('blog/');
    }

    render (){
        let blogPosts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        let featuredPost = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if (!this.props.error) {
            featuredPost = this.props.featuredPost.map( featured => {
                const d = new Date(featured.date);
                const date = (d.getMonth()+1)  + "-" + (d.getDate()) + "-" + d.getFullYear();
                return ( 
                    <Post
                        key={featured._id} 
                        title={featured.title} 
                        author={featured.author}
                        content={featured.content}
                        date={date}
                        lines={6}
                        clName={classes.FeaturedPost}
                        klName={classes.EditOff}
                        clicked={() => this.postClickedHandler(featured._id)}
                    /> 
                )
            })
            
            blogPosts = this.props.fetchedPosts.map( post => {
                const d = new Date(post.date);
                const date = (d.getMonth()+1)  + "-" + (d.getDate()) + "-" + d.getFullYear();
                return (
                    <div className={classes.Posts}>
                        <Post
                            key={post._id} 
                            title={post.title} 
                            author={post.author}
                            content={post.content}
                            postDate={date}
                            lines={4}
                            clName={classes.BlogPost}
                            klName={classes.EditOff}
                            clicked={() => this.postClickedHandler(post._id)}
                        />
                    </div>
                )
            })
         }

        return (
            <Layout grid="blog">
                <Header />
                <section className={classes.Blog}>
                    {featuredPost}
                    {blogPosts}
                </section>
               <Archives 
//                    key={archive.id} 
//                    title={archive.title} 
//                    author={archive.author}
//                    content={archive.content}
                    posts={this.props.fetchedPosts}
//                    clicked={() => this.postClickedHandler(archive.id)}
                />
            </Layout>
        )
    }
}
const mapStateToProps = state => {
    return {
        posts: state.blog.posts,
        featuredPost: state.blog.featuredPost,
        fetchedPosts: state.blog.fetchedPosts,
        fetchedPostsById: state.blog.fetchedPostsById
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts:  () => dispatch( actions.fetchPosts()),
        onFetchPostsById:  (id) => dispatch( actions.fetchPostsById(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Blog);