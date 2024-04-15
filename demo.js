import React from 'react';
import { Button } from 'antd';
import eventBus from '@/plugins/eventBus';

import YunliRTC, { Turnplate } from 'yunli-rtc';
import 'yunli-rtc/dist/css/common.less';
import 'yunli-rtc/dist/css/common.cyan.less';
import 'yunli-rtc/dist/css/common.blue.less';
import 'yunli-rtc/dist/css/common.darkblue.less';
import 'yunli-rtc/dist/css/common.white.less';

function Demo() {
  YunliRTC.setSDK('hm');

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Button
        onClick={() => {
          Turnplate.dial();
        }}>
        拨号
      </Button>
      <Button
        onClick={() => {
          Turnplate.call({
            id: '15800000000', // 设备号或手机号
            name: '云粒APP1' // 名称或姓名
            // video: true // 是否为视频通话，默认为false
          });
        }}>
        打电话
      </Button>
      <Turnplate
        regist={{
          eventBus: eventBus, // 事件通信，设为项目中公用的eventBus
          ip: '42.236.120.104',
          port: '7443',
          businesPort: '60002',
          userNick: '我',
          userName: '2405',
          userPsw: '2405',
          userType: '2'
        }}
        options={{
          theme: 'Blue',
          confTitle: '视频通话', // 会议标题
          getContactsListUrl: '',
          getEquipmentListUrl: '',
          getLocationUrl: '',
          isCallMissVisible: false, // 未接来电
          // isAudioToConf: true, // 语音转视频会议
          isVideoBtnBottom: true, // 是否视频通话按钮在底部的样式（适用于自定义按钮较多的场景）
          // isIncomingAllAudio: true, // 视频来电都用语音接听
          isMuteHidden: true, // 语音通话不显示静音
          isMemberBtnHidden: true, // 隐藏成员按钮
          isTurnplateVisible: false
        }}
      />
    </div>
  );
}

export default Demo;
