const mockData = {
  authResponse: {
    status: true,
    message: 'You have successfully signed up',
    data: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTM5MzkzMDIsImN1cnJlbnRVc2VyIjp7InVzZXJJZCI6MSwidXNlcm5hbWUiOiJydWtraWV5In0sImlhdCI6MTUxMzg1MjkwMn0.K2P7BAKDkMbk9avQznEE4u8PRtrx3P0mlSzLvFAdH2E'
    }
  },
  getUserRecipes: {
    pages: 1,
    recipes: {
      count: 2,
      rows: [{
        createdAt: "2017-12-18T17:57:11.735Z",
        details: "recipe",
        downvotes: 0,
        id: 1,
        ingredient: "recipe",
        picture: "ifztjn7osdtskuxdfiqh",
        recipeName: "Recipe",
        updatedAt: "2017-12-18T17:58:16.280Z",
        upvotes: 1,
        userId: 1,
        views: 0
      },
      {
        createdAt: "2017-12-18T17:57:11.735Z",
        details: "rice",
        downvotes: 0,
        id: 1,
        ingredient: "rice",
        picture: "ifztjn7osdtskuxdfiqh",
        recipeName: "rice",
        updatedAt: "2017-12-18T17:58:16.280Z",
        upvotes: 1,
        userId: 1,
        views: 0
      }]
    }
  },
  upvotedRecipe: {
    status: true,
    message: 'upvote successful',
    data: {
      User: {
        username: "rukky"
      },
      createdAt: "2017-12-18T17:57:11.735Z",
      details: "recipe",
      downvotes: 0,
      id: 1,
      ingredient: "recipe",
      picture: "ifztjn7osdtskuxdfiqh",
      recipeName: "Recipe",
      updatedAt: "2017-12-18T17:58:16.280Z",
      upvotes: 1,
      userId: 1,
      views: 0
    }
  },
  recipeDetails: [
    {
      id: 8,
      recipeName: "Asdf",
      ingredient: "dsfg",
      details: "dsf",
      picture: "tw2y57mjg7pbdo4dyrci",
      userId: 1,
      upvotes: 0,
      downvotes: 0,
      views: 0,
      createdAt: "2018-01-10T01:36:04.250Z",
      updatedAt: "2018-01-10T01:36:04.250Z"
    },
    {
      id: 7,
      recipeName: "Wer",
      ingredient: "asdf",
      details: "wesrdf",
      picture: "chnwhqvvdivf06okfv5p",
      userId: 1,
      upvotes: 0,
      downvotes: 0,
      views: 0,
      createdAt: "2018-01-10T01:28:32.849Z",
      updatedAt: "2018-01-10T01:28:32.849Z"
    }
  ],
  saveImageDetails: {
    bytes: 5991,
    created_at: "2018-01-12T00:26:19Z",
    etag: "01658a24ffe0a1b5db75b882294da1ba",
    format: "png",
    height: 200,
    original_filename: "63408-200",
    placeholder: false,
    public_id: "qssiljs70ary0lx8xhgx",
    resource_type: "image",
    secure_url: "https://res.cloudinary.com/ruqoyah/image/upload/v1515716779/qssiljs70ary0lx8xhgx.png",
    signature: "23a595aac6f4630c4bc4b64974c4e5cccbc47d87"
  },
  recipePropsDetails: [
    {
      User: {
        username: "rukky"
      },
      id: 8,
      recipeName: "Asdf",
      ingredient: "dsfg",
      details: "dsf",
      picture: "tw2y57mjg7pbdo4dyrci",
      userId: 1,
      upvotes: 0,
      downvotes: 0,
      views: 0,
      createdAt: "2018-01-10T01:36:04.250Z",
      updatedAt: "2018-01-10T01:36:04.250Z",
    },
    {
      User: {
        username: "rukky"
      },
      id: 7,
      recipeName: "Wer",
      ingredient: "asdf",
      details: "wesrdf",
      picture: "chnwhqvvdivf06okfv5p",
      userId: 1,
      upvotes: 0,
      downvotes: 0,
      views: 0,
      createdAt: "2018-01-10T01:28:32.849Z",
      updatedAt: "2018-01-10T01:28:32.849Z"
    }
  ],
  favoriteRecipeDetails: [
    {
      Recipe: {
        User: {
          username: "rukky"
        },
        id: 8,
        recipeName: "Asdf",
        ingredient: "dsfg",
        details: "dsf",
        picture: "tw2y57mjg7pbdo4dyrci",
        userId: 1,
        upvotes: 0,
        downvotes: 0,
        views: 0,
        createdAt: "2018-01-10T01:36:04.250Z",
        updatedAt: "2018-01-10T01:36:04.250Z",
      }
    },
    {
      Recipe: {
        User: {
          username: "rukky"
        },
        id: 7,
        recipeName: "Wer",
        ingredient: "asdf",
        details: "wesrdf",
        picture: "chnwhqvvdivf06okfv5p",
        userId: 1,
        upvotes: 0,
        downvotes: 0,
        views: 0,
        createdAt: "2018-01-10T01:28:32.849Z",
        updatedAt: "2018-01-10T01:28:32.849Z"
      }
    }
  ],
  reviewRecipe: [
    {
      User: {
        picture: "tw2y57mjg7pbdo4dyrci",
        username: "rukkiey"
      },
      id: 1,
      recipeId: 8,
      userId: 1,
      review: 'nice',
      createdAt: "2018-01-10T01:36:04.250Z",
      updatedAt: "2018-01-10T01:36:04.250Z"
    }
  ],
  recipeUpvote: {
    id: 8,
    recipeName: "Asdf",
    ingredient: "dsfg",
    details: "dsf",
    picture: "tw2y57mjg7pbdo4dyrci",
    userId: 1,
    upvotes: 1,
    downvotes: 0,
    views: 0,
    createdAt: "2018-01-10T01:36:04.250Z",
    updatedAt: "2018-01-10T01:36:04.250Z"
  },
  recipeDownvote: {
    id: 7,
    recipeName: "Wer",
    ingredient: "asdf",
    details: "wesrdf",
    picture: "chnwhqvvdivf06okfv5p",
    userId: 1,
    upvotes: 0,
    downvotes: 1,
    views: 0,
    createdAt: "2018-01-10T01:28:32.849Z",
    updatedAt: "2018-01-10T01:28:32.849Z"
  },
  viewedRecipe: {
    createdAt: "2017-12-18T17:57:11.735Z",
    details: "recipe",
    downvotes: 1,
    id: 1,
    ingredient: "recipe",
    picture: "ifztjn7osdtskuxdfiqh",
    recipeName: "Recipe",
    updatedAt: "2017-12-18T17:58:16.280Z",
    upvotes: 0,
    userId: 1,
    views: 0
  },
  downvotedRecipe: {
    status: true,
    message: 'downvote successful',
    data: {
      User: {
        username: "rukky"
      },
      createdAt: "2017-12-18T17:57:11.735Z",
      details: "recipe",
      downvotes: 1,
      id: 1,
      ingredient: "recipe",
      picture: "ifztjn7osdtskuxdfiqh",
      recipeName: "Recipe",
      updatedAt: "2017-12-18T17:58:16.280Z",
      upvotes: 0,
      userId: 1,
      views: 0
    }
  },
  searchRecipes: {
    status: true,
    data: {
      User: {
        username: "rukky"
      },
      createdAt: "2017-12-18T17:57:11.735Z",
      details: "recipe",
      downvotes: 0,
      id: 1,
      ingredient: "recipe",
      picture: "ifztjn7osdtskuxdfiqh",
      recipeName: "Recipe",
      updatedAt: "2017-12-18T17:58:16.280Z",
      upvotes: 1,
      userId: 1,
      views: 0
    }

  },
  addedReview: {
    User: {
      picture: null,
      username: 'rukkiey'
    },
    createdAt: "2017-12-18T17:57:11.735Z",
    id: 1,
    recipeId: 1,
    review: "nice one",
    updatedAt: "2017-12-18T17:58:16.280Z",
    userId: 1
  },
  getReview: {
    status: true,
    pages: 1,
    reviews: {
      count: 1,
      rows: {
        User: {
          picture: null,
          username: 'rukkiey'
        },
        createdAt: "2017-12-18T17:57:11.735Z",
        id: 1,
        recipeId: 1,
        review: "nice one",
        updatedAt: "2017-12-18T17:58:16.280Z",
        userId: 1
      }
    }
  },
  deletedRecipe: {
    status: true,
    message: 'Recipe deleted successfully!',
    data: {
      id: 1
    }
  },
  editedRecipe: {
    status: true,
    message: 'Recipe modified successfully!',
    data: {
      details: 'dfnmcll',
      id: 7,
      ingredient: 'jhckl',
      picture: 'yrsziwpdaqcbu6g6kpk5',
      recipeName: 'Dfncjkljdsl'
    }
  },
  inputRecipeData: {
    recipeName: 'yummy',
    ingredient: 'yum yum',
    details: 'cook the normal way',
    picture: 'picture.png',
  },
  userDetails: {
    email: 'oriyomi@gmail.com',
    fullName: 'Ruqoyah Odukoya',
    picture: 'picture.png',
    username: 'rookiey'
  },
  addedRecipe: {
    data: {
      message: "Recipe added successfully"
    }
  },
  userExist: {
    data: {
      status: true
    }
  },
  editedDetails: {
    data: {
      email: "oriyomi@gmail.com",
      fullName: "Ruqoyah Odukoya",
      id: 1,
      picture: null,
      username: "rookiey"
    }
  },
  viewRecipe: {
    id: 8,
    recipeName: 'yam',
    ingredient: 'water and yam',
    details: 'dsfaa',
    picture: 'tw2y57mjg7pbdo4dyrci',
    userId: 1,
    upvotes: 2,
    downvotes: 0,
    views: 6,
    createdAt: '2018-01-10T01:36:04.250Z',
    updatedAt: '2018-01-11T07:52:29.828Z'
  },
  viewRecipeProps: {
    picture: 'tw2y57mjg7pbdo4dyrci',
    userId: 1,
    recipeName: 'yam',
    ingredient: 'water and yam',
    details: 'dsfaa',
    upvotes: 2,
    downvotes: 0,
    views: 6,
    review: 'nice',
    match: {
      params: {
        id: 1
      }
    }
  },
  getUserDetails: {
    email: 'oriyomi@gmail.com',
    fullName: 'Rukayat Odukoya',
    id: 2,
    picture: null,
    status: true,
    username: 'rookie'
  },
  signupData: {
    username: 'ruqoyah',
    fullName: 'Rukayat Odukoya',
    email: 'rukayat@gmail.com',
    password: 'oriyomi123'
  },
  signinData: {
    username: 'ruqoyah',
    password: 'oriyomi123'
  },
  getRecipes: {
    pages: 1,
    recipes: {
      count: 2,
      rows: [{
        User: {
          username: "rukky"
        },
        createdAt: "2017-12-18T17:57:11.735Z",
        details: "recipe",
        downvotes: 0,
        id: 1,
        ingredient: "recipe",
        picture: "ifztjn7osdtskuxdfiqh",
        recipeName: "Recipe",
        updatedAt: "2017-12-18T17:58:16.280Z",
        upvotes: 1,
        userId: 1,
        views: 0
      },
      {
        User: {
          username: "joyce"
        },
        createdAt: "2017-12-18T17:57:11.735Z",
        details: "rice",
        downvotes: 0,
        id: 1,
        ingredient: "rice",
        picture: "ifztjn7osdtskuxdfiqh",
        recipeName: "rice",
        updatedAt: "2017-12-18T17:58:16.280Z",
        upvotes: 1,
        userId: 1,
        views: 0
      }]
    }
  }
};

export default mockData;
