const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");

const URL = 'mongodb+srv://neo:neo1414@visits.uead1xj.mongodb.net/?retryWrites=true&w=majority'
const dbName = 'Visits'

const mongoConnect = async () => {
  const dbo = await MongoClient.connect(URL);

  //check if db exists
  const dbList = await dbo.db().admin().listDatabases();
  const dbExists = dbList.databases.find((db) => db.name === dbName);
  if (!dbExists) {
    const visits = [
      { id: '1',
        People: "4",
        Area: "8",
        Land: "23",
        Special_bus: false,
        Date: '2023-06-16',
        Time: '10:30',
        Notes: 'Snacks have being requested'
      },
      { id: '2',
        People: "2",
        Area: "10",
        Land: "15",
        Special_bus: true,
        Date: '2023-07-17',
        Time: '11:30',
        Notes: 'No notes'
      },
      { id: '3',
        People: "6",
        Area: "5",
        Land: "18",
        Special_bus: false,
        Date: '2023-06-24',
        Time: '16:30',
        Notes: 'Please buy drinks for the customers.'
      },
    ];

    await dbo.db(dbName).collection("visits").insertMany(visits);
  }

  console.log(`Connected to database ${dbName}!`);
  return await dbo.db(dbName);
};

module.exports = { mongoConnect, ObjectId };