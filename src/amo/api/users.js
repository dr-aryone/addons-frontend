/* @flow */
import invariant from 'invariant';

import { callApi } from 'core/api';
import type {
  NotificationsUpdateType,
  UserEditableFieldsType,
  UserId,
} from 'amo/reducers/users';
import type { ApiStateType } from 'core/reducers/api';


export function currentUserAccount({ api }: {| api: ApiStateType |}) {
  invariant(api, 'api state is required.');

  return callApi({
    auth: true,
    endpoint: 'accounts/profile',
    state: api,
  });
}

export function editUserAccount({ api, picture, userId, ...editableFields }: {|
  api: ApiStateType,
  editableFields: UserEditableFieldsType,
  picture?: File | null,
  userId: UserId,
|}) {
  invariant(api, 'api state is required.');
  invariant(userId, 'userId is required.');

  let body = editableFields;

  if (picture) {
    const form = new FormData();
    // Add all the editable fields, one by one.
    Object.keys(editableFields).forEach((key: string) => {
      form.set(key, editableFields[key]);
    });
    // Add the picture file.
    form.set('picture_upload', picture);
    // Set the API body to be the form.
    body = form;
  }

  return callApi({
    auth: true,
    body,
    endpoint: `accounts/account/${userId}`,
    method: 'PATCH',
    state: api,
  });
}

type UserApiParams = {|
  api: ApiStateType,
  username: string,
|};

export function userAccount({ api, username }: UserApiParams) {
  invariant(api, 'api state is required.');
  invariant(username, 'username is required.');

  return callApi({
    auth: true,
    endpoint: `accounts/account/${username}`,
    state: api,
  });
}

export function userNotifications({ api, username }: UserApiParams) {
  invariant(api, 'api state is required.');
  invariant(username, 'username is required.');

  return callApi({
    auth: true,
    endpoint: `accounts/account/${username}/notifications`,
    state: api,
  });
}

export function updateUserNotifications({ api, notifications, userId }: {|
  api: ApiStateType,
  notifications: NotificationsUpdateType,
  userId: UserId,
|}) {
  invariant(api, 'api state is required.');
  invariant(userId, 'userId is required.');
  invariant(notifications, 'notifications are required.');

  return callApi({
    auth: true,
    body: notifications,
    endpoint: `accounts/account/${userId}/notifications`,
    method: 'POST',
    state: api,
  });
}

export function deleteUserPicture({ api, userId }: {|
  api: ApiStateType,
  userId: UserId,
|}) {
  invariant(api, 'api state is required.');
  invariant(userId, 'userId is required.');

  return callApi({
    auth: true,
    endpoint: `accounts/account/${userId}/picture`,
    method: 'DELETE',
    state: api,
  });
}

export function deleteUserAccount({ api, userId }: {|
  api: ApiStateType,
  userId: UserId,
|}) {
  invariant(api, 'api state is required.');
  invariant(userId, 'userId is required.');

  return callApi({
    auth: true,
    endpoint: `accounts/account/${userId}`,
    method: 'DELETE',
    state: api,
  });
}
