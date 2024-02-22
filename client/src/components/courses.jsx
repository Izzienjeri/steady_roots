import React, { useState, useEffect } from 'react';
import axios from 'axios';

const courses = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        name: '',
        user_id: '',
        level: '',
        start: '',
        end: '',
        qualification: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:5555/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    };

    const addCourse = () => {
        axios.post('/courses', newCourse)
            .then(response => {
                console.log('Course added successfully:', response.data);
                fetchData(); 
            })
            .catch(error => {
                console.error('Error adding course:', error);
            });
    };

    const updateCourse = (courseId, updatedData) => {
        axios.patch(`/courses/${courseId}`, updatedData)
            .then(response => {
                console.log('Course updated successfully:', response.data);
                fetchData(); 
            })
            .catch(error => {
                console.error('Error updating course:', error);
            });
    };

    const deleteCourse = (courseId) => {
        axios.delete(`/courses/${courseId}`)
            .then(response => {
                console.log('Course deleted successfully:', response.data);
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
                        
                        <button onClick={() => updateCourse(course.id, {})}>Update</button>
                        <button onClick={() => deleteCourse(course.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default courses;
