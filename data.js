const generateData = () => {
  const data = [];

  for (let i = 1; i <= 100; i++) {
    const bcap1 = Math.floor(Math.random() * 3) + 1;
    const bcap2 = Math.floor(Math.random() * 3) + 1;
    const bcap3 = Math.floor(Math.random() * 3) + 1;
    data.push({
      id: `app-${i}`,
      name: `Application ${i}`,
      spend: Math.floor(Math.random() * 90001),
      BCAP1: `Business Capability ${bcap1}`,
      BCAP2: `Business Capability ${bcap1}.${bcap2}`,
      BCAP3: `Business Capability ${bcap1}.${bcap2}.${bcap3}`,
    });
  }

  return data;
};

module.exports = generateData();
