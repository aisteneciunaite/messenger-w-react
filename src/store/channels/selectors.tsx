import stateInterface from './stateInterface';

interface stateObj {
  channels: stateInterface;
}

export const getChannels = (state: stateObj) => state.channels.list;
export const getIsLoadingChannels = (state: stateObj) => state.channels.loading;
export const getErrorChannels = (state: stateObj) => state.channels.error;

export const getOpenChannelId = (state: stateObj) => state.channels.openChannel.id;

export const getOpenChannelName = (state: stateObj) => {
  if (state.channels.list.length) {
    const channel = state.channels.list.find(channel => channel._id === getOpenChannelId(state));
    return channel ? channel.name : null;
  }
};

export const getOpenChannelUsers = (state: stateObj) => state.channels.openChannel.users;

export const getChannelToolsOpenState = (state: stateObj) => state.channels.toolsOpen;
