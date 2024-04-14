import React, { useEffect, useRef, useState } from 'react';
import { Segmented, Form, Button, Select, Input, Modal, Typography, message, Divider, List, Avatar } from 'antd';
import {
  CloudTwoTone,
  DownloadOutlined,
  YuqueOutlined,
  PlusCircleOutlined,
  UserOutlined,
  CodeOutlined
} from '@ant-design/icons';

import moment from 'moment';
import Prism from 'prismjs';
import eventBus from '@/plugins/eventBus';

import YunliRTC from 'yunli-rtc';

import style from '../../assets/index.module.less';

import { ApiHTML } from '../../utils/const.js';

const { Option } = Select;
const { Link } = Typography;

function App({ history }) {
  const [type, setType] = useState('audio');
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const remoteVideo2 = useRef(null);
  const remoteAudio = useRef(null);
  const talkAudio = useRef(null);
  const broadcastAudio = useRef(null);

  const [status, setStatus] = useState('idle');
  const [direction, setDirection] = useState('incoming');
  const [isMuted, setIsMuted] = useState(false);
  const [targetId, setTargetId] = useState(''); // 对方ID
  // const [targetHash, setTargetHash] = useState({}); // 对方状态Hash
  const [confList, setConfList] = useState([]); // 视频会议列表
  const [audioList, setAudioList] = useState([]); // 语音会议列表
  const [messgeList, setMessageList] = useState([]); // 消息列表
  const [talkList, setTalkList] = useState([]); // 对讲列表
  const [broadcastList, setBroadcastList] = useState([]); // 广播列表
  const [isMutedConf, setIsMutedConf] = useState(false); // 视频会议是否静音
  const [isVideoConf, setIsVideoConf] = useState(true); // 视频会议是否打开摄像头
  const [userListConf, setUserListConf] = useState([]); // 视频会议成员列表

  const html = Prism.highlight(ApiHTML, Prism.languages.javascript, 'javascript');

  // 显示本地视频
  let tracks = [];
  const showLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      if (localVideo.current) {
        console.log('showLocalVideo local stream', stream);
        localVideo.current.srcObject = stream;
        tracks = stream.getTracks();
      }
    } catch (e) {
      if (e instanceof Error) {
        // eslint-disable-next-line no-alert
        message.error(`getUserMedia() error: ${e.message}`);
      }
    }
  };

  // 隐藏视频
  const hideVideo = async () => {
    tracks.forEach((track) => {
      track.stop(); // 无效
    });
    localVideo.current.srcObject = null;
    remoteVideo.current.srcObject = null;
    remoteVideo2.current.srcObject = null;
  };

  // 注册
  const reg = async () => {
    let userName = '70000025',
      urlData = document.location.search.match(/userName=\d+/g);
    if (urlData) {
      // URL中获取userName，后面改成从后台接口中读取
      userName = urlData[0].split('=')[1];
    }
    const options =
      YunliRTC.getSDK() === 'ly'
        ? {
            // 凌壹
            eventBus: eventBus,
            ip: 'www.t01md.com.cn',
            port: '15675',
            appId: 'beb7da4ced7c42a085c3c99697f9aa42',
            secretKey: 'ba2468bf083947c5954cf2ccd9f2c9ed',
            userName: userName,
            userPsw: '1234',
            userType: '2', // 2为pc用户，1为app用户
            confPsw: userName, // 会商密码
            path: '/tx',
            apiSDK: '/communication-service-ly'
          }
        : {
            // 航美
            eventBus: eventBus,
            ip: '42.236.120.104',
            port: '7443',
            businesPort: '60002',
            // userName: '2010',
            userName: '2006',
            // userName: '2300',
            userPsw: 'lthm2022-xiao',
            userType: '2'
          };

    const result = await YunliRTC.regist(options);
    console.log(result, 'regist result...');
    if (result === 1) {
      console.log('注册成功！');
      YunliRTC.onIncomingCall(({ id, type, status, direction, from = '', to = '', cause, originator }) => {
        console.log('onIncomingCall：', type, status, direction, from, to);
        let isTalk;
        if (from) {
          // 来电
          isTalk = from.startsWith('8878');
          setTargetId(from); // 来电ID
        }
        if (direction === 'outgoing' && to) {
          // 呼出
          isTalk = to.startsWith('8878');
        }

        if (isTalk) {
          if (direction === 'outgoing' && status === 'accepted') {
            console.log('开始对讲');
          }
          if (direction === 'incoming' && status === 'progress') {
            message.success(`收到对讲，播放中`);
            YunliRTC.answer({
              id: id,
              media: talkAudio.current,
              video: false,
              callback: () => {}
            });
          }
          if (status === 'failed' || status === 'ended') {
            message.success('对讲已结束');
          }
        } else {
          setType(type); // 来电类型
          setIsMuted(false);
          setStatus(status);
          setDirection(direction);

          // 对方挂断
          if (status === 'ended' || status === 'failed') {
            hideVideo();
          }

          // 非主动操作的错误提示
          if (status === 'failed' && originator === 'remote') {
            // eslint-disable-next-line no-alert
            message.error(cause);
          }
        }
      });
    }
  };

  useEffect(() => {
    reg();
  }, []);

  // 拨打语音
  const callAudio = async () => {
    let id = YunliRTC.getSDK() === 'ly' ? 70001037 : 2300;
    setType('audio');
    setTargetId(id);
    YunliRTC.call(id, {
      video: false,
      media: remoteAudio.current,
      callback: () => {
        setStatus('accepted');
      }
    });
  };

  // 拨打视频
  const callVideo = async () => {
    let id = YunliRTC.getSDK() === 'ly' ? 70001037 : 2300;
    setType('video');
    showLocalVideo();
    setTargetId(id);
    YunliRTC.call(id, {
      video: true,
      media: remoteVideo.current,
      callback: () => {
        setStatus('accepted');
      }
    });
  };

  // 语音会议列表
  const getAudioConf = async () => {
    const list = await YunliRTC.getConf({
      video: false
    });
    setAudioList(list);
    console.log('语音会议列表成功', list);
  };

  // 语音会议
  const createAudioConf = async () => {
    await YunliRTC.createConf(
      YunliRTC.getSDK() === 'ly' ? [70000032, 70001037] : [2300], // 2300, 2304
      {
        media: remoteAudio.current,
        video: false,
        name: 'test',
        callback: (res) => {
          message.success('语音会议创建成功');
          setTargetId(res.name);
        }
      }
    );
    // setStatus('conf');
  };

  console.log('Session状态：', status, direction);

  // 打开成员视频
  // const openVideo = () => {
  //   YunliRTC.openMemberVideo(2300, remoteVideo.current);
  //   // openMemberVideo(2304, remoteVideo2.current);
  // };

  // 添加成员
  const addMember = (id, index) => {
    let current;
    if (index === 1) {
      current = remoteVideo.current;
    } else if (index === 2) {
      current = remoteVideo2.current;
    }

    YunliRTC.addMember(id, { media: current });
    // if (isAdd) {
    // } else {
    //   YunliRTC.removeMember(id, { media: current });
    // }

    // let hash = { ...targetHash };
    // hash[id] = isAdd;
    // setTargetHash(hash);

    if (YunliRTC.getSDK() !== 'ly') {
      setTimeout(() => {
        YunliRTC.openMemberVideo(id, current);
      }, 2000);
    }
  };

  // 视频会议加载完成
  const yunliRTCConfLoaded = () => {
    // let doc = conference.document;
    // let head = doc.getElementsByTagName('head')[0];
    // let css = document.createElement('link');
    // css.setAttribute('rel', 'stylesheet');
    // css.setAttribute('type', 'text/css');
    // css.setAttribute('href', '/a.css');
    // head.appendChild(css);
  };

  const user1 = YunliRTC.getSDK() === 'ly' ? '70001037' : '2300';
  const user2 = YunliRTC.getSDK() === 'ly' ? '70001049' : '2304';

  return (
    <>
      <div className={style.app}>
        <h3>
          <CloudTwoTone style={{ fontSize: 34, position: 'relative', top: '6px' }} /> YunliRTC
        </h3>
        <div className={style.tabs}>
          <Segmented
            block
            defaultValue="API"
            onChange={(value) => {
              setTimeout(() => {
                let url;
                if (value === '组件') {
                  url = '/element';
                } else {
                  url = '/';
                }
                history.push(url);
                document.location.reload();
              }, 400);
            }}
            options={['API', '组件']}
          />
        </div>
        <div className={style.link}>
          <Link
            onClick={() => {
              Modal.info({
                title: '下载最新版本',
                content: <div>npm i yunli-rtc</div>
              });
            }}>
            <DownloadOutlined /> 下载最新版本
          </Link>
          <Link href="https://yunlizhihui.yuque.com/bgr0hu/gly4e7/wngvte" rel="noreferrer" target="_blank">
            <YuqueOutlined /> 语雀
          </Link>
        </div>
        <div className={style.code}>
          <pre className="language-css">
            <code className="language-css" dangerouslySetInnerHTML={{ __html: html }}></code>
          </pre>
        </div>
        <Select
          defaultValue={YunliRTC.getSDK()}
          onChange={(value) => {
            YunliRTC.setSDK(value);
            document.location.reload();
          }}>
          <Option value="ly">凌壹</Option>
          <Option value="hm">航美</Option>
        </Select>
        {['idle', 'failed', 'ended'].includes(status) && (
          <>
            <div className={style.dropList}>
              <Button onClick={callAudio}>语音</Button>
              <ul className={style.dropListCont}>
                <li>
                  <Button size="small" type="primary" onClick={callAudio}>
                    拨打App
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      let id = YunliRTC.getSDK() === 'ly' ? '0015810391261' : '3015810391261';
                      setType('audio');
                      setTargetId(id);
                      YunliRTC.call(id, {
                        video: false,
                        media: remoteAudio.current,
                        callback: () => {
                          setStatus('accepted');
                        }
                      });
                    }}>
                    拨打手机号
                  </Button>
                </li>
              </ul>
            </div>
            <div className={style.dropList}>
              <Button onClick={callVideo}>视频</Button>
              <ul className={style.dropListCont}>
                <li>
                  <Button size="small" type="primary" onClick={callVideo}>
                    拨打App
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      let id = YunliRTC.getSDK() === 'ly' ? '0015810391261' : '3015810391261';
                      setType('video');
                      setTargetId(id);
                      YunliRTC.call(id, {
                        video: true,
                        media: remoteAudio.current,
                        callback: () => {
                          setStatus('accepted');
                        }
                      });
                    }}>
                    拨打手机号
                  </Button>
                </li>
              </ul>
            </div>
            <div className={style.dropList}>
              <Button>视频会议</Button>
              <ul className={style.dropListCont}>
                <li>
                  <Button
                    size="small"
                    type="primary"
                    onClick={async () => {
                      await YunliRTC.createConf(
                        YunliRTC.getSDK() === 'ly' ? [70001037] : [2300], // 2300, 2304
                        {
                          media: localVideo.current,
                          name: 'test ' + moment().format('YYYY-MM-DD HH:mm:ss')
                        }
                      );
                      message.success('创建成功');
                      setIsMutedConf(false);
                      setIsVideoConf(true);
                      setTimeout(() => {
                        // 打开成员视频
                        // YunliRTC.openMemberVideo(2300, remoteVideo.current);
                      }, 10000);
                      setStatus('conf');
                    }}>
                    <PlusCircleOutlined />
                    创建
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      YunliRTC.getConf({
                        video: true,
                        callback: (res) => {
                          setConfList(res.list);
                        }
                      });
                    }}>
                    获取列表
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      YunliRTC.callConf('', {
                        video: true,
                        media: remoteAudio.current
                      });
                      setIsMutedConf(false);
                      setIsVideoConf(true);
                      setStatus('conf');
                    }}>
                    一键拨打
                  </Button>
                </li>
                {confList.length ? <Divider /> : ''}
                {confList.map((o) => (
                  <li key={o.confId}>
                    {o.confName} - {o.nickname}{' '}
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        YunliRTC.callConf(o.thirdConfId, {
                          confId: o.confId,
                          video: true,
                          media: remoteAudio.current
                        });
                        setIsMutedConf(false);
                        setIsVideoConf(true);
                        setStatus('conf');
                      }}>
                      拨打
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        YunliRTC.endConf(o.confId, {
                          video: true,
                          media: remoteAudio.current,
                          callback: () => {
                            message.success('关闭成功');
                          }
                        });
                      }}>
                      关闭
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        YunliRTC.removeConf(o.confId, {
                          video: true,
                          media: remoteAudio.current,
                          callback: () => {
                            message.success('删除成功');

                            // 刷新列表
                            YunliRTC.getConf({
                              video: true,
                              callback: (res) => {
                                if (res.isSuccess) {
                                  setConfList(res.data.list);
                                }
                              }
                            });
                          }
                        });
                      }}>
                      删除
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            {/* <Button onClick={openVideo}>打开成员视频</Button> */}
            <div className={style.dropList}>
              <Button>语音会议</Button>
              <ul className={style.dropListCont}>
                <li>
                  <Button size="small" type="primary" onClick={createAudioConf}>
                    <PlusCircleOutlined />
                    创建
                  </Button>
                  <Button size="small" type="primary" onClick={getAudioConf}>
                    获取列表
                  </Button>
                </li>
                {audioList.length ? <Divider /> : ''}
                {audioList.map((o) => (
                  <li key={o.Conference_Id}>
                    {o.Conference_name}{' '}
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        YunliRTC.callConf(o.Conference_Id, {
                          video: false,
                          media: remoteAudio.current
                        });
                        setTargetId(o.Conference_name);
                      }}>
                      拨打
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        YunliRTC.removeConf(o.Conference_Id, {
                          video: false,
                          media: remoteAudio.current,
                          callback: () => {
                            message.success('删除成功');
                            getAudioConf();
                          }
                        });
                      }}>
                      删除
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={style.dropList}>
              <Button>消息</Button>
              <ul className={style.dropListCont}>
                <li>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      let id = YunliRTC.getSDK() === 'ly' ? 70001037 : 2300;
                      YunliRTC.getMessages(id, {
                        time: moment().format('YYYY-MM-DD HH:mm:ss'),
                        callback: (res) => {
                          if (res.isSuccess) {
                            setMessageList(res.MSG_LIST.reverse());
                          }
                        }
                      });
                    }}>
                    获取历史消息
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      YunliRTC.getMessage({
                        callback: (data) => {
                          message.info(data.SENDERNAME + ':' + data.CONTENT);
                          setMessageList([...messgeList, data]);
                        }
                      });
                    }}>
                    开启接收新消息
                  </Button>
                  <List
                    style={{
                      display: messgeList.length ? '' : 'none',
                      overflow: 'auto',
                      maxHeight: '200px'
                    }}
                    itemLayout="horizontal"
                    dataSource={messgeList}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={item.SENDERNAME}
                          description={item.CONTENT}
                        />
                      </List.Item>
                    )}
                  />
                </li>
                <li>
                  <Divider />
                  <Form
                    layout="inline"
                    onFinish={(values) => {
                      let id = YunliRTC.getSDK() === 'ly' ? 70001037 : 2300;
                      YunliRTC.sendMessage(id, {
                        content: values.content,
                        callback: (res) => {
                          if (res.isSuccess) {
                            message.success('发送成功');
                            // const data = {
                            //   CONTENT: values.content,
                            //   ID: Math.random(),
                            //   IS_READ: 0,
                            //   MSGTYPE: '0',
                            //   MSG_ID: Math.random(),
                            //   RECEIVER: '70000032',
                            //   SENDER: id,
                            //   SENDERNAME: '联通云粒app1',
                            //   SEND_TIME: '2022-07-20 17:22:26',
                            //   TYPE: '0'
                            // };
                          }
                        }
                      });
                    }}
                    onFinishFailed={() => {}}
                    autoComplete="off">
                    <Form.Item name="content" label="内容" initialValue="test" rules={[{ required: true }]}>
                      <Input type="text" style={{ width: '150px', marginRight: '10px' }} />
                    </Form.Item>
                    <Form.Item>
                      <Button size="small" type="primary" htmlType="submit">
                        发送
                      </Button>
                    </Form.Item>
                  </Form>
                </li>
              </ul>
            </div>
            <div className={style.dropList}>
              <Button>对讲</Button>
              <ul className={style.dropListCont}>
                <li>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      YunliRTC.getTalks({
                        callback: (res) => {
                          if (res.isSuccess) {
                            setTalkList(res.data);
                          }
                        }
                      });
                    }}>
                    获取对讲组列表
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      YunliRTC.createTalk([70000031, 70000026, 70000027, 70000025], {
                        name: '云粒对讲test',
                        callback: (res) => {
                          if (res.isSuccess) {
                            message.success('创建对讲组成功');

                            // 更新列表
                            YunliRTC.getTalks({
                              callback: (res) => {
                                if (res.isSuccess) {
                                  setTalkList(res.data);
                                }
                              }
                            });
                          }
                        }
                      });
                    }}>
                    创建对讲组
                  </Button>
                  <List
                    style={{
                      display: talkList.length ? '' : 'none',
                      overflow: 'auto',
                      maxHeight: '200px'
                    }}
                    itemLayout="horizontal"
                    dataSource={talkList}
                    renderItem={(item) => (
                      <List.Item>
                        {item.intercomName} {item.intercomId}{' '}
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            // 开始对讲
                            YunliRTC.startTalk(item.intercomId, {
                              media: talkAudio.current,
                              callback: (res) => {
                                if (res.isSuccess) {
                                  message.success('开始对讲成功');
                                }
                              }
                            });
                          }}>
                          开始对讲
                        </Button>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            // 结束对讲
                            YunliRTC.endTalk(item.intercomId, {
                              callback: (res) => {
                                if (res.isSuccess) {
                                  // YunliRTC.hangup();
                                  message.success('结束对讲成功');
                                }
                              }
                            });
                          }}>
                          结束对讲
                        </Button>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            // 结束对讲
                            YunliRTC.removeTalk(item.id, {
                              callback: (res) => {
                                if (res.isSuccess) {
                                  message.success('删除对讲组成功');

                                  // 更新列表
                                  YunliRTC.getTalks({
                                    callback: (res) => {
                                      if (res.isSuccess) {
                                        setTalkList(res.data);
                                      }
                                    }
                                  });
                                }
                              }
                            });
                          }}>
                          删除对讲组
                        </Button>
                      </List.Item>
                    )}
                  />
                </li>
              </ul>
            </div>
            <div className={style.dropList}>
              <Button>广播</Button>
              <ul className={style.dropListCont}>
                <li>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      YunliRTC.getBroadcasts({
                        callback: (res) => {
                          if (res.isSuccess) {
                            setBroadcastList(res.data);
                          }
                        }
                      });
                    }}>
                    获取广播组列表
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      YunliRTC.createBroadcast([70000031, 70000033, 70000026, 70001037], {
                        name: '云粒广播test',
                        callback: (res) => {
                          if (res.isSuccess) {
                            message.success('创建广播组成功');

                            // 更新列表
                            YunliRTC.getBroadcasts({
                              callback: (res) => {
                                if (res.isSuccess) {
                                  setBroadcastList(res.data);
                                }
                              }
                            });
                          }
                        }
                      });
                    }}>
                    创建广播组
                  </Button>
                  <List
                    style={{
                      display: broadcastList.length ? '' : 'none',
                      overflow: 'auto',
                      maxHeight: '200px'
                    }}
                    itemLayout="horizontal"
                    dataSource={broadcastList}
                    renderItem={(item) => (
                      <List.Item>
                        {item.theme} {item.conferenceId}{' '}
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            // 开始广播
                            YunliRTC.startBroadcast(item.conferenceId, {
                              media: broadcastAudio.current,
                              callback: (res) => {
                                if (res.isSuccess) {
                                  message.success('开始广播成功');
                                }
                              }
                            });
                          }}>
                          开始广播
                        </Button>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            // 结束广播
                            YunliRTC.endBroadcast(item.conferenceId, {
                              callback: (res) => {
                                if (res.isSuccess) {
                                  // YunliRTC.hangup();
                                  message.success('结束广播成功');
                                }
                              }
                            });
                          }}>
                          结束广播
                        </Button>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            // 结束广播
                            YunliRTC.removeBroadcast(item.conferenceId, {
                              callback: (res) => {
                                if (res.isSuccess) {
                                  message.success('删除广播组成功');

                                  // 更新列表
                                  YunliRTC.getBroadcasts({
                                    callback: (res) => {
                                      if (res.isSuccess) {
                                        setBroadcastList(res.data);
                                      }
                                    }
                                  });
                                }
                              }
                            });
                          }}>
                          删除广播组
                        </Button>
                      </List.Item>
                    )}
                  />
                </li>
              </ul>
            </div>
            <Button
              onClick={() => {
                YunliRTC.logout({
                  callback: () => {
                    message.success('退出成功');
                  }
                });
              }}>
              退出
            </Button>
          </>
        )}
        {status === 'dialing' && <span>拨号中...</span>}
        {/* 呼叫振铃 */}
        {status === 'progress' && direction === 'outgoing' && (
          <span className={style.info}>
            正在呼叫“<b>{targetId}</b>”...
          </span>
        )}
        {/* 来电振铃 */}
        {status === 'progress' && direction === 'incoming' && (
          <span className={style.info}>
            “<b>{targetId}</b>”来{type === 'audio' ? '语音' : '视频'}电话啦！
            {type === 'audio' ? (
              <Button
                onClick={() => {
                  YunliRTC.answer({ media: remoteAudio.current, video: false });
                }}>
                接听
              </Button>
            ) : (
              <Button
                onClick={() => {
                  YunliRTC.answer({ media: remoteVideo.current, video: true });
                  showLocalVideo();
                }}>
                接听
              </Button>
            )}
          </span>
        )}
        {status === 'conf' ? (
          <>
            {/* 视频会议中 */}
            <span className={style.info}>
              正在视频会议中
              <div className={style.dropList}>
                <Button>成员列表</Button>
                <ul className={style.dropListCont}>
                  <li>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        YunliRTC.getMembers({
                          video: true,
                          callback: (data) => {
                            setUserListConf(data);
                          }
                        });
                      }}>
                      获取列表
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        addMember(user1, 1);
                      }}>
                      <PlusCircleOutlined />
                      添加成员1
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        addMember(user2, 2);
                      }}>
                      <PlusCircleOutlined />
                      添加成员2
                    </Button>
                  </li>
                  {userListConf.length ? <Divider /> : ''}
                  {userListConf.map((o) => (
                    <li key={o.id}>
                      {o.nickname}{' '}
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => {
                          YunliRTC.muteConf(o.terminalip);
                        }}>
                        静音
                      </Button>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => {
                          YunliRTC.closeConfVideo(o.terminalip);
                        }}>
                        关闭摄像头
                      </Button>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => {
                          YunliRTC.focusConfVideo(o.terminalip);
                        }}>
                        设置主画面
                      </Button>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => {
                          YunliRTC.removeMember(o.terminalip, {
                            locked: false
                          });
                        }}>
                        挂断
                      </Button>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => {
                          YunliRTC.addMember(o.terminalip);
                        }}>
                        追呼
                      </Button>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => {
                          YunliRTC.removeMember(o.terminalip);
                        }}>
                        踢出
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                onClick={() => {
                  if (isMutedConf) {
                    YunliRTC.unmuteConf('', {
                      callback: () => {
                        setStatus('idle');
                      }
                    });
                  } else {
                    YunliRTC.muteConf('', {
                      callback: () => {
                        setStatus('idle');
                      }
                    });
                  }
                  setIsMutedConf(!isMutedConf);
                }}>
                {isMutedConf ? '取消' : ''}
                静音
              </Button>
              <Button
                onClick={() => {
                  if (isVideoConf) {
                    YunliRTC.closeConfVideo(2300, {
                      media: remoteVideo.current
                    });
                    // YunliRTC.closeConfVideo('', {
                    //   callback: () => {
                    //     // setStatus('idle');
                    //   }
                    // });
                  } else {
                    YunliRTC.openConfVideo(2300, {
                      media: remoteVideo.current
                    });
                    // YunliRTC.openConfVideo('', {
                    //   callback: () => {
                    //     // setStatus('idle');
                    //   }
                    // });
                  }
                  setIsVideoConf(!isVideoConf);
                }}>
                {isVideoConf ? '关闭' : '打开'}
                摄像头
              </Button>
              <Button
                onClick={() => {
                  YunliRTC.endConf('', {
                    callback: () => {
                      setStatus('idle');
                    }
                  });
                }}>
                关闭会议
              </Button>
            </span>
          </>
        ) : (
          <>
            {/* 通话中 */}
            {status === 'accepted' && (
              <span className={style.info}>
                正在与“<b>{targetId}</b>”通话中
                {isMuted ? (
                  <Button
                    onClick={() => {
                      setIsMuted(false);
                      YunliRTC.unmute();
                    }}>
                    解除静音
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setIsMuted(true);
                      YunliRTC.mute();
                    }}>
                    静音
                  </Button>
                )}
              </span>
            )}
            {/* 振铃、通话中 可以挂断 */}
            {['dialing', 'progress', 'accepted'].includes(status) && (
              <>
                <Button
                  onClick={() => {
                    hideVideo();
                    YunliRTC.hangup();
                  }}>
                  挂断
                </Button>
                <Button onClick={() => {}}>邀请</Button>
              </>
            )}
          </>
        )}
        {YunliRTC.getSDK() === 'ly' ? (
          <div style={{ display: status === 'conf' ? '' : 'none' }}>
            <iframe
              title="会商"
              name="yunliRTCConf"
              id="yunliRTCConf"
              onLoad={yunliRTCConfLoaded}
              style={{
                border: 0,
                width: '100%',
                position: 'absolute',
                left: 0,
                height: '500px',
                margin: '20px 0 0',
                zIndex: 9
              }}></iframe>
          </div>
        ) : (
          ''
        )}
        <div className={style.videos}>
          <span>本地视频</span>
          <video ref={localVideo} width="300" height="200" id="local-video" autoPlay />
          <span>远程视频</span>
          <video ref={remoteVideo} width="300" height="200" id="remote-video" autoPlay />
          <video ref={remoteVideo2} width="300" height="200" id="remote-video2" autoPlay />
          {/* 音频 */}
          <audio ref={remoteAudio} controls autoPlay />
          <audio ref={talkAudio} controls autoPlay />
          <audio ref={broadcastAudio} controls autoPlay />
        </div>
      </div>
    </>
  );
}

export default App;
