import React, { Component } from 'react';
import './Archives.modules.css';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
// import Auxiliary from '../../hoc/Auxiliary';

class Archives extends Component {
	state = {
        myPosts: [],
    }
	
	removeDuplicatesHandler = (array) => {return array.filter((a, b) => array.indexOf(a) === b)}

	render() {
//        let archives = <p style={{textAlign: 'center'}}>Something went wrong!</p> 
//		if (!this.props.error) {
//		}
		let showAuthor =  this.props.fetchedPosts.map(post => {
			return post.author
		})
		showAuthor = this.removeDuplicatesHandler(showAuthor);

		

		let years = this.props.fetchedPosts.map(post => {
			const d = new Date(post.date);
			const year = d.getFullYear();
			return year
		})
		years = this.removeDuplicatesHandler(years)
		years = years.reverse()
		console.log('years: ' + years)




		const showTitles = this.props.fetchedPosts.map( post => {
			const titles = post.title
			return titles
		})



		let months = this.props.fetchedPosts.map(post => {
			const d = new Date(post.date);
			const month = d.getMonth()
			return month
		})
		months = this.removeDuplicatesHandler(months)
		months = months.sort(function(a, b){return a-b}).reverse()
		console.log('months: ' + months)

		let showMonths =  months.map( month => {
			const m = [ "January", "February", "March", "April", "May", "June", 
			"July", "August", "September", "October", "November", "December" ];
			return (
				<li key={month}>
					{m[month]}
					<ul>
						{showTitles}
					</ul>
				</li>
			)
		})

		let archives = years.map(year => {
			return 	(
				<ul key={year}>
					{year}
					<ul>
						{showMonths}
					</ul>
				</ul>			
			)
		})


		return (
			<div className="Archives">
				<p className="ArchiveTitle">Contributors:</p>					
				<ul>
					{showAuthor}
				</ul>
				<p className="">Blog Archive:</p>
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
		fetchedPostsByMonth: state.blog.fetchedPostsByMonth,
		featuredPost: state.blog.featuredPost,
		
    }
}

const mapDispatchToProps = dispatch => {
    return {
		onFetchPosts:  () => dispatch( actions.fetchPosts()),
		onfetchPostsByYear: (year) => dispatch( actions.fetchPostsByYear(year)),
		onfetchPostsByMonth: () => dispatch( actions.fetchPostsByMonth()),

    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Archives);