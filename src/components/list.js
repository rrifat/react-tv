/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';
import client from '../utils/api-client';
import ChannelList from './channel-list';
import { useAuth } from '../context/auth-context';

const CHANNELS_PER_PAGE = 6;

const base = css`
  position: absolute;
  top: 50%;
  background-color: transparent;
  border: none;
  img {
    width: 40px;
  }
`;
const LeftButton = styled.button`
  ${base}
  left: 20px;
`;
const RightButton = styled.button`
  ${base}
  right: 20px;
`;

function List({ onClickChannel }) {
  const { logout } = useAuth();
  const [channels, setChannels] = React.useState([]);
  const [status, setStatus] = React.useState('rest');
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPage = Math.ceil(channels.length / CHANNELS_PER_PAGE);
  const currentPageChannels = currentPageData(
    channels,
    CHANNELS_PER_PAGE,
    currentPage
  );
  const [isChannelLoading, setIsChannelLoading] = React.useState(true);

  React.useEffect(() => {
    client('channel')
      .then(({ data }) => {
        setIsChannelLoading(false);
        const {
          data: { channels }
        } = data;
        setChannels(channels);
      })
      .catch(() => {
        client('auth/refresh', {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              '__hidayah__iptv__refresh'
            )}`
          }
        }).then(
          ({ data }) => {
            const { data: auth } = data;
            window.localStorage.setItem('__hidayah__iptv__', auth.access_token);
            setStatus('run');
          },
          err => {
            console.log(err);
            logout();
            return Promise.reject(err);
          }
        );
      });
  }, [logout, status]);
  function handleRightClick() {
    setCurrentPage(page => page + 1);
  }
  function handleLeftClick() {
    setCurrentPage(page => page - 1);
  }
  return (
    <div
      className="mt-3"
      style={{ position: 'relative', height: '100%', width: '100%' }}
    >
      <div className="contailer-fluid d-flex justify-content-center">
        {currentPage > 1 && (
          <LeftButton onClick={handleLeftClick}>
            <img src="images/arrow-left.svg" alt="" />
          </LeftButton>
        )}
        <div className="row">
          {isChannelLoading ? (
            // <div className="spinner-border align-self-center" role="status">
            //   <span className="sr-only">Loading...</span>
            // </div>
            <span>Fetching channel list...</span>
          ) : (
            <ChannelList
              channels={currentPageChannels}
              handleClickChannel={onClickChannel}
            />
          )}
        </div>
        {currentPage !== totalPage && (
          <RightButton onClick={handleRightClick}>
            <img src="images/arrow-right.svg" alt="" />
          </RightButton>
        )}
      </div>
    </div>
  );
}

export default List;

function currentPageData(items, itemsPerPage, currentPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
}
