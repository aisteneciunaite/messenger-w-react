export const getChannels = state => state.channels.list;
export const getIsLoadingChannels = state => state.channels.loading;
export const getErrorChannels = state => state.channels.error;

export const getOpenChannelId = state => state.channels.openChannel.id;

export const getOpenChannelName = state => {
  if (state.channels.list.length) {
    return state.channels.list.find(channel => channel._id === getOpenChannelId(state)).name;
  }
};

export const getOpenChannelUsers = state => state.channels.openChannel.users;
