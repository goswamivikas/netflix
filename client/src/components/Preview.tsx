import React from "react";
import axios from "axios";
import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import { UserContext } from "../utils/UserContext";

interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

function Preview({ id, media_type }: { id?: number; media_type?: string }) {
  const [video] = useVideo({ media_type, id });
  return (
    <div className="wrapper absolute top-0 left-0 w-full overflow-hidden rounded-t-md pb-[56.25%]">
      <iframe
        src={`https://www.youtube.com/embed/${video?.key}?autoplay=1&mute=1&loop=1&controls=0&playlist=${video?.key}&start=15`}
        title={video?.name}
        className="pointer-events-none absolute top-0  left-0 h-full w-full scale-150 border-none"
      />
    </div>
  );
}

export default Preview;

export function useVideo({
  media_type,
  id,
}: {
  media_type?: string;
  id?: number;
}) {
  const [video, setVideo] = React.useState<Video | null>(null);
  const { user } = React.useContext(UserContext);
  React.useEffect(() => {
    const getVideo = async () => {
      const res = await axios.get(`/media/${id}/video`, {
        headers: {
          token: `Bearer ${user?.accessToken}`,
        },
        params: {
          media_type,
        },
      });
      setVideo(res.data);
      console.log({ videodata: res });
    };
    getVideo();
  }, [id, media_type, user?.accessToken]);
  return [video];
}
