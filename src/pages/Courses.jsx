import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container, Row, Col, Card, Button, Form, InputGroup, Spinner, Badge, Dropdown
} from 'react-bootstrap';
import {
  Search, PlusCircle, ArrowRight, Filter, SortDown, SortUp, Clock, Calendar, ChevronDown, ChevronUp,
  JournalBookmark
} from 'react-bootstrap-icons';
import { getAllCourses } from '../API/index';

const Courses = () => {
  const data = JSON.parse(localStorage.getItem("coursesData")) || { data: [] };
  const [courses, setCourses] = useState(data.data||[]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('courseSearchTerm') || '');
  const [sortOrder, setSortOrder] = useState(() => localStorage.getItem('courseSortOrder') || 'newest');
  const [priceFilter, setPriceFilter] = useState(() => localStorage.getItem('coursePriceFilter') || 'all');
  const [showFilters, setShowFilters] = useState(false); // New state for filter visibility

  const navigate = useNavigate();
  const location = useLocation();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await getAllCourses();
      const allCourses = response.data;
      setCourses(allCourses);
      localStorage.setItem("coursesData", JSON.stringify({
        data: allCourses,
        timestamp: Date.now()
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ Persist filters in localStorage
  useEffect(() => localStorage.setItem('courseSearchTerm', searchTerm), [searchTerm]);
  useEffect(() => localStorage.setItem('courseSortOrder', sortOrder), [sortOrder]);
  useEffect(() => localStorage.setItem('coursePriceFilter', priceFilter), [priceFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSortOrder('newest');
    setPriceFilter('all');
    localStorage.removeItem('courseSearchTerm');
    localStorage.removeItem('courseSortOrder');
    localStorage.removeItem('coursePriceFilter');
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Count how many filters are active
  const activeFilters =
    (searchTerm.trim() ? 1 : 0) +
    (priceFilter !== 'all' ? 1 : 0) +
    (sortOrder !== 'newest' ? 1 : 0);

  // Filter and sort courses
  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = priceFilter === 'all' || 
                          (priceFilter === 'free' && course.price === 0) ||
                          (priceFilter === 'paid' && course.price > 0);
      
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortOrder === 'oldest') {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sortOrder === 'price-low') {
        return a.price - b.price;
      } else if (sortOrder === 'price-high') {
        return b.price - a.price;
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Loading courses...</span>
      </div>
    );
  }

  return (
    <Container className="py-2 animate-fade-in my-2">
      <div className="d-flex justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div className="d-flex align-items-center gap-2">
          <h1 className="h2 fw-bold mb-0 d-flex align-items-center">
            <JournalBookmark className="me-2" />
            Courses
          </h1>
        </div>
        
        {/* Toggle Filters Button */}
        <Button 
          variant="outline-secondary" 
          className="d-flex align-items-center gap-1"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>

      {/* Filters Container - Conditionally Rendered */}
      {showFilters && (
        <Card className="shadow-sm mb-4 animate-card-hover border-0">
          <Card.Body>
            <Row className="gy-3">
              {/* Search Bar */}
              <Col xs={12} md={6}>
                <InputGroup>
                  <InputGroup.Text className="bg-light">
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    placeholder="Search courses by title or description..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {searchTerm && (
                    <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
                      Clear
                    </Button>
                  )}
                </InputGroup>
              </Col>

              {/* Price Filter */}
              <Col xs={12} sm={6} md={3}>
                <Dropdown className="w-100">
                  <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                    <Filter className="me-2" />
                    {priceFilter === 'all' ? 'All Prices' : priceFilter === 'free' ? 'Free Only' : 'Paid Only'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item onClick={() => setPriceFilter('all')}>All Prices</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriceFilter('free')}>Free Only</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriceFilter('paid')}>Paid Only</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              {/* Sort Filter */}
              <Col xs={12} sm={6} md={3}>
                <Dropdown className="w-100">
                  <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                    {sortOrder === 'newest' ? <SortDown className="me-2" /> : <SortUp className="me-2" />}
                    {sortOrder === 'newest' && 'Newest'}
                    {sortOrder === 'oldest' && 'Oldest'}
                    {sortOrder === 'price-low' && 'Price: Low to High'}
                    {sortOrder === 'price-high' && 'Price: High to Low'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item onClick={() => setSortOrder('newest')}>
                      <SortDown className="me-2" /> Newest
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOrder('oldest')}>
                      <SortUp className="me-2" /> Oldest
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOrder('price-low')}>
                      Price: Low to High
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOrder('price-high')}>
                      Price: High to Low
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            {/* Active Filters Info */}
            {activeFilters > 0 && (
              <Row className="mt-3">
                <Col xs={12}>
                  <Badge bg="light" text="dark" className="me-2 fw-normal">
                    {activeFilters} active filter{activeFilters !== 1 ? 's' : ''}
                  </Badge>
                  <Button variant="link" className="text-decoration-none p-0" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      )}

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <Card className="text-center py-5 shadow-sm animate-fade-in">
          <Card.Body>
            <div className="display-4 text-muted mb-3">📚</div>
            <h3 className="mb-2">No courses found</h3>
            <p className="text-muted mb-4">
              {searchTerm ? `No courses match "${searchTerm}"` : 'Try adjusting your filters'}
            </p>
            <Button variant="outline-primary" onClick={clearFilters}>
              Clear filters
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <p className="text-muted mb-3">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} available
          </p>
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredCourses.map((course, index) => (
              <Col key={course.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <Card className="h-100 shadow-sm border-0 animate-card-hover">
                  <div className="position-relative">
                    {course.discount > 0 && (
                      <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
                        {course.discount}% OFF
                      </Badge>
                    )}
                    <div 
                      className="bg-light border-bottom" 
                      style={{ 
                        height: '160px',
                        backgroundImage: course.imageurl ? `url(${course.imageurl})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="mb-0">{course.title}</Card.Title>
                      <Badge bg="light" text="dark" className="ms-2">
                        <Clock className="me-1" size={12} />
                        {course.duration} hrs
                      </Badge>
                    </div>
                    
                    <Card.Text className="text-muted flex-grow-1">
                      {course.description.length > 100 
                        ? `${course.description.substring(0, 100)}...` 
                        : course.description}
                    </Card.Text>
                    
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                          
                          <span className="fw-bold">
                            {course.price > 0 
                              ? `₹${parseFloat(course.price).toFixed(2)}`
                              : 'Free'}
                          </span>
                          {course.originalPrice > 0 && (
                            <small className="text-muted text-decoration-line-through ms-2">
                              ₹{parseFloat(course.originalPrice).toFixed(2)}
                            </small>
                          )}

                        </div>
                        
                        <Badge bg="light" text="dark">
                          <Calendar className="me-1" size={12} />
                          {new Date(course.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric'
                          })}
                        </Badge>
                      </div>
                      
                      <Button 
                        as={Link} 
                        to={`/course/${course.id}`} 
                        variant="outline-primary" 
                        className="w-100 d-flex align-items-center justify-content-center"
                      >
                        View Details <ArrowRight className="ms-2" size={16} />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Courses;