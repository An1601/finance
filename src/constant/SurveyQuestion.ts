import { SurveyAnsType } from "@type/enum";
import { SurveyQuestion } from "@type/types";
import { getTranslated } from "@i18n/index";

export const surveyFullQuestion: SurveyQuestion[][] = [
  [
    {
      id: "finance_type",
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
      id: "collateral_type",
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
      id: "property_address",
      content: getTranslated("survey.question_3_content"),
      type: SurveyAnsType.SUB_QUESTION,
      choice: [],
      subQuestions: [
        {
          id: "property_address_a",
          label: getTranslated("survey.question_3a_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "property_address_b",
          label: getTranslated("survey.question_3b_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "property_address_c",
          label: getTranslated("survey.question_3c_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "property_address_d",
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
          id: "number_unit",
          label: getTranslated("survey.question_5a_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "total_square_footage",
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
          id: "property_valuation",
          label: getTranslated("survey.question_4a_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "loan_amount",
          label: getTranslated("survey.question_4b_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
      ],
    },
  ],
  [
    {
      id: "property_rent",
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
          id: "property_taxe",
          label: getTranslated("survey.question_7a_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "property_insurance",
          label: getTranslated("survey.question_7b_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "utilities",
          label: getTranslated("survey.question_7c_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "repair_maintenance",
          label: getTranslated("survey.question_7d_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
        {
          id: "management_fee",
          label: getTranslated("survey.question_7e_label"),
          type: SurveyAnsType.TEXT,
          choice: [],
        },
      ],
    },
  ],
  [
    {
      id: "finance_goal",
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
      id: "property_own",
      content: getTranslated("survey.question_9_content"),
      type: SurveyAnsType.ONE_CHOICE,
      choice: [
        getTranslated("survey.question_9_choice1"),
        getTranslated("survey.question_9_choice2"),
        getTranslated("survey.question_9_choice3"),
      ],
    },
    {
      id: "credit_score",
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
          id: "net_worth",
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
          id: "liquidity",
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
          id: "income",
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
