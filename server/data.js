const categories = {
  VEGETABLE: {
    id: "vegetables",
    name: "Vegetables and legumes/beans",
  },
  GRAIN: {
    id: "grain",
    name: "Grain (cereal) foods",
  },
  MEAL: {
    id: "meal",
    name:
      "Lean meats and poultry, fish, eggs, tofu, nuts and seeds and legumes/beans",
  },
  LACTOSE: {
    id: "lactose",
    name: "Milk, yoghurt cheese and/or alternatives",
  },
};

const data = [
  // VEGETABLES
  {
    name: "Broccoli",
    category: categories.VEGETABLE,
    price: 0.25,
  },
  {
    name: "Brussels sprouts",
    category: categories.VEGETABLE,
    price: 0.31,
  },
  {
    name: "Bok choy, cabbages",
    category: categories.VEGETABLE,
    price: 0.34,
  },
  {
    name: "Cauliflower",
    category: categories.VEGETABLE,
    price: 0.15,
  },
  {
    name: "Kale",
    category: categories.VEGETABLE,
    price: 0.7,
  },

  // GRAIN
  {
    name: "Bread",
    category: categories.GRAIN,
    price: 0.2,
  },
  {
    name: "Rice",
    category: categories.GRAIN,
    price: 0.4,
  },
  {
    name: "Pasta",
    category: categories.GRAIN,
    price: 0.3,
  },

  // MEAL
  {
    name: "Beef",
    category: categories.GRAIN,
    price: 5.2,
  },
  {
    name: "Lamb",
    category: categories.GRAIN,
    price: 7.5,
  },
  {
    name: "Veal",
    category: categories.GRAIN,
    price: 6.0,
  },
  {
    name: "Pork",
    category: categories.GRAIN,
    price: 4.2,
  },
  {
    name: "Kangaroo",
    category: categories.GRAIN,
    price: 10.5,
  },

  // LACTOSE
  {
    name: "Milk",
    category: categories.LACTOSE,
    price: 0.5,
  },
  {
    name: "Yoghurt",
    category: categories.LACTOSE,
    price: 0.8,
  },
  {
    name: "Cheese",
    category: categories.LACTOSE,
    price: 1.0,
  },
];

module.exports = {
  categories: Object.keys(categories).map((key) => categories[key]),
  data: data.map((item, key) => ({ id: key + 1, ...item })),
};
