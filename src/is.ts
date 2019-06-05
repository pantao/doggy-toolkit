import * as patterns from "./patterns";
import { prcCitizenID as validatePRCCitizenID } from "./validators";
export type IsFunction = (value: any, ...options: any) => boolean;

/**
 * 检测一个字符串是否为手机号
 *
 * @param {String} value 待检测的值
 * @param {Boolean} strict 是否严格模式检测
 *
 * 默认为严格模式
 *
 * 已支持的号段有：
 *
 * - 中国移动：
 *  - 134 135 136 137 138 139
 *  - 182 183 184 187 188
 *  - 150 151 152 157 158 159
 *  - 165
 *  - 172 178(4G)
 *  - 147(上网卡)
 *  - 1440(物联网) 148(物联网)
 *  - 198
 * - 中国联通
 *  - 130 131 132
 *  - 155 156
 *  - 185 186
 *  - 171 175 176(4G)
 *  - 145(上网卡)
 *  - 146(物联网)
 *  - 166
 * - 中国电信
 *  - 133 149 153
 *  - 180 181 189 191
 *  - 173 174 177(4G)
 *  - 1410(物联网)
 *  - 199
 * - 虚拟运营商
 *  - 170 171
 *
 */
export const mobile: IsFunction = (value: any, strict = true) =>
  strict
    ? patterns.MOBILE_STRICT.test(value)
    : patterns.MOBILE_LOOSE.test(value);

/**
 * 是否是一个合法的整数
 *
 * @param value any
 */
export const integer: IsFunction = (value: any) => patterns.INTEGER.test(value);

/**
 * 是否只包含数字
 * @param value any
 */
export const digit: IsFunction = (value: any) => patterns.DIGIT.test(value);

/**
 * 是否是一个合法数字
 *
 * @param value any
 */
export const number: IsFunction = (value: any) => patterns.NUMBER.test(value);

/**
 * 是否是纯字母
 * @param value any
 */
export const alpha: IsFunction = (value: any) => patterns.ALPHA.test(value);

/**
 * 是否是纯小写
 *
 * @param value any
 */
export const lowerCase: IsFunction = (value: any) =>
  patterns.LOWER_CASE.test(value);

/**
 * 是否是大写字母
 *
 * @param value any
 */
export const upperCase: IsFunction = (value: any) =>
  patterns.UPPER_CASE.test(value);

/**
 * 是否是纯字母或者汉字
 *
 * @param value any
 */
export const character: IsFunction = (value: any) =>
  patterns.CHARACTER.test(value);

/**
 * 是否是合法的货币数字
 *
 * @param value any
 */
export const currency: IsFunction = (value: any) =>
  patterns.CURRENCY.test(value);

export const date: IsFunction = (value: any) => patterns.DATE.test(value);

export const time: IsFunction = (value: any) => patterns.TIME.test(value);

export const fulltime: IsFunction = (value: any) =>
  patterns.FULLTIME.test(value);

export const hex: IsFunction = (value: any) => patterns.HEX.test(value);

export const hexa: IsFunction = (value: any) => patterns.HEXA.test(value);

export const hexOrHexa: IsFunction = (value: any) =>
  patterns.HEX_OR_HEXA.test(value);

export const rgb: IsFunction = (value: any) => patterns.RGB.test(value);

export const rgba: IsFunction = (value: any) => patterns.RGBA.test(value);

export const rgbOrRgba: IsFunction = (value: any) => rgb(value) || rgba(value);

export const color: IsFunction = (value: any) =>
  rgbOrRgba(value) || hexOrHexa(value);

export const array: IsFunction = (value: any) =>
  Array.isArray
    ? Array.isArray(value)
    : Object.prototype.toString.call(value) === "[object Array]";

/**
 * 测试一个值是否是对象
 *
 * @param {any} value 待检测的值
 */
export const object: IsFunction = (value: any) =>
  value != null && typeof value === "object" && Array.isArray(value) === false;

/**
 * 测试一个值是否是 Object 对象
 *
 * ```js
 * function fun () {}
 *
 * console.log(Object.prototype.toString.call(fun)) // => [object Function]
 * ```
 *
 * @param {any} value 待检测的值
 */
export const objectObject: IsFunction = (value: any) =>
  object(value) === true &&
  Object.prototype.toString.call(value) === "[object Object]";

/**
 * 测试一个值是否是 纯对象
 *
 * @param {any} value 待检测的值
 */
export const plainObject: IsFunction = (value: any) => {
  if (objectObject(object) === false) return false;

  // 构建函数是否被修改过？
  const ctor = value.constructor;
  if (typeof ctor !== "function") return false;

  // 原型链是否被修改过？
  const prot = ctor.prototype;
  if (objectObject(prot) === false) return false;

  // 构建函数是否存在只有对象才有的特殊方法 isPrototypeOf
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }

  // 大概是个真的纯对象吧
  return true;
};

/**
 * 检测一个值是否为 Function
 *
 * @param {any} fn 待检测值
 */
export const func: IsFunction = (fn: any) =>
  fn && Object.prototype.toString.call(fn) === "[object Function]";

/**
 * 检测一个值是否为异步函数（AsyncFunction）
 * @param {any} fn 待检测值
 */
export const asyncFunc: IsFunction = (fn: any) =>
  fn && Object.prototype.toString.call(fn) === "[object AsyncFunction]";

export const string: IsFunction = (value: any) => typeof value === "string";

export const regexp: IsFunction = (value: any) =>
  Object.prototype.toString.call(value) === "[object RegExp]";

/**
 * 是否是可打印字
 *
 * @param {any} value 待检测的值
 */
export const printableChar: IsFunction = (value: any) =>
  (value > 47 && value < 58) || // 数字
  value === 32 ||
  value === 13 || // 空格，回车
  (value > 64 && value < 91) || // 字符
  (value > 95 && value < 112) || // 数字键盘
  (value > 185 && value < 193) || // ;=,-./`
  (value > 218 && value < 223);

/**
 * 是否为中华人民共和国居民身份证号码
 * @param value any
 */
export const prcCitizenID: IsFunction = (value: any, strict = true) =>
  strict ? validatePRCCitizenID(value) : patterns.PRC_CITIZEN_ID.test(value);