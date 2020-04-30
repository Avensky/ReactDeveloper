import React from 'react';
import classes from'./Header.module.css';

const header = () => {
    return (
        <div className={classes.Header}>
            <div className={classes.HeaderLeft}>
                <h2>Blog Section - All Posts</h2>
            </div>
            <div className={classes.HeaderRight}>
                <div className={classes.HeaderItem}>
                    <a href="...">+</a>
                <p className={classes.CardNewPostTitle}>Add a new post</p>
            </div>
        </div>
    </div>
    )
}

export default header;