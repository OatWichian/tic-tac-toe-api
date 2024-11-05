import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export interface IClaims {
  fid: string;
  employeeUuid?: string;
}

export interface IClaimsFirebase extends DecodedIdToken {}

export interface IPayloadToken {
  fid: string;
  employeeId?: string;
}
