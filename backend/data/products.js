const products = [
  {
    name: "Airpods Wireless Bluetooth Headphones",
    // image: "airpods.jpg",
    image: {
      url: "airpods.jpg",
      isExternal: false,
    },
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "Electronics",
    price: 89.99,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "iPhone 11 Pro 256GB Memory",
    // image: "phone.jpg",
    image: {
      url: "phone.jpg",
      isExternal: false,
    },
    description:
      "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "Electronics",
    price: 599.99,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Cannon EOS 80D DSLR Camera",
    // image: "camera.jpg",
    image: {
      url: "camera.jpg",
      isExternal: false,
    },

    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Cannon",
    category: "Electronics",
    price: 929.99,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Sony Playstation 4 Pro White Version",
    // image: "playstation.jpg",
    image: {
      url: "playstation.jpg",
      isExternal: false,
    },
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "Electronics",
    price: 399.99,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Logitech G-Series Gaming Mouse",
    // image: "mouse.jpg",
    image: {
      url: "mouse.jpg",
      isExternal: false,
    },
    description:
      "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
    brand: "Logitech",
    category: "Electronics",
    price: 49.99,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Amazon Echo Dot 3rd Generation",
    // image: "alexa.jpg",
    image: {
      url: "alexa.jpg",
      isExternal: false,
    },
    description:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
    brand: "Amazon",
    category: "Electronics",
    price: 29.99,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
];

module.exports = products;
