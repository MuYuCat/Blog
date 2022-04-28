/* eslint-disable prettier/prettier */
/* eslint-disable no-extend-native */
/* eslint-disable no-new-wrappers */
/*
 * @Author: MuYuCat
 * @Date: 2022-04-24 16:28:38
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-24 18:07:03
 * @Description: file content
 */

const string =
`
     __  __      __     __       _____        _
    |  \\/  |     \\ \\   / /      / ____|      | |
    | \\  / | _   _\\ \\_/ /_   _ | |      __ _ | |_
    | |\\/| || | | |\\   /| | | || |     / _  || __|
    | |  | || |_| | | | | |_| || |____| (_| || |_
    |_|  |_| \\__,_| |_|  \\__,_| \\_____|\\__,_| \\__|


`
const showText = () => {
  console.log(string);
  console.log('所有的猫都当过人类,\n敏感且自尊,\n独立而庄重,\n他们有很多时间专注发呆和观察世界,\n还可以把身体绕成一圈,\n用尾巴遮住眼睛,\n不看这个人间');
  console.log('欢迎来到  %cMuYuCat的世界 V1.0', 'color: #4169E1;');
}

export default showText
