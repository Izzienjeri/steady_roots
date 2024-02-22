import React, { useState, useEffect } from "react"

function membership() {
	const [member, setmember] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch("http://127.0.0.1:5555/memberships")
			.then((resp) => resp.json())
			.then((data) => {
				setmember(data)
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
				{member.map((obj) => (
					<tr key={obj.membership_id}>
						<td>{obj.amount}</td>
						<td>{obj.date_paid}</td>
						<td>{obj.membership}</td>
						<td>{obj.expires}</td>
					</tr>
				))}
			</tbody>
		</div>
	)
}

export default membership
