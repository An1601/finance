import {
  formItem,
  validateOptType,
} from "@container/bank/record/package-loan/create-loan-list";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoanSubmit } from "@type/enum";
import { getAllForm } from "./userThunks";
import { ApplicationFormSection } from "@type/types";

interface createLoanType {
  loanForm: ApplicationFormSection[];
  validateOpt: validateOptType | undefined;
  selectedForm: number | undefined;
  formList: Array<formItem>;
}

export const initSection = (sectionId: number) => ({
  id: sectionId,
  name: "",
  field_application_forms: [
    {
      id: 0,
      field_name: "",
      field_type: LoanSubmit.TEXT,
      field_options: [],
    },
  ],
});
export const initialForm: createLoanType = {
  loanForm: [initSection(0)],
  validateOpt: { fieldId: -1, sectionId: -1 },
  selectedForm: undefined,
  formList: [],
};

const createLoanReducer = createSlice({
  name: "createLoan",
  initialState: initialForm,
  reducers: {
    hanldeAddSection: (state) => {
      return {
        ...state,
        loanForm: [
          ...state.loanForm,
          initSection(
            state.loanForm.length > 0
              ? state.loanForm[state.loanForm.length - 1].id + 1
              : 0,
          ),
        ],
      };
    },
    handleOnChangeSectionName: (
      state,
      action: PayloadAction<{ value: string; sectionId: number }>,
    ) => {
      return {
        ...state,
        loanForm: state.loanForm.map((section) =>
          section.id === action.payload.sectionId
            ? {
                ...section,
                name: action.payload.value,
              }
            : section,
        ),
      };
    },
    handleDeleteSection: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        loanForm: state.loanForm.filter(
          (section) => section.id !== action.payload,
        ),
      };
    },
    hanldeAddField: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        loanForm: state.loanForm.map((section) =>
          section.id === action.payload
            ? {
                ...section,
                field_application_forms: [
                  ...section.field_application_forms,
                  {
                    id:
                      section.field_application_forms.length > 0
                        ? section.field_application_forms[
                            section.field_application_forms.length - 1
                          ].id + 1
                        : 0,
                    field_name: "",
                    field_type: LoanSubmit.TEXT,
                    field_options: [],
                  },
                ],
              }
            : section,
        ),
      };
    },
    handleDeleteField: (
      state,
      action: PayloadAction<{ sectionId: number; fieldId: number }>,
    ) => {
      return {
        ...state,
        loanForm: state.loanForm.map((section) =>
          section.id === action.payload.sectionId
            ? {
                ...section,
                field_application_forms: section.field_application_forms.filter(
                  (field) => {
                    return field.id !== action.payload.fieldId;
                  },
                ),
              }
            : section,
        ),
      };
    },
    hanldeOnChangeField: (
      state,
      action: PayloadAction<{
        fieldId: number;
        sectionId: number;
        name?: string;
        type?: number;
      }>,
    ) => {
      return {
        ...state,
        loanForm: state.loanForm.map((section) =>
          section.id === action.payload.sectionId
            ? {
                ...section,
                field_application_forms: section.field_application_forms.map(
                  (field) =>
                    field.id === action.payload.fieldId
                      ? {
                          ...field,
                          field_type: action.payload.type ?? field.field_type,
                          field_name: action.payload.name ?? field.field_name,
                        }
                      : field,
                ),
              }
            : section,
        ),
      };
    },
    handleAddOption: (
      state,
      action: PayloadAction<{
        fieldId: number;
        sectionId: number;
        value: string;
      }>,
    ) => {
      return {
        ...state,
        loanForm: state.loanForm.map((section) =>
          section.id === action.payload.sectionId
            ? {
                ...section,
                field_application_forms: section.field_application_forms.map(
                  (field) =>
                    field.id === action.payload.fieldId
                      ? {
                          ...field,
                          field_options: (field.field_options ?? []).concat(
                            action.payload.value,
                          ),
                        }
                      : field,
                ),
              }
            : section,
        ),
      };
    },
    handleDeleteOption: (
      state,
      action: PayloadAction<{
        fieldId: number;
        sectionId: number;
        opTionIndex: number;
      }>,
    ) => {
      return {
        ...state,
        loanForm: state.loanForm.map((section) =>
          section.id === action.payload.sectionId
            ? {
                ...section,
                field_application_forms: section.field_application_forms.map(
                  (field) =>
                    field.id === action.payload.fieldId
                      ? {
                          ...field,
                          field_options: field.field_options.filter(
                            (_, index) => index !== action.payload.opTionIndex,
                          ),
                        }
                      : field,
                ),
              }
            : section,
        ),
      };
    },
    handleSetValidateOpt: (
      state,
      action: PayloadAction<{
        fieldId: number;
        sectionId: number;
      }>,
    ) => {
      return {
        ...state,
        validateOpt: {
          fieldId: action.payload.fieldId,
          sectionId: action.payload.sectionId,
        },
      };
    },
    handleSelectForm: (state, action: PayloadAction<number | undefined>) => {
      return {
        ...state,
        selectedForm: action.payload,
      };
    },
    handleResetCreateLoan: () => {
      return initialForm;
    },
    handleSetFormData: (
      state,
      action: PayloadAction<ApplicationFormSection[]>,
    ) => {
      return {
        ...state,
        loanForm: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllForm.fulfilled,
      (state, action: PayloadAction<formItem[]>) => ({
        ...state,
        formList: action.payload,
      }),
    );
  },
});
export const {
  handleAddOption,
  handleDeleteField,
  handleDeleteOption,
  handleDeleteSection,
  handleOnChangeSectionName,
  hanldeAddField,
  hanldeAddSection,
  hanldeOnChangeField,
  handleSelectForm,
  handleSetValidateOpt,
  handleResetCreateLoan,
  handleSetFormData,
} = createLoanReducer.actions;
export default createLoanReducer.reducer;
