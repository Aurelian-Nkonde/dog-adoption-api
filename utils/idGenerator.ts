import ShortUniqueId from 'short-unique-id';

export function generateUniqueUserId(): string {
  const response = new ShortUniqueId({
    length: 20,
    dictionary: 'alphanum_lower',
  });
  return response.rnd();
}

export function generateUniqueDogId() {
  const response = new ShortUniqueId({
    length: 15,
    dictionary: 'alphanum_lower',
  });
  return response.rnd();
}

export function generateUniqueAdoptionId() {
  return new ShortUniqueId({
    length: 15,
    dictionary: 'alphanum_upper',
  }).rnd();
}

export function generateUniqueNotificationId(): string {
  const response = new ShortUniqueId({
    length: 15,
    dictionary: 'alphanum_upper',
  });
  return response.rnd()
}
