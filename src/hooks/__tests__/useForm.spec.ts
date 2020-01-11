import { act, renderHook } from '@testing-library/react-hooks';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


import { checkUserName } from '@/api/user';

import useForm from '../useForm';

function mockValidation(name: string, value: string) {
  if (!value) {
    return 'error';
  }

  return '';  
}

async function mockAsyncValidation(name: string, value: string) {
  let error = '';

  try {
    await checkUserName(value);

  } catch (e) {
    error = 'async error';
  }

  return error;
}

describe("useForm Test", () => {
  const values = {
    name: '',
    value: '',
  };

  test('form이 정상적으로 initialize 된다.', () => {
    const { result } = renderHook(() => useForm(values));

    // values check
    expect(result.current[0].values.name).toBe('');
    expect(result.current[0].values.value).toBe('');

    // isValid check
    expect(result.current[1]).toBe(false);

    // isSubmit check
    expect(result.current[2]).toBe(false);
  })

  test('onChange 함수가 정상적으로 작동한다.', () => {
    const { result } = renderHook(() => useForm(values));

    act(() => {
      result.current[3]({target: {
        name: 'name',
        value: 'new name'
      }} as React.ChangeEvent<HTMLInputElement>);
    })

    expect(result.current[0].values.name).toBe('new name');
  })

  test('onBlur 함수가 정상적으로 작동한다.', async () => {
    const { result, wait } = renderHook(() => useForm({
      name: '',
      value: ''
    }, mockValidation, mockAsyncValidation));

    // validation test

    act(() => {
      result.current[4]({target: {
        name: 'name',
        value: '',
      }} as React.ChangeEvent<HTMLInputElement>);
    })

    expect(result.current[1]).toBe(false);
    expect(result.current[0].errors.name).toBe('error');

    // async validation test

    const mock = new MockAdapter(axios, { delayResponse: 200 }); // 200ms 가짜 딜레이 설정

    mock.onGet('http://localhost:8080/user/join/availability-nickname/test').reply(404, {
      isOk: false
    });

    act(() => {
      result.current[4]({target: {
        name: 'name',
        value: 'test',
      }} as React.ChangeEvent<HTMLInputElement>);
  
    });

    await wait(() => {
      expect(result.current[1]).toBe(false);
      expect(result.current[0].errors.name).toBe('async error');
    })
  })
});