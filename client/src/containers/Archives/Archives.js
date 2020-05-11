import React, { Component } from 'react';
import './Archives.modules.css';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Auxiliary from '../../hoc/Auxiliary';

class Archives extends Component {
	componentDidMount() {
		console.log(this.props)
		this.props.onfetchPostsByYear()
	}
	
	fetchYearHandler() {
	}
	
	removeDuplicatesHandler = (array) => {
		return array.filter((a, b) => array.indexOf(a) === b)
	}

	render() {
//        let archives = <p style={{textAlign: 'center'}}>Something went wrong!</p> 
//		if (!this.props.error) {
//		}
		let showAuthor =  this.props.fetchedPosts.map(post => {
			return post.author
		})
		showAuthor = this.removeDuplicatesHandler(showAuthor);

		let showYears = this.props.fetchedPostsByYear.map(post => {
			const d = new Date(post.date);
			const date = d.getFullYear();
			return date
		})
		showYears = this.removeDuplicatesHandler(showYears)

		const m = [ "January", "February", "March", "April", "May", "June", 
		"July", "August", "September", "October", "November", "December" ];
		let showMonths = this.props.fetchedPostsByYear.map(post => {
			const d = new Date(post.date);
			const date = m[d.getMonth()];
			return date
		})
		showMonths= this.removeDuplicatesHandler(showMonths)

		let showTitle = this.props.fetchedPostsByYear.map(post => {
			return 	<li>{post.title}</li>
		})

		const archives = ( 
			<Auxiliary>
				<div className="list">
					<ul>
						{showYears}
						<ul>
							{showMonths}
							<ul>
								<li>
									{showTitle}
								</li>
							</ul>
						</ul>
					</ul>
				</div>
			</Auxiliary>

		)





		return (
			<div className="Archives">
				<p className="ArchiveTitle">Contributors</p>					
				<ul>
					{showAuthor}
				</ul>
				<p className="">Blog Archive</p>
				{archives}
				<p className="ArchiveTitle">Statement:</p>
				<p className="ArchiveInfo">Lorem ipsum dolor sit amet, 
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
		posts: state.blog.posts,
		fetchedPosts: state.blog.fetchedPosts,
		fetchedPostsByYear: state.blog.fetchedPostsByYear,
		featuredPost: state.blog.featuredPost,
		
    }
}

const mapDispatchToProps = dispatch => {
    return {
		onFetchPosts:  () => dispatch( actions.fetchPosts()),
		onfetchPostsByYear: () => dispatch( actions.fetchPostsByYear()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Archives);