import React from 'react';
import ChannelList from './channel-list';
import Pagination from './pagination';
import * as channelClient from '../utils/channel-client';
import { FullPageSpinner } from './lib';
import { useAuth } from '../context/auth-context';

function usePaginate(items, currentPage) {
  const itemsPerPage = 18;
  const totalPage = Math.ceil(items.length / itemsPerPage);
  const pages = [];
  const currentPageItems = (function(items, itemsPerPage, currentPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  })(items, itemsPerPage, currentPage);
  for (let index = 1; index <= totalPage; index++) {
    pages.push(index);
  }
  return [currentPageItems, pages];
}

function List() {
  const { logout } = useAuth();
  const [channels, setChannels] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentPageChannels, pages] = usePaginate(channels, currentPage);
  const [listLoading, setListLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    channelClient.getChannels().then(
      ({ data }) => {
        const {
          data: { channels = [] }
        } = data;
        mounted && setChannels(channels);
        mounted && setListLoading(false);
      },
      _ => logout()
    );
    return () => (mounted = false);
  }, [logout]);

  return (
    <div className="container-fluid mt-3">
      <div className="row d-flex justify-content-center">
        {listLoading ? (
          <FullPageSpinner />
        ) : (
          <ChannelList channels={currentPageChannels} />
        )}
      </div>
      <div className="row d-flex justify-content-center mt-3">
        <Pagination
          pages={pages}
          handlePageChange={page => setCurrentPage(page)}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default List;
