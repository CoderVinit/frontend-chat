export const sampleChats = [
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    _id: '1',
    name: 'John Doe',
    groupChat: false,
    members: ["1", "2"]
  },
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    _id: '2',
    name: 'John Dang',
    groupChat: false,
    members: ["1", "2"]
  },
]


export const sampleUser = [
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    _id: '1',
    name: 'John Doe',
  },
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    _id: '2',
    name: 'John Dang',
  },
]


export const sampleNotification = [
  {
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: 'John Doe',
    },
    _id: '1',
  },
  {
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: 'John Dang',
    },
    _id: '2',
  }
]


export const sampleMessage = [
  {
    attachments: [

    ],
    content: "This is the actual message",
    _id: "vhdifhfhdlfuhgldz",
    sender: {
      _id: "user._id",
      name: "chaman chutiya",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z"
  },
  {
    attachments: [
      {
        public_id: "abcfshfs2",
        url: "https://www.w3schools.com/howto/img_avatar.png"
      },
    ],
    content: "",
    _id: "vhdifhfhdlfuhgldz2",
    sender: {
      _id: "ajdkafhufges",
      name: "chaman chutiya",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z"
  }
]

export const dashboardData = {
  users: [
    {
      name: "john Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "john_doe",
      friends: 20,
      groups: 5
    },
    {
      name: "Vinit patel",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      username: "vinit_pat",
      friends: 50,
      groups: 10
    },
  ],
  chats: [
    {
      name: "family group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [{ _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" }, { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" }],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png"
      }
    },
    {
      name: "Friends group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: false,
      members: [{ _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" }, { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" }, { _id: "3", avatar: "https://www.w3schools.com/howto/img_avatar.png" }],
      totalMembers: 3,
      totalMessages: 40,
      creator: {
        name: "Vinit",
        avatar: "https://www.w3schools.com/howto/img_avatar.png"
      }
    },
  ],
  messages: [
    {
      attachments: [],
      _id: "1",
      content: "Lauda ka message hai",
      sender: {
        _id: "1",
        name: "Chaman",
        avatar: "https://www.w3schools.com/howto/img_avatar.png"
      },
      groupChat: false,
      chat: "chatID",
      createdAt: "2024-02-12T10:41:30.630Z"
    },
    {
      attachments: [
        {
          public_id: "abcfshfs2",
          url: "https://www.w3schools.com/howto/img_avatar.png"
        },
      ],
      content: "",
      _id: "2",
      sender: {
        _id: "ajdkafhufges",
        name: "chaman chutiya",
        avatar: "https://www.w3schools.com/howto/img_avatar.png"
      },
      groupChat: false,
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z"
    }
  ]
}