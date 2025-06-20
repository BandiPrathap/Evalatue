import React from 'react';
import { Form, Accordion, Card,Button } from 'react-bootstrap';
import { FaFilter, FaTimes } from 'react-icons/fa';

const CourseFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState({
    category: '',
    difficulty: '',
    language: '',
    price: ''
  });

  const categories = ['Web Development', 'Data Science', 'Design', 'Business', 'Marketing'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const languages = ['English', 'Spanish', 'French', 'German'];
  const prices = ['Free', 'Paid'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = { category: '', difficulty: '', language: '', price: '' };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-white d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FaFilter className="me-2" />
          <span className="fw-bold">Filters</span>
        </div>
        <Button 
          variant="link" 
          size="sm" 
          onClick={clearFilters}
          title="Clear all filters"
        >
          <FaTimes />
        </Button>
      </Card.Header>
      <Card.Body>
        <Accordion defaultActiveKey={['0', '1', '2', '3']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Category</Accordion.Header>
            <Accordion.Body>
              {categories.map(category => (
                <Form.Check 
                  key={category}
                  type="radio"
                  name="category"
                  id={`category-${category}`}
                  label={category}
                  value={category}
                  checked={filters.category === category}
                  onChange={handleChange}
                  className="mb-2"
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="1">
            <Accordion.Header>Difficulty</Accordion.Header>
            <Accordion.Body>
              {difficulties.map(difficulty => (
                <Form.Check 
                  key={difficulty}
                  type="radio"
                  name="difficulty"
                  id={`difficulty-${difficulty}`}
                  label={difficulty}
                  value={difficulty}
                  checked={filters.difficulty === difficulty}
                  onChange={handleChange}
                  className="mb-2"
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="2">
            <Accordion.Header>Language</Accordion.Header>
            <Accordion.Body>
              {languages.map(language => (
                <Form.Check 
                  key={language}
                  type="radio"
                  name="language"
                  id={`language-${language}`}
                  label={language}
                  value={language}
                  checked={filters.language === language}
                  onChange={handleChange}
                  className="mb-2"
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="3">
            <Accordion.Header>Price</Accordion.Header>
            <Accordion.Body>
              {prices.map(price => (
                <Form.Check 
                  key={price}
                  type="radio"
                  name="price"
                  id={`price-${price}`}
                  label={price}
                  value={price}
                  checked={filters.price === price}
                  onChange={handleChange}
                  className="mb-2"
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default CourseFilter;