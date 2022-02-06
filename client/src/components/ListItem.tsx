import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";

function ListItem() {
  return (
    <div className="listItem w-60 h-32 bg-netflix-black mr-1 overflow-hidden cursor-pointer hover:w-80 hover:h-48">
      <img
        className="w-full h-full object-cover"
        src="https://assets.whatsnewonnetflix.com/external_assets/sggkh+%5B%5Blxx*9*8566*8567_8_muochl_mvg%5Bzig%5B5y016%5Bu811660xz1xwz6x4574zw25259v2w0z6v475y016.jpg"
        alt="movie poster"
      />
      <div className="itemInfo">
        <div className="icons">
          <PlayArrow />
          <Add />
          <ThumbUpAltOutlined />
          <ThumbDownAltOutlined />
        </div>
      </div>
    </div>
  );
}

export default ListItem;
