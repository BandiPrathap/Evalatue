import React, { useEffect, useState } from 'react';
import CourseFilter from '../components/courses/CourseFilter';
import CourseCard from '../components/courses/CourseCard';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

      // Dummy data
  const data = [
    { id: 1, title: 'Web Development Bootcamp', instructor: 'Jane Smith', rating: 4.8 },
    { id: 2, title: 'Data Science Fundamentals', instructor: 'John Doe', rating: 4.6 },
    { id: 3, title: 'UX Design Principles', instructor: 'Alex Johnson', rating: 4.9 }
  ];

    useEffect(() => {
        // // Replace with your actual API endpoint or data fetching logic
        // fetch('/api/courses')
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setCourses(data);
        //         setLoading(false);
        //     })
        //     .catch(() => setLoading(false));
        setCourses(data);
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading courses...</div>;
    }

    return (
        <div>
            <h2 className="text-center mb-4" data-aos="fade-up">Popular Courses</h2>
            {/* <CourseFilter/> */}
            {/* Popular Courses */}
            <section className="py-5">
                <Container>
                <Row>
                    {courses.map((course, index) => (
                    <Col md={4} key={course.id} data-aos="fade-up" data-aos-delay={index * 100} className='mb-3'>
                        <CourseCard course={course} />
                    </Col>
                    ))}
                </Row>
                </Container>
            </section>
        </div>
    );
};

export default Courses;