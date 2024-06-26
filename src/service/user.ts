import { profile } from "console";
import { client } from "./sanity";
import { Profile } from "next-auth";
import {HomeUser, ProfileUser, SearchUser, UserBasicInfo} from "@/model/user";

type OAuthUser = {
    id: string;
    email?: string | null;
    name: string;
    username: string;
    image?: string | null;
}
export async function addUser({id, email, name, image, username}: OAuthUser) {
    //console.log('>>email>>>'+email)
    return client.createIfNotExists({
        _id : id,
        _type: 'user',
        username,
        email,
        name,
        image,
        following: [],
        followers: [],
        bookmarks: [],
    });
}

export async function getUserByUsername(username:string) {
    return client.fetch(
        `*[_type == "user" && username == "${username}"][0]{
            ...,
            "id" : _id,
            following[]->{username,image},
            followers[]->{username,image},
            "bookmarks":bookmarks[]->_id,
        }`
    ).then(mapUser);
}

function mapUser(user: HomeUser) {
    return (
        {...user, 
            following: user.following ?? [],
            followers: user.followers ?? [],
        })
}


//?: 전달해도 되고 안해도 됨
export async function searchUsers(keyword?: string) {
    const query = keyword ? `&& (name match "${keyword}") || (username match "${keyword}")`
        : '';
    return client.fetch(
        `*[_type=="user" ${query}]{
            ...,
            "following": count(following),
            "followers": count(followers),
        }
        `

    ).then((users) => users.map((user : SearchUser) => ({...user, following: user.following ?? 0, followers: user.followers ?? 0})));
}

export async function inquireUser(email:string) {
    //const query = `&& (email match "${email}") && (password match "${password}")`
    const query = `&& (email match "${email}")`

    return client.fetch(
        `*[_type=="user" ${query}][0]{
              "username"  : username,
              "name" : name,
              "password" :password,
              "email" : email,
              "image" : 'https://lh3.googleusercontent.com/a/ACg8ocIy0Em7K7RVkLK70p_DGt68JWVSaGPQL5GF0Br9d8LIgKY=s96-c'
            }
        `
    );
}

export async function getUserForProfile(username: string) {
    return client
      .fetch(
        `*[_type == "user" && username == "${username}"][0]{
        ...,
        "id":_id,
        "following": count(following),
        "followers": count(followers),
        "posts": count(*[_type=="post" && author->username == "${username}"])
      }
      `, undefined,{ next: {tags: [`profile/${username}`]}}
      
      )
      .then((user) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
        posts: user.posts ?? 0,
      }));
  }
  

export async function addBookmark(userId: string, postId:string) {
    return client.patch(userId).setIfMissing({bookmarks: []})
    .append('bookmarks', [
        {
            _ref: postId,
            _type: 'reference',

        },
    ]).commit({ autoGenerateArrayKeys:true});
}

export async function removeBookmark(userId: string, postId: string) {
    return client.patch(userId).unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}


export async function follow(myId: string, targetId: string) {
    return client
      .transaction()
      .patch(myId, (user) =>
        user
          .setIfMissing({ following: [] })
          .append('following', [{ _ref: targetId, _type: 'reference' }])
      )
      .patch(targetId, (user) =>
        user
          .setIfMissing({ followers: [] })
          .append('followers', [{ _ref: myId, _type: 'reference' }])
      )
      .commit({ autoGenerateArrayKeys:true});
  }
  
  export async function unfollow(myId: string, targetId: string) {
    return client
      .transaction()
      .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
      .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
      .commit({ autoGenerateArrayKeys: true });
  }
  