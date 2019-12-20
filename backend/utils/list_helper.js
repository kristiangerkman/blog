const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    return blogs.reduce((sum, i) => sum + i, 0);
  }
};

const favouriteBlog = blogs => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0];
  } else {
    let mostLiked = blogs[0];
    blogs.forEach(blog => {
      mostLiked = blog.likes > mostLiked.likes ? blog : mostLiked;
    });
    console.log(mostLiked);
    return mostLiked;
  }
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
};
