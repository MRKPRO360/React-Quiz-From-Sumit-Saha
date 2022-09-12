import { nanoid } from "nanoid";
import { useState } from "react";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVIdeoList";
import Video from "./Video";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);

  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => setPage(page + 8)}
        >
          {videos.map((video) => (
            <Link to="/quiz" key={nanoid()}>
              <Video title={video.title} noq={video.noq} id={video.youtubeID} />
            </Link>
          ))}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error</div>}
      {loading && <div>Loading ...</div>}
    </div>
  );
}
