import React, { useState, useEffect } from "react"

function Post() {
	const [posts, setPosts] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [newPost, setNewPost] = useState({
		title: "",
		description: "",
		// Add other fields as needed
	})

	useEffect(() => {
		const token = localStorage.getItem("accessToken")
		fetch("http://127.0.0.1:5000/posts", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				setPosts(data)
				setIsLoading(false)
			})
			.catch((err) => console.log(err))
	}, [])

	const handleAddPost = () => {
		fetch("http://127.0.0.1:5000/posts", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPost),
		})
			.then((resp) => resp.json())
			.then((data) => {
				setPosts([...posts, data])
				setNewPost({
					title: "",
					description: "",
					// Reset other fields as needed
				})
			})
			.catch((err) => console.log(err))
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setNewPost({
			...newPost,
			[name]: value,
		})
	}

	return (
		<div>
			<div>
				<h1>
					Manage Posts
					<button onClick={handleAddPost}>Add new post</button>
				</h1>
			</div>

			<form>
				<label>Title:</label>
				<input
					type="text"
					name="title"
					value={newPost.title}
					onChange={handleInputChange}
				/>

				<label>Description:</label>
				<textarea
					name="description"
					value={newPost.description}
					onChange={handleInputChange}
				/>

			</form>
		</div>
	)
}

export default Post
