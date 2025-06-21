// CourseContent.js
import React, {useState} from 'react';
import { Accordion, Badge } from 'react-bootstrap';
import { FaPlay, FaLock, FaCheckCircle } from 'react-icons/fa';
import VideoPlayerModal from './VideoPlayerModal';

const CourseContent = ({ modules = [], enrolled}) => (
    <div data-aos="fade-right">
        <h3 className="mb-4">Course Content</h3>
        <Accordion defaultActiveKey="0" flush>
            {(modules.length ? modules : [{ id: 'default', title: 'Untitled Module', lessons: [] }]).map((module, moduleIndex) => (
                <Accordion.Item 
                    key={module?.id || `module-${moduleIndex}`} 
                    eventKey={moduleIndex.toString()}
                    className="mb-3 border rounded"
                >
                    <Accordion.Header>
                        <div className="d-flex align-items-center">
                            <span className="me-3 fw-bold">Module {moduleIndex + 1}</span>
                            <span>{module?.title || 'Untitled Module'}</span>
                            <span className="ms-auto badge bg-light text-dark">
                                {module?.lessons?.length ?? 0} lessons
                            </span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ul className="list-group list-group-flush">
                            {(module?.lessons?.length
                                ? module.lessons
                                : [{ id: 'default-lesson', title: 'Untitled Lesson', duration: '0:00' }]
                            ).map((lesson, lessonIndex) => (
                                <LessonItem 
                                    key={lesson?.id || `lesson-${lessonIndex}`}
                                    lesson={lesson}
                                    index={lessonIndex}
                                    enrolled={enrolled}
                                />
                            ))}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    </div>
);

const LessonItem = ({ lesson = {}, index = 0, enrolled = false }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const isLocked = !enrolled && index >= 2;

  return (
    <>
      <li className={`list-group-item d-flex justify-content-between align-items-center ${isLocked ? 'blur-item' : ''}`}>
        <div className="d-flex align-items-center">
          {isLocked ? <FaLock className="text-secondary me-3" /> : <FaPlay className="text-primary me-3" onClick={() => setShowPlayer(true)}/>}
          <div>
            <span className="d-block">
              Lesson {index + 1}: {lesson?.title || 'Untitled Lesson'}
            </span>
            <small className="text-muted d-block mt-1">{lesson.duration || '1:00'}</small>
          </div>
        </div>
      </li>
      {showPlayer && (
        <VideoPlayerModal
          videoUrl={lesson?.video_url}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </>
  );
};
export default CourseContent;