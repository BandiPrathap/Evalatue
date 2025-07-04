import React, { useState, useEffect } from 'react';
import { Accordion, Badge } from 'react-bootstrap';
import { FaPlay, FaLock, FaQuestionCircle } from 'react-icons/fa';
import VideoPlayerModal from './VideoPlayerModal';
import { updateCourseProgress, getCoursesProgress } from '../../../API/index';
import { useNavigate } from 'react-router-dom';

const CourseContent = ({ modules = [], enrolled, courseId, practiceQuestions = [] }) => {
  const [currentUnlockedIndex, setCurrentUnlockedIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const navigate = useNavigate();

  const flatLessons = modules.flatMap(module => module.lessons || []);
  const parsedCourseId = parseInt(courseId);
  const oneHour = 3600000;

  useEffect(() => {
    const loadProgress = async () => {
      const cached = JSON.parse(localStorage.getItem("coursesProgressData"));
      const now = Date.now();
      let progressList = [];

      if (cached && now - cached.timestamp < oneHour) {
        progressList = cached.data;
      } else {
        try {
          const res = await getCoursesProgress();
          progressList = res.data;
          localStorage.setItem("coursesProgressData", JSON.stringify({
            data: res.data,
            timestamp: now
          }));
        } catch (err) {
          console.error("Error loading progress", err);
        }
      }

      const courseProgress = progressList.find(p => p.course_id === parsedCourseId);
      if (courseProgress) {
        const lastIndex = flatLessons.findIndex(lesson => lesson.id === courseProgress.last_accessed_lesson_id);
        setCurrentUnlockedIndex(lastIndex + 1);
      }
    };

    loadProgress();
  }, [parsedCourseId]);

  const handleLessonComplete = async (lessonId, watchedPercent) => {
    const index = flatLessons.findIndex(lesson => lesson.id === lessonId);
    if (watchedPercent >= 80 && index === currentUnlockedIndex) {
      const newProgress = Math.round(((index + 1) / flatLessons.length) * 100);
      setCurrentUnlockedIndex(prev => prev + 1);

      try {
        await updateCourseProgress({
          course_id: courseId,
          progress_percentage: newProgress,
          last_accessed_lesson_id: lessonId
        });

        const cached = JSON.parse(localStorage.getItem("coursesProgressData")) || { data: [], timestamp: Date.now() };
        const existing = cached.data.find(p => p.course_id === parsedCourseId);
        if (existing) {
          existing.progress = newProgress;
          existing.last_accessed_lesson_id = lessonId;
          existing.updated_at = new Date().toISOString();
        } else {
          cached.data.push({
            course_id: parsedCourseId,
            progress: newProgress,
            last_accessed_lesson_id: lessonId,
            updated_at: new Date().toISOString(),
            course_title: ""
          });
        }

        localStorage.setItem("coursesProgressData", JSON.stringify({
          data: cached.data,
          timestamp: Date.now()
        }));
      } catch (err) {
        console.error("Failed to update progress", err);
      }
    }
  };

  practiceQuestions = [
    {
      id: 101,
      moduleId: 1,
      title: "Factorial Function",
      description: "Write a function to compute the factorial of n.",
      difficulty: "easy"
    },
    {
      id: 102,
      moduleId: 2,
      title: "Binary Search",
      description: "Implement binary search on a sorted array.",
      difficulty: "medium"
    }
  ];


  return (
    <div data-aos="fade-right">
      <h3 className="mb-4">Course Content</h3>
      <Accordion defaultActiveKey="0" flush>
        {modules.map((module, moduleIndex) => (
          <Accordion.Item key={module?.id || moduleIndex} eventKey={moduleIndex.toString()} className="mb-3 border rounded">
            <Accordion.Header>
              Module {moduleIndex + 1}: {module.title}
            </Accordion.Header>
            <Accordion.Body>
              {/* Lessons */}
              <ul className="list-group list-group-flush mb-3">
                {(module.lessons || []).map((lesson, i) => {
                  const flatIndex = flatLessons.findIndex(l => l.id === lesson.id);
                  const isLocked = !enrolled || flatIndex > currentUnlockedIndex;

                  return (
                    <li
                      key={lesson.id}
                      className={`list-group-item d-flex justify-content-between align-items-center ${isLocked ? 'text-muted' : ''}`}
                    >
                      <div className="d-flex align-items-center">
                        {isLocked ? (
                          <FaLock className="me-3 text-secondary" />
                        ) : (
                          <FaPlay
                            className="me-3 text-primary"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setSelectedLesson({ lesson, index: flatIndex });
                              setShowPlayer(true);
                            }}
                          />
                        )}
                        <div>
                          <strong>Lesson {flatIndex + 1}:</strong> {lesson.title}
                          <div className="text-muted small">{lesson.duration || '1:00'}</div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Practice Questions inside this module */}
              {practiceQuestions.length > 0 && (
                <>
                  <h5 className="mt-4 mb-3 text-primary d-flex align-items-center" style={{ cursor: 'pointer' }}  onClick={() => navigate(`/practice`)}>
                    <FaQuestionCircle className="me-2" /> Practice Questions
                  </h5>
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Video Player Modal */}
      {showPlayer && selectedLesson && (
        <VideoPlayerModal
          videoUrl={selectedLesson.lesson.video_url}
          lessonId={selectedLesson.lesson.id}
          onClose={() => setShowPlayer(false)}
          onComplete={handleLessonComplete}
        />
      )}
    </div>
  );
};

export default CourseContent;
