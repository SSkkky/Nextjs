export type myProjectPostType = {
    postId: number,
    title: string,
    content: string,
    authorId: string,
    token: string,
    date: number,
    comments: myProjectCommentType[]
}

export type myProjectCommentType = {
    name: string,
    content: string,
    date: number
}