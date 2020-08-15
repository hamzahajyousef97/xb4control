import { Component, OnInit } from '@angular/core';
import { Feedback } from '../shared/feedback';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  feedbacks: Feedback[];
  errMess: string;
  feedback: Feedback;

  constructor() { }

  ngOnInit() {

  }

  deleteFeedback(id, index) {

  }

}
