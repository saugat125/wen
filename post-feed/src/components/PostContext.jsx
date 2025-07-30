import { useReducer } from "react";
import { createContext } from "react"

const postData = [
  {
    title: 'This is a post feed!',
    id: 1,
    like: 1,
    heart: 2,
    happy: 0,
    sad: 1,
    clicked: {
      like: false,
      heart: false,
      happy: false,
      sad: false,
    },
  },
  {
    title: "Here's another post to update.",
    id: 2,
    like: 1,
    heart: 1,
    happy: 0,
    sad: 0,
    clicked: {
      like: false,
      heart: false,
      happy: false,
      sad: false,
    },
  },
];

export const postContext = createContext();

function postReducer(postState, action) {
  switch (action.type) {
    case 'toggleCount':
      return postState.map((post) => {
        if (post.id === action.id) {
          const alreadyClicked = post.clicked[action.key];

          return {
            ...post,
            [action.key]: alreadyClicked
              ? post[action.key] - 1
              : post[action.key] + 1,
            clicked: {
              ...post.clicked,
              [action.key]: !alreadyClicked,
            },
          };
        }
        return post;
      });
    default:
      return postState;
  }
}


export function Post({children}){

    const [postState, dispatch] = useReducer(postReducer, postData);

    return(
        <postContext.Provider value={{postState, dispatch}}>
            {children}
        </postContext.Provider>
    )

}