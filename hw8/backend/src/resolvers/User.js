const User = {
  posts(parent, args, { db }, info) {
    return db.posts.filter((post) => {
      return post.author === parent.id
    })
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter((comment) => {
      return comment.author === parent.id
    })
  },
  // name(parent, args, { db }, info) {
  //   return parent.name.includes(args.name)
  // },
  // age(parent, args, { db }, info) {
  //   if (!args.age) return parent.age
  //   console.log(parent)
  //   return parent.age
  // },
}

export { User as default }
