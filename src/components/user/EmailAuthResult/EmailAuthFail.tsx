import React from 'react';
import styled from 'styled-components';

import Button from '@/components/ui/Button';

const Title = styled.h2`
  margin: 2rem auto 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
`;

const Wrapper = styled.form`
  width: 100%;
  margin: 0 auto;
  max-width: 440px;
  text-align: center;

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.5;
  }

  button {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const JoinFail = () => {
  return (
    <>
    <Title>
      이메일 인증 실패
    </Title>
    <Wrapper>
      <p>
        앗, 이메일 인증에 실패하였습니다 ㅠㅠ...
        <br/>
        문제가 지속되면 관리자에게 문의 부탁드립니다.
      </p>
      <Button type="button" variant="contained">이메일 재전송</Button>
      <Button type="button" variant="outline">관리자에게 문희하기</Button>
    </Wrapper>
    </>
  )
}

export default JoinFail;
