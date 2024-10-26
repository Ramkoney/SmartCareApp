import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  run  from './run';
import 'bootstrap/dist/css/bootstrap.min.css';
import './lessons.css';

const CaregiverLessons = () => {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');

  const caregiverLessons = [
    { id: 1, title: 'Patient Care Techniques', description: 'Learn effective techniques for providing care to patients.' },
    { id: 2, title: 'Communication Skills', description: 'Master the art of communicating with patients and families.' },
    { id: 3, title: 'Emergency Response', description: 'Understand how to respond effectively in emergency situations.' },
    { id: 4, title: 'Medication Management', description: 'Learn how to manage and administer medications safely.' },
    { id: 5, title: 'Emotional Support', description: 'Explore ways to provide emotional support to patients and families.' },
  ];

  const handleLessonSelect = (lessonTitle) => {
    setSelectedLesson(lessonTitle);
    setAiResponse(null);
    setUserQuestion('');
  };

  const handleAiCoachResponse = async (event) => {
    event.preventDefault();
    if (!userQuestion) return;

    setLoading(true);
    setAiResponse(null);

    try {
      const prompt = `Provide detailed caregiving advice on ${selectedLesson}. ${userQuestion}`;
      const response = await run(prompt);
      const boldifiedResponse = response.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
      setAiResponse(boldifiedResponse);
      toast.success('AI response generated successfully!');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      toast.error('Error fetching AI response!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-secondary" onClick={() => navigate('/Homepage')}>Home</button>
        <button className="btn btn-danger" onClick={() => navigate('/Login')}>Logout</button>
      </div>
      <h1 className="text-center">Caregiver Lessons</h1>
      <div className="row">
        <div className="col-md-4">
          <h2>Lessons</h2>
          <ul className="list-group">
            {caregiverLessons.map(lesson => (
              <li key={lesson.id} className="list-group-item">
                <button
                  className={`btn ${selectedLesson === lesson.title ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleLessonSelect(lesson.title)}
                >
                  {lesson.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-8">
          {selectedLesson && (
            <>
              <h2>{selectedLesson} Caregiving Lesson</h2>
              <p>{caregiverLessons.find(lesson => lesson.title === selectedLesson).description}</p>

              <div className="mt-4">
                <h3>Ask AI Caregiver Coach</h3>
                <form onSubmit={handleAiCoachResponse}>
                  <div className="form-group">
                    <label htmlFor="userQuestion">Ask a question about {selectedLesson}:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userQuestion"
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      placeholder={`e.g., How do I provide better care in ${selectedLesson.toLowerCase()}?`}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">
                    {loading ? 'Generating...' : 'Ask AI'}
                  </button>
                </form>

                {aiResponse && (
                  <div className="mt-4">
                    <h4>AI Caregiver Coach Response:</h4>
                    <div className="border p-3">
                      <p dangerouslySetInnerHTML={{ __html: aiResponse }}></p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaregiverLessons;
