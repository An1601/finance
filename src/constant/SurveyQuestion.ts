import { SurveyAnsType } from "@type/enum";
import { SurveyQuestion } from "@type/types";
import { getTranslated } from "@i18n/index";

export const surveyFullQuestion: SurveyQuestion[][] = [
  [
    {
      id: "1",
      content: getTranslated("survey.question_1_content"),
      type: SurveyAnsType.MULTI_CHOICE,
      choice: [
        getTranslated("survey.question_1_choice1"),
        getTranslated("survey.question_1_choice2"),
        getTranslated("survey.question_1_choice3"),
        getTranslated("survey.question_1_choice4"),
      ],
    },
  ],
  [
    {
      id: "2",
      content: getTranslated("survey.question_2_content"),
      type: SurveyAnsType.ONE_CHOICE,
      choice: [
        getTranslated("survey.question_2_choice1"),
        getTranslated("survey.question_2_choice2"),
        getTranslated("survey.question_2_choice3"),
        getTranslated("survey.question_2_choice4"),
        getTranslated("survey.question_2_choice5"),
        getTranslated("survey.question_2_choice6"),
      ],
    },
  ],
  [
    {
      id: "3",
      content: getTranslated("survey.question_3_content"),
      type: SurveyAnsType.SUB_QUESTION,
      choice: [],
      subQuestions: [
        {
          id: "3a",
          label: getTranslated("survey.question_3a_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "3b",
          label: getTranslated("survey.question_3b_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "3c",
          label: getTranslated("survey.question_3c_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "3d",
          label: getTranslated("survey.question_3d_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
      ],
    },
    {
      id: "5",
      content: getTranslated("survey.question_5_content"),
      type: SurveyAnsType.SUB_QUESTION,
      choice: [],
      subQuestions: [
        {
          id: "5a",
          label: getTranslated("survey.question_5a_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "5b",
          label: getTranslated("survey.question_5b_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
      ],
    },
  ],
  [
    {
      id: "4",
      content: getTranslated("survey.question_4_content"),
      type: SurveyAnsType.SUB_QUESTION,
      choice: [],
      subQuestions: [
        {
          id: "4a",
          label: getTranslated("survey.question_4a_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "4b",
          label: getTranslated("survey.question_4b_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
      ],
    },
  ],
  [
    {
      id: "6",
      content: getTranslated("survey.question_6_content"),
      type: SurveyAnsType.TEXT,
      label: getTranslated("survey.question_6_label"),
      choice: [],
    },
  ],
  [
    {
      id: "7",
      content: getTranslated("survey.question_7_content"),
      type: SurveyAnsType.SUB_QUESTION,
      choice: [],
      subQuestions: [
        {
          id: "7a",
          label: getTranslated("survey.question_7a_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "7b",
          label: getTranslated("survey.question_7b_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "7c",
          label: getTranslated("survey.question_7c_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "7d",
          label: getTranslated("survey.question_7d_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "7e",
          label: getTranslated("survey.question_7e_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
      ],
    },
  ],
  [
    {
      id: "8",
      content: getTranslated("survey.question_8_content"),
      type: SurveyAnsType.ARRAY,
      choice: [
        getTranslated("survey.question_8_choice1"),
        getTranslated("survey.question_8_choice2"),
        getTranslated("survey.question_8_choice3"),
      ],
    },
  ],
  [
    {
      id: "9",
      content: getTranslated("survey.question_9_content"),
      type: SurveyAnsType.ONE_CHOICE,
      choice: [
        getTranslated("survey.question_9_choice1"),
        getTranslated("survey.question_9_choice2"),
        getTranslated("survey.question_9_choice3"),
      ],
    },
    {
      id: "10",
      content: getTranslated("survey.question_10_content"),
      type: SurveyAnsType.ONE_CHOICE,
      choice: [
        getTranslated("survey.question_10_choice1"),
        getTranslated("survey.question_10_choice2"),
        getTranslated("survey.question_10_choice3"),
        getTranslated("survey.question_10_choice4"),
      ],
    },
  ],
  [
    {
      id: "11",
      content: getTranslated("survey.question_11_content"),
      type: SurveyAnsType.SUB_QUESTION,
      choice: [],
      subQuestions: [
        {
          id: "11a",
          content: getTranslated("survey.question_11a_label"),
          type: SurveyAnsType.ONE_CHOICE,
          choice: [
            getTranslated("survey.question_11a_choice1"),
            getTranslated("survey.question_11a_choice2"),
            getTranslated("survey.question_11a_choice3"),
            getTranslated("survey.question_11a_choice4"),
          ],
        },
        {
          id: "11b",
          content: getTranslated("survey.question_11b_label"),
          type: SurveyAnsType.ONE_CHOICE,
          choice: [
            getTranslated("survey.question_11b_choice1"),
            getTranslated("survey.question_11b_choice2"),
            getTranslated("survey.question_11b_choice3"),
            getTranslated("survey.question_11b_choice4"),
          ],
        },
        {
          id: "11c",
          content: getTranslated("survey.question_11c_label"),
          type: SurveyAnsType.ONE_CHOICE,
          choice: [
            getTranslated("survey.question_11c_choice1"),
            getTranslated("survey.question_11c_choice2"),
            getTranslated("survey.question_11c_choice3"),
            getTranslated("survey.question_11c_choice4"),
          ],
        },
      ],
    },
  ],
];
export const surveyUnitLength = [1, 1, 6, 1 | 2, 1, 5, 1, 2, 3];
export const surveyProjectQuestion = surveyFullQuestion.slice(0, 7);
