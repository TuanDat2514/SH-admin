import { NzMessageService } from "ng-zorro-antd/message";

export function createMessage(msg: NzMessageService, type: string, str: string): void {
  switch (type) {
    case 'success':
      msg.create(type, `${str} thành công`);
      break
    case 'progress':
      msg.create('success', `Tải ảnh lên thành công`);
      break
    case 'error':
      msg.create('error', `${str} thất bại`);
      break
    default:
      msg.create(type, `Cập nhật thành công`);
  }
}

export function genRandonString(length: number) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let charLength = chars.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}
export function genRandomCode(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let charLength = chars.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}
