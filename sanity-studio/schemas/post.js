export default {
    title: 'Post',
    name: 'post',
    type: 'document',
    fields: [
        {
            title: 'Author',
            name: 'author',
            type: 'reference',
            to: [{type: 'user'}],
        },
        {
            title: 'Photo',
            name: 'photo',
            type: 'image'
        },
        {
            title: 'Likes',
            name: 'likes',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'user'}]
                }
            ],
            valdation: (Rule) => Rule.unique(),
        },
        {
            title: 'Comments',
            name: 'comments',
            type: 'array',
            of: [
                {
                    title: 'Comment',
                    name: 'comment',
                    type: 'document',
                    fields: [
                        {
                            title: 'Author',
                            name: 'author',
                            type: 'reference',
                            to: [{type: 'user'}],
                        },
                        {
                            title: 'Comment',
                            name: 'comment',
                            type: 'string'
                        },
                    ]
                }
            ],
        },
        {
            title: 'Following',
            name: 'following',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'user'}]
                }
            ],
            valdation: (Rule) => Rule.unique(),

        },
    ],
    preview: {
        select: {
          title: 'comments.0.comment',
          authorName: 'comments.0.author.name',
          authorUserName: 'author.username',
          media: 'photo'
        },
        prepare(selection) {
            const {title, authorName, authorUserName, media} = selection
            return {
              title: title,
              subtitle: `by ${authorName} (${authorUserName})`,
              media : media
            }
          }
    }
}