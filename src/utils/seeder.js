import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    console.log('Database cleared.');

    // Seed Users
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@feast.com',
      password: 'adminpassword',
      role: 'admin',
    });

    const regularUser = await User.create({
      name: 'John Doe',
      email: 'user@feast.com',
      password: 'userpassword',
      role: 'user',
    });

    console.log('Users seeded.');

    // Seed Categories
    const categoriesData = [
      {
        name: 'Burgers',
        description: 'Juicy, flame-grilled burgers with premium toppings.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
      {
        name: 'Pizzas',
        description: 'Hot, stone-baked pizzas with rich mozzarella and fresh ingredients.',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
      {
        name: 'Desserts',
        description: 'Sweet treats, delicious cakes, and ice creams.',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
      {
        name: 'Beverages',
        description: 'Refreshing cold drinks, milkshakes, and hot beverages.',
        image: 'https://images.unsplash.com/photo-1548694907-f687f863e9e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    console.log('Categories seeded.');

    // Map Category Names to Objects for lookup
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Seed Products
    const productsData = [
      {
        name: 'Classic Cheeseburger',
        description: 'Flame-grilled beef patty, cheddar cheese, lettuce, tomato, pickles, and our signature burger sauce.',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        category: categoryMap['Burgers'],
        isFeatured: true,
        inStock: true,
      },
      {
        name: 'Bacon Double BBQ Burger',
        description: 'Two beef patties, crispy bacon, melted smoked cheddar, crispy onion rings, and sweet BBQ sauce.',
        price: 11.49,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        category: categoryMap['Burgers'],
        isFeatured: true,
        inStock: true,
      },
      {
        name: 'Spicy Veggie Burger',
        description: 'Crispy spiced vegetable patty, slice of Swiss cheese, jalapenos, and sriracha mayo.',
        price: 9.29,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        category: categoryMap['Burgers'],
        isFeatured: false,
        inStock: true,
      },
      {
        name: 'Margherita Pizza',
        description: 'Classic pizza base with rich tomato marinara sauce, fresh mozzarella, extra virgin olive oil, and fresh basil.',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        category: categoryMap['Pizzas'],
        isFeatured: true,
        inStock: true,
      },
      {
        name: 'Pepperoni Feast Pizza',
        description: 'Loaded with double pepperoni, mozzarella, and a blend of Italian herbs on our classic marinara base.',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        category: categoryMap['Pizzas'],
        isFeatured: true,
        inStock: true,
      },
      {
        name: 'BBQ Chicken Pizza',
        description: 'Grilled chicken breast, red onions, cilantro, and mozzarella cheese over a tangy BBQ sauce base.',
        price: 15.49,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        category: categoryMap['Pizzas'],
        isFeatured: false,
        inStock: true,
      },
      {
        name: 'Chocolate Lava Cake',
        description: 'Decadent chocolate cake with a warm, melted chocolate center. Served with a scoop of vanilla ice cream.',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        category: categoryMap['Desserts'],
        isFeatured: true,
        inStock: true,
      },
      {
        name: 'New York Cheesecake',
        description: 'Rich, creamy cheesecake on a graham cracker crust, topped with fresh strawberry compote.',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        category: categoryMap['Desserts'],
        isFeatured: false,
        inStock: true,
      },
      {
        name: 'Strawberry Milkshake',
        description: 'Creamy milkshake made with fresh strawberries and vanilla bean ice cream, topped with whipped cream.',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        category: categoryMap['Beverages'],
        isFeatured: false,
        inStock: true,
      },
      {
        name: 'Iced Caramel Macchiato',
        description: 'Chilled espresso combined with vanilla-flavored syrup, milk, and ice, finished with a caramel drizzle.',
        price: 4.49,
        image: 'https://images.unsplash.com/photo-1548694907-f687f863e9e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        category: categoryMap['Beverages'],
        isFeatured: false,
        inStock: true,
      },
    ];

    await Product.insertMany(productsData);
    console.log('Products seeded.');

    console.log('Data Import Success!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
