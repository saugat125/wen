import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { postContext } from './PostContext';
import { ThumbsUp, Heart, Laugh, Frown } from 'lucide-react';

export default function PostDetail() {

  const { id } = useParams();

  const {postState, dispatch} = useContext(postContext);

  function handleClick(postId, key) {
    dispatch({
      type: 'toggleCount',
      key: key,
      id: postId,
    });
  }

  return (
    <div className="posts max-w-md mx-auto mt-16 p-8 border border-gray-300 rounded-xl shadow-lg">
      {postState.map((post) => {
        if (parseInt(id) === post.id) {
          return (
            <div>
              <div key={post.id} className="item px-4 py-5 ">
                <h1 className='text-3xl font-semibold mb-6'>Post Detail</h1>
                <p className="text-2xl mb-5">{post.title}</p>
                <div className="flex justify-start gap-5 text-md text-gray-700 text-md">
                  <div className="like flex gap-2">
                    <button
                      className="font-medium cursor-pointer"
                      onClick={() => handleClick(post.id, 'like')}
                    >
                      <ThumbsUp color={post.clicked.like ? 'blue' : 'gray'} />
                    </button>
                    <span>{post.like}</span>
                  </div>
                  <div className="heart flex gap-2">
                    <button
                      className="font-medium cursor-pointer"
                      onClick={() => handleClick(post.id, 'heart')}
                    >
                      <Heart
                        color={post.clicked.heart ? 'red' : 'gray'}
                        fill={post.clicked.heart ? 'red' : 'none'}
                      />
                    </button>
                    <span>{post.heart}</span>
                  </div>
                  <div className="happy flex gap-2">
                    <button
                      className="font-medium cursor-pointer"
                      onClick={() => handleClick(post.id, 'happy')}
                    >
                      <Laugh color={post.clicked.happy ? 'orange' : 'gray'} />
                    </button>
                    <span>{post.happy}</span>
                  </div>
                  <div className="sad flex gap-2">
                    <button
                      className="font-medium cursor-pointer"
                      onClick={() => handleClick(post.id, 'sad')}
                    >
                      <Frown color={post.clicked.sad ? 'orange' : 'gray'} />
                    </button>
                    <span>{post.sad}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
