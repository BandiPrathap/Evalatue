import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  ProgressBar,
  InputGroup,
  Spinner,
  ListGroup,
} from 'react-bootstrap';
import { FaSearch, FaFilter, FaCheck, FaLock } from 'react-icons/fa';

const PracticeQuestions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  const [filters, setFilters] = useState({
    difficulty: 'all',
    status: 'all',
    search: '',
    sort: 'newest',
  });

  // Sample mock data
  const mockQuestions = [
    {
      id: 1,
      title: 'Sum of Two Numbers',
      description: 'Write a function to add two integers and return the result.',
      difficulty: 'easy',
      tags: ['functions', 'math'],
      completionStatus: 'completed',
      bestScore: 100,
      lastAttempt: '2023-05-15',
      lessonId: 101,
      locked: false,
    },
    {
      id: 2,
      title: 'Palindrome Check',
      description: 'Determine if a given string is a palindrome.',
      difficulty: 'medium',
      tags: ['strings', 'algorithms'],
      completionStatus: 'attempted',
      bestScore: 75,
      lastAttempt: '2023-05-18',
      lessonId: 102,
      locked: false,
    },
    {
      id: 3,
      title: 'Binary Search',
      description: 'Implement the binary search algorithm.',
      difficulty: 'medium',
      tags: ['search', 'algorithms'],
      completionStatus: 'not-attempted',
      bestScore: 0,
      lastAttempt: null,
      lessonId: 103,
      locked: false,
    },
    {
      id: 4,
      title: 'Linked List Reversal',
      description: 'Reverse a singly linked list in place.',
      difficulty: 'hard',
      tags: ['data structures', 'linked list'],
      completionStatus: 'not-attempted',
      bestScore: 0,
      lastAttempt: null,
      lessonId: 104,
      locked: true,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setQuestions(mockQuestions);
      setFilteredQuestions(mockQuestions);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, questions]);

  const applyFilters = () => {
    let result = [...questions];

    if (filters.difficulty !== 'all') {
      result = result.filter(q => q.difficulty === filters.difficulty);
    }

    if (filters.status !== 'all') {
      result = result.filter(q => q.completionStatus === filters.status);
    }

    if (filters.search) {
      const keyword = filters.search.toLowerCase();
      result = result.filter(q =>
        q.title.toLowerCase().includes(keyword) ||
        q.description.toLowerCase().includes(keyword) ||
        q.tags.some(tag => tag.toLowerCase().includes(keyword))
      );
    }

    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
    switch (filters.sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.lastAttempt || 0) - new Date(a.lastAttempt || 0));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.lastAttempt || 0) - new Date(b.lastAttempt || 0));
        break;
      case 'difficulty-asc':
        result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case 'difficulty-desc':
        result.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
        break;
      default:
        break;
    }

    setFilteredQuestions(result);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleQuestionClick = (id, locked) => {
    if (!locked) {
      navigate(`/coding/${id}`, { state: { from: location.pathname } });
    }
  };

  const resetFilters = () => {
    setFilters({
      difficulty: 'all',
      status: 'all',
      search: '',
      sort: 'newest',
    });
  };

  const getStatusBadge = status => {
    switch (status) {
      case 'completed':
        return <Badge bg="success"><FaCheck className="me-1" />Completed</Badge>;
      case 'attempted':
        return <Badge bg="warning" text="dark">Attempted</Badge>;
      case 'not-attempted':
        return <Badge bg="secondary">Not Attempted</Badge>;
      default:
        return <Badge bg="light" text="dark">Unknown</Badge>;
    }
  };

  const getDifficultyBadge = difficulty => {
    switch (difficulty) {
      case 'easy': return <Badge bg="success">Easy</Badge>;
      case 'medium': return <Badge bg="warning" text="dark">Medium</Badge>;
      case 'hard': return <Badge bg="danger">Hard</Badge>;
      default: return <Badge bg="light" text="dark">Unknown</Badge>;
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h2 className="fw-bold">Practice Questions</h2>
          <p className="text-muted">Solve coding problems to master each concept.</p>
        </Col>
      </Row>

      {/* Toggle Button - visible only on sm and md */}
      <div className="d-lg-none mb-3">
        <Button variant="outline-primary" onClick={() => setShowFilters(prev => !prev)}>
          <FaFilter className="me-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Filters Section - visible on large screens or if toggled on small */}
      {(showFilters || window.innerWidth >= 992) && (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="g-3 align-items-end">
              <Col md={4}>
                <Form.Label>Search</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by title or tag..."
                    value={filters.search}
                    onChange={e => handleFilterChange('search', e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={2}>
                <Form.Label>Difficulty</Form.Label>
                <Form.Select value={filters.difficulty} onChange={e => handleFilterChange('difficulty', e.target.value)}>
                  <option value="all">All</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Label>Status</Form.Label>
                <Form.Select value={filters.status} onChange={e => handleFilterChange('status', e.target.value)}>
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="attempted">Attempted</option>
                  <option value="not-attempted">Not Attempted</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Label>Sort</Form.Label>
                <Form.Select value={filters.sort} onChange={e => handleFilterChange('sort', e.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="difficulty-asc">Easy → Hard</option>
                  <option value="difficulty-desc">Hard → Easy</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Button variant="outline-secondary" onClick={resetFilters} className="w-100">
                  Reset
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Question Count */}
      <div className="d-flex justify-content-between mb-3">
        <div>
          Showing <strong>{filteredQuestions.length}</strong> of {questions.length} questions
        </div>
        <div>
          <Badge bg="success" className="me-2">
            {questions.filter(q => q.completionStatus === 'completed').length} Completed
          </Badge>
          <Badge bg="warning" text="dark" className="me-2">
            {questions.filter(q => q.completionStatus === 'attempted').length} Attempted
          </Badge>
          <Badge bg="secondary">
            {questions.filter(q => q.completionStatus === 'not-attempted').length} Not Attempted
          </Badge>
        </div>
      </div>

      {/* Questions List */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p>Loading questions...</p>
        </div>
      ) : (
        <ListGroup className="shadow-sm">
          {filteredQuestions.map(q => (
            <ListGroup.Item
              key={q.id}
              className={`p-3 ${q.locked ? 'bg-light' : 'hover-shadow'}`}
              action={!q.locked}
              onClick={() => handleQuestionClick(q.id, q.locked)}
            >
              <Row>
                <Col md={8}>
                  <h5 className="mb-1 d-flex align-items-center">
                    {q.title}
                    {q.locked && <FaLock className="ms-2 text-danger" />}
                  </h5>
                  <p className="text-muted">{q.description}</p>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {q.tags.map(tag => (
                      <Badge key={tag} bg="light" text="dark">{tag}</Badge>
                    ))}
                  </div>
                  {getDifficultyBadge(q.difficulty)}
                </Col>
                <Col md={4} className="text-md-end mt-3 mt-md-0">
                  {getStatusBadge(q.completionStatus)}
                  {q.completionStatus !== 'not-attempted' && (
                    <>
                      {/* <div className="mt-2">
                        Score: <strong>{q.bestScore}%</strong>
                        <ProgressBar
                          now={q.bestScore}
                          className="mt-1"
                          style={{ height: '8px' }}
                          variant={
                            q.bestScore >= 90
                              ? 'success'
                              : q.bestScore >= 70
                              ? 'warning'
                              : 'danger'
                          }
                        />
                      </div> */}
                      {q.lastAttempt && (
                        <div className="text-muted small mt-1">
                          Last Attempt: {new Date(q.lastAttempt).toLocaleDateString()}
                        </div>
                      )}
                    </>
                  )}
                </Col>
              </Row>
              {q.locked && (
                <div className="text-warning mt-2">
                  <FaLock className="me-1" />
                  Unlock by completing previous lessons
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default PracticeQuestions;
