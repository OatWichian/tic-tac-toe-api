/** -------------------- Auth Provider -------------------- */

export enum EStrategyName {
  JWT_FRONT = 'jwt_front',
  JWT_FRONT_IGN_EMPLOYEE_ID = 'jwt_front_ign_employee_id',
  JWT_CMS = 'jwt_cms',
  JWT_CMS_IGN_EXPIRE = 'jwt_cms_ign_expire',
  JWT_CMS_IGN_COMPANY = 'jwt_cms_ign_company',
  OAUTH2 = 'oauth2',
}

export enum ETokenType {
  CMS = 'cms',
  FRONT = 'front',
}

/** -------------------- Employee -------------------- */

export enum EGameResult {
  WIN = 'win',
  LOST = 'lost',
}
