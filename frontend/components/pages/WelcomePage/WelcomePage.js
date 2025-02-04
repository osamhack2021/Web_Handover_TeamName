import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R, { none } from 'ramda';
import { useHistory } from 'react-router-dom';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WelcomeHeader from '_organisms/WelcomeHeader';
import WelcomeFooter from '_organisms/WelcomeFooter';
import MeetingPNG from '_assets/images/meeting.png';
import WaveVector from '_assets/images/wave.png';

import Comment from '_assets/images/comment.gif';
import Share from '_assets/images/share.gif';
import DemoPage from '_assets/images/demopage.png';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import GroupIcon from '@mui/icons-material/Group';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function FeatureBlock(subTitle, title, description, imgSrc, position, icon) {
  let justifyContent;
  let textAlign;
  let width;
  switch (position) {
    case 'center':
      justifyContent = 'center';
      textAlign = 'center';
      width = '400px';
      break;
    default:
      justifyContent = 'space-between';
      textAlign = 'left';
      width = '350px';
      break;
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={justifyContent}
      sx={{ marginBottom: '100px' }}
    >
      {position === 'left' ? (
        <img
          width="280px"
          height="200px"
          src={imgSrc}
          style={{ border: '3px solid #555' }}
        />
      ) : (
        ''
      )}
      <div>
        <Stack direction="row" spacing={1} justifyContent={textAlign}>
          {icon === 'create' ? <BorderColorIcon /> : ''}
          {icon === 'share' ? <GroupIcon /> : ''}
          {icon === 'comment' ? <QuestionAnswerIcon /> : ''}
          <Typography
            sx={{
              fontFamily: 'Roberto',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: '18px',
              marginBottom: '15px',
            }}
          >
            {subTitle}
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontFamily: 'Roberto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '25px',
            marginBottom: '15px',
            textAlign: { textAlign },
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Roberto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '15px',
            color: 'rgba(0,0,0,0.5)',
            width: { width },
          }}
        >
          {description}
        </Typography>
      </div>
      {position === 'right' ? (
        <img
          width="280px"
          height="200px"
          src={imgSrc}
          style={{ border: '3px solid #555' }}
        />
      ) : (
        ''
      )}
    </Stack>
  );
}

export default function WelcomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(R.pick(['user']));
  document.title = 'Handover';
  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push('/home'));
    }
  }, []);

  const onClickStart = () => {
    history.push('/login');
  };

  const onClickRegister = () => {
    history.push('/register');
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden', maxWidth: 'sm' }}>
      <WelcomeHeader />
      {/* <Container maxWidth="sm"> */}
      <img
        src={WaveVector}
        minWidth="100%"
        alt="waveVector"
        style={{ position: 'absolute', zIndex: '1' }}
      />
      <img
        src={MeetingPNG}
        alt="meetingSvg"
        width="600px"
        style={{
          position: 'absolute',
          zIndex: '2',
          top: '200px',
          left: '50%',
        }}
      />
      {/* </Container> */}
      <Container
        maxWidth="md"
        sx={{ height: '100%', position: 'relative', zIndex: '5' }}
      >
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <div>
              <Typography
                sx={{
                  fontFamily: 'BM HANNA',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '40px',
                  marginTop: '200px',
                  marginBottom: '15px',
                }}
              >
                손쉬운
                <br />
                국방업무공유체계
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '20px',
                  color: 'rgba(0, 0, 0, 0.5)',
                  marginBottom: '30px',
                }}
              >
                Handover 은 군에서의 인수인계를 위한
                <br />
                국방 업무 공유체계 입니다
              </Typography>
              <Button
                onClick={onClickStart}
                sx={{
                  width: '150px',
                  height: '40px',
                  background:
                    'linear-gradient(90deg, #ED6EA0 0%, #EC8C69 100%)',
                  borderRadius: '40px',
                  color: 'white',
                  marginBottom: '300px',
                }}
              >
                {' '}
                시작하기
                {' '}
              </Button>
            </div>
          </Stack>
          <Container maxWidth="md">
            <Stack sx={{ justifyContent: 'center' }}>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '40px',
                  marginBottom: '100px',
                  textAlign: 'center',
                }}
              >
                서비스 소개
              </Typography>
              {FeatureBlock(
                '인수 인계서 작성',
                '효율적인 부대 관리',
                '부대 업무를 한곳에 모아보세요. 사용자가 속한 그룹의 인수인계서, 업무들을 한번에 관리할 수 있습니다.',
                DemoPage,
                'right',
                'create',
              )}
              {FeatureBlock(
                '편리한 인수 인계',
                '업무 문서 공유',
                '인수인계를  위해서는 권한만 설정해주면 됩니다 인수인계 문서만 작성이 되어 있다면 간단하게 인수인계를 진행할 수 있습니다! 그저 클릭 몇번으로 사용자의 권한을 설정해주세요',
                Share,
                'left',
                'share',
              )}
              {FeatureBlock(
                '댓글 북마크 기능',
                '보다 쉬운 인수인계서',
                'Handover 의 모든 문서들은 서랍, 문서, 카드 의 구조를 가지고 있습니다 모든 보직, 근무의 인수인계서는 누구나 쉽게 이해할 수 있도록 서랍, 문서, 카드 3단계로 체계화 되어 있습니다. 어떤 업무를 수행하는지, 어떤 작업이 있는지 체계적으로 정리되어 있습니다. ',
                Comment,
                'right',
                'comment',
              )}
              {FeatureBlock(
                '더 발전해 나가는 국방 업무',
                '커뮤니티',
                '커뮤니티를 통해서 더 좋은 업무방식을 찾아보세요. 다양한 부대에 같은 보직, 업무를 가진 사람들이 공유한 문서를 보며 더 발전된 부대 운영을 할 수 있습니다.',
                '',
                'center',
              )}
            </Stack>
          </Container>
        </Stack>
      </Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#D8C3A5',
          height: '600px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'BM HANNA',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '40px',
            marginTop: '200px',
            marginBottom: '15px',
          }}
        >
          지금 바로 시작해보세요
        </Typography>
        <Button
          onClick={onClickRegister}
          sx={{
            width: '150px',
            height: '40px',
            background: 'linear-gradient(90deg, #ED6EA0 0%, #EC8C69 100%)',
            borderRadius: '40px',
            color: 'white',
            marginBottom: '300px',
          }}
        >
          회원가입
        </Button>
      </div>
      <WelcomeFooter />
    </div>
  );
}
