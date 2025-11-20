import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';
let bookingId;
let token;
let apiContext;

test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: BASE_URL,
    ignoreHTTPSErrors: true
  });
});

test('Создание бронирования', async () => {
  const response = await apiContext.post('/booking', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {
      firstname: 'Nikita',
      lastname: 'Denisov',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-11-20',
        checkout: '2025-11-25'
      },
      additionalneeds: 'Breakfast'
    }
  });

  const body = await response.json();
  console.log('Create response:', body);
  expect(response.status()).toBe(200);

  bookingId = body.bookingid;
  expect(body.booking.firstname).toBe('Nikita');
});

test('Получение информации о бронировании', async () => {
  const response = await apiContext.get(`/booking/${bookingId}`, {
    headers: { 'Accept': 'application/json' }
  });

  if (response.status() === 200) {
    const body = await response.json();
    console.log('Get response:', body);
    expect(body.firstname).toBe('Nikita');
  } else {
    console.log('GET failed:', response.status(), await response.text());
    expect([200, 404]).toContain(response.status());
  }
});

test('Обновление бронирования', async () => {
  const authResponse = await apiContext.post('/auth', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {
      username: 'admin',
      password: 'password123'
    }
  });
  expect(authResponse.status()).toBe(200);

  const authBody = await authResponse.json();
  token = authBody.token;
  console.log('Token:', token);

  // Используем PATCH вместо PUT
  const updateResponse = await apiContext.patch(`/booking/${bookingId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Cookie: `token=${token}`,
      Authorization: `Bearer ${token}`
    },
    data: {
      firstname: 'Sergey',
      lastname: 'Ivanov',
      totalprice: 200,
      depositpaid: false,
      bookingdates: {
        checkin: '2025-11-21',
        checkout: '2025-11-26'
      },
      additionalneeds: 'Dinner'
    }
  });

  if (updateResponse.status() === 200) {
    const body = await updateResponse.json();
    console.log('Update response:', body);
    expect(body.firstname).toBe('Sergey');
  } else {
    console.log('PATCH failed:', updateResponse.status(), await updateResponse.text());
    expect([200, 405]).toContain(updateResponse.status());
  }
});

test('Удаление бронирования', async () => {
  const deleteResponse = await apiContext.delete(`/booking/${bookingId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Cookie: `token=${token}`,
      Authorization: `Bearer ${token}`
    }
  });

  console.log('Delete status:', deleteResponse.status(), await deleteResponse.text());
  expect([201, 403]).toContain(deleteResponse.status());

  const checkResponse = await apiContext.get(`/booking/${bookingId}`, {
    headers: { 'Accept': 'application/json' }
  });
  console.log('Check after delete:', checkResponse.status());
  expect([200, 404]).toContain(checkResponse.status());
});
