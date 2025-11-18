import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userModel from "./models/userModel.js";
import itemModel from "./models/itemModel.js";
import bcrypt from "bcrypt";

const run = async () => {
  await connectDB();
  console.log('Seeding database...');

  // clear existing demo items/users (careful)
  await itemModel.deleteMany({ title: /Demo|Test/ });
  await userModel.deleteMany({ email: /demo|testuser/ });

  const passwordHash = await bcrypt.hash('password', 10);

  const user1 = await userModel.create({ name: 'Demo Lender', email: 'demo.lender@example.com', password: passwordHash });
  const user2 = await userModel.create({ name: 'Demo Borrower', email: 'demo.borrower@example.com', password: passwordHash });

  const items = [
    {
      title: 'Power Drill',
      description: 'Cordless power drill for home projects',
      owner: user1._id,
      price: 50,
      priceUnit: 'hourly',
      images: [],
      location: { type: 'Point', coordinates: [ -0.1276, 51.5074 ] }, // London
      available: true
    },
    {
      title: 'Ladder (6ft)',
      description: 'Lightweight aluminum ladder',
      owner: user1._id,
      price: 10,
      priceUnit: 'daily',
      images: [],
      location: { type: 'Point', coordinates: [ -0.1276, 51.5075 ] },
      available: true
    },
    {
      title: 'Camera Tripod',
      description: 'Sturdy tripod for DSLR',
      owner: user1._id,
      price: 15,
      priceUnit: 'daily',
      images: [],
      location: { type: 'Point', coordinates: [ -0.1275, 51.5076 ] },
      available: true
    }
  ];

  await itemModel.insertMany(items);

  console.log('Seed complete. Users:');
  console.log('  demo.lender@example.com / password');
  console.log('  demo.borrower@example.com / password');
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
