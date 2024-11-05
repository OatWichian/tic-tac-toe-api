export interface ISqlConfig {
  client: string;
  migrations: string;
  // master
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  url: string;
  // replica
  replica_host: string;
  replica_port: number;
  replica_user: string;
  replica_password: string;
  replica_database: string;
  replica_url: string;
}

export interface IMappedResponse {
  code: string;
  message?: string;
  data?: any;
}

export interface IPaginationReq {
  page: number;
  rowsPerPage: number;
}

export interface IPaginationRes<T = any> {
  pagination: {
    count: number;
    page: number;
    rowsPerPage: number;
    totalPage: number;
  };
  data: T;
}

//EMAIL

export interface ITemplateContactUsEmail {
  to: string;
  title: string;
  firstName: string;
  lastName: string;
  lineIdLink: string;
  appStoreLink: string;
  playStoreLink: string;
}

export interface ITemplateDropLeadEmail {
  to: string;
  title: string;
  firstName: string;
  lastName: string;
  createAccountLink: string;
  appStoreLink: string;
  playStoreLink: string;
}

interface AdminAccountInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}
export interface ITemplateCreateAccountEmail {
  to: string;
  title: string;
  companySetupLink: string;
  appStoreLink: string;
  playStoreLink: string;
  adminAccountInfo: AdminAccountInfo;
}

export interface ITemplateNotCompleteOnboardingEmail {
  to: string;
  title: string;
  firstName: string;
  lastName: string;
  onBoardingLink: string;
  appStoreLink: string;
  playStoreLink: string;
}

interface FeatureDetail {
  title: string;
  desc?: string;
  subDesc?: string;
  price: string;
}
interface ReceiptDetail {
  companyName: string;
  invoiceId: string;
  docNumber: string;
  billedTo: string;
  packageName: string;
  packageSchedule: string;
  featureList: Array<FeatureDetail>;
  subTotal: string;
  totalTax: string;
  discount: string;
  total: string;
}

export interface ITemplatePaymentEmail {
  to: string;
  title: string;
  receiptDetail: ReceiptDetail;
  receiptFile: string;
  receiptFileName: string;
  appStoreLink: string;
  playStoreLink: string;
}

export interface ITemplateInviteEmployeeEmail {
  to: string;
  title: string;
  firstName: string;
  companyName: string;
  appStoreLink: string;
  playStoreLink: string;
  appStoreQrCode: string;
  playStoreQrCode: string;
}

export interface ITemplateNotActiveEmail {
  to: string;
  title: string;
  firstName: string;
  lastName: string;
  loginLink: string;
  appStoreLink: string;
  playStoreLink: string;
}

/** ----- OAuth2 ----- */
export interface IQueryAuthorization {
  response_type: string;
  redirect_uri: string;
  client_id: string;
  scope?: string;
}

export interface IBodyAuthToken {
  grant_type: string;
  redirect_uri: string;
  client_id: string;
  client_secret: string;
  code: string;
}
