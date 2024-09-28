import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



const api = createApi({


  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:4000/api/v1/` }),
  tagTypes: ["Chat", "User", "Message"],

  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chats/my",
        credentials: "include"
      }),
      providesTags: ["Chat"],
    }),

    searchUsers: builder.query({
      query: (name) => ({
        url: `users/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "users/sendrequest",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      providesTags: ["User"]
    }),

    getNotifications: builder.query({
      query: () => ({
        url: `users/notifications`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),


    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "users/acceptrequest",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      providesTags: ["Chat"]
    }),

    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {

        let url = `chats/${chatId}`;
        if (populate) url += "?populate=true";

        return {
          url,
          credentials: "include",
        }
      },
      providesTags: ["Chat"],
    }),

    getMessages: builder.query({
      query: ({ chatId, page }) => (
        {
          url: `chats/message/${chatId}?page=${page}`,
          credentials: "include",
        }
      ),
      keepUnusedDataFor: 0,
    }),

    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "chats/message",
        method: "POST",
        body: data,
        credentials: "include",
      })
    }),
    myGroups: builder.query({
      query: () => ({
        url: "chats/my/groups",
        credentials: "include"
      }),
      providesTags: ["Chat"],
    }),

    availableFriends: builder.query({
      query: (chatId) => {

        let url = `users/getfriends`;
        if (chatId) url += `?chatId=${chatId}`;

        return {
          url,
          credentials: "include",
        }
      },
      providesTags: ["Chat"],
    }),

    newGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: "chats/new",
        method: "POST",
        credentials: "include",
        body: { name, members },
      }),
      invalidatesTags: ["Chat"],
    }),
    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `chats/${chatId}`,
        method: "PUT",
        credentials: "include",
        body: { name },
      }),
      invalidatesTags: ["Chat"],
    }),

    removeGroupMembers: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `chats/removemembers`,
        method: "PUT",
        credentials: "include",
        body: { chatId, userId },
      }),
      invalidatesTags: ["Chat"],
    }),

    addGroupMembers: builder.mutation({
      query: ({ chatId, members }) => ({
        url: `chats/addmembers`,
        method: "PUT",
        credentials: "include",
        body: { chatId, members },
      }),
      invalidatesTags: ["Chat"],
    }),

    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `chats/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `chats/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    })

  })

})


export default api;
export const { useMyChatsQuery, useLazySearchUsersQuery, useSendFriendRequestMutation,
  useGetNotificationsQuery, useAcceptFriendRequestMutation,
  useChatDetailsQuery, useGetMessagesQuery, useSendAttachmentsMutation, useMyGroupsQuery, useAvailableFriendsQuery
  , useNewGroupMutation, useRenameGroupMutation, useRemoveGroupMembersMutation, useAddGroupMembersMutation, useDeleteChatMutation, useLeaveGroupMutation } = api;