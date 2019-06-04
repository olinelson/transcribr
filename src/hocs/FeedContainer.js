import React, { Fragment } from "react";

import {Feed, Icon} from "semantic-ui-react"

// components
import ClipsContainer from "./ClipsContainer";

function FeedContainer(props) {

  return (
    <Fragment>
      <ClipsContainer
        filterClips={props.filterClips}
        getAllClips={props.getAllClips}
        filteredClips={props.filteredClips}
        clips={props.clips}
      />
      {/* <Feed>
        <Feed.Event>
          <Feed.Label>
            <img src="/images/avatar/small/elliot.jpg" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>Elliot Fu</Feed.User> added you as a friend
              <Feed.Date>1 Hour Ago</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />4 Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed> */}
    </Fragment>
  );
}

export default FeedContainer;
