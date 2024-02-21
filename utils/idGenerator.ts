import ShortUniqueId from 'short-unique-id';

export function generateUniqueUserId(): string {
  const response = new ShortUniqueId({
    length: 20,
    dictionary: 'alphanum_lower',
  });
  return String(response);
}

export function generateUniqueDogId() {
  const response = new ShortUniqueId({
    length: 15,
    dictionary: 'alphanum_lower',
  });
  return String(response);
}

export function generateUniqueAdoptionId(): string {
  const response = new ShortUniqueId({
    length: 15,
    dictionary: 'alphanum_upper',
  });
  return String(response);
}

export function generateUniqueNotificationId(): string {
  const response = new ShortUniqueId({
    length: 15,
    dictionary: 'alphanum_upper',
  });
  return String(response);
}
