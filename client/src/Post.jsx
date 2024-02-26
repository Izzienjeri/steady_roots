import React, { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Post() {
	const [posts, setPosts] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [newPost, setNewPost] = useState({
		title: "",
		description: "",
		date_posted: new Date().toISOString(),
		approved: false,
		// Include the date_posted with the current date
		// Add other fields as needed
	})

	useEffect(() => {
		const token = localStorage.getItem("accessToken")
		fetch("http://127.0.0.1:5555/posts", {
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
		let resp // Declare resp outside of the fetch promise

		fetch("http://127.0.0.1:5555/posts", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPost),
		})
			.then((response) => {
				resp = response // Assign the response to resp
				if (!resp.ok) {
					throw new Error(`HTTP error! Status: ${resp.status}`)
				}
				return resp.json()
			})
			.then((data) => {
				setPosts([...posts, data])
				setNewPost({
					title: "",
					description: "",
					date_posted: new Date().toISOString(),
					// Reset other fields as needed
				})
			})
			.catch((err) => {
				console.error("Error adding post:", err.message)
				// Optionally, log more details about the response
				resp &&
					resp.text().then((errorMessage) => {
						console.error("Server response:", errorMessage)
					})
			})
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
				<h1>Manage Posts</h1>
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
			<ToastContainer />

			<button onClick={handleAddPost}>Add new post</button>
		</div>
	)
}

export default Post
