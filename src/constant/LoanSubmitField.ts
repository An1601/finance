import { getTranslated } from "@i18n/index";
export const loanSubmitFields = {
  businessInfo: {
    businessName: getTranslated("process.loanSubmit.businessName"),
    portalAddress: getTranslated("process.loanSubmit.portalAddress"),
    businessAddress: getTranslated("process.loanSubmit.businessAddress"),
    businessType: getTranslated("process.loanSubmit.businessType"),
    businessBeganDate: getTranslated("process.loanSubmit.businessBeganDate"),
    businessPhone: getTranslated("process.loanSubmit.businessPhone"),
    businessFax: getTranslated("process.loanSubmit.businessFax"),
    businessEmail: getTranslated("process.loanSubmit.businessEmail"),
  },
  partner: {
    partnerName: getTranslated("process.loanSubmit.partnerName"),
    partnerAddress: getTranslated("process.loanSubmit.partnerAddress"),
  },
  tradeRef: {
    tradeName: getTranslated("process.loanSubmit.tradeName"),
    contactName: getTranslated("process.loanSubmit.contactName"),
    tradePhone: getTranslated("process.loanSubmit.tradePhone"),
    tradeAdress: getTranslated("process.loanSubmit.tradeAdress"),
  },
  corpRevSrvOnly: {
    creditLimit: getTranslated("process.loanSubmit.creditLimit"),
    officerName: getTranslated("process.loanSubmit.officerName"),
    dateApproved: getTranslated("process.loanSubmit.dateApproved"),
    customerId: getTranslated("process.loanSubmit.customerId"),
    entityCD: getTranslated("process.loanSubmit.entityCD"),
  },
};
