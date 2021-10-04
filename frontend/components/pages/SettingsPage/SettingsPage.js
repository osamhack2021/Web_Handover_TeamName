import React from 'react';
import { Switch, Route } from 'react-router';

import ProfileSettings from '_organisms/ProfileSettings';
import Drawer from '_organisms/Drawer';

import User from '_assets/svgs/user.svg';

export default function SettingsPage() {
  const menulist = [
    'ME',
    [
      {title: '프로필', src: User, alt: 'user', link: '/setting/profile'},
      {title: '테마 변경', src: User, alt: 'themechange', link: '/setting/themechange'},
    ],
    'TEAM',
    [
      {title: '문서 권한 수정', src: User, alt: 'auth', link: '/'},
      {title: '알림', src: User, alt: 'alert', link: '/'},
    ],
  ];
  return (
    <div className="page-template">
      <div className="drawer-container">
        <Drawer name="야옹이" rank="이병" title="짬타이거" division="0사단 00연대" menulist={menulist} />
      </div>
      <div className="setting-page">
        <Switch>
          {/* <Route path="/setting/themechange" component={} /> */}
          <Route path="/setting" component={ProfileSettings} />
        </Switch>
      </div>
    </div>
  )
}