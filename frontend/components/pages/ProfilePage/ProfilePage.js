import {
  mdiAccount,
  mdiAccountMultiplePlus,
  mdiCog,
  mdiNoteEdit,
} from '@mdi/js';
import Icon from '@mdi/react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import R from 'ramda';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Route, Switch, useLocation, useParams,
} from 'react-router';
import LinkComponent from '_atoms/LinkComponent';
import { getGroupByGroupId } from '_frontend/api/group';
import { getUserItem } from '_frontend/api/item';
import { getUser } from '_frontend/api/user';
import GroupSettings from '_frontend/components/organisms/GroupSettings';
import ProfileSettings from '_frontend/components/organisms/ProfileSettings';
import Profile from '_organisms/Profile';
import UserItems from '_organisms/UserItems';
import { Link } from '@mui/material';

const LinkTab = ({ content }) => (
  <Tab
    label={content.label}
    icon={<Icon path={content.icon} size={1} />}
    component={LinkComponent}
    to={content.link}
  />
);

const getTabIndex = (url) => {
  if (url.endsWith('/items')) return 1;
  if (url.endsWith('/settings')) return 2;
  if (url.endsWith('/settings/group')) return 3;
  return 0;
};

export default function ProfilePage() {
  // const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  // Attempt to get current user
  // Should work since ProfilePage is only accessble when logged in

  // userId from URL params (/user/:userId)
  const userIdFromParams = params.hasOwnProperty('userId')
    ? params.userId
    : null;
  // userId from redux state (/account)
  const userIdFromLocal = useSelector(R.pick(['user'])).user._id;

  const userId = userIdFromParams == null ? userIdFromLocal : userIdFromParams;

  // Base URL to redirect with tab selection
  const baseURL = location.pathname.startsWith('/account')
    ? '/account'
    : location.pathname.match('/user/[0-9a-fA-F]{24}')[0];

  const [user, setUser] = useState(null);
  const [group, setGroup] = useState(null);
  const [userItem, setUserItem] = useState(null);

  document.title = `${useSelector(R.pick(['user'])).user.name} - Handover`;
  // Get user information
  useEffect(() => {
    getUser(userId).then((data) => {
      setUser(data);
    });
  }, []);

  // Get group information after user information is fetched
  useEffect(() => {
    if (user != null) {
      if (user.group != null) {
        getGroupByGroupId(user.group).then((data) => {
          setGroup(data);
        });
      } else {
        setGroup('none');
      }
    }
  }, [user]);

  // Get user item information on /items
  useEffect(() => {
    if (location.pathname.endsWith('/items') && userItem == null) {
      getUserItem(userId).then((data) => {
        setUserItem(data);
      });
    }
  }, [location]);

  const defaultURLs = [
    {
      label: '사용자 정보',
      icon: mdiAccount,
      link: baseURL,
    },
    {
      label: '작성한 항목',
      icon: mdiNoteEdit,
      link: `${baseURL}/items`,
    },
  ];

  const accountURLs = [
    {
      label: '계정 관리',
      icon: mdiCog,
      link: `${baseURL}/settings`,
    },
    {
      label: '그룹 관리',
      icon: mdiAccountMultiplePlus,
      link: `${baseURL}/settings/group`,
    },
  ];

  return (
    <Container sx={{
      width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <Container maxWidth="md">
        <Stack direction="row" sx={{ pt: 4, pb: 2, px: 8 }}>
          <Tooltip
            title={baseURL.endsWith('/account') ? '프로필 사진 변경' : ''}
            arrow
          >
            <Avatar
              className="profile-image"
              component={ButtonBase}
              src={user && user.profileImageUrl}
              sx={{ width: 120, height: 120 }}
            >
              <img
                src="/images/profile-default.jpg"
                width="100%"
                height="100%"
              />
            </Avatar>
          </Tooltip>
          {user == null || group == null ? null : (
            <Stack sx={{ px: 4, justifyContent: 'center' }}>
              <strong style={{ fontSize: '2.5em' }}>
                {user.rank}
                {' '}
                {user.name}
              </strong>
              <span style={{ fontSize: '1.5em' }}>
                {group.name}
                {' '}
                {user.title}
              </span>
            </Stack>
          )}
        </Stack>
        <Stack sx={{ pt: 4, pb: 2, px: 8 }}>
          <Tabs
            variant="fullWidth"
            value={getTabIndex(location.pathname)}
            centered
          >
            {defaultURLs.map((e, index) => (
              <LinkTab content={e} key={index} />
            ))}
            {baseURL.startsWith('/account')
              ? accountURLs.map((e, index) => <LinkTab content={e} key={index} />)
              : null}
          </Tabs>
          <Divider light />
          <Switch>
            <Route exact path={baseURL}>
              <Profile user={user} group={group} />
            </Route>
            <Route exact path={`${baseURL}/items`}>
              <UserItems userItem={userItem} />
            </Route>
            <Route exact path={`${baseURL}/settings`}>
              <ProfileSettings />
            </Route>
            <Route exact path={`${baseURL}/settings/group`}>
              <GroupSettings />
            </Route>
          </Switch>
        </Stack>
      </Container>
    </Container>
  );
}
