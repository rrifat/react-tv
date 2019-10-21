import React from 'react';
import ChannelList from './channel-list';
import Pagination from './pagination';
import * as channelClient from '../utils/channel-client';

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
  const [channels, setChannels] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentPageChannels, pages] = usePaginate(channels, currentPage);

  React.useEffect(() => {
    channelClient.getChannels().then(({ data }) => {
      const {
        data: { channels }
      } = data;
      setChannels(channels);
    });
  }, []);

  return (
    <div className="container-fluid mt-3">
      <div className="row d-flex justify-content-center">
        <ChannelList channels={currentPageChannels} />
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
