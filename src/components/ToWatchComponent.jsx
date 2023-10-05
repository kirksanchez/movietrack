import React from 'react';
import './Watch.css';

function ToWatchComponent({
  onClick,
  onDoneWatching,
  onRemoveFromWatched,
  onWatchAgain,
}) {
  return (
    <>
      {onClick && (
        <button className='to-watch-btn' onClick={onClick}>
          Remove from To Watch
        </button>
      )}
      {onDoneWatching && (
        <button className='done-watching-btn' onClick={onDoneWatching}>
          Done Watching
        </button>
      )}
      {onRemoveFromWatched && (
        <button className='remove-watched-btn' onClick={onRemoveFromWatched}>
          Remove from Watched
        </button>
      )}
      {onWatchAgain && (
        <button className='watch-again-btn' onClick={onWatchAgain}>
          Watch Again
        </button>
      )}
    </>
  );
}

export default ToWatchComponent;
