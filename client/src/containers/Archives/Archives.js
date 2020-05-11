import React, { Component } from 'react';
import './Archives.modules.css';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Auxiliary from '../../hoc/Auxiliary';

class Archives extends Component {
	componentDidMount() {
		console.log(this.props);
		this.props.onfetchPostsByYear();
		this.props.onfetchPostsByMonth();
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

{/* 
// Title
		let showTitle = this.props.fetchedPostsByMonth.map(post => {
			return 	(
				<ul>
					<li key={post._id}>{post.title}</li>
				</ul>
			)
		})

		
// Years
		let showYearsArray = this.props.fetchedPosts.map(post => {
			const d = new Date(post.date);
			const date = d.getFullYear();
			return date
		})
		showYearsArray = this.removeDuplicatesHandler(showYearsArray)
		showYearsArray = showYearsArray.reverse()
		let showYears = showYearsArray.map( year => {


// Months
			const m = [ "January", "February", "March", "April", "May", "June", 
			"July", "August", "September", "October", "November", "December" ];
			let showMonthsArray = this.props.fetchedPostsByMonth.map(post => {
				const d = new Date(post.date);
				const date = m[d.getMonth()];
				return date
			})
			showMonthsArray= this.removeDuplicatesHandler(showMonthsArray)
			showMonthsArray = showMonthsArray.reverse()
			let showMonths = showMonthsArray.map( months => {
				return (
					<ul>
						<li key={months}>{months}</li>
					</ul>
				)
			})

		console.log('showMonths: ' + showMonths)	
			
			return showMonths
		})
	*/}



		let years = this.props.fetchedPosts.map(post => {
			const d = new Date(post.date);
			const year = d.getFullYear();
			console.log("Year: " + year)
			return year
		})
		years = this.removeDuplicatesHandler(years)
		console.log('years: ' + years)



		



		const m = [ "January", "February", "March", "April", "May", "June", 
		"July", "August", "September", "October", "November", "December" ];
		let showMonthsArray = this.props.fetchedPostsByYear.map(post => {
			const d = new Date(post.date);
			const date = m[d.getMonth()];
			return date
		})
		showMonthsArray= this.removeDuplicatesHandler(showMonthsArray)
		showMonthsArray = showMonthsArray.reverse()
		console.log('showMonthsArray: ' + showMonthsArray)	
		let showMonths = showMonthsArray.map( months => {
			return (
				<li key={months}>
					{months}
				</li>
			)
		})




		

		let archives = years.map(year => {

			return 	(
				<ul>
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
		onfetchPostsByYear: () => dispatch( actions.fetchPostsByYear()),

		onfetchPostsByMonth: () => dispatch( actions.fetchPostsByMonth()),

    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Archives);