import { Button } from '@material-ui/core';
import React from 'react'

const QuestionTemplate = () => {
  return (
    <div className="question-wrapper">
      <h1>Header </h1>
      <p>X/XX Question</p>

      <Button>Previous</Button>
      <Button>Next</Button>
      <p>disclaimer message</p>
    </div>
  )
}

export default QuestionTemplate;
