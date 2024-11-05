export const ResponseMapping = {
  common: {
    success: {
      code: '0',
      msg: 'success',
      msgTh: 'สำเร็จ',
    },
  },
};

export const ExceptionMapping = {
  common: {
    dataNotFound: {
      code: '000001',
      msg: 'data not found',
      msgTh: 'ไม่พบข้อมูล',
    },
    invalidUuid: {
      code: '000002',
      msg: 'invalid uuid',
      msgTh: 'uuid ไม่ถูกต้อง',
    },
    typeFileNotSupport: {
      code: '000003',
      msg: 'This file extension is not support',
      msgTh: 'รูปแบบไฟล์นี้ไม่รองรับ',
    },
    saveFileError: {
      code: '000004',
      msg: 'Save file error',
      msgTh: 'เกิดข้อผิดพลาดในการบันทึกไฟล์',
    },
    extensionFileNotSupport: {
      code: '000005',
      msg: 'This file extension is not support',
      msgTh: 'รูปแบบไฟล์นี้ไม่รองรับ',
    },
    fileTooLarge: {
      code: '000006',
      msg: 'file is too large',
      msgTh: 'ไฟล์มีขนาดใหญ่เกินไป',
    },
    notSupportType: {
      code: '000007',
      msg: 'this type is not support',
      msgTh: 'ประเภทนี้ไม่รองรับ',
    },
    someDataWasNotFound: {
      code: '000008',
      msg: 'some data was not found',
      msgTh: 'ไม่พบข้อมูลบางส่วน',
    },
    notSupervisor: {
      code: '000009',
      msg: 'you are not a supervisor',
      msgTh: 'คุณไม่ใช่หัวหน้างาน',
    },
    fileLimit: {
      code: '000010',
      msg: 'Uploaded image exceeds the size limit of 2MB.',
      msgTh: 'ขนาดไฟล์เกินขีดจำกัด 2MB',
    },
  },
  quota: {
    dupPriorities: {
      code: '101001',
      msg: 'duplicate priorities',
      msgTh: 'ลำดับความสำคัญซ้ำกัน',
    },
    quotaNotFound: {
      code: '101002',
      msg: 'quota not found',
      msgTh: 'ไม่พบโควต้า',
    },
  },
  auth: {
    inviteAlready: {
      code: '102001',
      msg: 'user has already been invited',
      msgTh: 'ผู้ใช้ถูกเชิญแล้ว',
    },
    userNotFound: {
      code: '102002',
      msg: 'user profile not found',
      msgTh: 'ไม่พบโปรไฟล์ผู้ใช้',
    },
    companyNotFound: {
      code: '102003',
      msg: 'company not found',
      msgTh: 'ไม่พบบริษัท',
    },
    empNotFound: {
      code: '102004',
      msg: 'employee not found',
      msgTh: 'ไม่พบพนักงาน',
    },
    registerAlready: {
      code: '102005',
      msg: 'user has already been register',
      msgTh: 'ผู้ใช้ได้ลงทะเบียนแล้ว',
    },
    clientNotFound: {
      code: '102006',
      msg: 'client not found',
      msgTh: 'ไม่พบลูกค้า',
    },
    companyDuplicate: {
      code: '102007',
      msg: 'you are now an employee of this company',
      msgTh: 'คุณเป็นพนักงานของบริษัทนี้แล้ว',
    },
    fcmTokenNotFound: {
      code: '102008',
      msg: 'fcm token not found',
      msgTh: 'ไม่พบ fcm token',
    },
    invalidVerify: {
      code: '102009',
      msg: 'pin invalid',
      msgTh: 'รหัสยืนยันไม่ถูกต้อง',
    },
  },
  position: {
    positionNotFound: {
      code: '103001',
      msg: 'position not found',
      msgTh: 'ไม่พบตำแหน่งงาน',
    },
  },
  profile: {
    personalInvalid: {
      code: '104001',
      msg: 'personal uuid invalid',
      msgTh: 'personal uuid ไม่ถูกต้อง',
    },
    orgLeaderAlready: {
      code: '104002',
      msg: 'There is already an organization leader',
      msgTh: 'มีหัวหน้าองค์กรอยู่แล้ว',
    },
  },
  notification: {
    notificationNotFound: {
      code: '105001',
      msg: 'notification not found',
      msgTh: 'ไม่พบการแจ้งเตือน',
    },
    notificationScheduleNotFound: {
      code: '105002',
      msg: 'notification schedule not found',
      msgTh: 'ไม่พบกำหนดการแจ้งเตือน',
    },
  },
};

export const CustomExceptionMapping = (msg: string, msgTh: string, code?: string) => {
  return { code: code || '000000', msg, msgTh };
};

export const PrismaExceptionMapping = (error: any): { code: string; msg: string; msgTh: string } | boolean => {
  if (error.code && error.meta?.message) {
    return { code: error.code, msg: error.meta.message, msgTh: error.meta.message };
  }
  return false;
};
