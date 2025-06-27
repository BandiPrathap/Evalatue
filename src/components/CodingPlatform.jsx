// CodingPlatform.jsx
import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, ProgressBar, Alert } from 'react-bootstrap';

const CodingPlatform = () => {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [customInput, setCustomInput] = useState('');
    const [output, setOutput] = useState('');
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(false);
    const editorRef = useRef(null);

    useEffect(() => {
        const mockQuestion = {
            id: 1,
            title: 'Factorial Function',
            description: `<p>Write a program to compute the factorial of a number <code>n</code>.</p>`,
            sample_input: '5',
            sample_output: '120',
            constraints: '1 ≤ n ≤ 20',
            initial_code: {
                python: 'def factorial(n):\n    # Write your code here\n    pass\n\nn = int(input())\nprint(factorial(n))',
                javascript: 'function factorial(n) {\n  // Write your code here\n}\n\nconst n = parseInt(prompt());\nconsole.log(factorial(n));'
            }
        };
        setQuestion(mockQuestion);
        setCode(mockQuestion.initial_code[language] || '');
    }, [language]);

    const handleSubmit = async () => {
        const mockSubmission = {
            score: 66,
            results: [
                { passed: true, isHidden: false, input: "5", expected: "120", actual: "120" },
                { passed: false, isHidden: true, input: "", expected: "", actual: "0" },
                { passed: true, isHidden: true, input: "", expected: "", actual: "" }
            ]
        };
        setSubmission(mockSubmission);
    };


    if (!question) return <div>Loading...</div>;

    return (
        <Container fluid className="vh-100">
            <Row className="h-100">
                {/* Problem Description */}
                <Col md={6} className="p-4 overflow-auto">
                    <h2>{question.title}</h2>
                    <div className="mb-4" dangerouslySetInnerHTML={{ __html: question.description }} />
                    
                    <h4>Sample Input</h4>
                    <pre className="bg-light p-3">{question.sample_input}</pre>
                    
                    <h4>Sample Output</h4>
                    <pre className="bg-light p-3">{question.sample_output}</pre>
                    
                    <h4>Constraints</h4>
                    <p>{question.constraints}</p>
                    
                    {submission && (
                        <div className="mt-4">
                            <h3>Submission Result</h3>
                            <ProgressBar 
                                now={submission.score} 
                                label={`${submission.score}%`} 
                                variant={submission.score >= 80 ? 'success' : submission.score >= 50 ? 'warning' : 'danger'} 
                                className="mb-3"
                            />
                            {submission.results.map((result, i) => (
                                <Alert 
                                    key={i}
                                    variant={result.passed ? 'success' : 'danger'}
                                    className="p-2 mb-2"
                                >
                                    Test Case {i+1}: {result.passed ? 'Passed' : 'Failed'}
                                    {!result.isHidden && !result.passed && (
                                        <div>
                                            <div>Input: {result.input}</div>
                                            <div>Expected: {result.expected}</div>
                                            <div>Actual: {result.actual}</div>
                                        </div>
                                    )}
                                </Alert>
                            ))}
                        </div>
                    )}
                </Col>
                
                {/* Code Editor */}
                <Col md={6} className="bg-light p-0 d-flex flex-column">
                    <div className="p-3 border-bottom">
                        <Form.Group className="d-flex align-items-center">
                            <Form.Label className="me-2 mb-0">Language:</Form.Label>
                            <Form.Select 
                                value={language}
                                onChange={e => setLanguage(e.target.value)}
                                style={{ width: '120px' }}
                            >
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                                <option value="c">C</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    
                    <div className="flex-grow-1">
                        <Editor
                            height="100%"
                            language={language}
                            value={code}
                            onChange={setCode}
                            onMount={editor => editorRef.current = editor}
                            theme="vs-dark"
                            options={{ 
                                minimap: { enabled: false },
                                fontSize: 14
                            }}
                        />
                    </div>
                    
                    <div className="p-3 border-top">
                        <h5>Custom Input</h5>
                        <textarea
                            className="form-control mb-2"
                            rows="3"
                            value={customInput}
                            onChange={e => setCustomInput(e.target.value)}
                        />
                        
                        <div className="d-flex justify-content-between">
                            <Button 
                                variant="secondary" 
                                // onClick={handleRun}
                                disabled={loading}
                            >
                                {loading ? 'Running...' : 'Run Code'}
                            </Button>
                            <Button 
                                variant="primary" 
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </Button>
                        </div>
                    </div>
                    
                    <div className="p-3 bg-dark text-light">
                        <h5>Output</h5>
                        <pre className="mb-0" style={{ minHeight: '100px' }}>
                            {output}
                        </pre>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CodingPlatform;