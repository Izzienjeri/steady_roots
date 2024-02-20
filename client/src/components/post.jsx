import React, { useState, useEffect } from "react"

function post() {
	const [post, setpost] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch("http://127.0.0.1:5000/posts")
			.then((resp) => resp.json())
			.then((data) => {
				setpost(data)
				setIsLoading(false)
			})
			.catch((err) => console.log(err))
	}, [])
	return (
		<div>
			<thead>
				<tr>
					<th width="auto">Title</th>
					<th width="auto">Description</th>
					<th width="auto">Date_posted</th>
					<th width="auto">Approved</th>
					<th width="auto">Approved_by</th>
				</tr>
			</thead>
			<tbody>
				{post.map((obj) => (
					<tr key={obj.post_id}>
						<td>{obj.title}</td>
						<td>{obj.description}</td>
						<td>{obj.date_posted}</td>
						<td>{obj.approved}</td>
						<td>{obj.approved_by}</td>
					</tr>
				))}
			</tbody>
		</div>
	)
}

export default post
