import React, { useState, useEffect } from "react"

function post() {
	const [post, setpost] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch("http://127.0.0.1:5555/posts")
			.then((resp) => resp.json())
			.then((data) => {
				setpost(data)
				setIsLoading(false)
			})
			.catch((err) => console.log(err))
	}, [])
	const handleDeletedata = (post_id) => {
		const newData = post.filter((blog) => blog.id !== post_id)
		setdonor(newData)
	}
	const handleDelete = (id) => {
		fetch(`http://127.0.0.1:5000/posts/${id}`, {
			method: "DELETE",
		})
		handleDeletedata(id)
	}
	return (
		<div>
			<div>
				<h1>
					Manage Posts <button>Add new post</button>
				</h1>
			</div>

			<thead>
				<tr>
					<th width="auto">Amount</th>
					<th width="auto">Date_paid</th>
					<th width="auto">Membership</th>
					<th width="auto">Expires</th>
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
						<td>
							<button id="button" onClick={() => handleDelete(obj.D_id)}>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</div>
	)
}

export default post
