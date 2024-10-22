import { useEffect, useRef, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { Quest } from '@vuo/models/Quest';
import { UserGroupMembership } from '@vuo/models/UserGroupMembership';
import { Resource } from '@vuo/models/Resource';
import Button from '@vuo/atoms/Button';
import Space from '@vuo/atoms/Space';
import Icon from '@vuo/atoms/Icon';
import IconNames from "@vuo/models/IconTypes";
import { ChannelUser } from '@vuo/stores/WebSocketStore';
import ShareIcon from "@vuo/assets/fixfood/icons/share-link.svg?react";
import QuestPrepTask from './QuestPrepTask';
import styles from './QuestCard.module.scss'
import PlayerItem from './PlayerItem';

interface Result {
  color: string;
  currentUser: boolean;
  nickname: string;
  username: string;
}

export type QuestTaskProps = {
  quest: Quest;
  onAddGroupMembership?: (nickname: string) => void;
  onStartQuest?: () => void;
  onCloseSession?: () => void;
  onCreateSession?: () => void;
  onLeaveSession?: () => void;
  hideStartButton?: boolean;
  isCurrentUserHost: boolean;
  multiplayerSessionURL?: string;
  multiplayerUsers: ChannelUser[];
  groupMembers: UserGroupMembership[];
}

function QuestCard(props: QuestTaskProps) {
  const {
    onAddGroupMembership,
    onStartQuest,
    onCloseSession,
    onCreateSession,
    onLeaveSession,
    multiplayerUsers = [],
    multiplayerSessionURL,
    isCurrentUserHost,
    quest,
    groupMembers = [],
    hideStartButton = false
  } = props;

  const [showMiniGameSelector, setShowMiniGameSelector] = useState<boolean>(false)
  const [membershipName, setMembershipName] = useState<string>("")
  const miniGameDialog = useRef<HTMLDialogElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (miniGameDialog.current === event.target) {
      setShowMiniGameSelector(false)
    }
  }

  const shareUrl = (sessionId: string) => {
    const currentDomain = window.location.origin;
    return `${currentDomain}/app/multiplayer/${sessionId}/join`;
  }

  function copyToClipboard(sessionId: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl(sessionId))
    }
  }

  const imageUrl = () => (quest.media?.image || quest.recipe.media?.image) || ''

  function mergeResources(resources: Resource[]): Resource[] {
    const mergedResourcesMap: { [key: string]: Resource } = {};
    resources.forEach(resource => {
      const key = `${resource.name}_${resource.unit}`;
      if (mergedResourcesMap[key]) {
        mergedResourcesMap[key].quantity += resource.quantity;
      } else {
        mergedResourcesMap[key] = { ...resource };
      }
    });
    return Object.values(mergedResourcesMap);
  }

  function mergeUserGroupAndChannel(
    userGroupMemberships: UserGroupMembership[],
    channelUsers: ChannelUser[]
  ): Result[] {
    const results: Result[] = [];

    const channelUserMap = new Map<string, ChannelUser>();
    channelUsers.forEach(channelUser => {
      channelUserMap.set(channelUser.id, channelUser);
    });

    const userGroupMembershipMap = new Map<string, UserGroupMembership>();
    userGroupMemberships.forEach(membership => {
      userGroupMembershipMap.set(membership.userId?.id || membership.nickname, membership);
    });

    // Combine data from channelUsers
    channelUsers.forEach(channelUser => {
      const membership = userGroupMembershipMap.get(channelUser.id);
      results.push({
        color: channelUser.color,
        currentUser: channelUser.currentUser,
        nickname: membership ? membership.nickname : "",
        username: channelUser.username
      });
    });

    // Add remaining memberships that don't have matching channel users
    userGroupMemberships.forEach(membership => {
      if (!channelUserMap.has(membership.userId?.id || membership.nickname)) {
        results.push({
          color: "",
          currentUser: false,
          nickname: membership.nickname,
          username: membership.userId?.username || ""
        });
      }
    });

    return results;
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <div className='box card-container' style={{ display: 'flex', flexDirection: 'column', backgroundColor: "var(--gray-900)" }}>
      <div className="recipe-thumb"
        style={{
          backgroundImage: `url(${imageUrl()})`
        }}>
        <div className={`${styles.intro_recipe_name_chip} font-h4`}>
          {quest.name ? quest.name : quest.recipe.name}
        </div>
        <Button
          className='btn btn-large btn-raised'
          style={{
            "--background-color": "black",
            "--border-width": "0",
            "--text-color": "white",
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            display: "none" // DISABLED MOMENTARILY
          }}
          onClick={() => setShowMiniGameSelector(true)}
        >
          <Icon name='plus-math' />
          Boost
        </Button>
      </div>
      <Space direction='vertical' style={{ "--gap-vertical": "16px", padding: "16px" }}>
        <div style={{ color: "var(--white)", fontSize: "1.4em" }}>
          {quest.recipe.description}
        </div>
        {multiplayerSessionURL && (
          <div className='flex-col flex gap-small'>
            <div className='text-align-center'>
              { }
              <Button
                block
                className='btn btn-large btn-raised mt16'
                onClick={() => isCurrentUserHost ? onCloseSession?.() : onLeaveSession?.()}
              >{isCurrentUserHost ? 'Close lobby' : 'Leave lobby'}</Button>
            </div>
            <div className="card-container flex flex-col gap-small padding-16"
              style={{ backgroundColor: 'var(--gray-800)', color: 'white' }}>
              <div className="flex gap-small align-items-center">
                <Icon name={IconNames.PeopleCards} size={36} />
                <h2 style={{ color: 'white' }}>Multiplayer lobby</h2>
              </div>
              <div className='flex flex-col gap-small'>
                {isCurrentUserHost && (
                  <div className='flex gap-small'>
                    <input
                      className="width100 largeInput"
                      type="text"
                      aria-labelledby="username-label"
                      placeholder="Nickname"
                      value={membershipName}
                      onChange={(event) => setMembershipName(event.target.value)}
                    />
                    <Button
                      className='btn btn-large btn-raised'
                      onClick={() => {
                        setMembershipName("")
                        onAddGroupMembership?.(membershipName)
                      }}>Add user</Button>
                  </div>
                )}
                <div className='flex gap-small'>
                  {mergeUserGroupAndChannel(groupMembers, multiplayerUsers).map(user => {
                    const title = (username: string, nickname?: string) => nickname || username
                    return (
                      <div style={{ display: 'flex' }}>
                        <PlayerItem
                          color={user.color}
                          title={user.currentUser ? "You" : title(user.username, user?.nickname)}
                        />
                      </div>)
                  }
                  )}
                </div>
              </div>
              {isCurrentUserHost && (
                <div className="card-container text-align-center gap-small padding-16 flex flex-col margin8p"
                  style={{ backgroundColor: 'var(--gray-1000)' }}>
                  <h2>Invite players</h2>
                  <span>Share this link or QR code to invite friends for family to this Quest.</span>
                  <span>They don&apos;t even need a Fix Food account!</span>
                  <div className='text-center'>
                    <QRCode
                      value={shareUrl(multiplayerSessionURL)}
                      style={{ borderRadius: '10px' }} />
                  </div>
                  <Button
                    className="btn btn-large btn-raised btn-blue"
                    onClick={() => copyToClipboard(multiplayerSessionURL)}>
                    <div className='flex align-items-center gap-small'>
                      <span>Invite with a link</span>
                      <ShareIcon />
                    </div>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )
        }
        {
          !multiplayerSessionURL && (
            <div className='text-align-center mt16'>
              <Button
                className='btn btn-large btn-raised'
                color='primary'
                block
                onClick={() => onCreateSession?.()}
              >Enable Multiplayer Mode</Button>
            </div>
          )
        }
        {
          quest.recipe.resources && (
            <QuestPrepTask resources={mergeResources(quest.recipe.resources)} servingSize={quest.recipe.servingSize} />
          )
        }
        {
          !hideStartButton && (
            <Button
              block
              className='btn btn-large btn-raised'
              color='primary'
              size='large'
              onClick={() => { onStartQuest?.() }}
            >Get Cooking!</Button>
          )
        }
      </Space >
      <dialog className='dialog' ref={miniGameDialog} open={showMiniGameSelector}>
        {/* <QuestMinigameSelector miniGames={availableMiniGames} onMiniGamesSelected={onMiniGamesSelected} /> */}
      </dialog>
    </div >
  );
};

export default QuestCard;
