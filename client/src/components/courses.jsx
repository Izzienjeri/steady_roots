import React, { useState, useEffect } from 'react';

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        name: '',
        user_id: '',
        level: '',
        start: '',
        end: '',
        qualification: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:5000/courses', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setCourses(data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    };

    const addCourse = () => {
        fetch('http://localhost:5000/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(newCourse)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course added successfully:', data);
            fetchData();
        })
        .catch(error => {
            console.error('Error adding course:', error);
        });
    };

    const updateCourse = (courseId, updatedData) => {
        fetch(`http://localhost:5000/courses/${courseId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course updated successfully:', data);
            fetchData();
        })
        .catch(error => {
            console.error('Error updating course:', error);
        });
    };

    const deleteCourse = (courseId) => {
        fetch(`http://localhost:5000/courses/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course deleted successfully:', data);
            fetchData();
        })
        .catch(error => {
            console.error('Error deleting course:', error);
        });
    };

    return (
        <div>
            <input
                type="text"
                value={newCourse.name}
                onChange={e => setNewCourse({ ...newCourse, name: e.target.value })}
                placeholder="Course Name"
            />
            
            <button onClick={addCourse}>Add Course</button>
            
        
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        {course.name}
                        
                        <button onClick={() => updateCourse(course.id, { /* updated data here */ })}>Update</button>
                        
                        <button onClick={() => deleteCourse(course.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Course;
