import React, { useState, useEffect } from "react"


function ManagePosts() {
	const [allPosts, setAllPosts] = useState([])
	const [pendingPosts, setPendingPosts] = useState([])
	const [approvedPosts, setApprovedPosts] = useState([])
	const [isLoading, setIsLoading] = useState(true)

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
				setAllPosts(data)
				setIsLoading(false)
				filterPosts(data) // Initial filtering
			})
			.catch((err) => console.log(err))
	}, [])

	const filterPosts = (allPosts) => {
		const pending = allPosts.filter((post) => !post.approved)
		const approved = allPosts.filter((post) => post.approved)
		setPendingPosts(pending)
		setApprovedPosts(approved)
	}

	const handleApprove = (postId) => {
		fetch(`http://127.0.0.1:5555/posts/${postId}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data.message)
				fetchPosts() // Refetch all posts
			})
			.catch((err) => console.log(err))
	}

	const handleDelete = (postId) => {
		fetch(`http://127.0.0.1:5555/posts/${postId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				"Content-Type": "application/json",
			},
		})
			.then(() => {
				console.log("Post deleted successfully")
				fetchPosts() // Refetch all posts
			})
			.catch((err) => console.log(err))
	}

	const fetchPosts = () => {
		const token = localStorage.getItem("accessToken")
		fetch("http://127.0.0.1:5555/posts", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				setAllPosts(data)
				filterPosts(data) // Refilter posts
			})
			.catch((err) => console.log(err))
	}

	const handleToggleView = (view) => {
		if (view === "all") {
			filterPosts(allPosts)
		} else if (view === "pending") {
			setPendingPosts(allPosts.filter((post) => !post.approved))
		} else if (view === "approved") {
			setApprovedPosts(allPosts.filter((post) => post.approved))
		}
	}

	return (
		<div>
			<div>
				<h1>Manage Posts</h1>
				<div>
					<button onClick={() => handleToggleView("all")}>All Posts</button>
					<button onClick={() => handleToggleView("pending")}>
						Pending Posts
					</button>
					<button onClick={() => handleToggleView("approved")}>
						Approved Posts
					</button>
				</div>
			</div>

			<table>
				<thead>
					<tr>
						<th width="auto">Title</th>
						<th width="auto">Description</th>
						<th width="auto">Actions</th>
					</tr>
				</thead>
				<tbody>
					{pendingPosts.length > 0 || approvedPosts.length > 0 ? (
						(pendingPosts.length > 0 ? pendingPosts : approvedPosts).map(
							(post) => (
								<tr key={post.id}>
									<td>{post.title}</td>
									<td>{post.description}</td>
									<td>
										{post.approved ? (
											<span>Approved</span>
										) : (
											<>
												<button onClick={() => handleApprove(post.id)}>
													Approve
												</button>
												<button onClick={() => handleDelete(post.id)}>
													Delete
												</button>
											</>
										)}
									</td>
								</tr>
							)
						)
					) : (
						<tr>
							<td colSpan="3">No posts found.</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default ManagePosts
